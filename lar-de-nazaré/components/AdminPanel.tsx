import React, { useState, useEffect } from 'react';
import { Mail, Clock, CheckCircle, RotateCw } from 'lucide-react';

// URL da sua API PHP (AJUSTE ESTE URL CONFORME A SUA CONFIGURAÇÃO XAMPP!)
// Por exemplo: http://localhost/lar-nazare/api/agendamentos_read.php
const API_URL_READ = 'http://localhost/lar_nazare/api/contatos_read.php';
const API_URL_UPDATE = 'http://localhost/lar_nazare/api/contatos_update_status.php';

// 1. Definição do Tipo (Interface) para um Contacto
interface Contacto {
    id: number;
    nome: string;
    email: string;
    assunto: string;
    mensagem: string;
    data_envio: string;
    status: 'Novo' | 'Em Tratamento' | 'Resolvido'; // Tipos de status
    data_envio_formatada: string;
}

const AdminPanel: React.FC = () => {
    // Estados do componente
    const [agendamentos, setAgendamentos] = useState<Contacto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Função para Carregar os Dados do PHP
    const fetchAgendamentos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL_READ);
            if (!response.ok) {
                throw new Error('Erro ao carregar dados da API PHP.');
            }
            const data = await response.json();
            // Verifica se a resposta JSON tem a estrutura esperada
            if (data.error) {
                 throw new Error(data.error);
            }
            setAgendamentos(data);
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro desconhecido ao ligar-se ao servidor.');
        } finally {
            setLoading(false);
        }
    };

    // 3. Executar o fetch ao carregar o componente
    useEffect(() => {
        fetchAgendamentos();
    }, []); // Array vazio garante que só corre uma vez (ao montar)

    // 4. Função para Mudar o Status
    const updateStatus = async (id: number, newStatus: Contacto['status']) => {
        // Optimistic UI update: atualiza a lista localmente antes da confirmação do servidor
        const originalAgendamentos = agendamentos;
        setAgendamentos(agendamentos.map(a => a.id === id ? { ...a, status: newStatus } : a));

        try {
            const response = await fetch(API_URL_UPDATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (!response.ok) {
                // Se falhar, reverte para o estado original
                setAgendamentos(originalAgendamentos); 
                throw new Error('Falha ao atualizar o estado no servidor.');
            }
            // Não precisa de fazer mais nada, pois a UI já está atualizada (Optimistic Update)
        } catch (err) {
            setError(`Erro ao atualizar contacto ${id}.`);
            // Se houver um erro, reverte o estado da UI para o original
            setAgendamentos(originalAgendamentos); 
        }
    };

    // Helpers de estilo
    const getStatusColor = (status: Contacto['status']) => {
        switch (status) {
            case 'Novo': return 'bg-red-100 text-red-800';
            case 'Em Tratamento': return 'bg-yellow-100 text-yellow-800';
            case 'Resolvido': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // 5. Renderização (UI)
    if (loading) return <div className="text-center py-20">A carregar agendamentos...</div>;
    if (error) return <div className="text-center py-20 text-red-600">Erro: {error}</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Mail className="w-8 h-8 mr-3 text-brand-600" />
                Gestão de Contactos e Agendamentos ({agendamentos.length})
            </h1>
            <button
                onClick={fetchAgendamentos}
                className="mb-6 px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition duration-150 flex items-center"
            >
                 <RotateCw className="w-4 h-4 mr-2" /> Recarregar Dados
            </button>

            {/* Tabela de Agendamentos */}
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assunto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {agendamentos.map((contacto) => (
                            <tr key={contacto.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contacto.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contacto.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={contacto.mensagem}>
                                    {contacto.assunto}
                                    <div className="text-xs text-gray-400 mt-1 italic max-w-xs truncate">{contacto.mensagem}</div>
                                </td>
                                
                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contacto.status)}`}>
                                        {contacto.status}
                                    </span>
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    {contacto.data_envio_formatada}
                                </td>

                                {/* Ações (Botões de Status) */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {contacto.status !== 'Resolvido' && (
                                        <button
                                            onClick={() => updateStatus(contacto.id, 'Resolvido')}
                                            className="text-green-600 hover:text-green-900 mr-3 transition duration-150"
                                            title="Marcar como Resolvido"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                    )}
                                    {contacto.status !== 'Em Tratamento' && contacto.status !== 'Resolvido' && (
                                        <button
                                            onClick={() => updateStatus(contacto.id, 'Em Tratamento')}
                                            className="text-yellow-600 hover:text-yellow-900 mr-3 transition duration-150"
                                            title="Marcar como Em Tratamento"
                                        >
                                            Em Tratamento
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {agendamentos.length === 0 && !loading && (
                     <div className="p-8 text-center text-gray-500">Não há novos contactos ou agendamentos.</div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;