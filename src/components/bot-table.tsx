import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import MercadoPagoAuthButton from "./mp-auth-button";

interface Bot {
  id: string;
  botToken: string;
  botGroupId: string;
  paymentIntegration: boolean;
}

interface BotTableProps {
  bots: Bot[];
  onEdit: (bot: Bot) => void;
  onDelete: (id: string) => void;
}

export default function BotTable({ bots, onEdit, onDelete }: BotTableProps) {
  return (
    <div className="mt-12 overflow-x-auto">
      <h2 className="text-2xl font-medium text-[#2d2d5f] mb-4">
        Configured Bots
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Bot Token</TableHead>
            <TableHead className="w-1/5">Bot Group ID</TableHead>
            <TableHead className="w-1/5">Integração de pagamento</TableHead>
            <TableHead className="w-2/5">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bots.map((bot) => (
            <TableRow key={bot.id}>
              <TableCell className="font-medium">
                {bot.botToken.slice(0, 4)}...{bot.botToken.slice(-4)}
              </TableCell>
              <TableCell>{bot.botGroupId}</TableCell>
              <TableCell>
                {!bot.paymentIntegration
                  ? <MercadoPagoAuthButton botid={bot.botToken} />
                  : <span className="text-green-500">Autorizado</span>}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => onEdit(bot)}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(bot.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {bots.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No bots configured yet.
        </p>
      )}
    </div>
  );
}
