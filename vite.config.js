import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    build: {
        rollupOptions: {
            input: {
                main: './index.html', // Ruta al archivo HTML principal de tu aplicación React
            },
        },
        outDir: 'dist', // Carpeta de salida para los archivos construidos
        emptyOutDir: true, // Limpia la carpeta de salida antes de generar los archivos
    },
    exclude: [
        'server.js', // Excluir el archivo server.js
        'src/**', // Excluir todos los archivos y carpetas dentro de la carpeta src
    ],
})
