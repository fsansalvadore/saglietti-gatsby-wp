/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

import Nav from "./organisms/nav/nav.component"
import "./layout.css"
import Footer from "./organisms/footer/footer.component"
import Cursor from "./atoms/cursor.component"
import CursorFollow from "./atoms/cursor-follow.component"
import GenericMetadata from './particles/meta/GenericMetadata'
import { Cookies, CookiesProvider, CookieBannerUniversal } from 'react-cookie-banner'

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
  const cookies = new Cookies(/* Your cookie header, on browsers defaults to document.cookie */)

  useEffect(() => {
    if ( typeof document !== `undefined` ) {
      setCursorComp(<Cursor/>)
      setCursorFollowComp(<CursorFollow/>)
    }
  }, [])

  return (
    <>
      <GenericMetadata/>
      {cursorComp}
      {cursorFollowComp}
      <CookiesProvider cookies={cookies}>
        <CookieBannerUniversal
          className="cooky"
          styles={{
            banner: {
              backgroundColor: '#fff',
              minHeight: '100px',
              height: 'auto',
              bottom: 0,
              zIndex: '1000',
              width: '100vw',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '30px',
              borderTop: '1px solid #000',
              boxSizing: 'border-box'
            },
            message: {
              color: '#000',
              maxWidth: '900px',
              paddingRight: '30px',
              width: '80vw',
              display: 'block',
              textAlign: 'left',
              lineHeight: '140%',
              fontWeight: '800'
            },
            button: {
              cursor: 'pointer',
              backgroundColor: '#000',
              borderRadius: '0',
              padding: '6px 12px',
              color: '#fff',
              fontWeight: '800',
              fontSize: '16px',
              height: 'auto',
              top: '0',
              position: 'relative',
              float: 'right',
              margin: 0,
              right: 'none',
            }
          }}        
          message="Questo sito fa uso di cookie per migliorare l’esperienza di navigazione degli utenti e per raccogliere informazioni sull’utilizzo del sito stesso. Proseguendo nella navigazione si accetta l’uso dei cookie."
          onAccept={() => {}}
          cookie="user-has-accepted-cookies"
          buttonMessage="Accetto"
        />
      </CookiesProvider>
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
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
