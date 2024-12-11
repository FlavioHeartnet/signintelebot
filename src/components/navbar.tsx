import { MessageCircle, ShoppingCart, Search, Menu, ChevronDown } from "lucide-react";

export const NavBar = () => (
    <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-8 h-8 text-indigo-700" />
          <span className="text-xl font-bold text-indigo-700">NobleBot</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavItem text="Home" active />
          <NavItem text="Nosso Serviço" active={false} />
          <NavItem text="Sobre nós" active={false} />
          <NavItem text="Preços" active={false} />
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500">
            LOGIN
          </button>
          <Menu className="md:hidden w-6 h-6 text-gray-600" />
        </div>
      </nav>
)

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