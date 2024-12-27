"use client";
import { useState } from "react";
import TelegramValidationPage from "@/components/tlValidation";

export default function TelegramPage() {
  const [session, setSession] = useState<string | null>(null);

  const handleLoginComplete = async (newSession: string) => {
    setSession(newSession);
    // You can now use this session with your TelegramChannelCreator
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {!session
        ? <TelegramValidationPage onLoginComplete={handleLoginComplete} />
        : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Successfully logged in!</h2>
            <p>You can now create channels and add bots.</p>
          </div>
        )}
    </div>
  );
}
