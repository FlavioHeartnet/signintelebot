import Link from "next/link";

export default function MercadoPagoAuthButton(
  { botid = "" }: { botid?: string },
) {
  const link =
    "https://auth.mercadopago.com.br/authorization?client_id=7463974713567328&response_type=code&platform_id=mp&redirect_uri=https://signintelebot.vercel.app/OAuth?p=" +
    botid;
  return (
    <Link
      href={link}
      className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500"
    >
      Autorizar
    </Link>
  );
}
