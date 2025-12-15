import React from 'react';
import { Target, Eye, HeartHandshake, History } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="quem-somos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Quem Somos</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Mais do que um centro de acolhimento, somos uma família dedicada a restaurar a dignidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Missão */}
          <div className="bg-brand-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-brand-100">
            <div className="inline-flex items-center justify-center p-3 bg-brand-600 rounded-full text-white mb-6 shadow-lg">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">A Nossa Missão</h3>
            <p className="text-gray-600">
              Proporcionar abrigo, alimentação e apoio psicossocial a indivíduos em situação de vulnerabilidade, promovendo a sua reintegração na sociedade.
            </p>
          </div>

          {/* Visão */}
          <div className="bg-warm-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-warm-100">
            <div className="inline-flex items-center justify-center p-3 bg-warm-500 rounded-full text-white mb-6 shadow-lg">
              <Eye size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">A Nossa Visão</h3>
            <p className="text-gray-600">
              Ser uma referência nacional em acolhimento humanizado, onde cada pessoa encontra a oportunidade de reescrever a sua história com esperança.
            </p>
          </div>

          {/* Valores */}
          <div className="bg-brand-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-brand-100">
            <div className="inline-flex items-center justify-center p-3 bg-brand-600 rounded-full text-white mb-6 shadow-lg">
              <HeartHandshake size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Os Nossos Valores</h3>
            <p className="text-gray-600">
              Solidariedade, Respeito, Transparência, Empatia e Compromisso com a Vida. Acreditamos que ninguém deve caminhar sozinho.
            </p>
          </div>
        </div>

        {/* História */}
        <div className="mt-20 bg-gray-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <img 
                    src="logo.jpg" 
                    alt="Fundação do Lar" 
                    className="rounded-xl shadow-xl w-full h-auto object-cover"
                />
            </div>
            <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-4 text-brand-600">
                    <History size={24} />
                    <span className="font-bold tracking-wide uppercase">Nossa História</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mais de 20 anos de dedicação</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    Fundado em 2003 por um grupo de voluntários dedicados, o Lar de Nazaré começou como uma pequena cantina social. Com o apoio incansável da comunidade, crescemos para nos tornarmos um centro de acolhimento integral.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Hoje, as nossas instalações permitem abrigar dezenas de pessoas e fornecer centenas de refeições diárias, mantendo sempre vivo o espírito de serviço ao próximo que nos viu nascer.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;