"use client";
import { Check } from "lucide-react";
import { useState } from "react";

export type Features = {
  text: string;
  included: boolean;
};
export const About = () => {
  const [activeTab, setActiveTab] = useState("vision");
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="text-red-400 font-medium mb-4">Sobre nós</div>
            <h2 className="text-4xl font-bold text-indigo-900 mb-6">
              Conheça seu mais novo parceiro de negócios - NobleBot
            </h2>
            <p className="text-gray-600 mb-8">
              Somos uma empresa pioneira especializada em soluções de chatbot
              para Telegram com integração perfeita de pagamentos. Nossa missão
              é transformar a maneira como as empresas interagem com seus
              clientes através da automação inteligente.
            </p>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex mb-8">
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("vision")}
                    className={`text-left px-4 py-2 ${
                      activeTab === "vision" ? "text-red-400" : "text-gray-600"
                    }`}
                  >
                    Nossa Visão
                  </button>
                  <button
                    onClick={() => setActiveTab("mission")}
                    className={`text-left px-4 py-2 ${
                      activeTab === "mission" ? "text-red-400" : "text-gray-600"
                    }`}
                  >
                    Nossa Missão
                  </button>
                </div>
                <div className="flex-1 pl-8">
                  <h3 className="text-xl font-bold text-indigo-900 mb-6">
                    {activeTab === "vision" ? "Nossa Visão" : "Nossa Missão"}
                  </h3>
                  <div className="space-y-4">
                    <Feature text="Automatizar processos de onboarding" />
                    <Feature text="Ajudar a aumentar as vendas dos nossos clientes" />
                    <Feature text="Ser referencia no mercado de chatBots" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-red-400 text-white p-4">
                  NobleBot
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">John Max</span>
                  </div>
                  <div className="space-y-4">
                    <ChatPreviewMessage bot user={false} />
                    <ChatPreviewMessage user bot={false} />
                    <ChatPreviewMessage bot user={false} />
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-20 -left-20 w-40 h-40 bg-red-100 rounded-full opacity-50" />
              <div className="absolute -z-10 bottom-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChatPreviewMessage = ({ bot, user }: { bot: boolean; user: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="w-24 h-2 rounded-full bg-gray-200" />
    <div className="w-12 h-2 rounded-full bg-red-200" />
    {user && <div className="text-xs bg-indigo-100 px-2 py-1 rounded">M</div>}
    {bot && <div className="text-xs bg-indigo-100 px-2 py-1 rounded">J</div>}
  </div>
);

const Feature = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0">
      <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center">
        <Check className="w-4 h-4 text-red-400" />
      </div>
    </div>
    <span className="text-gray-600">{text}</span>
  </div>
);
