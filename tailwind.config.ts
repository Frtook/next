import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        btn: "#6E40C9",
        background: "#0A192F",
        text: "#CCD6F6",
        accent: "#00FFD1",
      },
    },
  },
  plugins: [],
} satisfies Config;
