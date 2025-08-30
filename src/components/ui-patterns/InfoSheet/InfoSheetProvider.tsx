import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react"

interface InfoSheetContextType {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const InfoSheetContext = createContext<InfoSheetContextType | undefined>(
  undefined,
)

interface InfoSheetProviderProps {
  children: ReactNode
}

export const InfoSheetProvider: React.FC<InfoSheetProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const value: InfoSheetContextType = {
    isOpen,
    setIsOpen,
  }

  return (
    <InfoSheetContext.Provider value={value}>
      {children}
    </InfoSheetContext.Provider>
  )
}

export const useInfoSheet = (): InfoSheetContextType => {
  const context = useContext(InfoSheetContext)
  if (context === undefined) {
    throw new Error("useInfoSheet must be used within an InfoSheetProvider")
  }
  return context
}
