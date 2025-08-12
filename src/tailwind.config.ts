import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html", // For Vite or HTML files
    "./src/**/*.{js,ts,jsx,tsx}", // All React/TypeScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
