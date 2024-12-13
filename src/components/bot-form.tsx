"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import BotTable from "./bot-table";
interface Bot {
  id: string;
  botToken: string;
  botGroupId: string;
  paymentIntegration: boolean;
}
export default function BotConfigForm() {
  const [formData, setFormData] = useState<Bot>({
    id: "",
    botToken: "",
    botGroupId: "",
    paymentIntegration: false,
  });

  const [bots, setBots] = useState<Bot[]>([]);
  const [editing, setEditing] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(bots);
    e.preventDefault();
    if (editing) {
      setBots(
        bots.map((bot) =>
          bot.id === editing ? { ...formData, id: editing } : bot
        ),
      );
      setEditing(null);
    } else {
      setBots([...bots, { ...formData, id: Date.now().toString() }]);
    }
    setFormData({
      id: "",
      botToken: "",
      botGroupId: "",
      paymentIntegration: false,
    });
  };

  const handleEdit = (bot: Bot) => {
    setFormData(bot);
    setEditing(bot.id);
  };

  const handleDelete = (id: string) => {
    setBots(bots.filter((bot) => bot.id !== id));
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
              placeholder="Enter Bot Group ID*"
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
          {editing ? "Editar" : "Salvar"} →
        </Button>
      </form>
      <BotTable bots={bots} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}
