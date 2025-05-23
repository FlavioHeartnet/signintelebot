import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import MercadoPagoAuthButton from "./mp-auth-button";
import DeleteBotButton from "./delete-bot-button";

export interface BotTable {
  id: number;
  botToken: string;
  paymentIntegration: boolean;
  botName?: string;
}

interface BotTableProps {
  bots: BotTable[];
  onEdit: (bot: BotTable) => void;
  onDelete: (id: number) => void;
}

export default function BotTable({ bots, onEdit, onDelete }: BotTableProps) {
  // TODO - Add a loading state
  // TODO - Add a error state
  // TODO - info is not loading
  return (
    <div className="mt-12 overflow-x-auto">
      <h2 className="text-2xl font-medium text-[#2d2d5f] mb-4">
        Bots configurados
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Bot Token</TableHead>
            <TableHead className="w-1/5">Bot Group Name</TableHead>
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
              <TableCell>{bot.botName}</TableCell>
              <TableCell>
                {!bot.paymentIntegration
                  ? <MercadoPagoAuthButton idbot={bot.id} />
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
                  <DeleteBotButton botId={bot.id} onDelete={onDelete} />
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
