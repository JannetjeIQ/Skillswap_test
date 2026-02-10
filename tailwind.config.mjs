/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f7f4", // off-white background
        foreground: "#0f172a",
        primary: {
          DEFAULT: "#0f766e", // dark teal
          foreground: "#f7f7f4",
        },
        muted: {
          DEFAULT: "#e5e7eb",
          foreground: "#4b5563",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};

