"use server";

import { SettingData } from "@/components/settings-form";
import { createKindeManagementAPIClient } from "@kinde-oss/kinde-auth-nextjs/server";
import { supabaseAdmin } from "../api/supabase";

export default async function editUser(userInfo: SettingData) {
  try {
    const { usersApi } = await createKindeManagementAPIClient();
    const resp = await usersApi.updateUser({
      id: userInfo.id,
      updateUserRequest: {
        familyName: userInfo.name,
        givenName: userInfo.surname,
      },
    });
    if (resp.id) {
      await supabaseAdmin().from("users").update({
        name: userInfo.name,
        surname: userInfo.surname,
        email: userInfo.email,
        phone: userInfo.phone,
      }).eq("kinde_id", userInfo.id);
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    throw new Error("Error: " + e);
  }
}
