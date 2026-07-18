import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stadium: {
          green: "#0B6E4F",
          gold: "#D4AF37",
          dark: "#0A1128",
        },
      },
    },
  },
  plugins: [],
};

export default config;
