import { streamText, type ModelMessage } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { buildSystemPrompt } from "@/lib/chat-prompt";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
const google = createGoogleGenerativeAI({ apiKey: apiKey || undefined });
const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";

function normalizeMessages(input: unknown): ModelMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((message) => {
      const role =
        message &&
        typeof message === "object" &&
        "role" in message &&
        typeof message.role === "string"
          ? message.role
          : null;

      if (role !== "system" && role !== "user" && role !== "assistant") {
        return null;
      }

      if (
        message &&
        typeof message === "object" &&
        "content" in message &&
        typeof message.content === "string"
      ) {
        return { role, content: message.content };
      }

      const parts =
        message &&
        typeof message === "object" &&
        "parts" in message &&
        Array.isArray(message.parts)
          ? (message.parts as unknown[])
          : [];

      const content = parts
        .filter(
          (part: unknown): part is { type: string; text: string } =>
            part !== null &&
            typeof part === "object" &&
            "type" in part &&
            "text" in part &&
            part.type === "text" &&
            typeof part.text === "string"
        )
        .map((part: { type: string; text: string }) => part.text)
        .join("")
        .trim();

      return content ? { role, content } : null;
    })
    .filter((message): message is ModelMessage => message !== null);
}

export async function POST(req: Request) {
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "GOOGLE_GENERATIVE_AI_API_KEY não está definida no .env",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { messages } = await req.json();
    const normalizedMessages = normalizeMessages(messages);

    if (normalizedMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nenhuma mensagem válida foi enviada." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model: google(model),
      system: buildSystemPrompt(),
      messages: normalizedMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error("[api/chat] Gemini error:", { model, err });
    const message =
      err instanceof Error ? err.message : "Erro ao conectar com o Gemini";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
