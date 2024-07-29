/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            textColor: {
                black: "#020617",
                blueBerry: "#3B82F6",
                magicRed: "#F43F5E",
                cadetGrey: "#94A3B8",
                slatGrey: "#64748B",
                darkblueblack: "#0F172A",
            },
            backgroundColor: {
                aliceBlue: "#EFF6FF",
                lavendarBlush: "#FFF1F2",
            },
            borderColor: {
                azuresihWhite: "#E2E8F0",
            },
        },
        colors: {
            primary: "#041187",
            secondary: "#E30062",
            contrast: "#85DA6B",
            green: "#059669",
            red: {
                100: "#FEF2F2",
                300: "#FCA5A5",
                500: "#DC2626",
                600: "#E13110",
            },
            transparent: "transparent",
            black: {
                dark: "#000",
                light: "#4B5563",
            },
            white: "#fff",
            gray: {
                100: "#F3F4F6",
                400: "#e5e5e5",
                500: "#e6e6e6",
                600: "#D9D9D9",
                300: "#475569",
                700: "#334155",
                800: "#78716c",
            },
            yellow: {
                dark: "#A16207",
                light: "#FEF3C7",
                100: "#FAF8F5",
            },
            blue: { 700: "#1D4ED8", 100: "#F8FAFC", 200: "#F1F5F9", 300: "#E2E8F0" },
        },

        borderColor: {
            blue: "#3B82F6",
            gray: "#E2E8F0",
            lightgray: "#E5E7EB",
        },

        boxShadow: {
            "custom-1": "0px 4px 3px 0px #0000001A",
            "custom-2": "0px 10px 8px 0px #0000000A",
        },
    },
    plugins: [],
};
