import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const ProjectsCarousel = () => {
  const data = useStaticQuery(graphql`
    query CarouselQuery {
      wordpress {
        projects(first: 100, where: { status: PUBLISH }) {
          nodes {
            id
            title
            slug
            featuredImage {
              node {
                link
                sourceUrl
              }
            }
            custom_post_type_Project {
              visitabile
              posizioneCarosello
            }
          }
        }
      }
    }
  `)

  const featuredProjects = data.wordpress.projects.nodes
    .filter(
      p =>
        !!p.custom_post_type_Project.posizioneCarosello &&
        p.custom_post_type_Project.posizioneCarosello !== 0,
    )
    ?.sort((a, b) =>
      a.custom_post_type_Project.posizioneCarosello <
      b.custom_post_type_Project.posizioneCarosello
        ? 1
        : a.custom_post_type_Project.posizioneCarosello ===
            b.custom_post_type_Project.posizioneCarosello
          ? a.title > b.title
            ? 1
            : -1
          : -1,
    )

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="flex h-full animate-marquee-slow will-change-transform">
        {featuredProjects?.map(project => (
          <div
            key={`${project.id}-1`}
            className="flex-shrink-0 h-full flex items-center justify-center"
          >
            {project.featuredImage && (
              <img
                src={project.featuredImage.node.link}
                alt={project.title}
                className="h-full w-auto object-contain"
              />
            )}
          </div>
        ))}
        {featuredProjects?.map(project => (
          <div
            key={`${project.id}-2`}
            className="flex-shrink-0 h-full flex items-center justify-center px-4"
          >
            {project.featuredImage && (
              <img
                src={project.featuredImage.node.link}
                alt={project.title}
                className="h-full w-auto object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsCarousel
