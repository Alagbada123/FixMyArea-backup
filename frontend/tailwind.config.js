/** @type {import('tailwindcss').Config} */
export default {
  // This 'content' array is the most important part.
  // It tells Tailwind to scan all .vue, .js, and .ts files inside the 'src' folder.
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
