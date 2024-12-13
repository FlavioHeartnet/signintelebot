import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Bot {
  botToken: string;
  botGroupId: string;
  paymentIntegration: string;
}

interface BotTableProps {
  bots: Bot[];
}

export default function BotTable({ bots }: BotTableProps) {
  return (
    <div className="mt-12 overflow-x-auto">
      <h2 className="text-2xl font-medium text-[#2d2d5f] mb-4">
        Bots Cadastrados
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Bot Token</TableHead>
            <TableHead className="w-1/3">Bot Group ID</TableHead>
            <TableHead className="w-1/3">Integração de pagamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bots.map((bot, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {bot.botToken.slice(0, 4)}...{bot.botToken.slice(-4)}
              </TableCell>
              <TableCell>{bot.botGroupId}</TableCell>
              <TableCell>{bot.paymentIntegration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {bots.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          Nenhum bot registrado ainda.
        </p>
      )}
    </div>
  );
}
