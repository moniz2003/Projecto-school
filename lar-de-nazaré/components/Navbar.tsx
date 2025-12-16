import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import { NavItem } from '../types';

// O caminho CORRIGIDO deve ser './logo.jpg' se estiver na mesma pasta
import logoImage from './logo.jpg'; 

const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'Quem Somos', href: '#quem-somos' },
    { label: 'Actividades', href: '#actividades' },
    // 🛑 REMOVIDO: Transparência
    // { label: 'Transparência', href: '#transparencia' }, 
    { label: 'Agendar Visita', href: '#visita' },
    { label: 'Contactos', href: '#contactos' },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <a href="#home" className="flex-shrink-0 flex items-center gap-2">
                            
                            {/* ================================================== */}
                            {/* 🎯 LOGO */}
                            {/* ================================================== */}
                            <div className="p-2 rounded-full flex items-center justify-center"> 
                                <img 
                                    src={logoImage} 
                                    alt="Logo Lar de Nazaré"
                                    className="w-6 h-6 object-contain" // Tamanho seguro (24px)
                                />
                            </div>
                            {/* ================================================== */}

                            <span className="font-bold text-2xl text-brand-900 tracking-tight">LAR DE NAZARÉ</span>
                        </a>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* O loop map aqui garante que apenas os itens restantes serão exibidos */}
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`text-gray-600 hover:text-brand-600 font-semibold transition-colors 
                                            ${item.label === 'Fazer Doação' ? 'bg-brand-600 text-white px-4 py-2 rounded-full hover:bg-brand-700' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        {/* CTA de Doação em destaque no Desktop */}
                        <a
                            href="#doacao"
                            className="bg-warm-500 text-brand-900 px-4 py-2 rounded-full font-bold shadow-md hover:bg-warm-500/90 transition-colors"
                        >
                            FAZER DOAÇÃO
                        </a>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Abrir menu principal</span>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {/* O loop map aqui garante que apenas os itens restantes serão exibidos */}
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50"
                            onClick={toggleMenu}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#doacao"
                        className="block px-3 py-2 rounded-md text-base font-bold bg-warm-500 text-brand-900 text-center mt-2"
                        onClick={toggleMenu}
                    >
                        FAZER DOAÇÃO
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;