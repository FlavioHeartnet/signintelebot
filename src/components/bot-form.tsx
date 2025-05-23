"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import BotTable from "./bot-table";
import insertbot, {
  deleteBot,
  getBots,
  updateBot,
} from "@/app/bots/botsActions";
import toast, { Toaster } from "react-hot-toast";
interface Bot {
  id: number;
  botToken: string;
  botGroupId: string;
  botGroupName: string;
  botGroupDescription: string;
  botAddress: string;
  paymentIntegration: boolean;
  botName?: string;
}
export default function BotConfigForm({ userId }: { userId: number }) {
  const [formData, setFormData] = useState<Bot>({
    id: 0,
    botToken: "",
    botGroupId: "",
    botGroupName: "The Officials",
    botGroupDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    botAddress: "the_official_channel",
    paymentIntegration: false,
  });

  const [bots, setBots] = useState<Bot[]>([]);
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    const spbots = getBots(userId);
    spbots.then((allbots) => {
      const allbotsmapped = allbots.map((bot) => {
        return {
          id: bot.id,
          botToken: bot.bot_token,
          paymentIntegration: bot.payment_token ? true : false,
          botName: bot.bot_name,
        } as Bot;
      });
      setBots(
        [...allbotsmapped],
      );
    });
  }, [userId]);
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(bots);
    e.preventDefault();

    if (editing) {
      await updateBot(editing, formData.botToken, formData.botGroupId, userId);
      setBots(
        bots.map((bot) =>
          bot.id === editing ? { ...formData, id: editing } : bot
        ),
      );
      setEditing(null);
    } else {
      try {
        const insertId = await insertbot(
          formData.botToken,
          formData.botGroupId,
          formData.botGroupName,
          formData.botAddress,
          formData.botGroupDescription,
          userId,
        );
        setBots([...bots, { ...formData, id: insertId }]);
      } catch (e) {
        toast.error("Falha ao cadastrar, tente novamente mais tarde!");
        console.log(e);
      }
    }
    setFormData({
      id: 0,
      botToken: "",
      botGroupId: "",
      botGroupName: "",
      botGroupDescription: "",
      botAddress: "",
      paymentIntegration: false,
    });
  };
  //TODO This is not working because a channel(product) and a bot are been created at the same time, this need to be separated
  const handleEdit = (bot: Bot) => {
    setFormData(bot);
    setEditing(bot.id);
  };

  const handleDelete = async (id: number) => {
    const resp = await deleteBot(id);
    if (resp) {
      setBots(bots.filter((bot) => bot.id !== id));
    } else {
      toast.error("Falha ao deletar, tente novamente mais tarde!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Toaster />
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
              placeholder="Entre com o nome do Canal*"
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7171] focus:border-transparent"
              value={formData.botGroupName}
              onChange={(e) =>
                setFormData({ ...formData, botGroupName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Entre com a descrição do Canal*"
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7171] focus:border-transparent"
              value={formData.botGroupDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  botGroupDescription: e.target.value,
                })}
              required
            />
          </div>
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Nome único do Canal ex. meu_primeiro_bot*"
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7171] focus:border-transparent"
              value={formData.botAddress}
              onChange={(e) =>
                setFormData({ ...formData, botAddress: e.target.value })}
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
      <BotTable
        bots={bots.map(({ id, botToken, botName, paymentIntegration }) => ({
          id,
          botToken,
          botName,
          paymentIntegration,
        }))}
        onDelete={handleDelete}
        onEdit={(bot) => {
          const fullBot = bots.find((b) => b.id === bot.id);
          if (fullBot) handleEdit(fullBot);
        }}
      />
    </div>
  );
}
