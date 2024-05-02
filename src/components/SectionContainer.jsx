import cn from "classnames"
import React, { useEffect, useRef } from "react"
import { useInView } from "framer-motion"

const SectionContainer = ({ children, id, className = "", bgColor }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    margin: "50% 100px -50% 0px",
  })

  // useEffect(() => {
  //   if (bgColor && isInView) {
  //     document.body.style.backgroundColor = bgColor
  //   }
  // }, [isInView])

  return (
    <section
      ref={ref}
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
