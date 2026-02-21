import React, { useEffect } from "react"
import Layout from "../../components/layout"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import HeaderContainer from "../../components/ui-patterns/header-container/header-container.component"
import { useLanguage } from "../../contexts/LanguageContext"

import "../../components/common/styles/homepage.styles.scss"
import loadable from "@loadable/component"

const MarqueeSlidingText = loadable(
  () => import("../../components/ui/MarqueeSlidingText"),
)
const ProjectsList = loadable(
  () =>
    import(
      "../../components/ui-patterns/projects/projects-list/projects-list.component"
    ),
)

const IndexPageEN = ({ data }) => {
  const { setLanguage } = useLanguage()

  // Set language to English when this page loads
  useEffect(() => {
    setLanguage("en")
  }, [setLanguage])

  // Safety check for data
  if (!data || !data.wordpress) {
    return null
  }

  const displayPage = data.wordpress.pageEN

  // Filter projects to show only English ones
  const filteredProjects =
    data.wordpress.projects?.nodes?.filter(
      project => project.language?.slug === "en",
    ) || []

  return (
    <Layout key="en">
      <Helmet>
        <title>Saglietti • Branding — Digital • Home Page</title>
      </Helmet>
      <HeaderContainer />
      <MarqueeSlidingText
        text={displayPage?.homepageacf?.firstmarqueetextv2 || ""}
        className="mt-2"
      />
      <ProjectsList
        data={{
          ...data,
          wordpress: {
            ...(data?.wordpress || {}),
            projects: {
              nodes: filteredProjects,
            },
          },
        }}
        hideTitle
      />
      <MarqueeSlidingText
        text={displayPage?.homepageacf?.lastmarqueetext || ""}
        className="my-28 border-y !text-3xl py-6"
        repeat={3}
        speed={50}
      />
    </Layout>
  )
}

export const query = graphql`
  query ProjectsQueryEN {
    wordpress {
      projects(first: 200, where: { status: PUBLISH }) {
        nodes {
          id
          title
          date
          slug
          language {
            slug
            name
          }
          featuredImage {
            node {
              link
              uri
            }
          }
          custom_post_type_Project {
            ambiti
            anno
            visitabile
            cliente
          }
        }
      }
      pageEN: page(id: "cG9zdDoxNjg5") {
        title
        homepageacf {
          caroselloProgetti
          firstmarqueetextv2
          lastmarqueetext
        }
      }
    }
  }
`

export default IndexPageEN
