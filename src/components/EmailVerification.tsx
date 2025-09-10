// src/components/EmailVerification.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";

interface EmailVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onCancel: () => void;
}

export default function EmailVerification({
  email,
  onVerificationSuccess,
  onCancel,
}: EmailVerificationProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Formatear tiempo restante
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Manejar cambio en input de código
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Solo un dígito
    if (!/^\d*$/.test(value)) return; // Solo números

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    // Auto-focus al siguiente input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verificar cuando se complete el código
    if (
      newCode.every((digit) => digit !== "") &&
      newCode.join("").length === 6
    ) {
      handleVerify(newCode.join(""));
    }
  };

  // Manejar teclas especiales
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verificar código
  const handleVerify = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join("");

    if (codeToVerify.length !== 6) {
      setError("Por favor, ingresa el código completo de 6 dígitos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simular verificación (en producción, aquí validarías con el código enviado)
      // Por ahora, cualquier código de 6 dígitos será válido para demo
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular delay

      // En implementación real, compararías con el código guardado en localStorage
      const storedCode = localStorage.getItem("verificationCode");
      const storedTimestamp = localStorage.getItem("verificationTimestamp");

      if (!storedCode || !storedTimestamp) {
        setError("Código expirado. Por favor, solicita uno nuevo.");
        return;
      }

      // Verificar si el código ha expirado (5 minutos)
      const now = new Date().getTime();
      const timestamp = parseInt(storedTimestamp);
      if (now - timestamp > 300000) {
        // 5 minutos
        setError("Código expirado. Por favor, solicita uno nuevo.");
        localStorage.removeItem("verificationCode");
        localStorage.removeItem("verificationTimestamp");
        return;
      }

      // Verificar código
      if (codeToVerify === storedCode) {
        // Limpiar código almacenado
        localStorage.removeItem("verificationCode");
        localStorage.removeItem("verificationTimestamp");
        onVerificationSuccess();
      } else {
        setError(
          "Código incorrecto. Por favor, verifica e intenta nuevamente."
        );
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError("Error al verificar el código. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Reenviar código
  const handleResendCode = async () => {
    setLoading(true);
    setCanResend(false);
    setTimeLeft(300); // Reiniciar timer
    setCode(["", "", "", "", "", ""]);
    setError("");

    try {
      // Simular reenvío de código
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem("verificationCode", newCode);
      localStorage.setItem(
        "verificationTimestamp",
        new Date().getTime().toString()
      );

      // En implementación real, aquí enviarías el email nuevamente
      console.log("Nuevo código enviado:", newCode); // Para testing

      alert(`Nuevo código enviado a ${email}`);
    } catch {
      setError("Error al reenviar el código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[#0E3855] to-[#2079AB] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verificación por Email
          </h2>
          <p className="text-gray-600">
            Hemos enviado un código de 6 dígitos a<br />
            <span className="font-semibold text-[#0E3855]">{email}</span>
          </p>
        </div>

        {/* Inputs para código */}
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#2079AB] focus:outline-none transition-colors"
              disabled={loading}
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Timer */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            Código válido por:{" "}
            <span className="font-semibold text-[#0E3855]">
              {formatTime(timeLeft)}
            </span>
          </p>
        </div>

        {/* Botones */}
        <div className="space-y-3">
          <button
            onClick={() => handleVerify()}
            disabled={loading || code.some((digit) => digit === "")}
            className="w-full bg-gradient-to-r from-[#0E3855] to-[#2079AB] text-white py-3 rounded-lg font-semibold hover:from-[#2079AB] hover:to-[#0E3855] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verificando..." : "Verificar Código"}
          </button>

          <button
            onClick={handleResendCode}
            disabled={!canResend || loading}
            className="w-full border-2 border-[#0E3855] text-[#0E3855] py-3 rounded-lg font-semibold hover:bg-[#0E3855] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Reenviando..." : "Reenviar Código"}
          </button>

          <button
            onClick={onCancel}
            disabled={loading}
            className="w-full text-gray-500 py-2 rounded-lg font-medium hover:text-gray-700 transition-colors"
          >
            Cancelar
          </button>
        </div>

        {/* Info adicional */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600 text-center">
            💡 <strong>Para testing:</strong> El código se muestra en la consola
            del navegador
          </p>
        </div>
      </div>
    </div>
  );
}
