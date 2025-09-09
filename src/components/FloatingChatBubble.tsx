"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/api";
import {
  assistantApi,
  ConversationResponse,
  MessageResponse,
} from "@/lib/assistant-api";

// Message shape adaptado para el asistente virtual
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  createdAt?: number;
  id?: number;
}

// Simple avatar component
function Avatar({ role }: { role: ChatMessage["role"] }) {
  const isUser = role === "user";
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold shadow-md
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

  const time = new Date(msg.createdAt ?? Date.now()).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex w-full gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <Avatar role="assistant" />}

      <div className={`max-w-[80%]`}>
        <div
          className={`whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed shadow-sm
          ${
            isUser
              ? "bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white"
              : "bg-white text-gray-800 border border-gray-200"
          } ${isUser ? "rounded-br-sm" : "rounded-bl-sm"}`}
        >
          {msg.content}
        </div>
        <div
          className={`mt-1 text-xs ${
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

export default function FloatingChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
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
  const { isAuthenticated } = useAuth();

  // Verificar estado del asistente virtual al abrir el chat
  useEffect(() => {
    if (isOpen && isAuthenticated) {
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
    }
  }, [isOpen, isAuthenticated]);

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

  // Handle bubble click
  const handleBubbleClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setIsOpen(!isOpen);
  };

  // Status indicator component
  const StatusIndicator = () => (
    <div className="flex items-center gap-2 text-xs">
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
          ? "Conectado"
          : assistantStatus === "offline"
          ? "Desconectado"
          : "Conectando..."}
      </span>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && isAuthenticated && (
        <div className="mb-4 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0E3855] to-[#2079AB] px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">Asistente Mawell</h3>
                <StatusIndicator />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gray-50"
          >
            {chatHistory.map((msg, idx) => (
              <MessageBubble key={`${idx}-${msg.createdAt}`} msg={msg} />
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <Avatar role="assistant" />
                  <div className="rounded-xl rounded-bl-sm bg-white border border-gray-200 px-3 py-2 shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="flex space-x-1">
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400"></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">
                        Analizando...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white px-3 py-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={
                    assistantStatus === "online"
                      ? "Escribe tu consulta..."
                      : "Esperando conexión..."
                  }
                  disabled={assistantStatus !== "online" || isLoading}
                  className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 pr-10 text-sm text-gray-800 placeholder-gray-500 transition-all duration-200 focus:border-[#2079AB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2079AB]/20 disabled:opacity-50"
                  rows={1}
                  style={{ minHeight: "36px", maxHeight: "80px" }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={
                  !message.trim() || assistantStatus !== "online" || isLoading
                }
                className="rounded-lg bg-gradient-to-r from-[#0E3855] to-[#2079AB] px-3 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-[#0a2d42] hover:to-[#1a6891] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2079AB]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  "Enviar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bubble Button */}
      <button
        onClick={handleBubbleClick}
        className="w-16 h-16 bg-gradient-to-r from-[#0E3855] to-[#2079AB] rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        title={isAuthenticated ? "Abrir chat" : "Iniciar sesión para chatear"}
      >
        <div className="">
          <Image
            src="/mawell-icon.svg"
            alt="Chat Mawell"
            unoptimized={true}
            quality={100}
            width={32}
            height={32}
            className="text-white filter brightness-0 invert object-fill"
          />
          {/* Notification dot */}
          {!isAuthenticated && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {isAuthenticated ? "Chatear con Mawell" : "Iniciar sesión para chatear"}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
}
