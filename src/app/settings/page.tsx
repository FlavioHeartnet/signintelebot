import { NavBar } from "@/components/navbar";
import AuthLayout from "../authLayout";
import SettingsForm, { SettingData } from "@/components/settings-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getCurrentUserInfo } from "./editAction";

export default async function Settings() {
  let settingsData: SettingData ={
    id: "",
    name: "",
    surname: "",
    email: "",
    phone: ""
  };
  const {
    getUser,
    isAuthenticated
  } = getKindeServerSession();
  if(await isAuthenticated()){
    const userId = (await getUser()).id;
    const user = await getCurrentUserInfo(userId);

    settingsData = {
      id: userId ?? "",
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      surname: user.surname ?? "",
    };
  }
  
  

  return (
    <AuthLayout>
      <NavBar isSettingsPage={true} isAuthenticated />
      <SettingsForm userInfo={settingsData} />
    </AuthLayout>
  );
}
