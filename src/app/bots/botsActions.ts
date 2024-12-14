import { supabaseAdmin } from "../api/supabase";

export default async function insertbot(
  bot_token: string,
  bot_group_id: string,
  idUser: string,
) {
  try {
    await supabaseAdmin().from("bots").insert({
      created_at: new Date(),
      bot_token: bot_token,
      bot_owner: idUser,
      status: "active",
      bot_id_group: bot_group_id,
    });
  } catch (e) {
    throw new Error("Error while inserting bot supabase: " + e);
  }
}

export async function updateBot(
  id: string,
  bot_token: string,
  bot_group_id: string,
  idUser: string,
) {
  try {
    await supabaseAdmin().from("bots").upsert({
      created_at: new Date(),
      bot_token: bot_token,
      bot_owner: idUser,
      bot_id_group: bot_group_id,
    }).eq("id", id);
  } catch (e) {
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
