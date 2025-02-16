import type { Config } from "tailwindcss";
import flowbitePlugin from "flowbite/plugin"; // Corrected import

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // Ensure to scan node_modules for Flowbite components
  ],
  theme: {
    extend: {
      colors: {
        "dark-background": "#403c4c", //"hsl(240, 10%, 15%)",
        "dark-foreground": "hsl(0, 0%, 98%)",
        "light-background": "#e9ecef",
        "custom-black": "#171717",
        "custom-black-1": "#040404",
        "custom-black-2": "#141414",
        "custom-black-3": "#343434",
        "custom-black-4": "#242424",
        "custom-black-5": "#2c2c2c",
        "custom-black-6": "#1c1c1c",
        "custom-gray-1": "#8d8d8d",
        "custom-gray-2": "#646464",
        "custom-gray-3": "#5c5c5c",
        "custom-gray-4": "#474747",
        "custom-white": "#fefefe",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    flowbitePlugin, // Updated plugin usage
    require("tailwindcss-animate"),
  ],
};

export default config;
