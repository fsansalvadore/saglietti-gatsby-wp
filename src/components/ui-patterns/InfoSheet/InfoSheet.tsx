import React from "react"
import cn from "classnames"

const InfoSheet = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "proj_info-container absolute z-[9999] p-4 md:p-8 flex flex-col gap-2 inset-0 top-auto w-full h-screen md:h-fit bg-white translate-y-full transform transition-transform",
        isOpen && "!translate-y-0",
      )}
    >
      <button
        type="button"
        className="absolute right-4 bottom-4 md:right-8 md:bottom-8 text-2xl w-fit h-7 !cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Chiudi
      </button>
      {children}
    </div>
  )
}

export default InfoSheet
