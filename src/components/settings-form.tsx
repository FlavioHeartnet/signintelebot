"use client";

import editUser from "@/app/settings/editAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast, { Toaster } from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useState } from "react";
export type SettingData = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}
export default function SettingsForm({userInfo}: {userInfo: SettingData}) {
  const [ name, setName ] = useState(userInfo.name);
  const [ surname, setSurname ] = useState(userInfo.surname);
  const [ phone, setPhone ] = useState(userInfo.phone);

  const handleSubmit = async () => {
    
    const resp = await editUser({
      id: userInfo.id,
      name: name,
      surname: surname,
      phone: phone,
      email: userInfo.email
    });

    if(resp){
      toast.success('Salvo com sucesso!')
    }else {
      toast.error("Algo deu errado, tente novamente mais tarde.")
    }

  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <Toaster/>
        <CardTitle className="text-3xl font-medium text-[#45456B]">
          Configuração de conta
        </CardTitle>
        <CardDescription className="text-base text-[#FF7171]">
          Gerencie suas informações pessoais
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2" >
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              onChange={ (e) => setName(e.target.value)}
              placeholder={userInfo.name ? userInfo.name: "Entre com seu nome" }
              className="pl-10 border-gray-200 focus:border-[#FF7171]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Sobrenome</Label>
            
            <Input
              id="surname"
              onChange={ (e) => setSurname(e.target.value)}
              placeholder={userInfo.surname ? userInfo.surname : "Entre com seu sobrenome"}
              className="pl-10 border-gray-200 focus:border-[#FF7171]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              disabled
              value={userInfo.email}
              type="email"
              placeholder="Entre com seu endereço de email"
              className="pl-10 border-gray-200 focus:border-[#FF7171]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Celular</Label>

            <Input
              id="phone"
              onChange={ (e) => setPhone(e.target.value)}
              placeholder={userInfo.phone ? userInfo.phone : "Entre com seu númeto de celular" }
              className="pl-10 border-gray-200 focus:border-[#FF7171]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="change-password">Senha</Label>
            <Button
              id="change-password"
              variant="outline"
              className="w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-100/50 hover:text-[#FF7171]"
              onClick={() => {
                // Add your password change logic here
                console.log("Change password clicked");
              }}
            >
              <Lock className="w-4 h-4 mr-2" />
              Alterar
            </Button>
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-full sm:w-auto bg-[#FF7171] hover:bg-[#FF7171]/90 text-white">
          Salvar
        </Button>
      </CardContent>
    </Card>
  );
}