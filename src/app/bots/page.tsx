import { NavBar } from "@/components/navbar";
import AuthLayout from "../authLayout";
import BotConfigForm from "@/components/bot-form";

export default async function BotsPage() {
  return (
    <AuthLayout>
      <NavBar isBotPage={true} isAuthenticated />
      <BotConfigForm />
    </AuthLayout>
  );
}
