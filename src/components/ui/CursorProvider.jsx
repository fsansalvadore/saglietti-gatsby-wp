import React, { createContext, useContext, useEffect, useState } from "react"
import Cursor from "./cursor.component"
import CursorFollow from "./cursor-follow.component"

const CursorContext = createContext()

function CursorProvider({ children }) {
  const [cursorComp, setCursorComp] = useState(null)
  const [cursorFollowComp, setCursorFollowComp] = useState(null)

  return (
    <CursorContext.Provider
      value={{
        cursorComp,
        setCursorComp,
        cursorFollowComp,
        setCursorFollowComp,
      }}
    >
      <CursorComponent>{children}</CursorComponent>
    </CursorContext.Provider>
  )
}

const CursorComponent = ({ children }) => {
  const { cursorComp, setCursorComp, cursorFollowComp, setCursorFollowComp } =
    useCursor()

  useEffect(() => {
    if (typeof document !== `undefined`) {
      setCursorComp(<Cursor />)
      setCursorFollowComp(<CursorFollow />)
    }
  }, [])

  return (
    <>
      {cursorComp}
      {cursorFollowComp}
      {children}
    </>
  )
}

const useCursor = () => {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider")
  }
  return context
}

export { CursorContext, CursorProvider, useCursor }
