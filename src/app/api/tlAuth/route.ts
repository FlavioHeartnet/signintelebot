import { NextRequest, NextResponse } from "next/server";
import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const loginAttempts = new Map<string, {
  client: TelegramClient;
  phoneCodeHash: string;
  phoneNumber: string;
}>();

export async function POST(req: NextRequest) {
  const { step, phoneNumber, phoneCode, sessionId } = await req
    .json();
  try {
    switch (step) {
      case "sendCode":
        return await handleSendCode(phoneNumber);
      case "verifyCode":
        return await handleVerifyCode(sessionId, phoneCode);
      case "provide2FA":
        return; //await handleProvide2FA(sessionId, password);
      default:
        return NextResponse.json({ error: "Invalid step" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, {
      status: 500,
    });
  }
}

async function handleSendCode(phoneNumber: string) {
  const session = new StringSession("");
  const client = new TelegramClient(
    session,
    parseInt(process.env.TELEGRAM_API_ID!),
    process.env.TELEGRAM_API_HASH!,
    { connectionRetries: 5 },
  );

  try {
    await client.connect();
    const { phoneCodeHash } = await client.sendCode({
      apiId: parseInt(process.env.TELEGRAM_API_ID!),
      apiHash: process.env.TELEGRAM_API_HASH!,
    }, phoneNumber);
    // Store the attempt
    loginAttempts.set(session.save(), {
      client,
      phoneCodeHash,
      phoneNumber,
    });
    return NextResponse.json({ sessionId: session.save() }, { status: 200 });
  } catch (error) {
    console.error("Error sending code:", error);
    return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
  }
}
async function handleVerifyCode(sessionId: string, phoneCode: number) {
  const attempt = loginAttempts.get(sessionId);
  if (!attempt) {
    return NextResponse.json({ error: "Invalid session" }, { status: 500 });
  }
  try {
    const { client, phoneNumber, phoneCodeHash } = attempt;

    try {
      const signInResult = await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: phoneNumber,
          phoneCodeHash: phoneCodeHash,
          phoneCode: phoneCode.toString(),
        }),
      );
      const signJsonResult = signInResult.toJSON();

      client.session.save();
      loginAttempts.delete(sessionId);

      return NextResponse.json({ sessionId, result: signJsonResult }, {
        status: 200,
      });
    } catch (error) {
      console.log(error);
      if (error === "SESSION_PASSWORD_NEEDED") {
        return NextResponse.json({
          requiresPassword: true,
          sessionId,
        }, { status: 200 });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json({ error: "Failed to verify code" }, {
      status: 500,
    });
  }
}
