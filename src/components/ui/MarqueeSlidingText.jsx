import classNames from "classnames"
import React, { useRef, useEffect, useState } from "react"

const MarqueeSlidingText = ({
  text,
  className,
  repeat = 3,
  speed = 50,
  reverse = false,
}) => {
  const textRef = useRef(null)
  const [animationDuration, setAnimationDuration] = useState("25s")

  useEffect(() => {
    if (textRef.current && text) {
      // Small delay to ensure the element is fully rendered
      const timeoutId = setTimeout(() => {
        try {
          // Get the computed styles from the actual element to match font size and weight
          const computedStyle = window.getComputedStyle(textRef.current)
          const fontSize = computedStyle.fontSize
          const fontWeight = computedStyle.fontWeight
          const fontFamily = computedStyle.fontFamily

          // Create a temporary element to measure text width
          const tempElement = document.createElement("span")
          tempElement.style.visibility = "hidden"
          tempElement.style.position = "absolute"
          tempElement.style.whiteSpace = "nowrap"
          tempElement.style.fontSize = fontSize
          tempElement.style.fontWeight = fontWeight
          tempElement.style.fontFamily = fontFamily
          tempElement.textContent = text

          document.body.appendChild(tempElement)
          const textWidth = tempElement.offsetWidth
          document.body.removeChild(tempElement)

          // Calculate duration based on speed (pixels per second)
          // We need to account for the gap between repeated texts
          // const gapWidth = 32 // 8 * 4 (gap-8 = 2rem = 32px)
          const gapWidth = 0 // 8 * 4 (gap-8 = 2rem = 32px)
          const totalWidth = textWidth + gapWidth
          const duration = Math.max(totalWidth / speed, 1) // Minimum 1 second

          setAnimationDuration(`${duration}s`)
        } catch (error) {
          console.warn("Error calculating marquee duration:", error)
          // Fallback to default duration
          setAnimationDuration("25s")
        }
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [text, speed])

  return (
    <div
      className={classNames(
        "overflow-hidden max-w-[100vw] text-[152px] font-medium flex gap-4 flex-nowrap",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <span
          key={`marquee-${text}-${index}`}
          ref={index === 0 ? textRef : null}
          className="whitespace-nowrap"
          style={{
            animation: `marquee ${animationDuration} linear infinite${
              reverse ? " reverse" : ""
            }`,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  )
}

export default MarqueeSlidingText
