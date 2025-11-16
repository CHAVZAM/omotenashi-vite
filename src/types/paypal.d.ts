// src/types/paypal.d.ts
declare global {
  interface Window {
    paypal?: {
      Buttons?: (config: any) => {
        render?: (element: HTMLElement) => void;
      };
      // Añade más propiedades si usas otras partes del SDK, ej. FundsAvailability o SetupIntent
    };
  }
}

export {};