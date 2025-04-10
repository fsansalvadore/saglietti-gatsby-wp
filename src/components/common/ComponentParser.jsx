import React from "react"
import { randomID } from "../helpers"

// import blocks components
import Paragraph from "../ui-patterns/projects/paragraph/paragraph.component"
import Heading from "../ui-patterns/projects/heading/heading.component"
import SingleImage from "../ui-patterns/projects/single-image/single-image.component"
import VideoBlock from "../ui-patterns/projects/video/video.component"
import Freeform from "../ui-patterns/projects/freeform/freeform.component"
import Spacer from "../ui-patterns/projects/spacer/spacer.component"
import Gallery from "../ui-patterns/projects/gallery/gallery.component"
import Carousel from "../ui-patterns/projects/carousel/carousel.component"

export const components = {
  "core/paragraph": Paragraph,
  "core/image": SingleImage,
  "core/video": VideoBlock,
  "core/gallery": Gallery,
  "core/freeform": Freeform,
  "core/spacer": Spacer,
  // "core/media-text": MediaText,
  "core/heading": Heading,
  "eedee/block-gutenslider": Carousel,
}

export const isEmpty = obj => {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

export const useBlockComponents = blocks => {
  if (!blocks) return null

  const filteredComponents = blocks.filter(component => component.name !== null)

  if (filteredComponents && filteredComponents.length > 0) {
    const pageComponents = filteredComponents.map((component, index) => {
      if (isEmpty(component)) return null
      if (!component) return null

      const Component = components[component.name]

      if (!Component) return null

      return (
        <Component
          index={index}
          key={`component-${randomID()}`}
          {...component}
        />
      )
    })

    return pageComponents
  }

  return null
}

const ComponentParser = props => {
  let { blocks } = props

  const pageComponents = useBlockComponents(blocks)

  if (pageComponents) {
    return pageComponents
  }

  return null
}

export default ComponentParser
