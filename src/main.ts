import "./style.css";

import { Grid } from "./grid.ts";

// Theme toggle
{
  const root = document.querySelector("html");
  let newTheme = "light";

  const localTheme = localStorage.getItem("theme");
  if (localTheme === null) {
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (systemSettingDark.matches) {
      newTheme = "dark";
    }
  } else {
    newTheme = localTheme;
  }
  root.setAttribute("data-theme", newTheme);
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const oldTheme = root.getAttribute("data-theme");
    const newTheme = oldTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);

    // update in local storage
    localStorage.setItem("theme", newTheme);
  });
}

let grid = new Grid(9, 9);
