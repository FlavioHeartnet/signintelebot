import { Check, X, ChevronRight } from "lucide-react";
import { Features } from "./about";

export const Pricing = () => (
    <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-red-400 font-medium mb-4">Pricing</div>
            <h2 className="text-4xl font-bold text-indigo-900">
              Choose Pricing Plan
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              title="Starter"
              price="19"
              features={[
                { text: "5 chatbot", included: true },
                { text: "1000 Monthly message", included: false },
                { text: "250 subscribers", included: false },
                { text: "Provide Watermark", included: false },
              ]} highlighted={false}            />

            <PricingCard
              title="Professional"
              price="49"
              features={[
                { text: "50 chatbot", included: true },
                { text: "2000 Monthly message", included: true },
                { text: "550 subscribers", included: true },
                { text: "Provide Watermark", included: false },
              ]}
              highlighted={true}
            />

            <PricingCard
              title="Enterprise"
              price="99"
              features={[
                { text: "150 chatbot", included: true },
                { text: "5000 Monthly message", included: true },
                { text: "1000 subscribers", included: true },
                { text: "Provide Watermark", included: true },
              ]} highlighted={false}            />
          </div>
        </div>
      </section>
);

const PricingCard = ({ title, price, features, highlighted = false }: {title: string, price: string, features: Features[], highlighted: boolean }) => (
    <div 
      className={`rounded-2xl p-8 ${
        highlighted 
          ? 'bg-indigo-700 text-white' 
          : 'bg-white'
      }`}
    >
      <h3 className="text-2xl font-bold mb-8">{title}</h3>
      
      <div className="mb-8">
        <span className="text-5xl font-bold">{price}$</span>
        <span className={`text-sm ${highlighted ? 'text-red-300' : 'text-red-400'}`}>/ Per Month</span>
      </div>
  
      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            {feature.included ? (
              <Check className={`w-5 h-5 ${highlighted ? 'text-red-300' : 'text-red-400'}`} />
            ) : (
              <X className={`w-5 h-5 ${highlighted ? 'text-red-300' : 'text-red-400'}`} />
            )}
            <span className={highlighted ? 'text-white' : 'text-gray-600'}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>
  
      <button 
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium ${
          highlighted 
            ? 'bg-white text-indigo-700 hover:bg-gray-100' 
            : 'bg-indigo-700 text-white hover:bg-indigo-800'
        }`}
      >
        GET STARTED
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );