// Comments in English for clarity and clean code
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// If you prefer Edge runtime, you can export the line below.
// export const runtime = "edge";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const { message, history } = (await req.json()) as {
      message: string;
      history?: ChatMessage[];
    };

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = "AIzaSyDwvIoV6HcieZWfsBPjy3ID7FbRYnBJZtE";
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GOOGLE_API_KEY" },
        { status: 500 }
      );
    }

    // Init SDK on server (never in the client)
    const genAI = new GoogleGenerativeAI(apiKey);

    // Use a current, supported model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // If you need deeper reasoning, switch to "gemini-1.5-pro"

    // Very simple context concatenation (you can swap for structured messages if you like)
    const chatContext =
      (history as ChatMessage[] | undefined)?.map(
        (m) => `${m.role}: ${m.content}`
      ).join("\n") || "";

    const prompt = `${chatContext}\nuser: ${message}`;

    // Call the model
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (err: unknown) {
    // Safer error handling to avoid leaking internals
    const msg =
      err instanceof Error ? err.message : "Unknown server error";
    console.error("[API /api/chat] Error:", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
