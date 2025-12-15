import React from 'react';
import { DollarSign, Gift, FileText, ArrowRight } from 'lucide-react';

const Donate: React.FC = () => {
  return (
    <section id="doacao" className="py-20 bg-brand-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Faça a Diferença Hoje</h2>
          <p className="mt-4 max-w-2xl text-xl text-brand-100 mx-auto">
            A sua ajuda, por menor que pareça, é gigantesca para quem precisa. Escolha como quer contribuir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Monetária */}
          <div className="bg-brand-700 rounded-2xl p-8 border border-brand-500 hover:bg-brand-800 transition-colors flex flex-col items-center text-center">
            <div className="p-4 bg-brand-500 rounded-full mb-6">
              <DollarSign size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Doação Monetária</h3>
            <p className="text-brand-100 mb-6 flex-grow">
              Contribua com qualquer valor via Transferência Bancária ou MBWAY.
            </p>
            <div className="bg-white/10 p-4 rounded-lg w-full mb-4">
              <p className="text-sm font-mono">IBAN: PT50 0000 0000 0000 0000</p>
              <p className="text-sm font-mono mt-1">MBWAY: 910 000 000</p>
            </div>
            <button className="w-full bg-white text-brand-700 font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Doar Online
            </button>
          </div>

          {/* Bens */}
          <div className="bg-brand-700 rounded-2xl p-8 border border-brand-500 hover:bg-brand-800 transition-colors flex flex-col items-center text-center">
            <div className="p-4 bg-brand-500 rounded-full mb-6">
              <Gift size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Doação de Bens</h3>
            <p className="text-brand-100 mb-6 flex-grow">
              Aceitamos roupas, alimentos não perecíveis, brinquedos e produtos de higiene.
            </p>
            <ul className="text-sm text-left w-full space-y-2 mb-6 text-brand-100 bg-brand-900/30 p-4 rounded-lg">
              <li>• Leite e Cereais</li>
              <li>• Enlatados (Atum, Salsichas)</li>
              <li>• Roupa de Criança (4-12 anos)</li>
            </ul>
            <a href="#contactos" className="w-full bg-transparent border-2 border-white text-white font-bold py-2 rounded-lg hover:bg-white/10 transition-colors block">
              Ver Ponto de Entrega
            </a>
          </div>

          {/* IRS */}
          <div className="bg-brand-700 rounded-2xl p-8 border border-brand-500 hover:bg-brand-800 transition-colors flex flex-col items-center text-center">
            <div className="p-4 bg-brand-500 rounded-full mb-6">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Consignação IRS</h3>
            <p className="text-brand-100 mb-6 flex-grow">
              Doe 0.5% do seu IRS sem qualquer custo para si. Ajude-nos sem gastar nada.
            </p>
            <div className="bg-warm-500 text-brand-900 font-bold text-2xl p-4 rounded-lg w-full mb-4 shadow-lg">
              NIF: 500 123 456
            </div>
            <p className="text-xs text-brand-200">
              Ao preencher a sua declaração, coloque o nosso NIF no Quadro 11.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;