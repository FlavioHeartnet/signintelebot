"use server";

import { dbErrorsCheck } from "@/utils/logs";
import { supabaseAdmin } from "../api/supabase";
import { StringSession } from "telegram/sessions";
import { Api, TelegramClient } from "telegram";
export type SupabaseBots = {
  id: number;
  bot_token: string;
  bot_id_group: string;
  bot_group_name: string;
  bot_group_description: string;
  bot_group_address: string;
  status: string;
  payment_token: string;
};
export async function getBots(userid: number) {
  try {
    const { data, error } = await supabaseAdmin().from("bots")
      .select("id, bot_token, bot_id_group, status, payment_token")
      .eq("bot_owner", userid);
    if (error) {
      console.log(error);
    }

    return data ? data as SupabaseBots[] : [];
  } catch (e) {
    throw new Error("Error while inserting bot supabase: " + e);
  }
}

export async function deleteBot(idBot: number) {
  const { status, error } = await supabaseAdmin().from("bots")
    .delete().eq("id", idBot);
  dbErrorsCheck(error);
  return status == 204 ? true : false;
}

async function createChannel(
  botGroupName: string,
  botAddress: string,
  botGroupDescription: string,
  telegram_client: TelegramClient,
) {
  try {
    // Create the channel
    const result = await telegram_client.invoke(
      new Api.channels.CreateChannel({
        title: botGroupName,
        about: botGroupDescription,
        broadcast: true,
        megagroup: false,
      }),
    ) as Api.Updates;

    // Find the channel in the updates
    const channel = result.chats[0];
    if (!channel || !("id" in channel)) {
      throw new Error("Failed to create channel");
    }
    const user = await telegram_client.getMe();
    console.log(user.id);
    const channelId = channel.id.toString();

    // Set username if provided
    /*
    if (botAddress) {
      const updateUsernameResult = await telegram_client.invoke(
        new Api.channels.UpdateUsername({
          channel: await telegram_client.getInputEntity(channelId),
          username: botAddress,
        }),
      );

      if (!updateUsernameResult) {
        console.warn("Failed to set channel username");
      }
    }*/

    return channelId;
  } catch (error) {
    console.error("Error creating channel:", error);
    throw error;
  }
}

async function setupTelegramClient(
  telegram_session: string,
) {
  const currentSession = new StringSession(telegram_session);
  return new TelegramClient(
    currentSession,
    parseFloat(process.env.TELEGRAM_API_ID ?? "0"),
    process.env.TELEGRAM_API_HASH ?? "",
    { connectionRetries: 5 },
  );
}
async function updateProductChannelId(channelId: string, idProduct: number) {
  if (idProduct === 0) { //TODO creating the product channel and link it with the bot
    const { error } = await supabaseAdmin().from("products").insert({
      content: channelId,
    });
    dbErrorsCheck(error);
  } else {
    const { error } = await supabaseAdmin().from("products").update({
      content: channelId,
    }).eq("id", idProduct);
    dbErrorsCheck(error);
  }
}
export default async function insertbot(
  bot_token: string,
  bot_group_id: string,
  botGroupName: string,
  botAddress: string,
  botGroupDescription: string,
  idUser: number,
) {
  try {
    // ? Should we move this to let the customer decide which kind of product he wants his bot to manage? that way they'll always have a channel
    const session = await getSessionFromDb(idUser);
    const client = await setupTelegramClient(session);
    await client.connect();

    const channelId = await createChannel(
      botGroupName,
      botAddress,
      botGroupDescription,
      client,
    );

    const { data, error } = await supabaseAdmin().from("bots").insert({
      created_at: new Date(),
      bot_token: bot_token,
      bot_owner: idUser,
      status: "waiting payment integration",
      bot_id_group: bot_group_id,
    }).select("id").limit(1);
    updateProductChannelId(channelId, 0);
    console.log(error);
    return data ? data[0].id : 0;
  } catch (e) {
    throw new Error("Error while inserting bot supabase: " + e);
  }
}

export async function updateBot(
  id: number,
  bot_token: string,
  bot_group_id: string,
  idUser: number,
) {
  try {
    const { error } = await supabaseAdmin().from("bots").update({
      created_at: new Date(),
      bot_token: bot_token,
      bot_owner: idUser,
      bot_id_group: bot_group_id,
    }).eq("id", id);
    console.log(error);
  } catch (e) {
    console.log(e);
    throw new Error("Error while inserting bot supabase: " + e);
  }
}

export async function updatePaymentToken(id: string, payment_token: string) {
  try {
    await supabaseAdmin().from("bots").update({
      payment_token: payment_token,
    }).eq("id", id);
  } catch (e) {
    throw new Error("Error while inserting bot supabase: " + e);
  }
}

export async function checkTelegramConnectionByKindeId(kinde_id: string) {
  const { data, error } = await supabaseAdmin()
    .from("users").select("telegram_id, telegram_session")
    .eq("kinde_id", kinde_id).limit(1);

  dbErrorsCheck(error);

  if (data) {
    try {
      const session = await setupTelegramClient(
        data[0].telegram_session as string,
      );
      await session.connect();
      await session.getMe();
      return data[0].telegram_id ? true : false;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
}
async function getSessionFromDb(idUser: number) {
  const { data, error } = await supabaseAdmin().from("users").select(
    "telegram_id, telegram_session",
  ).eq("id", idUser).limit(1);
  dbErrorsCheck(error);
  if (data) {
    if (data[0].telegram_session) {
      return data[0].telegram_session as string;
    }
  }
  return "";
}
