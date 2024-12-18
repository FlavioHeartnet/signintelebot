"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { supabaseAdmin } from "./api/supabase";

export async function checkIfKindeUserIsInSupabase(id_kinde: string) {
  try {
    const resp = await supabaseAdmin().from("users").select("kinde_id, id").eq(
      "kinde_id",
      id_kinde,
    );
    return resp.data ? true : false;
  } catch (e) {
    throw new Error("Error Supabase: " + e);
  }
}

export default async function insertUserSupabase(
  id_kinde: string,
  name: string,
  surname: string,
  email: string,
  phone: string = "",
) {
  try {
    if (!await checkIfKindeUserIsInSupabase(id_kinde)) {
      const resp = await supabaseAdmin().from("users").insert({
        created_at: new Date(),
        name: name,
        surname: surname,
        email: email,
        phone: phone,
        kinde_id: id_kinde,
      });
      return resp.count ? resp.count : 0;
    }
    return 0;
  } catch (e) {
    throw new Error("Error Supabase: " + e);
  }
}

export async function getUserIdByKindeId(kinde_id: string) {
  try {
    const { data, error } = await supabaseAdmin().from("users").select(
      "kinde_id, id",
    ).eq(
      "kinde_id",
      kinde_id,
    );
    if (error) {
      console.log(error.message);
    }

    return data ? data[0].id as number : 0;
  } catch (e) {
    throw new Error("Error Supabase: " + e);
  }
}

export async function validateAuth() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (user) {
    return await getUserIdByKindeId(user.id);
  }
  return 0;
}
