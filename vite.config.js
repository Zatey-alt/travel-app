import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import axios from 'axios'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        '@fortawesome/react-fontawesome',
        '@fortawesome/free-brands-svg-icons',
      ],
      output: {
       
        globals: {
          axios: 'axios',
        },
      },
    },
  },
});
