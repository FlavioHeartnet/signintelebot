"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export type UserAuth = {
  kinde_id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
};
export async function getCurrentAuth() {
  const {
    isAuthenticated,
    getUser,
  } = getKindeServerSession();

  if (await isAuthenticated()) {
    return {
      kinde_id: (await getUser()).id,
      name: (await getUser()).given_name,
      surname: (await getUser()).family_name,
      email: (await getUser()).email,
      phone: (await getUser()).phone_number,
    };
  }
}
