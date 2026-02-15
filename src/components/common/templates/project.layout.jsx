import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../../layout"
import fallbackImg from "../../../images/fallback.png"
import Project from "./project"
import { useLanguage } from "../../../contexts/LanguageContext"

const ProjectLayout = props => {
  const { slug, title, featuredImage, seo, tags, projectLanguage } = props.pageContext
  const { setLanguage } = useLanguage()

  // Set language based on the project's language
  useEffect(() => {
    if (projectLanguage) {
      setLanguage(projectLanguage)
    }
  }, [projectLanguage, setLanguage])

  // Use project language for locale
  const locale = projectLanguage === "it" ? "it_IT" : "en_US"
  const basePath = projectLanguage === "en" ? "/en/projects" : "/progetti"

  const projectUrl = `https://www.saglietti.it${basePath}/${slug}`

  return (
    <Layout className="border-b" hasFooter={false} key={projectLanguage}>
      <Helmet>
        <title>{title} • Saglietti</title>
        <meta name="description" content={seo.metaDesc} />
        <meta
          name="keywords"
          content={
            tags
              ? tags.nodes.map(tag => (tag.name ? ` ${tag.name}` : ""))
              : "saglietti, portfolio, studio di design, progetti di design"
          }
        />
        <meta
          itemprop="image"
          content={featuredImage ? featuredImage.node.link : fallbackImg}
        />
        <meta property="og:site_name" content={`${title} • Saglietti`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={projectUrl} />
        <meta property="og:title" content={`${title} • Saglietti`} />
        <meta
          property="og:image"
          content={featuredImage ? featuredImage.node.link : fallbackImg}
        />
        <meta property="og:description" content={seo.metaDesc} />
        <meta property="og:locale" content={locale} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={projectUrl} />
        <meta name="twitter:title" content={`${title} • Saglietti`} />
        <meta name="twitter:description" content={seo.metaDesc} />
        <meta
          name="twitter:image"
          content={featuredImage ? featuredImage.node.link : fallbackImg}
        />
      </Helmet>
      <Project {...props} />
    </Layout>
  )
}

export const query = graphql`
  query PrevNextQuery {
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
          custom_post_type_Project {
            anno
            visitabile
          }
          featuredImage {
            node {
              sourceUrl
              imageFile {
                childImageSharp {
                  fixed(width: 1500, quality: 90) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default ProjectLayout
