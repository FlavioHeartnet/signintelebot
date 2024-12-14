import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import insertUserSupabase from "./authLayoutAction";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    isAuthenticated,
    getUser,
  } = getKindeServerSession();
  if (!await isAuthenticated()) {
    redirect("/");
  }
  const { email, id, given_name, family_name, phone_number } = await getUser();
  await insertUserSupabase(
    id,
    given_name + " " + family_name,
    email || "",
    phone_number || "",
  );
  return (
    <div>
      {children}
    </div>
  );
}
