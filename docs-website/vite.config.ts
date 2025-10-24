import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Babel-only (no SWC) to avoid native binding issues
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
});
