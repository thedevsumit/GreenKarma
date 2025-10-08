import { GoogleGenAI } from "@google/genai";
import { formToJSON } from "axios";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBFFgyOLnWZ3nr-O24Yhin1cqkSGHkB4RY",
});

export async function aiConvert(formData) {
  const prompt = `
We have the given data of a product

Title: ${formData.title}
Category: ${formData.category}
Price: ₹${formData.price}
Role: ${formData.role}
Seller: ${formData.username}
Existing description: "${formData.description} 
Addres from where to why: ${formData.address}

Instructions:
Write a simple description exact to the purpose without any extra words related to the data given about the product. the word limit is max to max 200 words . Dont highlist as description just create a one paragropg covering everything without any special highlights or anything extra.
Also add some advantages of the product in the paragraph without any special mentioning of advantages 
`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",

    contents: prompt,
  });
  return response.text;
}
