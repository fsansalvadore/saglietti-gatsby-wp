import React from "react"
import cn from "classnames"
import { useLanguage } from "../../../contexts/LanguageContext"

const InfoSheet = ({
  isOpen,
  setIsOpen,
  children,
  className,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
  className?: string
}) => {
  const language = useLanguage()
  console.log("language", language)
  console.log(
    'language === "it" ? "Chiudi" : "Close"',
    language === "it" ? "Chiudi" : "Close",
  )
  return (
    <div
      className={cn(
        "proj_info-container absolute z-[9999] p-4 md:p-8 flex flex-col gap-2 inset-0 top-auto w-full h-screen md:h-fit bg-white translate-y-full transform transition-transform",
        isOpen && "!translate-y-0",
        className,
      )}
    >
      <button
        type="button"
        className="absolute right-4 bottom-4 md:right-8 md:bottom-8 text-2xl w-fit h-7 !cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        {language.language === "it" ? "Chiudi" : "Close"}
      </button>
      {children}
    </div>
  )
}

export default InfoSheet
