import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../supabase";

export async function POST(
  req: NextRequest,
) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const botid = req.nextUrl.searchParams.get("state");

    if (!code) {
      return NextResponse.json({
        error: "Missing code",
        message: "Authorization code is required",
      }, { status: 400 });
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
    formData.append("state", randomUUID());

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

    const { error } = await supabaseAdmin().from("bots").update({
      payment_token: data.access_token,
      status: "active",
    }).eq("id", botid);
    if (error) {
      return NextResponse.json({
        error: "Internal server error",
        message: error.message,
      }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      error: "Internal server error",
      message: error.message,
    }, { status: 500 });
  }
}
