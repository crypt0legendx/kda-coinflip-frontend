import { createContext, useEffect, useMemo, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const defaultContextValue = {
  theme: "light",
  changeTheme: () => null,
}

export const ThemeContext = createContext(defaultContextValue)

function ThemeProvider({ children }) {
  const [storedTheme, setStoredTheme] = useLocalStorage("theme", "light")
  const [theme, setTheme] = useState(storedTheme)

  const changeTheme = (value) => {
    setTheme(value)
    setStoredTheme(value)
  }

  useEffect(() => {
    setTheme(storedTheme)
  }, [storedTheme])

  const values = useMemo(
    () => ({
      theme,
      changeTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider
