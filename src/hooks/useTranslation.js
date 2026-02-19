import { useLanguage } from "../contexts/LanguageContext"
import itTranslations from "../i18n/it.json"
import enTranslations from "../i18n/en.json"

const translations = {
  it: itTranslations,
  en: enTranslations,
}

export const useTranslation = () => {
  const { language } = useLanguage()

  const t = key => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Return key if translation not found
        console.warn(`Translation missing for key: ${key} in language: ${language}`)
        return key
      }
    }

    return value
  }

  return { t, language }
}
