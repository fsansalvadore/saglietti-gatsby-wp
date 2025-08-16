import classNames from "classnames"
import React from "react"

const MarqueeSlidingText = ({ text, className, repeat = 3 }) => {
  return (
    <div
      className={classNames(
        "overflow-hidden max-w-[100vw] text-[152px] font-medium flex gap-20 flex-nowrap",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <span
          key={`marquee-${text}-${index}`}
          className="animate-marquee whitespace-nowrap"
        >
          {text}
        </span>
      ))}
    </div>
  )
}

export default MarqueeSlidingText
