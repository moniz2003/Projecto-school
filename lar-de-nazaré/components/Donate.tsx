import React, { useState } from 'react';
import { DollarSign, Gift, MapPin, Phone, Copy } from 'lucide-react';

// Dados reais (ou simulados) da sua organização
const DONATE_INFO = {
    IBAN: 'AO 50 0000 0000 0000 0000 000',
    WHATSAPP: '930 000 000',
    ADDRESS: 'Rua da Nazaré, N.º 123, 4000-000 Vidrul',
    HOURS: 'Seg. a Sex. | 10:00h às 17:00h',
};

// ==========================================================
// Componente principal de Doação
// ==========================================================
const Donate: React.FC = () => {
    // NOVO ESTADO: Controlar qual painel está expandido
    const [expandedPanel, setExpandedPanel] = useState<'monetary' | 'goods' | null>(null);

    const togglePanel = (panel: 'monetary' | 'goods') => {
        setExpandedPanel(expandedPanel === panel ? null : panel);
    };

    // Função utilitária para copiar texto para a área de transferência
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`${label} copiado: ${text}`);
        }).catch(err => {
            console.error('Falha ao copiar:', err);
        });
    };

    return (
        <section id="doacao" className="py-20 bg-brand-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Cabeçalho */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold sm:text-4xl">Faça a Diferença Hoje</h2>
                    <p className="mt-4 max-w-2xl text-xl text-brand-100 mx-auto">
                        A sua ajuda, por menor que pareça, é gigantesca para quem precisa. Escolha como quer contribuir.
                    </p>
                </div>

                {/* Grid de Métodos de Doação */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* 1. Doação Monetária */}
                    <div className="bg-brand-700 rounded-2xl p-8 border border-brand-500 hover:bg-brand-800 transition-colors flex flex-col items-center text-center">
                        <div className="p-4 bg-brand-500 rounded-full mb-6">
                            <DollarSign size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Doação Monetária</h3>
                        <p className="text-brand-100 mb-6 flex-grow">
                            Contribua com qualquer valor via Transferência Bancária.
                        </p>
                        
                        {/* Secção Expandida para Detalhes Monetários */}
                        {expandedPanel === 'monetary' ? (
                            <div className="bg-white p-6 rounded-lg w-full text-brand-900 transition-all duration-300">
                                <h4 className="font-bold text-lg mb-3 border-b pb-2">Dados para Transferência</h4>
                                
                                {/* IBAN */}
                                <div className="flex justify-between items-center text-left mb-3">
                                    <div>
                                        <span className="text-sm font-semibold block">IBAN:</span>
                                        <span className="font-mono text-base">{DONATE_INFO.IBAN}</span>
                                    </div>
                                    <button 
                                        onClick={() => copyToClipboard(DONATE_INFO.IBAN, 'IBAN')}
                                        className="text-brand-600 hover:text-brand-800 flex items-center gap-1 text-sm p-1 rounded transition-colors"
                                    >
                                        <Copy size={14} /> Copiar
                                    </button>
                                </div>

                                <div className="border-t pt-3 flex items-center justify-center text-center">
                                    <Phone size={18} className="mr-2 text-green-600" />
                                    <span className="font-semibold text-sm">
                                        Enviar comprovativo para WhatsApp: {DONATE_INFO.WHATSAPP}
                                    </span>
                                </div>

                            </div>
                        ) : (
                            <div className="bg-white/10 p-4 rounded-lg w-full mb-4">
                                <p className="text-sm font-mono">Clique abaixo para ver dados.</p>
                            </div>
                        )}
                        
                        {/* Botão para Expandir/Colapsar */}
                        <button 
                            onClick={() => togglePanel('monetary')}
                            className="w-full bg-white text-brand-700 font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors mt-4"
                        >
                            {expandedPanel === 'monetary' ? 'OCULTAR DETALHES' : 'DOAR ONLINE (VER DADOS)'}
                        </button>
                    </div>

                    {/* 2. Doação de Bens */}
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
                            <li>• Roupa de Criança (4-17 anos)</li>
                        </ul>

                        {/* Secção Expandida para Ponto de Entrega */}
                        {expandedPanel === 'goods' && (
                            <div className="bg-white p-6 rounded-lg w-full text-brand-900 mt-4 transition-all duration-300">
                                <h4 className="font-bold text-lg mb-3 border-b pb-2 flex items-center"><MapPin size={20} className="mr-2" /> Ponto de Entrega</h4>
                                
                                <p className="text-sm font-semibold">{DONATE_INFO.ADDRESS}</p>
                                <p className="text-sm mt-2 text-brand-600 font-bold">{DONATE_INFO.HOURS}</p>
                            </div>
                        )}
                        
                        {/* Botão para Expandir/Colapsar */}
                        <button 
                            onClick={() => togglePanel('goods')}
                            className="w-full bg-transparent border-2 border-white text-white font-bold py-2 rounded-lg hover:bg-white/10 transition-colors block mt-4"
                        >
                            {expandedPanel === 'goods' ? 'OCULTAR INFORMAÇÕES' : 'VER PONTO DE ENTREGA'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Donate;