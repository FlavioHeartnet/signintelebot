import { ArrowRight, Twitter, Linkedin, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => (
    <footer className="bg-[#0B0F1C] text-white py-20">
      <div className="container mx-auto px-4">
        {/* Top Section with Newsletter */}
        <div className="grid md:grid-cols-2 gap-20 pb-20 border-b border-gray-800">
          <div>
            <h2 className="text-5xl font-normal mb-8 leading-tight">
              Ficou com alguma dúvida, será um prazer, {' '}
              <span className="text-red-400 italic">atende-lo</span>
            </h2>
            <div className="flex gap-4">
              <div className="bg-indigo-700 w-16 h-16 rounded-lg flex items-center justify-center">
                <div className="w-8 h-2 bg-white rounded-full" />
              </div>
              <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center">
                <div className="w-8 h-2 bg-indigo-700 rounded-full" />
              </div>
            </div>
          </div>
        </div>
  
        {/* Bottom Section with Links and Contact */}
        <div className="grid md:grid-cols-4 gap-16 pt-20">
          {/* Logo and Description */}
          <div>
            <div className="mb-6">
              <svg viewBox="0 0 40 40" className="w-12 h-12 text-white">
                <path 
                  d="M5 20 Q 20 5, 35 20 T 5 20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                />
                <circle cx="20" cy="20" r="3" fill="currentColor" />
              </svg>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              NobleBot foi programado para ajudar pequenos e medias empresas a alancarem seus negócios.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-normal mb-6">Links</h3>
            <ul className="space-y-4">
              <FooterLink text="Home" />
              <FooterLink text="Produtos" />
              <FooterLink text="Sobre nós" />
              <FooterLink text="Preços" />
            </ul>
          </div>

  
          {/* Contact Us */}
          <div>
            <h3 className="text-2xl font-normal mb-6">Contatos</h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6" />
                <span>Call Us: +123 456 2356</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6" />
                <span>noblebot@gmail.com</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1" />
                <span>1234 North Avenue Luke Lane, South Bend, IN 360001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
  
  const FooterLink = ({ text }: {text:string}) => (
    <li>
      <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white group">
        <span className="text-red-400">›</span>
        {text}
      </a>
    </li>
  );

  export default Footer;