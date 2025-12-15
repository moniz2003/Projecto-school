import React from 'react';
import { ArrowRight } from 'lucide-react'; 

// ==========================================================
// 1. IMPORTAÇÃO DAS IMAGENS LOCAIS (CAMINHO CORRIGIDO para './')
// Assumindo que Activities.tsx e as imagens estão na mesma pasta.
// ==========================================================
import imageApoioAlimentar from './apoioalimentar.jpg'; 
import imageApoioEscolar from './apoioescolar.jpg';     
import imageAtividadesLudicas from './actividadeslucidas.jpg'; 
import imageCuidadosMedicos from './cuidadosmedicos.jpg';     


// Mapa que associa o NOME DO FICHEIRO (string nos dados) à variável importada
const imageMap: { [key: string]: string } = {
    'apoioalimentar.jpg': imageApoioAlimentar,
    'apoioescolar.jpg': imageApoioEscolar,
    'actividadeslucidas.jpg': imageAtividadesLudicas, 
    'cuidadosmedicos.jpg': imageCuidadosMedicos,
};

// 2. Definição da Interface
interface Activity {
    id: number;
    title: string;
    description: string;
    image: string; 
}

// 3. Definição do Array de Dados (activitiesData)
const activitiesData: Activity[] = [
    {
        id: 1,
        title: 'Apoio Alimentar',
        description: 'Fornecemos refeições quentes e nutritivas diariamente para os nossos utentes e famílias carenciadas da região.',
        image: 'apoioalimentar.jpg', // Chave para o imageMap
    },
    {
        id: 2,
        title: 'Apoio Escolar',
        description: 'Voluntários dedicados auxiliam crianças e jovens nos estudos, combatendo o abandono escolar e promovendo o sucesso.',
        image: 'apoioescolar.jpg', 
    },
    {
        id: 3,
        title: 'Atividades Lúdicas',
        description: 'Promovemos workshops de arte, música e desporto para estimular a criatividade e o bem-estar emocional.',
        image: 'actividadeslucidas.jpg', 
    },
    {
        id: 4,
        title: 'Cuidados Médicos',
        description: 'Parcerias com profissionais de saúde para garantir rastreios e cuidados básicos a todos os acolhidos.',
        image: 'cuidadosmedicos.jpg', 
    },
];

const Activities: React.FC = () => {
    return (
        <section id="actividades" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brand-600 font-semibold tracking-wider uppercase text-sm">O Que Fazemos</span>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Nossas Actividades</h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        Trabalhamos diariamente em diversas frentes para garantir uma vida digna a quem apoiamos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {activitiesData.map((activity) => (
                        <div 
                            key={activity.id} 
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100 hover:border-brand-200"
                        >
                            <div className="h-[300px] overflow-hidden"> 
                                <img
                                    src={imageMap[activity.image]} 
                                    alt={activity.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                                <button className="text-brand-600 text-sm font-semibold hover:text-brand-800 flex items-center gap-1">
                                    VER MAIS <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Activities;