import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import fallbackImg from "../../../../images/fallback.png"
import ArrowTopRight from "../../../../images/icons/arrow-top-right.svg"
import { gsap } from "gsap"
import * as ScrollMagic from "scrollmagic-with-ssr"
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import { TweenLite, TimelineLite } from "gsap/all"
import CustomEase from "../../../common/vendor/gsap/CustomEase"
import { useTranslation } from "../../../../hooks/useTranslation"
import { Search } from "lucide-react"
import projectHover from "../../../common/hooks/projectHover"

import "./projects-list.styles.scss"

if (typeof window !== `undefined`) {
  gsap.registerPlugin(CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const ProjectsList = ({ data, limit = 200, showVisitableOnly, hideTitle }) => {
  const { t } = useTranslation()
  const [term, setTerm] = useState("")

  const projects = React.useMemo(() => {
    if (!data?.wordpress?.projects?.nodes) return []

    return data.wordpress.projects.nodes
      .filter(item =>
        showVisitableOnly ? item.custom_post_type_Project.visitabile : true,
      )
      .filter(item => {
        if (!term) return true
        const searchTerm = term.toLowerCase()
        return (
          item.title.toLowerCase().includes(searchTerm) ||
          item.custom_post_type_Project.ambiti
            .join()
            .toLowerCase()
            .includes(searchTerm) ||
          item.custom_post_type_Project.anno.toString().includes(searchTerm)
        )
      })
      .sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? 1 : -1
        return a.title > b.title ? 1 : -1
      })
      .slice(0, limit)
  }, [data?.wordpress?.projects?.nodes, term, limit, showVisitableOnly])

  const projectsRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (typeof window === `undefined` || !listRef.current) return

    const menuTL = new TimelineLite()
    menuTL
      .fromTo(
        ".projects-title",
        1,
        { opacity: 0 },
        { opacity: 1, ease: "power4.out" },
      )
      .fromTo(
        ".project-item-content",
        1,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          ease: "power4.out",
        },
        0.3,
      )
      .fromTo(
        ".project-divider",
        0.6,
        { opacity: 0 },
        {
          opacity: 1,
          ease: CustomEase.create("custom", "M0,0 C0.698,0 0.374,1 1,1 "),
          stagger: 0.03,
        },
        0,
      )

    const fadeInController = new ScrollMagic.Controller()
    document.querySelectorAll(".fade-in").forEach(fadeInItem => {
      const fadeInTL = new TimelineLite()
      fadeInTL.fromTo(
        fadeInItem,
        { opacity: 0, y: 50 },
        {
          duration: 1.5,
          opacity: 1,
          y: 0,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1",
          ),
        },
      )

      new ScrollMagic.Scene({
        triggerElement: fadeInItem,
        triggerHook: 0,
        offset: -600,
        reverse: false,
      })
        .setTween(fadeInTL)
        .addTo(fadeInController)
    })
  }, [])

  useEffect(() => {
    if (typeof window === `undefined` || projects.length === 0) return
    
    const timer = setTimeout(() => {
      projectHover()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [projects])

  useEffect(() => {
    if (!projectsRef.current) return

    const projectItems =
      projectsRef.current.querySelectorAll(".project-list-item")

    projectItems.forEach(item => {
      const handleMouseOver = () => {
        projectItems.forEach(el => {
          el.style.opacity = "0.5"
        })
        item.style.opacity = "1"
      }

      const handleMouseOut = () => {
        projectItems.forEach(el => {
          el.style.opacity = "1"
        })
      }

      item.addEventListener("mouseover", handleMouseOver)
      item.addEventListener("mouseout", handleMouseOut)
    })
  }, [])

  return (
    <div
      className="w-full mx-auto p-0 text-left relative z-0 border-b border-black"
      ref={listRef}
    >
      {!hideTitle && (
        <div className="pt-[150px] px-4 sm:px-8 lg:pl-8">
          <h1 className="projects-title text-base tracking-normal inline-block m-0 mb-16 opacity-0">
            {t("projects.title")}
          </h1>
          <div className="lg:absolute left-4 sm:left-8 lg:left-1/2 lg:ml-4 top-[150px] lg:top-[150px]">
            <form className="relative w-[calc(80vw-2rem)] lg:w-[calc(40vw-3rem)] flex items-center">
              <input
                type="text"
                onChange={e => setTerm(e.target.value)}
                value={term}
                placeholder={t("projects.searchPlaceholder")}
                className="w-full py-1.5 px-0 m-0 text-base tracking-normal border-none rounded-none text-black bg-transparent focus:outline-none focus:text-base appearance-none"
              />
              <Search className="absolute right-0 lg:right-3 w-4 h-4 pointer-events-none" />
            </form>
          </div>
        </div>
      )}

      <ul className="relative list-none m-0 truncate" ref={projectsRef}>
        {projects && projects.length > 0 ? (
          projects.map(proj => (
            <li
              key={`${proj.id}-${proj.slug}`}
              className="project-list-item m-0 relative overflow-hidden last:border-b border-black transition-opacity duration-200"
              data-fx="1"
              data-img={
                proj.featuredImage ? proj.featuredImage.node.link : fallbackImg
              }
            >
              <span className="project-divider absolute w-full h-px opacity-0 bg-black top-0 right-0 transition-opacity duration-200"></span>
              <Link
                to={
                  proj.language?.slug === "en"
                    ? `/en/projects/${proj.slug}`
                    : `/progetti/${proj.slug}`
                }
                className={`project-item-content grid grid-cols-12 items-center w-full text-base tracking-normal m-0 leading-tight no-underline opacity-0 transition-opacity duration-200 ${
                  !proj.custom_post_type_Project.visitabile
                    ? "cursor-not-allowed pointer-events-none"
                    : "cursor-pointer"
                }`}
              >
                <div className="col-span-10 lg:col-span-8 xl:col-span-5 w-full text-left py-3.5 px-4 sm:px-8 lg:px-4 flex items-center justify-between">
                  <h3 className="font-normal text-base m-0 p-0 inline truncate">
                    {proj.title}
                  </h3>
                  {proj.custom_post_type_Project.visitabile && (
                    <img
                      src={ArrowTopRight}
                      alt="active link"
                      className="inline w-3 lg:w-[15px]"
                    />
                  )}
                </div>
                <div className="col-span-4 hidden xl:flex flex-1 flex-wrap items-center py-5 px-5 border-l border-black flex-shrink truncate">
                  {proj.custom_post_type_Project.ambiti
                    ?.sort((a, b) => (a > b ? 1 : -1))
                    .map((ambito, i) => {
                      const isLast =
                        i === proj.custom_post_type_Project.ambiti.length - 1
                      return (
                        <div
                          key={`${proj.id}-${ambito}-${i}`}
                          className="mr-2 relative"
                        >
                          {ambito}
                          {!isLast && <span className="ml-0">,</span>}
                        </div>
                      )
                    })}
                </div>
                <div className="col-span-2 lg:col-span-4 xl:col-span-3 flex items-stretch">
                  <div className="flex-shrink-0 border-l lg:border-r border-black h-full !min-w-[45px] text-left py-5 px-5">
                    {proj.custom_post_type_Project.anno}
                  </div>
                  <div className="hidden lg:block flex-grow border-black h-full text-left py-5 px-5 truncate">
                    {proj.custom_post_type_Project.cliente}
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li className="relative overflow-hidden">
            <span className="project-divider absolute w-full h-px opacity-0 bg-black top-0 right-0 transition-opacity duration-200"></span>
            <Link
              to="/progetti"
              className="project-item-content flex items-center w-full text-base tracking-normal m-0 leading-tight no-underline opacity-0 cursor-not-allowed pointer-events-none"
            >
              <div className="w-full lg:w-2/5 text-left py-3.5 px-4 sm:px-8 lg:px-4 flex items-center justify-between">
                <p className="mt-4">-</p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ProjectsList
