import { useCallback, useContext, useState } from "react";
import { ThemeContext } from "../context";
import { getNextTheme } from "../theme/main";

export function useThemeSwitch() {
  const { theme: defaultTheme } = useContext(ThemeContext);
  const [theme, setTheme] = useState(defaultTheme);

  const switchTheme = useCallback(() => {
    return setTheme((previous) => {
      const next = getNextTheme(previous);
      localStorage.setItem("theme", next.mode);
      return next;
    });
  }, [setTheme]);

  return { theme, switchTheme };
}
