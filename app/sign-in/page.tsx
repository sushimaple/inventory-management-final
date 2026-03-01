import { SignIn } from "@stackframe/stack";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserOptional } from "@/lib/auth";

export default async function SignInPage() {
  const user = await getUserOptional();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="max-w-md w-full space-y-8">
        <SignIn />
        <Link
          href="/"
          className="block text-center text-sm text-purple-600 hover:text-purple-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
