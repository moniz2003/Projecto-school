import React from 'react';
import { Shield, Target, Home } from 'lucide-react';

// Certifique-se de que o caminho './nossahistoria.jpg' está correto
// se a imagem estiver na mesma pasta que o About.tsx.
import NossaHistoria from './nossahistoria.jpg'; 

const About: React.FC = () => {
    return (
        <section id="quem-somos" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Título Principal */}
                <div className="text-center mb-16">
                    <span className="text-brand-600 font-semibold tracking-wider uppercase text-sm">O Lar Nazaré</span>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Nossa História e Propósito
                    </h2>
                </div>

                {/* Secção História */}
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    
                    {/* Imagem */}
                    <div className="mb-10 lg:mb-0 lg:order-2">
                        <div className="aspect-w-16 aspect-h-9 sm:aspect-h-10 lg:aspect-none">
                            <img
                                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                                src={NossaHistoria} // Usando a variável importada
                                alt="Foto da Fachada do Lar Nazaré"
                            />
                        </div>
                    </div>

                    {/* Texto da História */}
                    <div className="lg:order-1">
                        <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
                            Desde 1995: Um Legado de Cuidado
                        </h3>
                        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                            O Lar Nazaré nasceu em 1995 como uma resposta de fé e comunidade à crescente necessidade de apoio 
                            a idosos e crianças desfavorecidas na região. Inicialmente, era um pequeno centro de acolhimento 
                            improvisado, mas com a ajuda de voluntários dedicados e parceiros locais, cresceu e tornou-se a 
                            casa segura e amorosa que é hoje.
                        </p>
                        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                            O nosso trabalho é guiado pela convicção de que cada vida tem valor e merece ser vivida com dignidade. 
                            Continuamos a construir o nosso legado, garantindo que as futuras gerações de utentes encontrem 
                            sempre um porto seguro aqui, no Lar Nazaré.
                        </p>
                    </div>
                </div>

                {/* Secção Missão, Visão e Valores */}
                <div className="mt-20">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                        
                        {/* 1. Missão */}
                        <div className="relative p-6 bg-brand-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <dt>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-brand-600 text-white shadow-md">
                                    <Target size={24} />
                                </div>
                                <p className="ml-0 mt-2 text-lg leading-6 font-bold text-gray-900 text-center pt-2">Nossa Missão</p>
                            </dt>
                            <dd className="mt-2 text-base text-gray-600 text-center">
                                Proporcionar um lar seguro e acolhedor, promovendo o bem-estar físico, emocional e social 
                                de idosos e crianças, através do amor, respeito e cuidado individualizado.
                            </dd>
                        </div>

                        {/* 2. Visão */}
                        <div className="relative p-6 bg-brand-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <dt>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-brand-600 text-white shadow-md">
                                    <Home size={24} />
                                </div>
                                <p className="ml-0 mt-2 text-lg leading-6 font-bold text-gray-900 text-center pt-2">Nossa Visão</p>
                            </dt>
                            <dd className="mt-2 text-base text-gray-600 text-center">
                                Ser reconhecido como um centro de excelência em cuidados, inspirando outras instituições 
                                a adotar um modelo de intervenção humanizado e focado na dignidade da pessoa.
                            </dd>
                        </div>
                        
                        {/* 3. Valores */}
                        <div className="relative p-6 bg-brand-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <dt>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-brand-600 text-white shadow-md">
                                    <Shield size={24} />
                                </div>
                                <p className="ml-0 mt-2 text-lg leading-6 font-bold text-gray-900 text-center pt-2">Nossos Valores</p>
                            </dt>
                            <dd className="mt-2 text-base text-gray-600 text-center">
                                Amor, Respeito, Dignidade, Transparência, Integridade e Dedicação ao próximo. São os pilares que sustentam o nosso dia-a-dia.
                            </dd>
                        </div>

                    </dl>
                </div>
            </div>
        </section>
    );
};

export default About;