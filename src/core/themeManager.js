const htmlElement = document.documentElement;
const themeSelector = document.getElementById("themeSelector");

function applyTheme(theme) {
  htmlElement.classList.remove("light", "dark", "system");
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    htmlElement.classList.add(prefersDark ? "dark" : "light");
  } else {
    htmlElement.classList.add(theme);
  }
  
  localStorage.setItem("theme", theme);
}

export function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "system"; // Valor por defecto 'system'
  
  themeSelector.value = savedTheme;
  applyTheme(savedTheme);

  themeSelector.addEventListener("change", (event) => {
    applyTheme(event.target.value);
  });
}

export const setTheme = applyTheme;