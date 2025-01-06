"use server";

import { dbErrorsCheck } from "@/utils/logs";
import { supabaseAdmin } from "../api/supabase";
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

export default async function insertbot(
  bot_token: string,
  bot_group_id: string,
  botGroupName: string,
  botAddress: string,
  botGroupDescription: string,
  idUser: number,
) {
  try {
    const { data, error } = await supabaseAdmin().from("bots").insert({
      created_at: new Date(),
      bot_token: bot_token,
      bot_owner: idUser,
      status: "waiting payment integration",
      bot_id_group: bot_group_id,
    }).select("id").limit(1);
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
    .from("users").select("telegram_id")
    .eq("kinde_id", kinde_id).limit(1);

  dbErrorsCheck(error);

  if (data) {
    return data[0].telegram_id ? true : false;
  } else {
    return false;
  }
}
