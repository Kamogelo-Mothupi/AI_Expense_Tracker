import { GoogleGenAI } from "@google/genai";
import { Expense } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateInsights = async (expenses: Expense[], netIncome: number, totalExpenses: number): Promise<string> => {
  if (!API_KEY || expenses.length === 0) {
    return "No expenses to analyze or API Key is not configured.";
  }
   if (netIncome <= 0) {
    return "Please set a valid monthly income to get personalized insights.";
  }
  
  try {
    const formattedExpenses = expenses.map(e => `- ${e.date}: R${e.amount.toFixed(2)} on ${e.category} (${e.description})`).join('\n');
    const remaining = netIncome - totalExpenses;
    const savingsRate = netIncome > 0 ? ((remaining / netIncome) * 100) : 0;
    
    const prompt = `
You are a friendly and insightful financial advisor bot named FinSight.
A user has provided their financial summary for a period. The currency is in South African Rands (R).

**Financial Summary:**
- Monthly Net Income: R${netIncome.toFixed(2)}
- Total Expenses: R${totalExpenses.toFixed(2)}
- Remaining Balance (Savings/Deficit): R${remaining.toFixed(2)}

Based on this summary and the detailed expense list below, provide a brief, encouraging analysis of their spending habits.
- Comment on their savings rate (${savingsRate.toFixed(1)}%).
- If they have a surplus, suggest what they could do with the savings (e.g., investing, saving for a goal).
- If they have a deficit, provide gentle encouragement and focus on actionable steps to get back on track.

Then, offer 2-3 clear, actionable, and personalized saving tips that are directly relevant to their spending patterns shown in the expense list.
Keep the entire response concise, positive, and easy to read. Format the response using markdown.

**Detailed Expenses:**
${formattedExpenses}
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating insights with Gemini:", error);
    return "Sorry, I couldn't generate insights at the moment. Please check your connection or API key and try again.";
  }
};

// FIX: Add and export generateDescription function for the Admin page AI feature.
export const generateDescription = async (productTitle: string): Promise<string> => {
    if (!API_KEY) {
        return "API Key is not configured.";
    }

    try {
        const prompt = `
You are a creative and persuasive marketing copywriter.
Write a compelling, concise, and attractive product description for a product with the following title.
Focus on the key benefits and features that would appeal to a customer.
Keep the description to around 2-3 sentences. Do not use markdown.

Product Title: "${productTitle}"
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error generating description with Gemini:", error);
        throw new Error("Failed to generate product description.");
    }
};