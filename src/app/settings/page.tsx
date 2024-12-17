import { NavBar } from "@/components/navbar";

import AuthLayout from "../authLayout";
import SettingsForm, { SettingData } from "@/components/settings-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Settings() {
  const {
    getUser,
  } = getKindeServerSession();
  const user = await getUser();
  const settingsData: SettingData = {
    id: user.id,
    name: user.given_name ?? "",
    email: user.email ?? "",
    phone: user.phone_number ?? "",
    surname: user.family_name ?? "",
  };

  return (
    <AuthLayout>
      <NavBar isSettingsPage={true} isAuthenticated />
      <SettingsForm userInfo={settingsData} />
    </AuthLayout>
  );
}
