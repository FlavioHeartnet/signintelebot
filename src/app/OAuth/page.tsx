// components/MercadoPagoAuth.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface MercadoPagoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  public_key?: string;
  live_mode?: boolean;
  user_id?: number;
}

interface MercadoPagoErrorResponse {
  error: string;
  message: string;
  status?: number;
}

function AuthContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MercadoPagoTokenResponse | null>(null);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  useEffect(() => {
    if (code) {
      // !! This is been called twice, updating the db twice and create two channels in the telegram.
      handleAuth(code, state || "0");
    }
  }, []);

  const handleAuth = async (code: string, state: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "/api/mpAuth?code=" + code + "&state=" + state,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data: MercadoPagoTokenResponse | MercadoPagoErrorResponse =
        await response.json();

      if (!response.ok) {
        throw new Error(
          "message" in data ? data.message : "Falha na autenticação",
        );
      }
      // Type assertion since we know it's a success response at this point
      setResult(data as MercadoPagoTokenResponse);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Erro desconhecido";
      console.log(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]">
            </div>
            <span className="ml-2 text-gray-600">
              Autenticando com MercadoPago...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 rounded-lg shadow p-6">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-red-700">
              Falha ao vincular, talvez sua conta ja tenha sido vinculada.
            </span>
          </div>
          <button
            onClick={() => window.location.href = "/bots"}
            className="mt-4 bg-[#FF7171] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-green-50 rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <svg
              className="h-5 w-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-green-700 font-semibold">
              Autenticação concluída com sucesso!
            </span>
          </div>
          <div className="bg-white rounded p-4 overflow-auto">
            <pre className="text-sm text-gray-600">
               Você pode voltar a tela de gestáo dos bots
            </pre>
          </div>
          <button
            onClick={() => window.location.href = "/bots"}
            className="mt-4 bg-[#FF7171] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="h-12 w-12 text-[#6366F1] mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Aguardando Autorização
          </h2>
          <p className="text-gray-600 text-center">
            Aguardando código de autorização do MercadoPago...
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6366F1]">
          </div>
          <span className="ml-2 text-gray-600">Carregando...</span>
        </div>
      </div>
    </div>
  );
}

export default function MercadoPagoAuth() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthContent />
    </Suspense>
  );
}
