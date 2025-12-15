import React from 'react';
import { Facebook, Instagram, Phone, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Heart className="text-brand-500" fill="currentColor" />
              <span className="font-bold text-xl">LAR DE NAZARÉ</span>
            </div>
            <p className="text-sm text-gray-400">
              Restaurando a dignidade e criando oportunidades para um futuro melhor desde xxx.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-brand-500 transition-colors">Home</a></li>
              <li><a href="#quem-somos" className="hover:text-brand-500 transition-colors">Quem Somos</a></li>
              <li><a href="#actividades" className="hover:text-brand-500 transition-colors">Actividades</a></li>
              <li><a href="#doacao" className="hover:text-brand-500 transition-colors">Fazer Doação</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contactos</h4>
            <ul className="space-y-2 text-sm">
              <li> xxxxxx </li>
              <li> xxxxxx </li>
              <li> xxxxx</li>
              <li> xxxxx </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <p className="text-xs mb-3 text-gray-400">Receba novidades e relatórios mensais.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu email" 
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-brand-500"
              />
              <button className="bg-brand-600 text-white px-3 py-2 rounded hover:bg-brand-700 text-sm font-bold">OK</button>
            </form>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-brand-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-brand-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-brand-500 transition-colors"><Phone size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Centro de Acolhimento Lar de Nazaré. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;