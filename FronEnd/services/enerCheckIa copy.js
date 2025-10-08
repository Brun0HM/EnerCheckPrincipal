import { GoogleGenAI } from "@google/genai";
import { systemInstruction } from "../src/hooks/instrucoes";


const GEMINI_API_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });



const esquemaAnalise = {
  type: "object",
  properties: {
    analiseCategorizada: {
      type: "array",
      description:
        "Array de análise de resultados, categorizado por tópicos de engenharia elétrica.",

      items: {
        type: "object",
        properties: {
          categoria: {
            type: "string",
            description:
              "Nome da categoria analisada (e.g., 'Condutores e Circuitos').",
          },
          percentualConformidade: {
            type: "number",
            description:
              "Uma porcentagem de conformidade para essa categoria (0-100)",
          },
          conformidades: {
            type: "array",
            description:
              "Uma lista de items que estão conformes os padrões das normas ABNT NBR 5410.",
            items: {
              type: "object",
              properties: {
                item: {
                  description: "Um aspecto específico que está conforme",
                },
                observacao: { description: "Uma breve e curta confirmação" },
              },
              required: ["item", "observacao"],
            },
          },
          naoConformidadesOuVerficacoes: {
            type: "array",
            description:
              "Uma lista de items que não estão conformes ou não puderam ser verificados a partir dos padrões das normas ABNT NBR 5410.",
            items: {
              type: "object",
              properties: {
                item: {
                  type: "string",
                  description: "um aspecto específico com um problema.",
                },
                observacao: {
                  type: "string",
                  description:
                    "Uma explicação detalhada do erro, citando onde as normas podem ser aplicadas, ou explicando o porquê não pode ser verificado.",
                },
                required: ["item", "observacao"],
              },
            },
          },
        }, required: ["categoria", "percentualConformidade", "conformidades", "naoConformidadesOuVerficacoes"]
      },
    },
  }, required: ["analiseCategorizada"]
};



export const analisarPlanta = async (imagemBase64, mimeType) => {

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: {
                inlineData: {
                    mimeType: mimeType,
                    data: imagemBase64,
                }
            },

            config: {
              systemInstruction: systemInstruction,
              responseSchema: esquemaAnalise,
              temperature: 0.2,
            },
          });

         const textoJson = response.text.trim();
         const parsedJson = JSON.parse(textoJson);

        console.log(parsedJson);
         return parsedJson;

    } catch (error) {
        console.error("Erro ao utilizar a Inteligência artificial: " + error)
        if (error instanceof Error) {
            throw new Error(`Falha ao analisar planta: ${error.message}`);
         }
         throw new Error("Ocorreu um erro desconhecido ao analisar a planta. tente novamente.");
        
    }
  
};
