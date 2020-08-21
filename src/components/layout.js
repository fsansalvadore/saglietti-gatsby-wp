/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import AnimatedCursor from "react-animated-cursor"

import Nav from "./organisms/nav/nav.component"
import "./layout.css"
import Footer from "./organisms/footer/footer.component"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <AnimatedCursor
        className="customCursor"
        innerSize={12}
        outerSize={0}
        color='0, 0, 0'
        outerAlpha={0.2}
        innerScale={2.5}
        outerScale={5}/>
      <Nav siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
