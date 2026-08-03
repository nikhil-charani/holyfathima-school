import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "Gemini API key not configured" }), { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format previous messages for context
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
      systemInstruction: `You are the official virtual assistant for Holy Fathima Kidz High School. 
      You are helpful, polite, and professional. 
      School Details:
      - Location: 123 Education Boulevard, Knowledge City, Telangana, 500001
      - Contact: +91 98765 43210, admissions@holyfathima.edu
      - Admissions for 2026-2027 are open.
      - Curriculum: CBSE, integrated with modern methodologies.
      - Facilities: Smart Classrooms, Robotics Lab, Sports Complex, Library, Transport.
      Answer queries regarding admissions, fees, transport, timings, and curriculum. Keep answers concise.`,
    });

    const result = await chat.sendMessage(lastMessage);
    const responseText = result.response.text();

    return new Response(JSON.stringify({ response: responseText }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), { status: 500 });
  }
}
