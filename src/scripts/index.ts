import {
  GoogleGenAI,
  HarmCategory,
  HarmBlockThreshold,
  type GenerationConfig,
  type SafetySetting,
  type Candidate,
  type Part,
} from "@google/genai";

// 🗝️ Load API Key from env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey });

// 📦 Model to use (you can change it later to pro versions if needed)
const modelName = "gemini-2.0-flash";

// ⚙️ Generation Configuration
const generationConfig: GenerationConfig = {
  temperature: 0.8,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

// 💡 Text Extraction function
function extractTextFromCandidate(candidate: Candidate): string | null {
  const parts = candidate.content?.parts as Part[];
  return parts?.map((part) => part.text).join("") ?? null;
}

// 🛡️ Safety Settings
const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

// ✅ Main function to call Gemini with any prompt
export async function callGemini(prompt: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        ...generationConfig,
        safetySettings,
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      console.error("❌ No candidates returned.");
      return null;
    }

    const candidate = response.candidates[0];

    const text = extractTextFromCandidate(candidate);

    if (!text) {
      console.warn("⚠️ No text returned from Gemini.");
      return null;
    }

    return text;
  } catch (err) {
    console.error("Gemini error:", err);
    return null;
  }
}
