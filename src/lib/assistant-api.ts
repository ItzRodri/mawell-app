// Cliente API para el Asistente Virtual (servicio separado)
const ASSISTANT_API_BASE = "https://web-production-5abee.up.railway.app"; // Puerto del virtual-assistant

// Interfaces del Asistente Virtual
export interface ConversationCreate {
  title?: string;
}

export interface ConversationResponse {
  id: number;
  title: string;
  created_at: string;
}

export interface ConversationSummary {
  id: number;
  title: string;
  created_at: string;
}

export interface ChatRequest {
  conversation_id: number;
  question: string;
}

export interface MessageResponse {
  id: number;
  question: string;
  answer: string;
  timestamp: string;
}

class AssistantApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${ASSISTANT_API_BASE}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Assistant API Error:", error);
      throw error;
    }
  }

  // Crear nueva conversación
  async startConversation(title?: string): Promise<ConversationResponse> {
    return this.request<ConversationResponse>("/chat/start", {
      method: "POST",
      body: JSON.stringify({ title: title || "Nueva conversación" }),
    });
  }

  // Enviar mensaje y obtener respuesta de la IA
  async sendMessage(
    conversation_id: number,
    question: string
  ): Promise<MessageResponse> {
    return this.request<MessageResponse>("/chat/send", {
      method: "POST",
      body: JSON.stringify({ conversation_id, question }),
    });
  }

  // Obtener mensajes de una conversación
  async getMessages(conversation_id: number): Promise<MessageResponse[]> {
    return this.request<MessageResponse[]>(`/chat/${conversation_id}/messages`);
  }

  // Obtener lista de conversaciones
  async getConversations(): Promise<ConversationSummary[]> {
    return this.request<ConversationSummary[]>("/chat/my-conversations");
  }

  // Eliminar conversación
  async deleteConversation(conversation_id: number): Promise<void> {
    return this.request<void>(`/chat/${conversation_id}`, {
      method: "DELETE",
    });
  }

  // Verificar si el servicio está disponible
  async checkHealth(): Promise<{ message: string }> {
    return this.request<{ message: string }>("/");
  }
}

// Instancia singleton
export const assistantApi = new AssistantApiClient();

// Hook para React (opcional)
export const useAssistant = () => {
  return {
    startConversation: assistantApi.startConversation.bind(assistantApi),
    sendMessage: assistantApi.sendMessage.bind(assistantApi),
    getMessages: assistantApi.getMessages.bind(assistantApi),
    getConversations: assistantApi.getConversations.bind(assistantApi),
    deleteConversation: assistantApi.deleteConversation.bind(assistantApi),
    checkHealth: assistantApi.checkHealth.bind(assistantApi),
  };
};
