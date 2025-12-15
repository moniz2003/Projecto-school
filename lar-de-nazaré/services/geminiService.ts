import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a production environment, API calls should often go through a backend proxy
// to protect the API key, or use specific restricted keys.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
Você é a "Naza", a assistente virtual amigável e acolhedora do Centro de Acolhimento "Lar de Nazaré".
O seu objetivo é ajudar visitantes do site com informações sobre a instituição.

Informações chave sobre o Lar de Nazaré:
- Missão: Acolher quem mais precisa com dignidade e amor.
- Atividades: Refeições diárias, apoio escolar, atividades lúdicas, cuidados médicos básicos.
- Doações: Aceitamos dinheiro, roupas, alimentos e brinquedos.
- Visitas: Devem ser agendadas pelo formulário no site. Horário de visita: 10h às 16h.
- Localização: Rua da Esperança, 123, Lisboa.

Tom de voz: Empático, esperançoso, calmo e profissional. Responda sempre em Português de Portugal.
Se não souber uma informação específica, peça gentilmente para a pessoa usar o formulário de contacto ou ligar para a secretaria.
Mantenha as respostas concisas (máximo 3 frases) a menos que solicitado o contrário.
`;

export const sendMessageToGemini = async (message: string, history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "O serviço de chat está temporariamente indisponível (Chave de API não configurada). Por favor, contacte-nos por telefone.";
    }

    const model = 'gemini-2.5-flash';
    
    // Construct the chat history for the API
    // Note: The new SDK manages chat history within the chat session object, 
    // but here we are stateless between calls for simplicity in this frontend demo,
    // so we re-instantiate or just use generateContent for single turns if not maintaining session object.
    // Ideally, we keep the chat object alive in the component. Let's do that in the component.
    // For this helper, we will just use generateContent with system instruction for a single-turn feel
    // or we can use the proper chat method if we pass the history correctly.
    
    // To keep it simple and robust for this demo context without complex state management across files:
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Desculpe, não consegui entender. Pode repetir?";
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return "Ocorreu um erro momentâneo. Por favor, tente novamente mais tarde.";
  }
};