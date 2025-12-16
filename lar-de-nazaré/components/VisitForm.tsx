import React, { useState } from 'react';
import { CalendarCheck, User, Mail, MessageSquare, Send, Loader2 } from 'lucide-react';

// ⚠️ CONFIRME O CAMINHO E A PASTA NO SEU XAMPP
const API_ENDPOINT = "http://localhost/lar_nazare/submit.php";

const VisitForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: 'Visita', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setStatus("idle");

  const formDataObj = new FormData();
  formDataObj.append("name", formData.name);
  formDataObj.append("email", formData.email);
  formDataObj.append("subject", formData.subject);
  formDataObj.append("message", formData.message);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formDataObj,
    });

    if (response.ok) {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "Visita", message: "" });
    } else {
      setStatus("error");
    }
  } catch (error) {
    setStatus("error");
    console.error("Erro:", error);
  } finally {
    setIsSubmitting(false);
  }
};
    return (
        <section id="visita" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-brand-600 font-semibold tracking-wider uppercase text-sm">Junte-se a Nós</span>
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Agendar Visita ou Voluntariado</h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        Quer conhecer o nosso trabalho ou oferecer o seu tempo? Preencha o formulário abaixo e entraremos em contacto.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-brand-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* 1. Tipo de Contacto */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                Propósito do Contacto
                            </label>
                            <div className="relative">
                                <CalendarCheck size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400" />
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 transition-colors"
                                >
                                    <option value="Visita">Agendar Visita às Instalações</option>
                                    <option value="Voluntariado">Inscrição para Voluntariado</option>
                                    <option value="Informacao">Pedido de Informação Geral</option>
                                </select>
                            </div>
                        </div>

                        {/* 2. Nome */}
                        <div>
                            {/* Removido 'sr-only' e adicionado mb-2 */}
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                            <div className="relative">
                                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    placeholder="O seu Nome Completo"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                                />
                            </div>
                        </div>

                        {/* 3. Email */}
                        <div>
                            {/* Removido 'sr-only' e adicionado mb-2 */}
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="O seu Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
                                />
                            </div>
                        </div>

                        {/* 4. Mensagem */}
                        <div>
                            {/* Removido 'sr-only' e adicionado mb-2 */}
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                            <div className="relative">
                                <MessageSquare size={20} className="absolute left-3 top-4 text-brand-400" />
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    placeholder="Deixe uma breve mensagem ou pergunte sobre datas de visita..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 resize-none"
                                />
                            </div>
                        </div>
                        
                        {/* Botão de Envio e Estado */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center gap-2 px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                            {isSubmitting ? 'A Enviar...' : 'Enviar Pedido de Contacto'}
                        </button>
                    </form>
                    
                    {/* Mensagens de Estado */}
                    {status === 'success' && (<div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center font-semibold">✅ O seu pedido foi enviado com sucesso! Entraremos em contacto brevemente.</div>)}
                    {status === 'error' && (<div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center font-semibold">❌ Ocorreu um erro ao enviar o seu pedido. Por favor, tente novamente ou ligue-nos.</div>)}
                </div>
            </div>
        </section>
    );
};

export default VisitForm;