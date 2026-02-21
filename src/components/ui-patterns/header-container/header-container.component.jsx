import React from "react"
// Components
import ProjectsCarousel from "../projects-carousel/projects-carousel.component"

const HeaderContainer = () => {
  return (
    <div className="header-container mt-24 h-[320px] md:h-[400px] overflow-hidden">
      <ProjectsCarousel />
    </div>
  )
}

export default HeaderContainer
