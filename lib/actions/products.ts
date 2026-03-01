"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

export async function deleteProduct(formData: FormData) {
  const user = await getCurrentUser();
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Product ID is required");
  }

  const result = await prisma.product.deleteMany({
    where: { id, userId: user.id },
  });

  if (result.count === 0) {
    throw new Error("Product not found or already deleted");
  }

  revalidatePath("/inventory");
}

export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const message =
      Object.values(first).flat().find(Boolean) || "Validation failed";
    throw new Error(String(message));
  }

  try {
    await prisma.product.create({
      data: { ...parsed.data, userId: user.id },
    });
  } catch (error) {
    console.error("createProduct error:", error);
    throw new Error("Failed to create product. Please try again.");
  }

  revalidatePath("/inventory");
  redirect("/inventory");
}
