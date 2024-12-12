import { NavBar } from "@/components/navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
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

        <Link 
        href="https://auth.mercadopago.com.br/authorization?client_id=7463974713567328&response_type=code&platform_id=mp&redirect_uri=https://signintelebot.vercel.app/OAuth"
        className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500"
        >Autorizar MercadoPago</Link>
      </div>
    </div>
  );
};
