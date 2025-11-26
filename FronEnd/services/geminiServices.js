// import { GoogleGenAI, Type } from "@google/genai";

// // The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
// const API_KEY = process.env.API_KEY;

// if (!API_KEY) {
//   throw new Error("API_KEY environment variable not set");
// }

// const ai = new GoogleGenAI({ apiKey: API_KEY });

// const analysisSchema = {
//     type: Type.OBJECT,
//     properties: {
//         analiseCategorizada: {
//             type: Type.ARRAY,
//             description: "An array of analysis results, categorized by electrical engineering topics.",
//             items: {
//                 type: Type.OBJECT,
//                 properties: {
//                     categoria: {
//                         type: Type.STRING,
//                         description: "The name of the analysis category (e.g., 'Condutores e Circuitos')."
//                     },
//                     percentualConformidade: {
//                         type: Type.INTEGER,
//                         description: "The compliance percentage (0-100) for this category."
//                     },
//                     conformidades: {
//                         type: Type.ARRAY,
//                         description: "A list of items that are compliant with ABNT standards.",
//                         items: {
//                             type: Type.OBJECT,
//                             properties: {
//                                 item: { type: Type.STRING, description: "The specific aspect that is compliant." },
//                                 observacao: { type: Type.STRING, description: "A brief, positive confirmation." }
//                             },
//                             required: ["item", "observacao"]
//                         }
//                     },
//                     naoConformidadesOuVerificar: {
//                         type: Type.ARRAY,
//                         description: "A list of items that are non-compliant or could not be verified.",
//                         items: {
//                             type: Type.OBJECT,
//                             properties: {
//                                 item: { type: Type.STRING, description: "The specific aspect with an issue." },
//                                 observacao: { type: Type.STRING, description: "A detailed explanation of the issue, citing norms where applicable, or stating why it could not be verified." }
//                             },
//                             required: ["item", "observacao"]
//                         }
//                     }
//                 },
//                 required: ["categoria", "percentualConformidade", "conformidades", "naoConformidadesOuVerificar"]
//             }
//         }
//     },
//     required: ["analiseCategorizada"]
// };


// const systemInstruction = `Você é um engenheiro eletricista especialista em normas técnicas brasileiras, focado na ABNT NBR 5410. Sua tarefa é analisar a planta baixa elétrica fornecida e avaliar sua conformidade, estruturando a resposta em categorias com percentuais de conformidade.

// Analise a planta e divida sua avaliação nas seguintes categorias:
// 1.  **Condutores e Circuitos:**
//     *   Verifique a bitola dos fios para iluminação (mín. 1,5 mm²), TUGs (mín. 2,5 mm²) e TUEs.
//     *   Verifique a separação de circuitos de iluminação e tomadas.
//     *   Verifique se equipamentos de alta potência (>10A) têm circuitos dedicados (TUEs).
// 2.  **Pontos de Utilização:**
//     *   Verifique a quantidade e o posicionamento de TUGs em salas/quartos (1 a cada 5m de perímetro) e cozinhas/áreas de serviço (1 a cada 3,5m).
//     *   Verifique a altura dos pontos de tomada (baixas, médias, altas), se indicado.
// 3.  **Proteção e Segurança:**
//     *   Identifique a presença de disjuntores para cada circuito.
//     *   Verifique a indicação de Dispositivos DR para áreas molhadas.
//     *   Verifique a presença do condutor de proteção (terra) em todos os pontos.
// 4.  **Simbologia e Documentação:**
//     *   Avalie se a simbologia está consistente com os padrões da ABNT.
//     *   Verifique se há um quadro de cargas ou legendas claras.

// Para CADA categoria, você deve:
// a) Calcular um 'percentualConformidade' (0 a 100) baseado em quantos sub-itens daquela categoria foram atendidos.
// b) Criar uma lista de 'conformidades' com os pontos que estão corretos.
// c) Criar uma lista de 'naoConformidadesOuVerificar' com os pontos que estão incorretos ou não puderam ser verificados.

// Formate sua resposta estritamente como um objeto JSON seguindo o schema fornecido. Se uma informação não estiver visível, inclua-a na lista 'naoConformidadesOuVerificar'.`;

// export const analyzeElectricalPlan = async (imageBase64, mimeType) => {
//     try {
//         const imagePart = {
//             inlineData: {
//                 data: imageBase64,
//                 mimeType: mimeType,
//             },
//         };

//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: { parts: [imagePart] },
//             config: {
//                 systemInstruction: systemInstruction,
//                 responseMimeType: "application/json",
//                 responseSchema: analysisSchema,
//                 temperature: 0.2,
//             },
//         });
        
//         const jsonText = response.text.trim();
//         const parsedJson = JSON.parse(jsonText);

//         if (!parsedJson.analiseCategorizada || !Array.isArray(parsedJson.analiseCategorizada)) {
//             throw new Error("Invalid JSON structure received from API.");
//         }
        
//         return parsedJson;

//     } catch (error) {
//         console.error("Error analyzing plan with Gemini API:", error);
//         if (error instanceof Error) {
//            throw new Error(`Failed to analyze plan: ${error.message}`);
//         }
//         throw new Error("An unknown error occurred during analysis.");
//     }
// };