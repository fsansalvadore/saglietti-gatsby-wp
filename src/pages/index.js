import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
// Components
import HeaderContainer from "../components/ui-patterns/header-container/header-container.component"

import "../components/common/styles/homepage.styles.scss"
import loadable from "@loadable/component"
import SectionContainer from "../components/SectionContainer"
import { useLanguage } from "../contexts/LanguageContext"
import { useTranslation } from "../hooks/useTranslation"

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
  const { language } = useLanguage()
  const { t } = useTranslation()

  // Safety check for data
  if (!data || !data.wordpress) {
    return null
  }

  // Select page based on current language
  const displayPage = language === "en" ? data.wordpress.pageEN : data.wordpress.pageIT

  // Since projects don't have language field in WordPress, show all projects
  // You'll need to enable Polylang for the Project post type in WordPress
  const filteredProjects = data.wordpress.projects?.nodes || []

  return (
    <Layout>
      <Helmet>
        <title>Saglietti • Branding — Digital • Home Page</title>
      </Helmet>
      <HeaderContainer />
      <MarqueeSlidingText
        text={displayPage?.homepageacf?.firstmarqueetext || ""}
        className="mt-2"
      />
      <SectionContainer className="!pt-0 -mt-8 max-w-[100vw]">
        <p className="text-xl max-w-[100vw] font-medium col-span-full text-center">
          {displayPage?.homepageacf?.statictext || ""}
        </p>
      </SectionContainer>
      <MarqueeSlidingText
        text={displayPage?.homepageacf?.marqueetexttwo || ""}
        className="mt-28 !text-3xl bg-black text-white py-6"
        repeat={3}
        speed={50}
        reverse={true}
      />
      <SectionContainer className="!py-0">
        <div className="col-span-full w-full">
          <Link
            to="/progetti"
            className="flex py-4 justify-between w-full gap-4 text-lg items-center group"
          >
            {t("homepage.viewAllProjects")}
            <svg
              className="w-3 h-3 rotate-45 translate-x-0 transition-transform group-hover:translate-x-1"
              width="100%"
              height="100%"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.29289 15.2929L0.585786 16L2 17.4142L2.70711 16.7071L1.29289 15.2929ZM16.7071 2.70711L17.4142 2L16 0.585786L15.2929 1.29289L16.7071 2.70711ZM2 0H1V2H2V0ZM17 1H18V0H17V1ZM16 16V17H18V16H16ZM2.70711 16.7071L16.7071 2.70711L15.2929 1.29289L1.29289 15.2929L2.70711 16.7071ZM2 2H17V0H2V2ZM16 1V16H18V1H16Z"
                fill="black"
              />
            </svg>
          </Link>
        </div>
      </SectionContainer>
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
          }
        }
      }
      pageIT: page(id: "cG9zdDoxMQ==") {
        title
        homepageacf {
          caroselloProgetti
          fieldGroupName
          firstmarqueetext
          lastmarqueetext
          marqueetexttwo
          statictext
        }
      }
      pageEN: page(id: "cG9zdDoxNjg5") {
        title
        homepageacf {
          caroselloProgetti
          fieldGroupName
          firstmarqueetext
          lastmarqueetext
          marqueetexttwo
          statictext
        }
      }
    }
  }
`

export default IndexPage
