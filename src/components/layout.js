/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Nav from "./organisms/nav/nav.component"
import "./layout.css"
import Footer from "./organisms/footer/footer.component"
import Cursor from "./atoms/cursor.component"
import CursorFollow from "./atoms/cursor-follow.component"

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
  const [cursorComp, setCursorComp] = useState(null)
  const [cursorFollowComp, setCursorFollowComp] = useState(null)

  useEffect(() => {
    if ( typeof document !== `undefined` ) {
      setCursorComp(<Cursor/>)
      setCursorFollowComp(<CursorFollow/>)
    }
  }, [])

  return (
    <>
      {cursorComp}
      {cursorFollowComp}
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
