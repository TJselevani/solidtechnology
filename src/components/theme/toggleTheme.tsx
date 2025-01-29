// components/ThemeToggle.tsx
import React from "react";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded bg-blue-500 text-white"
    >
      {theme === "dark" ? <RiSunLine /> : <RiMoonLine />}
    </button>
  );
};

export default ThemeToggle;

// export const toggleTheme = () => {
//   const html = document.documentElement;
//   html.classList.toggle("dark");
//   localStorage.setItem(
//     "theme",
//     html.classList.contains("dark") ? "dark" : "light"
//   );
// };
