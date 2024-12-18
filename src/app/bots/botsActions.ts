"use server";

import { supabaseAdmin } from "../api/supabase";

export default async function insertbot(
  bot_token: string,
  bot_group_id: string,
  idUser: number,
) {
  try {
    const { data, error } = await supabaseAdmin().from("bots").insert({
      created_at: new Date(),
      bot_token: bot_token,
      bot_owner: idUser,
      status: "active",
      bot_id_group: bot_group_id,
    }).select("id").limit(1);
    console.log(error);
    return data ? data[0].id : 0;
  } catch (e) {
    throw new Error("Error while inserting bot supabase: " + e);
  }
}

export async function updateBot(
  id: string,
  bot_token: string,
  bot_group_id: string,
  idUser: number,
) {
  try {
    const { error } = await supabaseAdmin().from("bots").upsert({
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
    await supabaseAdmin().from("bots").upsert({
      payment_token: payment_token,
    }).eq("id", id);
  } catch (e) {
    throw new Error("Error while inserting bot supabase: " + e);
  }
}
