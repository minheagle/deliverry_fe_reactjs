/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  variants: {
    display: ["group-hover"],
  },
  theme: {
    extend: {
      colors: {
        primary: "#f5222d",
      },
      width: {
        "with-navbar": "calc(100% - 192px)",
      },
      height: {
        "without-header-6-rem": "calc(100vh - 96px)",
      },
      padding: {},
    },
  },
  plugins: [],
};
