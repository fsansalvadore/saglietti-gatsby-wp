import React, { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("it")

  // Initialize language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("saglietti-language")
      if (savedLanguage && (savedLanguage === "it" || savedLanguage === "en")) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  // Sync language changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("saglietti-language", language)
    }
  }, [language])

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "it" ? "en" : "it"))
  }

  const setSpecificLanguage = lang => {
    if (lang === "it" || lang === "en") {
      setLanguage(lang)
    }
  }

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, setLanguage: setSpecificLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  
  // Return default values during SSR/build when provider isn't available yet
  if (!context) {
    // During build time, return default Italian language
    return {
      language: "it",
      toggleLanguage: () => {},
      setLanguage: () => {},
    }
  }
  
  return context
}
