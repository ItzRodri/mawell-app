"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  assistantApi,
  ConversationResponse,
  MessageResponse,
} from "@/lib/assistant-api";

// Message shape adaptado para el asistente virtual
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  createdAt?: number; // unix ms
  id?: number; // ID del mensaje en la base de datos
}

// Simple avatar component (no external libs)
function Avatar({ role }: { role: ChatMessage["role"] }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold shadow-md
        ${
          isUser
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
    <div
      className={`flex w-full gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <Avatar role="assistant" />}

      <div className={`max-w-[75%]`}>
        <div
          className={`whitespace-pre-wrap rounded-2xl px-6 py-3.5 leading-relaxed shadow-md
          ${
            isUser
              ? "bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white"
              : "bg-white text-gray-800 border border-gray-200"
          } ${isUser ? "rounded-br-sm" : "rounded-bl-sm"}
          transition-all duration-200 hover:shadow-lg`}
        >
          {msg.content}
        </div>
        <div
          className={`mt-1.5 text-xs ${
            isUser ? "text-right text-gray-400" : "text-left text-gray-500"
          }`}
        >
          {time}
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
  const [currentConversation, setCurrentConversation] =
    useState<ConversationResponse | null>(null);
  const [assistantStatus, setAssistantStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Verificar estado del asistente virtual al cargar
  useEffect(() => {
    const checkAssistant = async () => {
      try {
        await assistantApi.checkHealth();
        setAssistantStatus("online");

        // Crear nueva conversación automáticamente
        const conversation = await assistantApi.startConversation(
          "Chat con Mawell"
        );
        setCurrentConversation(conversation);

        // Mensaje de bienvenida
        setChatHistory([
          {
            role: "assistant",
            content:
              "¡Hola! Soy el asistente virtual de Mawell. Estoy aquí para ayudarte con cualquier consulta sobre tratamiento de aguas. ¿En qué puedo asistirte hoy?",
            createdAt: Date.now(),
          },
        ]);
      } catch (error) {
        console.error("Error connecting to assistant:", error);
        setAssistantStatus("offline");
      }
    };

    checkAssistant();
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  // Send message to assistant
  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || !currentConversation) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    };
    setChatHistory((prev) => [...prev, userMsg]);
    setMessage("");

    try {
      setIsLoading(true);

      // Enviar mensaje al asistente virtual
      const response = await assistantApi.sendMessage(
        currentConversation.id,
        trimmed
      );

      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: response.answer,
        createdAt: new Date(response.timestamp).getTime(),
        id: response.id,
      };

      setChatHistory((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, hubo un error al conectar con el asistente virtual. Por favor, verifica que el servicio esté funcionando e intenta nuevamente.",
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Status indicator component
  const StatusIndicator = () => (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`w-2 h-2 rounded-full ${
          assistantStatus === "online"
            ? "bg-green-500"
            : assistantStatus === "offline"
            ? "bg-red-500"
            : "bg-yellow-500 animate-pulse"
        }`}
      />
      <span className="text-gray-600">
        {assistantStatus === "online"
          ? "Asistente conectado"
          : assistantStatus === "offline"
          ? "Asistente desconectado"
          : "Conectando..."}
      </span>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Asistente Virtual Mawell
              </h1>
              <p className="text-sm text-gray-600">
                Especialista en tratamiento de aguas
              </p>
            </div>
            <div className="flex items-center gap-4">
              <StatusIndicator />
              <button
                onClick={() => router.push("/")}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
        >
          {chatHistory.map((msg, idx) => (
            <MessageBubble key={`${idx}-${msg.createdAt}`} msg={msg} />
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3">
                <Avatar role="assistant" />
                <div className="rounded-2xl rounded-bl-sm bg-white border border-gray-200 px-6 py-3.5 shadow-md">
                  <div className="flex items-center gap-1">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      Analizando...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  assistantStatus === "online"
                    ? "Escribe tu consulta sobre tratamiento de aguas..."
                    : "Esperando conexión con el asistente..."
                }
                disabled={assistantStatus !== "online" || isLoading}
                className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:border-[#2079AB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2079AB]/20 disabled:opacity-50"
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={
                !message.trim() || assistantStatus !== "online" || isLoading
              }
              className="rounded-xl bg-gradient-to-r from-[#0E3855] to-[#2079AB] px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:from-[#0a2d42] hover:to-[#1a6891] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2079AB]/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Enviando</span>
                </div>
              ) : (
                "Enviar"
              )}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Presiona Enter para enviar, Shift+Enter para nueva línea
          </div>
        </div>
      </div>
    </div>
  );
}
