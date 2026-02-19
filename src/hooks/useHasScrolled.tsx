import { useEffect, useState } from "react"
import { isBrowser } from "framer-motion"

const useHasScrolled = () => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (!isBrowser) return
    const doc = document.documentElement
    const handleScroll = e => {
      const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      setHasScrolled(top > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return [hasScrolled, setHasScrolled]
}

export default useHasScrolled
