import { fileURLToPath, URL } from "node:url"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        coverage: {
            include: ['src/**/*.{ts,tsx}'], 
            exclude: [
                'src/config.ts',
                'src/routes.ts',
                'src/enums/**',
                'src/store/**',
                'src/styles/**',
                'src/pages/**',  
                'src/api/**',    
                'src/__tests__/**',  
                'node_modules/**',  
            ],
        }
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
})
