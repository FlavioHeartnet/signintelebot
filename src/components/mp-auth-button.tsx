import Link from "next/link";

export default function MercadoPagoAuthButton() {
  const link =
    "https://auth.mercadopago.com.br/authorization?client_id=7463974713567328&response_type=code&platform_id=mp&redirect_uri=https://7582-2804-14d-baa7-83a7-3093-ee9-bbb1-994.ngrok-free.app/OAuth";
  return (
    <Link
      href={link}
      className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500"
    >
      Autorizar
    </Link>
  );
}
