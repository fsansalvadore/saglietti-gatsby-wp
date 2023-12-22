import React from "react"
import { randomID } from "../helpers"

// import blocks components
import Paragraph from "../organisms/projects/paragraph/paragraph.component"
import Heading from "../organisms/projects/heading/heading.component"
import SingleImage from "../organisms/projects/single-image/single-image.component"
import VideoBlock from "../organisms/projects/video/video.component"
import Freeform from "../organisms/projects/freeform/freeform.component"
import Spacer from "../organisms/projects/spacer/spacer.component"
import Gallery from "../organisms/projects/gallery/gallery.component"
import Carousel from "../organisms/projects/carousel/carousel.component"

const components = {
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

const isEmpty = obj => {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

const ComponentParser = props => {
  let { content } = props

  if (!content) return null

  const filteredComponents = content.filter(
    component => component.name !== null,
  )

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

    if (pageComponents) {
      return pageComponents
    }
  }

  return null
}

export default ComponentParser
