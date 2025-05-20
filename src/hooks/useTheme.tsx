import { createTheme } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";

export function useTheme(threshold: number = 1000) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  const currentTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: theme === "light" ? "#2980b9" : "#c0392b",
            contrastText: theme === "light" ? "#ecf0f1" : "#000000",
          },
          secondary: {
            main: theme === "light" ? "#2980b9" : "#c0392b",
            contrastText: theme === "light" ? "#ecf0f1" : "#000000",
          },
        },
      }),
    [theme]
  );

  let cooldown = useRef(false);

  const handleTheme = useCallback(
    (theme: "light" | "dark") => {
      if (cooldown.current) return;
      cooldown.current = true;
      setTheme(theme);
      localStorage.setItem("theme", theme);
      setTimeout(() => {
        cooldown.current = false;
      }, threshold);
    },
    [setTheme]
  );

  return { theme, currentTheme, handleTheme };
}
