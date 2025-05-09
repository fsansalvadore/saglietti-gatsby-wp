import cn from "classnames"
import React, { useRef } from "react"
// import { useInView } from "framer-motion"

const SectionContainer = ({ children, id, className = "", bgColor }) => {
  const ref = useRef(null)
  // const isInView = useInView(ref, {
  //   margin: "50% 100px -50% 0px",
  // })

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
        "w-full flex flex-col sm:!grid sm:grid-cols-12 p-4 py-12 sm:p-8 sm:py-24 gap-8 sm:gap-20",
        className,
      )}
    >
      {children}
    </section>
  )
}

export default SectionContainer
