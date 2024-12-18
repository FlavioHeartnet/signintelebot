"use server";

import { SettingData } from "@/components/settings-form";
import { supabaseAdmin } from "../api/supabase";

export default async function editUser(userInfo: SettingData) {
  try {
      await supabaseAdmin().from("users").update({
        name: userInfo.name,
        surname: userInfo.surname,
        email: userInfo.email,
        phone: userInfo.phone,
      }).eq("kinde_id", userInfo.id);
      return true;

  } catch (e) {
    console.log(e);
    throw new Error("Error: " + e);
  }
}

export async function getCurrentUserInfo(kinde_id: string) {
  const resp = await supabaseAdmin().from("users").select("name, email, surname, phone")
  .eq("kinde_id", kinde_id).limit(1);
  if(resp.data){
      const user = resp.data[0];
      return {
        name: user.name,
        email: user.email,
        surname: user.surname,
        phone: user.phone,
      }
  }else{
    throw new Error("Not Found")
  }
}
