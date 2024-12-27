"use server";
import { dbErrorsCheck } from "@/utils/logs";
import { supabaseAdmin } from "../api/supabase";

export async function UpdateSupabaseTelegramId(
  sessionId: string,
  userId: string,
  kindeId: string,
) {
  const { error } = await supabaseAdmin().from("users").update({
    telegram_id: userId,
    telegram_session: sessionId,
  }).eq("id", kindeId);
  if (error) {
    dbErrorsCheck(error);
    return false;
  }
  return true;
}
