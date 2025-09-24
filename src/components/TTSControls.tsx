"use client";

import useTTS from '@/hooks/useTTS';

interface TTSControlsProps {
  text: string;
  className?: string;
}

export default function TTSControls({ 
  text, 
  className = ''
}: TTSControlsProps) {
  
  const {
    isSupported,
    isSpeaking,
    speak,
    stop,
    canSpeak,
    currentText
  } = useTTS();

  if (!isSupported) {
    return null; // No mostrar nada si no es compatible
  }

  const handleSpeak = () => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  const isCurrentText = currentText === text;

  return (
    <button
      onClick={handleSpeak}
      disabled={!canSpeak}
      className={`
        w-6 h-6 p-1 rounded-full transition-all duration-200
        ${isCurrentText && isSpeaking 
          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${!canSpeak ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
        focus:outline-none focus:ring-2 focus:ring-blue-500/20
        ${className}
      `}
      title={isCurrentText && isSpeaking ? 'Detener audio' : 'Escuchar mensaje'}
    >
      {isCurrentText && isSpeaking ? (
        // Icono de stop
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="2" />
        </svg>
      ) : (
        // Icono de play
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
