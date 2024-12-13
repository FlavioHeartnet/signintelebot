import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    isAuthenticated,
  } = getKindeServerSession();
  if (!await isAuthenticated()) {
    redirect("/");
  }
  return (
    <div>
      {children}
    </div>
  );
}
