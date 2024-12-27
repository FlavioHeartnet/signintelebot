"use client";
import { useEffect, useState } from "react";
import TelegramValidationPage from "@/components/tlValidation";
import { getCurrentAuth } from "../auth/authActions";

export default function TelegramPage() {
  const [session, setSession] = useState<string | null>(null);
  const [kinde_id, setKindeId] = useState("");
  const handleLoginComplete = async (newSession: string) => {
    setSession(newSession);
    // You can now use this session with your TelegramChannelCreator
  };

  useEffect(() => {
    getCurrentAuth().then((user) => {
      if (user) setKindeId(user.kinde_id);
      else window.location.href = "/";
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
          </div>
        )}
    </div>
  );
}
