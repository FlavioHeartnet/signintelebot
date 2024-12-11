"use client"
import React, { useState } from 'react';
import { MessageCircle, Menu, Search, ShoppingCart, ChevronDown, Play, Download, Layout, MessageSquare, Bot, Check, ChevronRight, X } from 'lucide-react';
import Footer from '@/components/footer';
export type Features = {
  text: string;
  included: boolean;
}

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('vision');
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-8 h-8 text-indigo-700" />
          <span className="text-xl font-bold text-indigo-700">Talkie</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavItem text="Home" active />
          <NavItem text="Pages" active={false} />
          <NavItem text="Service" active={false} />
          <NavItem text="Portfolio" active={false} />
          <NavItem text="Blog" active={false} />
          <NavItem text="Shop" active={false} />
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
          <Search className="w-6 h-6 text-gray-600" />
          <button className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500">
            LOGIN
          </button>
          <Menu className="md:hidden w-6 h-6 text-gray-600" />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-6xl font-bold text-indigo-900 mb-6">
              Boost Your Business
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Chatbot Is The Solution Master, Resolves Your Problem Faster.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-indigo-700 text-white px-8 py-3 rounded-lg hover:bg-indigo-800">
                READ MORE
              </button>
              <button className="bg-red-400 w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-500">
                <Play className="w-6 h-6 text-white" />
              </button>
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
                  isBot={true} isUser={false}                />
                <ChatMessage 
                  text="How Are You?"
                  isUser={true} isBot={false}                />
                <ChatMessage 
                  text="Very Well"
                  isBot={true} isUser={false}                />
              </div>
              {/* Decorative circles */}
              <div className="absolute -z-10 top-20 -left-20 w-40 h-40 bg-red-100 rounded-full opacity-50" />
              <div className="absolute -z-10 bottom-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </div>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-indigo-900 mb-4">
              Engage In Conversations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our chatbot uses advanced natural language processing to understand and respond to your customers' needs effectively and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessStep
              number="01"
              icon={<Download className="w-8 h-8" />}
              title="Input Processing"
              description="The chatbot receives user's message or query and uses NLP to understand the intent."
            />
            <ProcessStep
              number="02"
              icon={<Layout className="w-8 h-8" />}
              title="Holistic Perception"
              description="Advanced algorithms analyze the context and sentiment of the message for better understanding."
            />
            <ProcessStep
              number="03"
              icon={<MessageSquare className="w-8 h-8" />}
              title="Generate Response"
              description="The system processes the input and generates relevant, contextual responses."
            />
            <ProcessStep
              number="04"
              icon={<Bot className="w-8 h-8" />}
              title="Output Delivery"
              description="The final response is delivered to the user in a natural, conversational manner."
            />
          </div>

          {/* Connection Lines */}
          <div className="hidden md:block relative">
            <div className="absolute top-[-150px] left-[25%] w-[50%] border-t-2 border-dashed border-gray-200" />
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="text-red-400 font-medium mb-4">About Us</div>
              <h2 className="text-4xl font-bold text-indigo-900 mb-6">
                Get To Know Our Chatbot Assistant - Talkie
              </h2>
              <p className="text-gray-600 mb-8">
                We are a pioneering company specializing in Telegram chatbot solutions with seamless payment integration. Our mission is to transform how businesses interact with their customers through intelligent automation.
              </p>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex mb-8">
                  <div className="space-y-4">
                    <button
                      onClick={() => setActiveTab('vision')}
                      className={`text-left px-4 py-2 ${
                        activeTab === 'vision' ? 'text-red-400' : 'text-gray-600'
                      }`}
                    >
                      Our Vision
                    </button>
                    <button
                      onClick={() => setActiveTab('mission')}
                      className={`text-left px-4 py-2 ${
                        activeTab === 'mission' ? 'text-red-400' : 'text-gray-600'
                      }`}
                    >
                      Our Mission
                    </button>
                  </div>
                  <div className="flex-1 pl-8">
                    <h3 className="text-xl font-bold text-indigo-900 mb-6">
                      {activeTab === 'vision' ? 'Our Vision' : 'Our Mission'}
                    </h3>
                    <div className="space-y-4">
                      <Feature
                        text="AI-Based Chatbot Assistant with Integrated Payments"
                      />
                      <Feature
                        text="Learning And Improving Our Responses"
                      />
                      <Feature
                        text="Language Model Developed By Open AI"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="bg-red-400 text-white p-4">
                    Talkie
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img 
                        src="/api/placeholder/40/40"
                        alt="User Avatar"
                        className="rounded-full"
                      />
                      <span className="text-gray-600">John Doe</span>
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
      <Footer/>
    </div>
  );
};



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

const Feature = ({ text }: {text:string}) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0">
      <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center">
        <Check className="w-4 h-4 text-red-400" />
      </div>
    </div>
    <span className="text-gray-600">{text}</span>
  </div>
);

const ChatPreviewMessage = ({ bot, user }: {bot:boolean, user: boolean}) => (
  <div className="flex items-center gap-2">
    <div className="w-24 h-2 rounded-full bg-gray-200" />
    <div className="w-12 h-2 rounded-full bg-red-200" />
    {user && <div className="text-xs bg-indigo-100 px-2 py-1 rounded">M</div>}
  </div>
);


const ProcessStep = ({ number, icon, title, description }: {number: string, icon: any,title: string, description: string }) => (
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

const NavItem = ({ text, active }: {text:string, active: boolean }) => (
  <div className="relative group">
    <div className="flex items-center space-x-1 cursor-pointer">
      <span className={`${active ? 'text-red-400' : 'text-gray-600'} hover:text-red-400`}>
        {text}
      </span>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </div>
  </div>
);

const ChatMessage = ({ text, isBot, isUser }: {text: string, isBot:boolean, isUser:boolean}) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
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
      <div className={`py-2 px-4 rounded-2xl ${
        isBot ? 'bg-gray-100' : isUser ? 'bg-red-400 text-white' : ''
      }`}>
        {text}
      </div>
    </div>
  </div>
);

export default LandingPage;
