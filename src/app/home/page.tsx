import { NavBar } from "@/components/navbar";
import Link from "next/link";
import AuthLayout from "../authLayout";

export default async function Home() {
  return (
    <AuthLayout>
      <NavBar isHomePage={true} isAuthenticated />
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <h1>Home</h1>
      </div>
    </AuthLayout>
  );
}
