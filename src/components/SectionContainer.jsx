import cn from "classnames"
import React from "react"

const SectionContainer = ({ children, id, className = "" }) => {
  return (
    <section
      id={id}
      className={cn(
        "w-full flex flex-col sm:!grid sm:grid-cols-4 p-4 sm:p-8 sm:py-12 gap-2",
        className,
      )}
    >
      {children}
    </section>
  )
}

export default SectionContainer
