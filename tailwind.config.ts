import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        primary: {
          DEFAULT: "#1E40AF"
        },
        accent: "#60A5FA"
      }
    }
  },
  plugins: []
};

export default config;

