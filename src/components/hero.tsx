import { MessageCircle } from "lucide-react";

export const Hero = () => (
  <div className="container mx-auto px-4 py-20 min-h-screen">
    <div className="flex flex-col lg:flex-row items-center gap-12">
      <div className="lg:w-1/2">
        <h1 className="text-6xl font-bold text-indigo-900 mb-6">
          De um Boost no seu negócio
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          NobleBot automatiza a venda dos seus serviços no Telegram.
        </p>
        <div className="flex items-center gap-4">
          <button className="bg-indigo-700 text-white px-8 py-3 rounded-lg hover:bg-indigo-800">
            Saiba mais
          </button>
          {
            /* <button className="bg-red-400 w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-500">
                <Play className="w-6 h-6 text-white" />
              </button> */
          }
        </div>
      </div>

      <div className="lg:w-1/2">
        <div className="relative">
          {/* Chat Interface */}
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="bg-red-400 text-white p-4 rounded-t-2xl mb-6">
              Talkie
            </div>
            <ChatMessage
              text="How Can I help you?"
              isBot={true}
              isUser={false}
            />
            <ChatMessage
              text="How Are You?"
              isUser={true}
              isBot={false}
            />
            <ChatMessage
              text="Very Well"
              isBot={true}
              isUser={false}
            />
          </div>
          {/* Decorative circles */}
          <div className="absolute -z-10 top-20 -left-20 w-40 h-40 bg-red-100 rounded-full opacity-50" />
          <div className="absolute -z-10 bottom-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-50" />
        </div>
      </div>
    </div>
  </div>
);

const ChatMessage = (
  { text, isBot, isUser }: { text: string; isBot: boolean; isUser: boolean },
) => (
  <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
    <div className="flex items-center gap-2">
      {isBot && (
        <div className="w-8 h-8 bg-indigo-700 rounded-full flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
      )}
      {isUser && (
        <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">M</span>
        </div>
      )}
      <div
        className={`py-2 px-4 rounded-2xl ${
          isBot ? "bg-gray-100" : isUser ? "bg-red-400 text-white" : ""
        }`}
      >
        {text}
      </div>
    </div>
  </div>
);
