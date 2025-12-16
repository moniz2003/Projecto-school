import React from 'react';
import { ChevronRight } from 'lucide-react';

// ==========================================================
// 1. IMPORTAÇÃO DA IMAGEM LOCAL
// ==========================================================
import heroImageLocal from './heroimage.jpg'; // AJUSTE O NOME DO FICHEIRO SE NECESSÁRIO

const Hero: React.FC = () => {
    return (
        <section id="home" className="relative bg-gray-900 overflow-hidden">
            
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover"
                    // ==================================================
                    //  ALTERADO PARA A IMAGEM LOCAL
                    // ==================================================
                    src={heroImageLocal} 
                    alt="Crianças a brincar"
                />
                <div className="absolute inset-0 bg-brand-900/70 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col items-center text-center z-10"> {/* Adicionado z-10 para garantir que o conteúdo fique acima da imagem */}
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
                    <span className="block">Um Lar para Quem</span>
                    <span className="block text-brand-100">Mais Precisa</span>
                </h1>
                <p className="mt-4 max-w-2xl text-xl text-gray-200 mb-10">
                    Acolhemos, cuidamos e transformamos vidas. Junte-se a nós na missão de dar esperança e um futuro melhor a quem necessita.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <a
                        href="#doacao"
                        className="px-8 py-4 border border-transparent text-lg font-bold rounded-full text-brand-700 bg-white hover:bg-gray-50 md:py-4 md:text-xl md:px-10 transition-all transform hover:scale-105 shadow-xl"
                    >
                        FAZER UMA DOAÇÃO
                    </a>
                    <a
                        href="#visita"
                        className="px-8 py-4 border-2 border-white text-lg font-bold rounded-full text-white hover:bg-white hover:text-brand-900 md:py-4 md:text-xl md:px-10 flex items-center justify-center gap-2 transition-all"
                    >
                        Seja Voluntário <ChevronRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;