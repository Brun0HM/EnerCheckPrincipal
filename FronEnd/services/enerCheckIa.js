import { GoogleGenAI, Type } from "@google/genai";
import { systemInstruction } from "../src/hooks/instrucoes";
const GEMINI_API_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API_KEY;


const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY})



const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        analiseCategorizada: {
            type: Type.ARRAY,
            description: "An array of analysis results, categorized by electrical engineering topics.",
            items: {
                type: Type.OBJECT,
                properties: {
                    categoria: {
                        type: Type.STRING,
                        description: "The name of the analysis category (e.g., 'Condutores e Circuitos')."
                    },
                    percentualConformidade: {
                        type: Type.INTEGER,
                        description: "The compliance percentage (0-100) for this category."
                    },
                    conformidades: {
                        type: Type.ARRAY,
                        description: "A list of items that are compliant with ABNT standards.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                item: { type: Type.STRING, description: "The specific aspect that is compliant." },
                                observacao: { type: Type.STRING, description: "A brief, positive confirmation." }
                            },
                            required: ["item", "observacao"]
                        }
                    },
                    naoConformidadesOuVerificar: {
                        type: Type.ARRAY,
                        description: "A list of items that are non-compliant or could not be verified.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                item: { type: Type.STRING, description: "The specific aspect with an issue." },
                                observacao: { type: Type.STRING, description: "A detailed explanation of the issue, citing norms where applicable, or stating why it could not be verified." }
                            },
                            required: ["item", "observacao"]
                        }
                    }
                },
                required: ["categoria", "percentualConformidade", "conformidades", "naoConformidadesOuVerificar"]
            }
        }
    },
    required: ["analiseCategorizada"]
};


export const analisarPlanta = async (imageBase64, mimeType) => {
    try {
        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: mimeType,
            },
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart] },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.2,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        console.log( "Resposta da API: ", parsedJson);
        

        if (!parsedJson.analiseCategorizada || !Array.isArray(parsedJson.analiseCategorizada)) {
            throw new Error("Invalid JSON structure received from API.");
        }
        
        return parsedJson;

    } catch (error) {
        console.error("Error analyzing plan with Gemini API:", error);
        if (error instanceof Error) {
           throw new Error(`Failed to analyze plan: ${error.message}`);
        }
        throw new Error("An unknown error occurred during analysis.");
    }
};