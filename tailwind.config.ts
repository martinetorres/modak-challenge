import preset from "nativewind/preset";
import { themeColors } from "./utils/colors";

module.exports = {
  content: [
    "./App.tsx", 
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./features/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [preset],
  theme: {
    extend: {
      colors: themeColors,
    }
  },
  plugins: [],
}