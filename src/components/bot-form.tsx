"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import BotTable from "./bot-table";
interface Bot {
  botToken: string;
  botGroupId: string;
  paymentIntegration: string;
}
export default function BotConfigForm() {
  const [formData, setFormData] = useState<Bot>({
    botToken: "",
    botGroupId: "",
    paymentIntegration: "",
  });
  //const [saveInfo, setSaveInfo] = useState(false);
  const [bots, setBots] = useState<Bot[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBots([...bots, formData]);
    setFormData({ botToken: "", botGroupId: "", paymentIntegration: "" });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="space-y-2 mb-8">
        <p className="text-[#ff7171] text-sm font-medium tracking-wide uppercase">
          — Configure seu Bot —
        </p>
        <h1 className="text-4xl md:text-5xl font-medium text-[#2d2d5f]">
          Cadastre seu bot
        </h1>
      </div>

      <p className="text-gray-500 mb-8">
        Campos obrigatorios marcados em{" "}
        <span className="text-[#ff7171]">*</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <input
              type="password"
              placeholder="Bot Token*"
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7171] focus:border-transparent"
              value={formData.botToken}
              onChange={(e) =>
                setFormData({ ...formData, botToken: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Bot Group ID*"
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7171] focus:border-transparent"
              value={formData.botGroupId}
              onChange={(e) =>
                setFormData({ ...formData, botGroupId: e.target.value })}
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-[#ff7171] hover:bg-[#ff5959] text-white px-8 py-2 rounded-md transition-colors"
        >
          Salvar →
        </Button>
      </form>
      <BotTable bots={bots} />
    </div>
  );
}
