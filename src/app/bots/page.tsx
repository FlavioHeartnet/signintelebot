import { NavBar } from "@/components/navbar";
import AuthLayout from "../authLayout";
import BotConfigForm from "@/components/bot-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserIdByKindeId } from "../authLayoutAction";

export default async function BotsPage() {
  const { getUser } = await getKindeServerSession();
  const kinde_user = await getUser();
  const idUser = await getUserIdByKindeId(kinde_user.id);
  return (
    <AuthLayout>
      <NavBar isBotPage={true} isAuthenticated />
      <BotConfigForm userId={idUser} />
    </AuthLayout>
  );
}
