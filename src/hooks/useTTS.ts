"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

interface TTSOptions {
  rate?: number; // Velocidad (0.1 - 10)
  pitch?: number; // Tono (0 - 2)  
  volume?: number; // Volumen (0 - 1)
  lang?: string; // Idioma
}

interface TTSState {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  voices: SpeechSynthesisVoice[];
  currentText: string;
  error: string | null;
}

export const useTTS = (options: TTSOptions = {}) => {
  const {
    rate = 0.9,
    pitch = 1,
    volume = 0.8,
    lang = 'es-ES'
  } = options;

  const [state, setState] = useState<TTSState>({
    isSupported: false,
    isSpeaking: false,
    isPaused: false,
    voices: [],
    currentText: '',
    error: null
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Verificar soporte del navegador
  useEffect(() => {
    const isSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    
    if (isSupported) {
      // Cargar voces disponibles
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setState(prev => ({ 
          ...prev, 
          isSupported: true, 
          voices: availableVoices,
          error: null
        }));
      };

      // Las voces pueden no estar disponibles inmediatamente
      loadVoices();
      speechSynthesis.addEventListener('voiceschanged', loadVoices);

      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    } else {
      setState(prev => ({ 
        ...prev, 
        isSupported: false,
        error: 'Tu navegador no soporta Text-to-Speech'
      }));
    }
  }, []);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Función para hablar texto
  const speak = useCallback((text: string) => {
    if (!state.isSupported) {
      console.warn('TTS no soportado en este navegador');
      return;
    }

    if (!text.trim()) {
      console.warn('Texto vacío para TTS');
      return;
    }

    // Detener cualquier reproducción anterior
    stop();

    setState(prev => ({ 
      ...prev, 
      currentText: text,
      error: null
    }));

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configurar opciones
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      utterance.lang = lang;

      // Seleccionar voz en español si está disponible
      const spanishVoice = state.voices.find(v => 
        v.lang.startsWith('es') || v.name.toLowerCase().includes('spanish')
      );
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      // Event listeners
      utterance.onstart = () => {
        setState(prev => ({ 
          ...prev, 
          isSpeaking: true, 
          isPaused: false,
          error: null
        }));
      };

      utterance.onend = () => {
        setState(prev => ({ 
          ...prev, 
          isSpeaking: false, 
          isPaused: false, 
          currentText: '' 
        }));
        utteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        console.error('Error en TTS:', event.error);
        setState(prev => ({ 
          ...prev, 
          isSpeaking: false, 
          isPaused: false,
          error: `Error en TTS: ${event.error}`,
          currentText: '' 
        }));
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('Error iniciando TTS:', error);
      setState(prev => ({ 
        ...prev, 
        error: 'Error iniciando la síntesis de voz',
        currentText: ''
      }));
    }
  }, [state.isSupported, state.voices, rate, pitch, volume, lang]);

  // Función para detener
  const stop = useCallback(() => {
    speechSynthesis.cancel();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setState(prev => ({ 
      ...prev, 
      isSpeaking: false, 
      isPaused: false,
      currentText: '',
      error: null
    }));
    utteranceRef.current = null;
  }, []);

  return {
    // Estado
    ...state,
    
    // Acciones
    speak,
    stop,
    
    // Estado combinado para facilitar uso
    canSpeak: state.isSupported,
    isActive: state.isSpeaking,
  };
};

export default useTTS;
