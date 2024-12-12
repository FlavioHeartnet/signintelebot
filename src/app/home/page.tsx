import { NavBar } from "@/components/navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const {
    isAuthenticated,
  } = getKindeServerSession();
  if (!await isAuthenticated) {
    redirect("/");
  }
  return (
    <div>
      <NavBar isHomePage={true} isAuthenticated />
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <h1>Home</h1>
      </div>
    </div>
  );
};
