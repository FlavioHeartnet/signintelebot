"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
interface BotModalProps {
  botId: number;
  onDelete: (id: number) => void;
}
export default function DeleteBotButton({ botId, onDelete }: BotModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Implement your delete logic here
    onDelete(botId);
    console.log("Bot deleted!");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Deletar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja deletar?</DialogTitle>
          <DialogDescription>
            Essa ação irá deletar todos os produtos, pagamentos e dados
            referente a este bot.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
