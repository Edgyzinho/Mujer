import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateWomensDayMessage(customPrompt?: string) {
  try {
    const model = "gemini-3.1-pro-preview";
    const prompt = customPrompt || "Escreva uma mensagem curta, inspiradora e poética para o Dia Internacional das Mulheres. A mensagem deve ser em português, celebrar a força, a resiliência e a importância das mulheres. Máximo de 3 frases.";

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao gerar mensagem:", error);
    return "Feliz Dia Internacional das Mulheres! Que a força e a delicadeza continuem a transformar o mundo.";
  }
}
