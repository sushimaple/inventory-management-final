import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

/** Returns the current user or null without redirecting. Use for public pages (home, sign-in). */
export async function getUserOptional() {
  try {
    return await stackServerApp.getUser();
  } catch {
    return null;
  }
}

/** Returns the current user or redirects to sign-in. Use for protected routes. */
export async function getCurrentUser() {
  const user = await getUserOptional();
  if (!user) {
    redirect("/sign-in");
  }
  return user;
}
