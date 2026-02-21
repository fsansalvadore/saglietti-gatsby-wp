import React, { useEffect } from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import HeaderContainer from "../components/ui-patterns/header-container/header-container.component"

import "../components/common/styles/homepage.styles.scss"
import loadable from "@loadable/component"
import { useLanguage } from "../contexts/LanguageContext"

const MarqueeSlidingText = loadable(
  () => import("../components/ui/MarqueeSlidingText"),
)
const ProjectsList = loadable(
  () =>
    import(
      "../components/ui-patterns/projects/projects-list/projects-list.component"
    ),
)

const IndexPage = ({ data }) => {
  const { setLanguage } = useLanguage()

  // Set language to Italian when this page loads
  useEffect(() => {
    setLanguage("it")
  }, [setLanguage])

  // Safety check for data
  if (!data || !data.wordpress) {
    return null
  }

  const displayPage = data.wordpress.pageIT

  // Filter projects to show only Italian ones
  const filteredProjects =
    data.wordpress.projects?.nodes?.filter(
      project => (project.language?.slug || "it") === "it",
    ) || []

  return (
    <Layout key="it">
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
  query ProjectsQuery {
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
      pageIT: page(id: "cG9zdDoxMQ==") {
        title
        homepageacf {
          caroselloProgetti
          firstmarqueetextv2
          lastmarqueetext
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

export default IndexPage
