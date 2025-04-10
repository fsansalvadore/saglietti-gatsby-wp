import React from "react"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
// Components
import HeaderContainer from "../components/ui-patterns/header-container/header-container.component"

import "../components/common/styles/homepage.styles.scss"
import loadable from "@loadable/component"
import SectionContainer from "../components/SectionContainer"

const ProjectsList = loadable(
  () =>
    import(
      "../components/ui-patterns/projects/projects-list/projects-list.component"
    ),
)
const ContactsCTA = loadable(
  () => import("../components/ui-patterns/contacts-cta/contacts-cta.component"),
)

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Saglietti • Branding — Digital • Home Page</title>
      </Helmet>
      <HeaderContainer />
      <SectionContainer>
        <div className="flex flex-col gap-4 col-span-full lg:col-span-6 text-2xl">
          <p className="!m-0 w-full">
            Siamo uno studio di comunicazione e direzione creativa di Torino
            specializzato in branding e digital design.
          </p>
          <p className="md:mb-8 w-full">
            Ci occupiamo di identità visiva, editoria, exhibition design,
            packaging, siti web e motion design.
          </p>
        </div>
      </SectionContainer>
      <SectionContainer className="!pb-4">
        <div className="col-span-6 w-full">
          <Link
            to="/progetti"
            className="flex gap-4 text-lg items-center group"
          >
            Guarda tutti i progetti
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
      <ProjectsList data={data} limit={5} hideTitle />
      <ContactsCTA />
    </Layout>
  )
}

export const query = graphql`
  query ProjectsQuery {
    wordpress {
      projects(first: 10, where: { status: PUBLISH }) {
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
    }
  }
`

export default IndexPage
