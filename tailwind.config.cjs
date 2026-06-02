/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  presets: [require("./tailwind.preset.cjs")],
  theme: { extend: {} },
  plugins: [],
};
