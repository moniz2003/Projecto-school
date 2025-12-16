import React, { useState } from 'react';
import { Rss, ArrowRight, Calendar, X, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'; // Adicionado ChevronDown/Up

// ==========================================================
// 1. Definição da Interface e Dados Atualizados (Com mais artigos)
// ==========================================================
interface NewsArticle {
    id: number;
    title: string;
    date: string;
    excerpt: string; // Resumo
    fullContent: string; // Conteúdo Completo
    link: string;
}

const newsArticles: NewsArticle[] = [
    { 
        id: 1, 
        title: 'A Noite de Natal no Lar: A Sua Doação Fez a Diferença', 
        date: '10 DEZ 2025', 
        excerpt: 'Um resumo das festividades e como a comunidade ajudou a proporcionar um Natal mágico aos nossos acolhidos.', 
        fullContent: 'Graças à enorme onda de solidariedade da nossa comunidade, conseguimos organizar uma festa de Natal inesquecível este ano. [...]',
        link: '#' 
    },
    { 
        id: 2, 
        title: 'Workshop de Codificação para Jovens do Lar: Novos Talentos', 
        date: '28 NOV 2025', 
        excerpt: 'Os nossos jovens participaram num workshop de introdução à programação, abrindo portas para o futuro.', 
        fullContent: 'Numa parceria com a [Nome da Empresa de Tecnologia], os jovens do Lar de Nazaré tiveram acesso a um workshop intensivo de três dias sobre lógica de programação e HTML/CSS. [...]',
        link: '#' 
    },
    { 
        id: 3, 
        title: 'Relatório Mensal de Necessidades: O Que Mais Precisamos Agora', 
        date: '01 DEZ 2025', 
        excerpt: 'Atualização sobre os bens essenciais e artigos que a nossa instituição mais necessita neste mês.', 
        fullContent: 'Neste mês, as nossas maiores necessidades focam-se em alimentos não perecíveis (arroz, massa, azeite) e artigos de higiene pessoal. [...]',
        link: '#' 
    },
    // ===============================================
    // 🎯 NOVOS ARTIGOS para simular o "Arquivo"
    // ===============================================
    { 
        id: 4, 
        title: 'Dia do Voluntário 2025: Celebração e Reconhecimento', 
        date: '15 NOV 2025', 
        excerpt: 'Homenagem aos nossos heróis diários que dedicam tempo e coração ao Lar.', 
        fullContent: 'Realizámos uma pequena cerimónia para agradecer aos mais de 50 voluntários que tornam o nosso trabalho possível. A dedicação deles é a espinha dorsal da nossa missão, e este dia é dedicado inteiramente a eles. Queremos recrutar mais voluntários para o próximo ano!',
        link: '#' 
    },
    { 
        id: 5, 
        title: 'Inauguração do Novo Parque Infantil', 
        date: '05 OUT 2025', 
        excerpt: 'O novo espaço de lazer e brincadeira está finalmente pronto e foi inaugurado com muita alegria.', 
        fullContent: 'O sonho de um novo parque infantil tornou-se realidade, graças a uma campanha de angariação de fundos bem-sucedida. O espaço oferece segurança e diversão para as nossas crianças, promovendo a atividade física e o convívio ao ar livre.',
        link: '#' 
    },
    { 
        id: 6, 
        title: 'Apoio Médico: Nova Parceria com Clínica Local', 
        date: '20 SET 2025', 
        excerpt: 'Garantia de check-ups e cuidados de saúde prioritários para todos os utentes.', 
        fullContent: 'Formalizámos uma parceria com a Clínica [Nome da Clínica] que nos permite oferecer consultas gratuitas e rastreios dentários trimestrais aos nossos acolhidos, assegurando um acompanhamento de saúde de qualidade.',
        link: '#' 
    },
];

// NÚMERO DE ARTIGOS A MOSTRAR INICIALMENTE
const ARTICLES_TO_SHOW_INITIALLY = 3; 

// ==========================================================
// Componente Modal (Mantido do código anterior, sem alterações)
// ==========================================================
interface NewsModalProps {
    article: NewsArticle | null;
    onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ article, onClose }) => {
    if (!article) return null;
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={onClose} 
        >
            <div 
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-100"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="relative p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-800 hover:bg-gray-200 transition-colors shadow-lg z-10"
                        aria-label="Fechar Detalhes"
                    >
                        <X size={24} />
                    </button>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <Calendar size={16} className="text-brand-600" />
                        <span className="font-semibold uppercase">{article.date}</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-6">{article.title}</h3>
                    <p className="text-gray-700 text-lg whitespace-pre-line leading-relaxed">
                        {article.fullContent}
                    </p>
                    <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 text-brand-700">
                        <BookOpen size={20} />
                        <span className="font-semibold">Obrigado por se manter informado!</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
// ==========================================================


const News: React.FC = () => {
    // Estado para controlar a modal (Ler Artigo Completo)
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    
    // 🎯 NOVO ESTADO: Controlar se o arquivo está expandido
    const [isArchiveExpanded, setIsArchiveExpanded] = useState(false);

    // Determina quantos artigos mostrar (3 se não expandido, todos se expandido)
    const articlesToShow = isArchiveExpanded ? newsArticles : newsArticles.slice(0, ARTICLES_TO_SHOW_INITIALLY);

    const toggleArchive = () => {
        setIsArchiveExpanded(!isArchiveExpanded);
    };

    const openModal = (article: NewsArticle) => {
        setSelectedArticle(article);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedArticle(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <section id="noticias" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-warm-500 font-semibold tracking-wider uppercase text-sm">Acontece no Lar</span>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Últimas Notícias e Eventos</h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        Mantenha-se a par de todas as novidades, eventos e histórias de sucesso.
                    </p>
                </div>

                {/* 🎯 Loop agora usa `articlesToShow` (3 ou todos) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articlesToShow.map((article) => (
                        <div key={article.id} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
                            <div className="flex items-center gap-3 mb-4 text-brand-600">
                                <Rss size={20} />
                                <span className="text-xs font-semibold uppercase">{article.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                            <p className="text-gray-600 mb-4 flex-grow">{article.excerpt}</p>
                            
                            <button 
                                onClick={() => openModal(article)}
                                className="text-brand-600 font-semibold flex items-center gap-1 hover:text-brand-800 transition-colors mt-auto" 
                            >
                                Ler Artigo Completo <ArrowRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/*  BOTÃO DE ARQUIVO FUNCIONAL */}
                {newsArticles.length > ARTICLES_TO_SHOW_INITIALLY && (
                    <div className="text-center mt-12">
                        <button 
                            onClick={toggleArchive}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-brand-600 hover:bg-brand-700 transition-colors gap-2"
                        >
                            {isArchiveExpanded ? 'VER MENOS NOTÍCIAS' : 'VER ARQUIVO DE NOTÍCIAS'}
                            {isArchiveExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>
                )}
            </div>
            
            <NewsModal 
                article={selectedArticle} 
                onClose={closeModal} 
            />
        </section>
    );
};

export default News;