import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { getAdminUsernameFromCookies } from "@/server/auth/admin-session";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { reason?: string; from?: string };
}) {
  if (await getAdminUsernameFromCookies()) redirect("/admin");

  return <LoginForm reason={searchParams.reason} />;
}
