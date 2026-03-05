import React from "react"
import cn from "classnames"
// Components
import ProjectsCarousel from "../projects-carousel/projects-carousel.component"

const HeaderContainer = ({ className }) => {
  return (
    <div
      className={cn(
        "relative flex header-container min-h-[300px] h-[var(--header-height-mobile)] max-h-[var(--header-height-mobile)] md:h-[var(--header-height-desktop)] md:max-h-[var(--header-height-desktop)] overflow-hidden",
        className,
      )}
    >
      <ProjectsCarousel />
    </div>
  )
}

export default HeaderContainer
