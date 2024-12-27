"use client";
import { useEffect, useState } from "react";
import TelegramValidationPage from "@/components/tlValidation";
import { getCurrentAuth } from "../auth/authActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TelegramPage() {
  const router = useRouter();
  const [session, setSession] = useState<string | null>(null);
  const [kinde_id, setKindeId] = useState("");
  const handleLoginComplete = async (newSession: string) => {
    setSession(newSession);
    // You can now use this session with your TelegramChannelCreator
  };

  useEffect(() => {
    getCurrentAuth().then((user) => {
      if (user) setKindeId(user.kinde_id);
      else router.push("/");
    });
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {!session
        ? (
          <TelegramValidationPage
            kinde_id={kinde_id}
            onLoginComplete={handleLoginComplete}
          />
        )
        : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Autenticado com sucesso!
            </h2>
            <p>Você pode criar seus canais e bots.</p>
            <br></br>
            <Link
              className="w-full bg-[#ff7171] hover:bg-[#ff5959] text-white px-8 py-2 rounded-md transition-colors"
              href={"/bots"}
            >
              Voltar para o Início
            </Link>
          </div>
        )}
    </div>
  );
}
