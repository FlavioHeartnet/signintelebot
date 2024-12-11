import { Bot, Download, Layout, MessageSquare } from "lucide-react";

export const ProductInfo = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-indigo-900 mb-4">
          Como funciona?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Crie um novo Bot no Telegram, integre conosco, autorize as vendas no
          gateway de pagamento, personalize seu bot e pronto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <ProcessStep
          number="01"
          icon={<Download className="w-8 h-8" />}
          title="Crie um bot no telegram"
          description="Você pode criar um novo bot atravéz do @botFather: https://core.telegram.org/"
        />
        <ProcessStep
          number="02"
          icon={<Layout className="w-8 h-8" />}
          title="Crie uma conta no gateway de pagamento."
          description="atualmente usamos mercadoPago, logo teremos mais opções."
        />
        <ProcessStep
          number="03"
          icon={<MessageSquare className="w-8 h-8" />}
          title="Crie seu NobleBot"
          description="Crie seu novo Bot, fornecendo as informações pedidas."
        />
        <ProcessStep
          number="04"
          icon={<Bot className="w-8 h-8" />}
          title="Customize as mensagens e tipo de serviço oferecido"
          description="Ao customizar seu bot estará pronto para atender seus clientes de maneira automatica e nós cobramos apenas por transação  ;)."
        />
      </div>

      {/* Connection Lines */}
      <div className="hidden md:block relative">
        <div className="absolute top-[-150px] left-[25%] w-[50%] border-t-2 border-dashed border-gray-200" />
      </div>
    </div>
  </section>
);

const ProcessStep = (
  { number, icon, title, description }: {
    number: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    title: string;
    description: string;
  },
) => (
  <div className="relative">
    <div className="bg-white rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center relative">
      <div className="absolute top-0 right-0 bg-indigo-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
        {number}
      </div>
      <div className="text-indigo-700">
        {icon}
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-xl font-bold text-indigo-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);
