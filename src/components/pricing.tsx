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
          title="Starter"
          isYear={false}
          price="Grátis"
          features={[
            { text: "até 2 chatbot", included: true },
            { text: "5% + R$1 por transação", included: true },
          ]}
          highlighted={false}
        />

        <PricingCard
          title="Professional"
          price="R$150"
          isYear
          features={[
            { text: "até 5 chatbot", included: true },
            { text: "3% + R$1 por transação", included: true },
          ]}
          highlighted={true}
        />

        <PricingCard
          title="Enterprise"
          price="80"
          isYear={false}
          features={[
            { text: "150 chatbot", included: true },
            { text: "5000 Monthly message", included: true },
            { text: "1000 subscribers", included: true },
            { text: "Provide Watermark", included: true },
          ]}
          highlighted={false}
        />
      </div>
    </div>
  </section>
);

const PricingCard = (
  { title, price, features, highlighted = false, isYear = false }: {
    title: string;
    price: string;
    features: Features[];
    highlighted: boolean;
    isYear: boolean;
  },
) => (
  <div
    className={`rounded-2xl p-8 ${
      highlighted ? "bg-indigo-700 text-white" : "bg-white"
    }`}
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

    <button
      className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium ${
        highlighted
          ? "bg-white text-indigo-700 hover:bg-gray-100"
          : "bg-indigo-700 text-white hover:bg-indigo-800"
      }`}
    >
      COMEÇAR AGORA
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);
