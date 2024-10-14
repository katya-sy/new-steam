import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1332px",
        "2xl": "1332px",
      },
    },
    extend: {
      colors: {
        bg: "#212121",
        blue: "#677DFF",
        grey: "#edf0f5",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
