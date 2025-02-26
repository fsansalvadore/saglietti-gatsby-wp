import "./layout.css"
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

import Nav from "./ui-patterns/nav/nav.component"
import Footer from "./ui-patterns/footer/footer.component"
import { CursorProvider } from "./ui/CursorProvider"
import GenericMetadata from "./common/meta/GenericMetadata"
import CookieComponent from "./CookieComponent.component"
import Loading from "./ui-patterns/Loading/Loading.component"
import cn from "classnames"

const Layout = ({
  className,
  hasTopBorder = false,
  offsetFromTop = false,
  children,
  initialTransparent,
  isInverted = false,
  hasFooter = true,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof document !== `undefined`) {
      setIsLoading(false)
    }
  }, [])

  return (
    <CursorProvider>
      <GenericMetadata />
      <Loading isLoading={isLoading} />
      <Nav
        siteTitle={data.site.siteMetadata.title}
        initialTransparent={initialTransparent}
      />
      <div
        aria-hidden="true"
        className={cn("w-screen relative", offsetFromTop && "h-[100px]")}
      />
      <AnimatePresence mode="wait">
        <motion.main
          className={cn(
            "w-screen overflow-hidden",
            hasTopBorder && "border-t",
            className,
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          exit={{ opacity: [1, 0] }}
          transition={{ duration: 1, times: [0, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {hasFooter && <Footer isInverted={isInverted} />}
      <CookieComponent />
    </CursorProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
