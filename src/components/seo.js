/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useLanguage } from "../contexts/LanguageContext"

function SEO({ description, meta, title, image, article }) {
  const { language } = useLanguage()
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          titleTemplate
          siteUrl
          image
          twitterUsername
        }
      }
    }
  `)

  const seo = {
    title: title || site.siteMetadata.title,
    description: description || site.siteMetadata.description,
    image: image || `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`,
    url: site.siteMetadata.siteUrl,
  }

  const locale = language === "it" ? "it_IT" : "en_US"
  const htmlLang = language === "it" ? "it" : "en"

  return (
    <Helmet
      htmlAttributes={{ lang: htmlLang }}
      title={seo.title}
      titleTemplate={site.siteMetadata.titleTemplate}
      meta={[
        {
          name: `description`,
          content: seo.description,
        },
        {
          property: `og:title`,
          content: seo.title,
        },
        {
          property: `og:description`,
          content: seo.description,
        },
        {
          property: `og:type`,
          content: article ? `article` : `website`,
        },
        {
          property: `og:locale`,
          content: locale,
        },
        {
          property: `og:image`,
          content: seo.image,
        },
        {
          property: `og:url`,
          content: seo.url,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitterUsername,
        },
        {
          name: `twitter:title`,
          content: seo.title,
        },
        {
          name: `twitter:description`,
          content: seo.description,
        },
        {
          name: `twitter:image`,
          content: seo.image,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  meta: [],
  description: ``,
  article: false,
}

SEO.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

export default SEO
