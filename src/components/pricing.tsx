import { Check, ChevronRight, X } from "lucide-react";
import { Features } from "./about";

export const Pricing = () => (
  <section id="pricing" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="text-red-400 font-medium mb-4">Preços</div>
        <h2 className="text-4xl font-bold text-indigo-900">
          Como nosso bot é precificado
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingCard
          isActivePlan
          title="Starter"
          isYear={false}
          price="Grátis"
          features={[
            { text: "até 2 chatbot", included: true },
            { text: "5% + R$1 por transação", included: true },
            { text: "Suporte horário comercial, whatsapp e discord.", included: false },
            { text: "Fluxos customizados, com valores negociados à parte.", included: false }
          ]}
          highlighted={false}
        />

        <PricingCard
          isActivePlan={false}
          title="Professional"
          price="R$150"
          isYear
          features={[
            { text: "até 5 chatbot", included: true },
            { text: "4% + R$1 por transação", included: true },
            { text: "Suporte horário comercial, whatsapp e discord.", included: true },
            { text: "Fluxos customizados, com valores negociados à parte.", included: false }
          ]}
          highlighted={true}
        />

        <PricingCard
          isActivePlan={false}
          title="Enterprise"
          price="R$499,99"
          isYear
          features={[
            { text: "chatbots ilimitados.", included: true },
            { text: "3% + R$1 por transação.", included: true },
            { text: "Suporte exclusívo, whatsapp e discord.", included: true },
            { text: "Fluxos customizados, com valores negociados à parte.", included: true }
          ]}
          highlighted={false}
        />
      </div>
    </div>
  </section>
);

const PricingCard = (
  { title, price, features, highlighted = false, isYear = false, isActivePlan = false }: {
    title: string;
    price: string;
    features: Features[];
    highlighted: boolean;
    isYear: boolean;
    isActivePlan: boolean;
  },
) => (
  <div
    className={`rounded-2xl p-8 ${
      highlighted ? "bg-indigo-700 text-white" : "bg-white"
    } ${!isActivePlan ? "opacity-25": ""}`}
  >
    <h3 className="text-2xl font-bold mb-8">{title}</h3>

    <div className="mb-8">
      <span className="text-5xl font-bold">{price}</span>
      <span
        className={`text-sm ${highlighted ? "text-red-300" : "text-red-400"}`}
      >
        {isYear ? "/ano": ""}
      </span>
    </div>

    <div className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          {feature.included
            ? (
              <Check
                className={`w-5 h-5 ${
                  highlighted ? "text-red-300" : "text-red-400"
                }`}
              />
            )
            : (
              <X
                className={`w-5 h-5 ${
                  highlighted ? "text-red-300" : "text-red-400"
                }`}
              />
            )}
          <span className={highlighted ? "text-white" : "text-gray-600"}>
            {feature.text}
          </span>
        </div>
      ))}
    </div>

    <button disabled={!isActivePlan}
      className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium ${
        highlighted
          ? "bg-white text-indigo-700 hover:bg-gray-100"
          : "bg-indigo-700 text-white hover:bg-indigo-800"
      }`}
    >
      {isActivePlan ? "COMEÇAR AGORA" : "EM BREVE"}
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);
