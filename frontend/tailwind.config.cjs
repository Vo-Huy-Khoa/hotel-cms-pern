/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
    },
    screens: {
      sm: "640px",
      //=> @media (min-width: 640px){...}
      md: "768px",
      //=> @media (min-width: 768px){...}
      lg: "1024px",
      //=> @media (min-width: 1024px){...}
      xl: "1280px",
      //=> @media (min-width: 1280px){...}
      "2xl": "1536px",
      //=> @media (min-width: 1536px){...}
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin"), require("@tailwindcss/forms")],
  // eslint-disable-next-line no-dupe-keys
  content: [
    // ...
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
};
