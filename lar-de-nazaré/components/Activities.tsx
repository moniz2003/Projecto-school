import React, { useState } from 'react'; // 👈 Importar useState
import { ArrowRight, X, BookOpen } from 'lucide-react'; 

// ==========================================================
// 1. IMPORTAÇÃO DAS IMAGENS LOCAIS 
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

// 2. Definição da Interface (AGORA COM fullDescription)
interface Activity {
    id: number;
    title: string;
    description: string; // Descrição curta (para o cartão)
    fullDescription: string; // 👈 Descrição completa (para a modal)
    image: string; 
}

// 3. Definição do Array de Dados (activitiesData)
const activitiesData: Activity[] = [
    {
        id: 1,
        title: 'Apoio Alimentar',
        description: 'Fornecemos refeições quentes e nutritivas diariamente para os nossos utentes e famílias carenciadas da região.',
        fullDescription: 'O programa de Apoio Alimentar é a nossa iniciativa central, garantindo que nenhuma criança ou idoso acolhido passe fome. Servimos três refeições balanceadas por dia, preparadas com carinho e respeitando todas as necessidades nutricionais. Além disso, fornecemos cabazes de alimentos a famílias registadas na comunidade vizinha que enfrentam insegurança alimentar, estendendo o nosso impacto para além dos muros do Lar. Este é um trabalho contínuo que depende da generosidade dos nossos doadores.', // 👈 Texto completo
        image: 'apoioalimentar.jpg', 
    },
    {
        id: 2,
        title: 'Apoio Escolar',
        description: 'Voluntários dedicados auxiliam crianças e jovens nos estudos, combatendo o abandono escolar e promovendo o sucesso.',
        fullDescription: 'Através de sessões de estudo diárias, os nossos voluntários ajudam as crianças e jovens a realizar os trabalhos de casa e a preparar-se para exames. Este apoio personalizado é vital para colmatar lacunas de aprendizagem e construir a autoconfiança. Acreditamos que a educação é a chave para quebrar o ciclo da pobreza, e é por isso que investimos em material escolar e acompanhamento individualizado para cada aluno.', // 👈 Texto completo
        image: 'apoioescolar.jpg', 
    },
    {
        id: 3,
        title: 'Atividades Lúdicas',
        description: 'Promovemos workshops de arte, música e desporto para estimular a criatividade e o bem-estar emocional.',
        fullDescription: 'As atividades lúdicas são fundamentais para o desenvolvimento emocional e social das nossas crianças. Realizamos workshops semanais de pintura, teatro e aulas de música. O desporto, em particular, oferece uma saída saudável para a energia, ensinando trabalho em equipa e disciplina. Estas atividades proporcionam momentos de alegria e normalidade, essenciais para o seu bem-estar geral.', // 👈 Texto completo
        image: 'actividadeslucidas.jpg', 
    },
    {
        id: 4,
        title: 'Cuidados Médicos',
        description: 'Parcerias com profissionais de saúde para garantir rastreios e cuidados básicos a todos os acolhidos.',
        fullDescription: 'Garantir a saúde dos nossos utentes é uma prioridade. Mantemos parcerias com clínicas locais e profissionais de saúde voluntários que oferecem check-ups regulares, vacinação e tratamento dentário. Para muitos dos acolhidos, este é o primeiro acesso consistente a cuidados de saúde, assegurando que quaisquer problemas são detetados e tratados precocemente, contribuindo para uma vida mais saudável e segura.', // 👈 Texto completo
        image: 'cuidadosmedicos.jpg', 
    },
];

// ==========================================================
// 🎯 NOVO: Componente Modal de Detalhes
// ==========================================================
interface ActivityModalProps {
    activity: Activity | null;
    onClose: () => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ activity, onClose }) => {
    if (!activity) return null;

    const imageUrl = imageMap[activity.image];

    // Utiliza uma div fixed e classes de transição para o efeito pop-up
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={onClose} // Fecha a modal ao clicar no fundo
        >
            <div 
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-100"
                onClick={(e) => e.stopPropagation()} // Impede que o clique no conteúdo feche
            >
                <div className="relative">
                    
                    {/* Imagem de Destaque */}
                    <div className="h-64 md:h-96 overflow-hidden">
                        <img 
                            src={imageUrl} 
                            alt={activity.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Botão de Fechar */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors shadow-lg z-10"
                        aria-label="Fechar Detalhes"
                    >
                        <X size={24} />
                    </button>

                    {/* Conteúdo da Matéria */}
                    <div className="p-8">
                        <div className="flex items-center gap-3 text-brand-600 mb-2">
                             <BookOpen size={24} />
                             <span className="font-semibold uppercase text-sm tracking-wider">Matéria Completa</span>
                        </div>
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6">{activity.title}</h3>
                        
                        {/* 🎯 AQUI É ONDE APARECE A DESCRIÇÃO COMPLETA */}
                        <p className="text-gray-700 text-lg whitespace-pre-line">
                            {activity.fullDescription}
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
// ==========================================================


const Activities: React.FC = () => {
    //  NOVO ESTADO: Rastreia a atividade selecionada para mostrar na modal
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    const openModal = (activity: Activity) => {
        setSelectedActivity(activity);
        // Opcional: Adicionar classe 'overflow-hidden' ao <body> para evitar o scroll no fundo
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedActivity(null);
        document.body.style.overflow = 'unset';
    };


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
                                
                                {/* ================================================== */}
                                {/*  CORRIGIDO: O botão VER MAIS agora abre a modal */}
                                {/* ================================================== */}
                                <button 
                                    onClick={() => openModal(activity)} // Chama a função que define a atividade
                                    className="text-brand-600 text-sm font-semibold hover:text-brand-800 flex items-center gap-1"
                                >
                                    VER MAIS <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* ================================================== */}
            {/* RENDERIZAÇÃO DA MODAL */}
            {/* ================================================== */}
            <ActivityModal 
                activity={selectedActivity} 
                onClose={closeModal} 
            />

        </section>
    );
};

export default Activities;