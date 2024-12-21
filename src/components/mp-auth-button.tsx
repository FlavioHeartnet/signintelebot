import Link from "next/link";

export default function MercadoPagoAuthButton({ idbot }: { idbot: number }) {
  const redirect_url = process.env.NEXT_PUBLIC_ENV;
  const link =
    `https://auth.mercadopago.com.br/authorization?client_id=7463974713567328&response_type=code&state=${idbot}&platform_id=mp&redirect_uri=${redirect_url}OAuth`;
  return (
    <Link
      target="_blank"
      href={link}
      className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500"
    >
      Autorizar
    </Link>
  );
}
