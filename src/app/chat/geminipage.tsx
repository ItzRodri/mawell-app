"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Message shape
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  createdAt?: number; // unix ms
}

// Simple avatar component (no external libs)
function Avatar({ role }: { role: ChatMessage["role"] }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold shadow-md
        ${isUser 
          ? "bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white" 
          : "bg-white text-[#0E3855] border-2 border-[#0E3855]"
        }`}
      aria-label={isUser ? "Usuario" : "Asistente"}
      title={isUser ? "Tú" : "Asistente"}
    >
      {isUser ? "Tú" : "M"}
    </div>
  );
}

// Single message bubble
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  const time = useMemo(() => {
    const d = new Date(msg.createdAt ?? Date.now());
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, [msg.createdAt]);

  return (
    <div className={`flex w-full gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <Avatar role="assistant" />}

      <div className={`max-w-[75%]`}>
        <div
          className={`whitespace-pre-wrap rounded-2xl px-6 py-3.5 leading-relaxed shadow-md
          ${isUser 
            ? "bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white" 
            : "bg-white text-gray-800 border border-gray-200"
          } ${isUser ? "rounded-br-sm" : "rounded-bl-sm"}
        `}
        >
          {msg.content}
        </div>
        <div className={`mt-2 text-xs ${isUser ? "text-right text-[#0E3855]" : "text-gray-600"}`}>
          {isUser ? "Tú" : "Asistente Mawell"} • {time}
        </div>
      </div>

      {isUser && <Avatar role="user" />}
    </div>
  );
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  // Send message
  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed, createdAt: Date.now() };
    setChatHistory((prev) => [...prev, userMsg]);
    setMessage("");

    try {
      setIsLoading(true);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: chatHistory, // previous history (pre-append is fine for simple context)
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "API error");

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.text,
        createdAt: Date.now(),
      };
      setChatHistory((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, hubo un error al procesar tu mensaje. Intenta nuevamente.",
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter to send
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#E3F2FD] via-white to-[#90CAF9]/30">
      {/* Header mejorado */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white shadow-md">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => router.push("/")}
            className="rounded-full p-2 hover:bg-white/10 transition-colors"
            aria-label="Volver"
            title="Volver"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7M3 12h18" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur">
              <span className="text-lg font-bold text-white">MW</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Asistente Mawell</h1>
              <p className="text-sm text-white/80">Siempre listo para ayudarte</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat container mejorado */}
      <main className="mx-auto grid max-w-4xl grid-rows-[1fr_auto] px-6">
        <div
          ref={scrollRef}
          className="mt-6 h-[calc(100vh-220px)] overflow-y-auto rounded-2xl bg-white/80 backdrop-blur-sm p-6 shadow-lg border border-gray-100"
        >
          {chatHistory.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#0E3855] to-[#2079AB] flex items-center justify-center">
                  <span className="text-2xl text-white font-bold">M</span>
                </div>
                <h2 className="text-2xl font-bold text-[#0E3855]">¡Bienvenido!</h2>
                <p className="text-gray-600">¿En qué puedo ayudarte hoy?</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {chatHistory.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}

              {isLoading && (
                <div className="flex items-center gap-4">
                  <Avatar role="assistant" />
                  <div className="flex gap-2 bg-white rounded-xl p-4 shadow-md">
                    <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#0E3855] [animation-delay:-0.3s]" />
                    <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#0E3855] [animation-delay:-0.15s]" />
                    <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#0E3855]" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input mejorado */}
        <div className="sticky bottom-6 mt-4">
          <div className="mx-auto w-full rounded-2xl bg-white/80 backdrop-blur-sm p-3 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={onEnter}
                placeholder="Escribe tu mensaje..."
                className="flex-1 rounded-xl bg-transparent px-4 py-3 text-[15px] outline-none placeholder:text-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !message.trim()}
                className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200
                  ${isLoading || !message.trim()
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white hover:shadow-md active:scale-95"
                  }`}
              >
                Enviar
              </button>
            </div>
          </div>

          {/* Footer con estilo */}
          <div className="mx-auto mt-3 max-w-3xl px-1">
            <p className="text-center text-xs text-[#0E3855]/70 font-medium">
              Asistente potenciado por IA • Mawell S.R.L.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
