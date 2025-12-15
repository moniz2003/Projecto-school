import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartData } from '../types';
import { FileLock, TrendingUp, Handshake } from 'lucide-react';

const financialData: ChartData[] = [
  { name: 'Alimentação', value: 45000, color: '#0ea5e9' },
  { name: 'Apoio Escolar', value: 12000, color: '#0284c7' },
  { name: 'Saúde', value: 8000, color: '#f59e0b' },
  { name: 'Manutenção', value: 25000, color: '#0c4a6e' },
];

const Transparency: React.FC = () => {
  return (
    <section id="transparencia" className="py-20 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-semibold tracking-wider uppercase text-sm">A Nossa Responsabilidade</span>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Transparência Total</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Mostramos como cada euro doado é investido para maximizar o impacto nas vidas dos nossos acolhidos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Coluna 1: Indicadores e Promessa */}
            <div>
                <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-100">
                        <FileLock size={32} className="text-brand-600 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Prestação de Contas Aberta</h3>
                            <p className="text-gray-600 text-sm">Aceda aos nossos relatórios financeiros anuais completos e detalhados. A transparência é a nossa fundação.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-100">
                        <TrendingUp size={32} className="text-brand-600 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Impacto e Eficiência</h3>
                            <p className="text-gray-600 text-sm">85% dos fundos vão diretamente para programas de acolhimento e apoio, garantindo a máxima eficácia.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-100">
                        <Handshake size={32} className="text-brand-600 mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Auditoria Independente</h3>
                            <p className="text-gray-600 text-sm">Somos auditados anualmente por entidades externas para validar a correta utilização de todos os recursos.</p>
                        </div>
                    </div>
                </div>
                <a 
                    href="#" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-warm-500 hover:bg-warm-600 transition-colors font-bold text-brand-900"
                >
                    Descarregar Relatórios Anuais
                </a>
            </div>

            {/* Coluna 2: Gráfico de Despesas */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-brand-100 h-96">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Distribuição de Despesas (Último Trimestre)</h3>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={financialData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
                        <XAxis type="number" stroke="#ccc" />
                        <YAxis type="category" dataKey="name" stroke="#ccc" />
                        <Tooltip 
                            formatter={(value: number) => `€ ${value.toFixed(2).replace('.', ',')}`}
                            labelStyle={{ fontWeight: 'bold' }}
                        />
                        <Bar dataKey="value" barSize={30}>
                            {financialData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Transparency;