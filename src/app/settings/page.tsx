import { NavBar } from "@/components/navbar";

import AuthLayout from "../authLayout";
import SettingsForm from "@/components/settings-form";

export default async function Settings() {
  return (
    <AuthLayout>
      <NavBar isSettingsPage={true} isAuthenticated />
      <SettingsForm />
    </AuthLayout>
  );
}
