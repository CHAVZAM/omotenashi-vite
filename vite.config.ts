import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175, // Fija el puerto en 5175
    open: true, // Abre el navegador automáticamente
  },
});