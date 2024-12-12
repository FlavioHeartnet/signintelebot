import { Menu, MessageCircle } from "lucide-react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
export const NavBar = (
  {
    isAuthenticated,
    isHomePage = false,
    isBotPage = false,
    isSettingsPage = false,
  }: {
    isAuthenticated: boolean;
    isHomePage?: boolean;
    isBotPage?: boolean;
    isSettingsPage?: boolean;
  },
) => (
  <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <MessageCircle className="w-8 h-8 text-indigo-700" />
      <span className="text-xl font-bold text-indigo-700">NobleBot</span>
    </div>
    {!isAuthenticated
      ? (
        <div className="hidden md:flex items-center space-x-8">
          <NavItem href="#home" text="Home" active />
          <NavItem href="#service" text="Nosso Serviço" />
          <NavItem href="#about" text="Sobre nós" />
          <NavItem href="#pricing" text="Preços" />
        </div>
      )
      : (
        <div className="hidden md:flex items-center space-x-8">
          <NavItem href="/home" text="Home" active={isHomePage} />
          <NavItem href="/bots" text="Bots" active={isBotPage} />
          <NavItem
            href="/settings"
            text="Configurações"
            active={isSettingsPage}
          />
        </div>
      )}

    <div className="flex items-center space-x-4">
      {!isAuthenticated
        ? (
          <LoginLink className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500">
            LOGIN
          </LoginLink>
        )
        : (
          <LogoutLink className="bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500">
            LOGOUT
          </LogoutLink>
        )}

      <Menu className="md:hidden w-6 h-6 text-gray-600" />
    </div>
  </nav>
);

const NavItem = (
  { text, active = false, href = "" }: {
    text: string;
    active?: boolean;
    href?: string;
  },
) => (
  <div className="relative group">
    <div className="flex items-center space-x-1 cursor-pointer">
      <Link
        href={href}
        className={`${
          active ? "text-red-400" : "text-gray-600"
        } hover:text-red-400`}
      >
        {text}
      </Link>
    </div>
  </div>
);
