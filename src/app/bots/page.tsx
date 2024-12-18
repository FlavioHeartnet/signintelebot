import { NavBar } from "@/components/navbar";
import AuthLayout from "../authLayout";
import BotConfigForm from "@/components/bot-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserIdByKindeId } from "../authLayoutAction";

export default async function BotsPage() {
  let idUser = 0;
  const { getUser, isAuthenticated } = await getKindeServerSession();
  if(await isAuthenticated()){
    const kinde_user = await getUser();
    idUser = await getUserIdByKindeId(kinde_user.id);
  }
  
  return (
    <AuthLayout>
      <NavBar isBotPage={true} isAuthenticated />
      <BotConfigForm userId={idUser} />
    </AuthLayout>
  );
}
