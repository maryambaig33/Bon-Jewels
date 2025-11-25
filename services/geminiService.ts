import { GoogleGenAI, Chat } from "@google/genai";
import { PRODUCTS } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Construct a context string with the product inventory
const inventoryContext = PRODUCTS.map(p => 
  `ID: ${p.id}, Name: ${p.name}, Type: ${p.category}, Price: $${p.price}, Material: ${p.material}, Gemstone: ${p.gemstone || 'None'}, Description: ${p.description}`
).join('\n');

const systemInstruction = `
You are 'Lumière', a high-end, sophisticated personal jewelry stylist for Bon Jewels. 
Your tone is elegant, helpful, and knowledgeable about luxury goods. 
Your goal is to assist customers in finding the perfect piece of jewelry from our exclusive inventory.

Here is our current Inventory:
${inventoryContext}

Rules:
1. Only recommend products from the provided inventory.
2. If a user asks for something we don't have, politely suggest a close alternative from the inventory or explain we specialize in the current collection.
3. When recommending a product, mention its name and why it fits their request.
4. Keep responses concise but charming.
5. If the user asks about general jewelry care, history, or fashion advice, feel free to answer using your general knowledge, but always try to tie it back to a piece in our collection if relevant.
6. Do NOT provide product IDs in the final output unless specifically asked.
`;

let chatSession: Chat | null = null;

export const getGeminiChat = () => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getGeminiChat();
    const response = await chat.sendMessage({ message });
    return response.text || "I apologize, but I am having a moment of silence. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently unable to access my catalogue. Please check your connection or try again later.";
  }
};