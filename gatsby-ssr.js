import React from "react"
import { LanguageProvider } from "./src/contexts/LanguageContext"

// Wrap the entire app with LanguageProvider for SSR
export const wrapRootElement = ({ element }) => {
  return <LanguageProvider>{element}</LanguageProvider>
}
