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
        <div className="w-full sm:col-span-2">
          <h2 className="text-xl">studio.</h2>
        </div>
        <div className="flex flex-col gap-4 col-span-2 text-xl">
          <p className="!m-0">
            <span className="block">
              Dal 2016 progettiamo <i>identità</i> ed <i>esperienze visive</i>.
            </span>
            Collaborare con aziende e istituzioni per noi è incentivare
            l'incontro tra il brand e il suo pubblico, utilizzando solo gli
            strumenti che apportano <strong>significato</strong> e{" "}
            <strong>valore alle idee</strong>.
          </p>
          <p className="md:mb-8">
            Per noi il nostro lavoro si nutre costantemente di ispirazione. Per
            questo non smettiamo mai di cercarla. <i>Ovunque</i>.
          </p>
        </div>
      </SectionContainer>
      <SectionContainer className="!pb-4 sm:px-4">
        <div className="lg:col-start-3 col-span-2 w-full">
          <Link
            to="/progetti"
            className="flex gap-4 text-lg items-center group"
          >
            Guarda tutti i progetti
            <svg
              className="w-5 h-5 translate-x-0 transition-transform group-hover:translate-x-1"
              width="100%"
              height="100%"
              viewBox="0 0 32 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17 2L29 13L17 23" stroke="black" strokeWidth="3" />
              <path d="M0 13L29 13" stroke="black" strokeWidth="3" />
            </svg>
          </Link>
        </div>
      </SectionContainer>
      <ProjectsList data={data} limit={5} hideTitle showVisitableOnly />
      <SectionContainer>
        <div className="w-full sm:col-span-2">
          <h2 className="text-xl">metodologia.</h2>
        </div>
        <div className="flex flex-col gap-4 col-span-2 text-xl">
          <p>
            Creiamo linguaggi di comunicazione per qualsiasi tipo di{" "}
            <strong>progetto</strong>, <strong>budget</strong> e{" "}
            <strong>media</strong>. Ma il nostro approccio al lavoro è sempre lo
            stesso: offrire al cliente un partner con cui{" "}
            <strong>condividere una visione</strong>. Un'intesa che ci porta a
            comprendere a fondo gli obiettivi e{" "}
            <strong>generare fiducia</strong>, massimizzando i risultati.
          </p>
          <p>
            Le nostre soluzioni non soddisfano solo le esigenze immediate del
            cliente, ma puntano a una comprensione della marca più profonda e
            significativa, con l'obiettivo di creare una{" "}
            <strong>connessione duratura</strong> con il suo pubblico.
          </p>
        </div>
      </SectionContainer>
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
