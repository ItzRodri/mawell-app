"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface QuickCommand {
  id: string;
  label: string;
  message: string;
  category: "frequent" | "help" | "action";
}

const quickCommands: QuickCommand[] = [
  {
    id: "1",
    label: "¿Qué puedes hacer?",
    message: "¿Qué tipo de tareas puedes ayudarme a realizar?",
    category: "frequent",
  },
  {
    id: "2",
    label: "Ayuda con código",
    message: "Necesito ayuda para escribir o revisar código de programación",
    category: "help",
  },
  {
    id: "3",
    label: "Explicar concepto",
    message: "¿Puedes explicarme un concepto o tema específico?",
    category: "help",
  },
  {
    id: "4",
    label: "Traducir texto",
    message: "Necesito traducir un texto a otro idioma",
    category: "action",
  },
  {
    id: "5",
    label: "Escribir email",
    message: "Ayúdame a redactar un email profesional",
    category: "action",
  },
  {
    id: "6",
    label: "Resolver problema",
    message: "Tengo un problema específico que necesito resolver",
    category: "help",
  },
];

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "¡Hola Jose! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Entiendo tu pregunta: "${userMessage.content}". Como asistente de IA, estoy aquí para ayudarte con cualquier duda que tengas. ¿Podrías darme más detalles sobre lo que necesitas?`,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleQuickCommand = (command: QuickCommand) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: command.message,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response based on command category
    setTimeout(() => {
      let responseContent = "";

      switch (command.category) {
        case "frequent":
          responseContent =
            "¡Excelente pregunta! Puedo ayudarte con una gran variedad de tareas como: escribir y revisar código, explicar conceptos complejos, traducir textos, redactar emails profesionales, resolver problemas técnicos, crear contenido, analizar datos y mucho más. ¿Hay algo específico en lo que te gustaría que te ayude?";
          break;
        case "help":
          responseContent = `Perfecto, estaré encantado de ayudarte con "${command.label.toLowerCase()}". Por favor, compárteme más detalles sobre lo que necesitas y te proporcionaré la mejor asistencia posible.`;
          break;
        case "action":
          responseContent = `Claro, puedo ayudarte con "${command.label.toLowerCase()}". Para darte la mejor asistencia, ¿podrías proporcionarme más información sobre lo que necesitas específicamente?`;
          break;
        default:
          responseContent =
            "Entiendo tu solicitud. ¿Podrías darme más detalles para poder ayudarte mejor?";
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const shouldShowQuickCommands = () => {
    return (
      messages.length <= 1 ||
      messages[messages.length - 1]?.role === "assistant"
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        <button
          onClick={() => router.push("/")}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          ← Volver
        </button>

        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
          IA
        </div>

        <div className="flex-1">
          <h1 className="font-semibold text-slate-900">Asistente IA</h1>
          <p className="text-sm text-slate-500">
            {isTyping ? "Escribiendo..." : "En línea"}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-4"
        style={{ height: "calc(100vh - 140px)" }}
      >
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold mt-1">
                  IA
                </div>
              )}

              <div
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-lg shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-slate-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>

                <span className="text-xs text-slate-500 mt-1 px-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center text-white text-xs font-semibold mt-1">
                  TU
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold mt-1">
                IA
              </div>

              <div className="bg-white border border-slate-200 shadow-sm px-4 py-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Commands */}
          {shouldShowQuickCommands() && !isTyping && (
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium mb-3">
                  Comandos rápidos para empezar
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                {quickCommands.map((command) => (
                  <button
                    key={command.id}
                    onClick={() => handleQuickCommand(command)}
                    className="p-3 text-left border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all duration-200 bg-white shadow-sm"
                  >
                    <div className="w-full">
                      <p className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                        {command.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {command.message}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-400">
                  O escribe tu propia pregunta abajo
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="max-w-4xl mx-auto flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isTyping}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold transition-colors"
          >
            →
          </button>
        </div>

        <p className="text-xs text-slate-500 text-center mt-2 max-w-4xl mx-auto">
          Presiona Enter para enviar • Shift + Enter para nueva línea
        </p>
      </div>
    </div>
  );
}
