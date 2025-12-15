import React from 'react';
import { Rss, ArrowRight } from 'lucide-react';

const newsArticles = [
  { 
    id: 1, 
    title: 'A Noite de Natal no Lar: A Sua Doação Fez a Diferença', 
    date: '10 DEZ 2025', 
    excerpt: 'Um resumo das festividades e como a comunidade ajudou a proporcionar um Natal mágico aos nossos acolhidos.', 
    link: '#' 
  },
  { 
    id: 2, 
    title: 'Workshop de Codificação para Jovens do Lar: Novos Talentos', 
    date: '28 NOV 2025', 
    excerpt: 'Os nossos jovens participaram num workshop de introdução à programação, abrindo portas para o futuro.', 
    link: '#' 
  },
  { 
    id: 3, 
    title: 'Relatório Mensal de Necessidades: O Que Mais Precisamos Agora', 
    date: '01 DEZ 2025', 
    excerpt: 'Atualização sobre os bens essenciais e artigos que a nossa instituição mais necessita neste mês.', 
    link: '#' 
  },
];

const News: React.FC = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <div key={article.id} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center gap-3 mb-4 text-brand-600">
                <Rss size={20} />
                <span className="text-xs font-semibold uppercase">{article.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <a href={article.link} className="text-brand-600 font-semibold flex items-center gap-1 hover:text-brand-800 transition-colors">
                Ler Artigo Completo <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
            <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-brand-600 hover:bg-brand-700 transition-colors">
                Ver Arquivo de Notícias
            </a>
        </div>
      </div>
    </section>
  );
};

export default News;