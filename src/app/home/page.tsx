import { NavBar } from "@/components/navbar";
import Link from "next/link";
import AuthLayout from "../authLayout";

export default async function Home() {
  return (
    <AuthLayout>
      <NavBar isHomePage={true} isAuthenticated />
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <Link
          href="https://auth.mercadopago.com.br/authorization?client_id=7463974713567328&response_type=code&platform_id=mp&redirect_uri=https://signintelebot.vercel.app/OAuth"
          className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500"
        >
          Autorizar MercadoPago
        </Link>
      </div>
    </AuthLayout>
  );
}
