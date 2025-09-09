// src/lib/emailService.ts
import emailjs from "@emailjs/browser";

// Configuración de EmailJS (necesitarás crear cuenta gratuita en emailjs.com)
const EMAILJS_SERVICE_ID = "service_wmxsp7g"; // Reemplazar con tu Service ID
const EMAILJS_TEMPLATE_ID = "template_m5zl2dk"; // Reemplazar con tu Template ID
const EMAILJS_PUBLIC_KEY = "_eLrhFJoE3cFQCh1B"; // Reemplazar con tu Public Key

// Función para generar código de 6 dígitos
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Función para enviar email de verificación
export const sendVerificationEmail = async (
  userEmail: string,
  verificationCode: string,
  userName: string = "Usuario"
): Promise<boolean> => {
  try {
    const templateParams = {
      email: userEmail,
      passcode: verificationCode,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log("Email enviado exitosamente:", response.status);
    return true;
  } catch (error) {
    console.error("Error enviando email:", error);
    return false;
  }
};

// Función para validar código (simple comparación)
export const validateVerificationCode = (
  enteredCode: string,
  storedCode: string
): boolean => {
  return enteredCode === storedCode;
};

// Función para verificar si el código ha expirado (5 minutos)
export const isCodeExpired = (timestamp: number): boolean => {
  const now = new Date().getTime();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutos en milisegundos
  return now - timestamp > fiveMinutes;
};
