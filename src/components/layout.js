import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

import Nav from "./organisms/nav/nav.component"
import NavLogo from "./organisms/nav/NavLogo.component"
import "./layout.css"
import Footer from "./organisms/footer/footer.component"
import Cursor from "./atoms/cursor.component"
import CursorFollow from "./atoms/cursor-follow.component"
import GenericMetadata from './particles/meta/GenericMetadata'
import CookieComponent from './molecules/CookieComponent.component'
import Loading from "../components/molecules/Loading/Loading.component";

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
  const [isLoading, setIsLoading] = useState(true);
  const [cursorComp, setCursorComp] = useState(null)
  const [cursorFollowComp, setCursorFollowComp] = useState(null)

  useEffect(() => {
    if ( typeof document !== `undefined` ) {
      setCursorComp(<Cursor/>)
      setCursorFollowComp(<CursorFollow/>)
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <GenericMetadata/>
      {cursorComp}
      {cursorFollowComp}
      <Loading isLoading={isLoading}/>
      <NavLogo />
      <Nav siteTitle={data.site.siteMetadata.title} />
        <AnimatePresence exitBeforeEnter>
          <motion.main
              initial={{opacity: 0}}
              animate={{opacity: [0, 1]}}
              exit={{opacity: [1, 0]}}
              transition={{duration: 1, times: [0, 1]}}  
            >
            {children}
          </motion.main>
        </AnimatePresence>
      <Footer />
      <CookieComponent />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
