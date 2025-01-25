export const toggleTheme = () => {
  const html = document.documentElement;
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light"
  );
};
