import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "../theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  console.log(theme)

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
    >
      {/* Icons change based on the current theme */}
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
