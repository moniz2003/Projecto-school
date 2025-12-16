import React, { useState, useEffect } from 'react';
import { Edit, Image, Save, Upload, X } from 'lucide-react';

// AJUSTE OS URLs CONFORME A SUA CONFIGURAÇÃO
const API_URL_READ = 'http://localhost/lar-nazare/api/content_read.php';
const API_URL_UPDATE = 'http://localhost/lar-nazare/api/content_update.php';
const API_URL_UPLOAD = 'http://localhost/lar-nazare/api/image_upload.php';

// Mapa de conteúdo: key -> value
interface ContentMap {
    [key: string]: string;
}

const ContentEditor: React.FC = () => {
    const [content, setContent] = useState<ContentMap>({});
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    // 1. Função para Carregar TODO o Conteúdo (usando content_read.php)
    const fetchContent = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL_READ);
            const data = await response.json();
            setContent(data);
        } catch (err) {
            setStatus({ message: "Erro ao carregar o conteúdo do site.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    // 2. Função para Salvar um campo de Texto (usando content_update.php)
    const handleSaveText = async (key: string, value: string, type: string) => {
        try {
            const response = await fetch(API_URL_UPDATE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value, type }),
            });

            if (!response.ok) throw new Error('Falha ao salvar o texto.');

            const data = await response.json();
            // Atualiza o estado localmente com a nova informação
            setContent(prev => ({ ...prev, [key]: data.value }));
            setStatus({ message: data.message, type: 'success' });

        } catch (err) {
            setStatus({ message: `Erro ao salvar ${key}.`, type: 'error' });
        }
    };

    // 3. Função para Fazer Upload da Imagem (usando image_upload.php)
    const handleUploadImage = async (key: string) => {
        if (!file) {
            setStatus({ message: "Nenhuma imagem selecionada.", type: 'info' });
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const response = await fetch(API_URL_UPLOAD, {
                method: 'POST',
                // Não precisa de Content-Type: 'multipart/form-data', o browser adiciona
                body: formData,
            });

            if (!response.ok) throw new Error('Falha no upload da imagem.');

            const data = await response.json();
            
            // Depois do upload, salva o URL da imagem na base de dados (lar_content)
            await handleSaveText(key, data.url, 'image_url'); 
            
            setStatus({ message: `Imagem salva e URL atualizado.`, type: 'success' });
            setFile(null); // Limpa o campo de ficheiro
        } catch (err) {
            setStatus({ message: `Erro no upload ou salvamento do URL.`, type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    // Função para renderizar um campo de edição de texto simples
    const renderTextField = (key: string, label: string, type: 'input' | 'textarea') => (
        <div key={key} className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Edit className="w-4 h-4 mr-2" /> {label}
            </label>
            {type === 'input' ? (
                <input
                    type="text"
                    value={content[key] || ''}
                    onChange={(e) => setContent(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                />
            ) : (
                <textarea
                    rows={4}
                    value={content[key] || ''}
                    onChange={(e) => setContent(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-500 focus:border-brand-500"
                />
            )}
            <button
                onClick={() => handleSaveText(key, content[key], type)}
                className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-150 flex items-center"
                disabled={loading}
            >
                <Save className="w-4 h-4 mr-2" /> Salvar {label}
            </button>
        </div>
    );
    
    // Função para renderizar o campo de upload de imagem
    const renderImageField = (key: string, label: string) => (
        <div key={key} className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Image className="w-4 h-4 mr-2" /> {label} (URL atual: {content[key] || 'N/A'})
            </label>
            <div className="flex items-center space-x-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
                />
                <button
                    onClick={() => handleUploadImage(key)}
                    className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition duration-150 flex items-center whitespace-nowrap"
                    disabled={!file || uploading}
                >
                    {uploading ? 'A enviar...' : <><Upload className="w-4 h-4 mr-2" /> Enviar & Salvar</>}
                </button>
            </div>
            {content[key] && (
                <div className="mt-4">
                    <p className="text-sm text-gray-500">Pré-visualização:</p>
                    <img src={content[key]} alt="Pré-visualização" className="mt-2 max-h-40 w-auto rounded shadow-lg" />
                </div>
            )}
        </div>
    );

    if (loading) return <div className="text-center py-20">A carregar editor...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Edit className="w-8 h-8 mr-3 text-brand-600" />
                Editor de Conteúdo do Site
            </h1>

            {status && (
                <div className={`p-4 mb-6 rounded-md flex justify-between items-center ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <p className="text-sm font-medium">{status.message}</p>
                    <button onClick={() => setStatus(null)}><X className="w-4 h-4" /></button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Secção Textos da Página HOME/ABOUT */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Textos Principais</h2>
                    {renderTextField('about_title', 'Título Principal (Ex: Nossa História)', 'input')}
                    {renderTextField('about_history', 'Parágrafo da História', 'textarea')}
                    {renderTextField('mission_text', 'Texto da Missão', 'textarea')}
                    {renderTextField('vision_text', 'Texto da Visão', 'textarea')}
                </div>

                {/* Secção Imagens */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Imagens do Site</h2>
                    {renderImageField('about_image', 'Imagem da Seção "Sobre Nós"')}
                    {renderImageField('hero_background', 'Imagem de Fundo da Seção Hero')}
                    {/* Pode adicionar mais campos de imagem aqui */}
                </div>
            </div>
        </div>
    );
};

export default ContentEditor;