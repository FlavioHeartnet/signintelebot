import type { NextApiRequest, NextApiResponse } from "next";

interface MercadoPagoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}

interface ErrorResponse {
  error: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MercadoPagoTokenResponse | ErrorResponse>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
      message: "Only POST requests are allowed",
    });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        error: "Missing code",
        message: "Authorization code is required",
      });
    }

    // Verificar se todas as variáveis de ambiente necessárias estão definidas
    if (
      !process.env.MERCADOPAGO_CLIENT_ID ||
      !process.env.MERCADOPAGO_CLIENT_SECRET ||
      !process.env.MERCADOPAGO_REDIRECT_URI
    ) {
      throw new Error("Missing required environment variables");
    }

    // Preparar o FormData com os parâmetros
    const formData = new URLSearchParams();
    formData.append("client_id", process.env.MERCADOPAGO_CLIENT_ID);
    formData.append("client_secret", process.env.MERCADOPAGO_CLIENT_SECRET);
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    formData.append("redirect_uri", process.env.MERCADOPAGO_REDIRECT_URI);
    if (process.env.MERCADOPAGO_STATE) {
      formData.append("state", process.env.MERCADOPAGO_STATE);
    }

    // Fazer a requisição para o Mercado Pago
    const response = await fetch("https://api.mercadopago.com/oauth/token", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get access token");
    }

    return res.status(200).json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}
