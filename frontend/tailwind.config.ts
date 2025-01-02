import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const colors = {
  first: "#fb90ff",
  second: "#60a5fa",
};

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        "custom-main-first": colors.first,
        "custom-main-second": colors.second,
      },
    },
  },
  plugins: [],
} satisfies Config;
