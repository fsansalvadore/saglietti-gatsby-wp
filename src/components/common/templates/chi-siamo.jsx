// biome-ignore lint/correctness/noUnusedImports: React in scope for ESLint react/react-in-jsx-scope
import React from "react"
import parse from "html-react-parser"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/Accordion"
import CoverHoverMedia from "../CoverHoverMedia"

const InlineHoverImageWord = ({ label, imageSrc, imageAlt }) => {
  if (!label) return null

  return (
    <span className="relative inline-block group cursor-default">
      <span className="underline decoration-black/40 hover:decoration-black underline-offset-4">
        {label}
      </span>
      {imageSrc ? (
        <span className="pointer-events-none absolute bottom-full left-full z-20 mb-2 ml-2 hidden w-40 sm:w-48 rounded-sm border border-black/10 bg-white shadow-xl group-hover:block">
          <img
            src={imageSrc}
            alt={imageAlt || label}
            className="h-auto w-full object-cover"
          />
        </span>
      ) : null}
    </span>
  )
}

const ChiSiamoPage = ({ data, services }) => {
  const pageData = data?.wordpress?.page?.chisiamoacf

  if (!pageData) {
    return null
  }

  const {
    testoIntroduttivo,
    colonnaSinistra,
    colonnaDestra,
    immagine1,
    immagine2,
    colonnaFinaleSinistra,
    colonnaFinaleDestra,
  } = pageData

  // Parser function to convert <details> and <summary> to Accordion components
  const parseWithAccordion = html => {
    if (!html) return null

    // Step 1: Decode HTML entities and clean up the encoded tags
    let processedHtml = html
      .replace(/&lt;details&gt;/gi, "<details>")
      .replace(/&lt;\/details&gt;/gi, "</details>")
      .replace(/&lt;summary&gt;/gi, "<summary>")
      .replace(/&lt;\/summary&gt;/gi, "</summary>")

    // Step 1.5: Convert custom inline hover-image syntax into a temporary tag.
    // Authoring syntax in WordPress: {{hover:Visible Word|https://image.url/file.jpg}}
    processedHtml = processedHtml.replace(
      /\{\{hover:([^|}]+)\|([^|}]+)\}\}/gi,
      (_, word, src) =>
        `<hoverword data-word="${word.trim()}" data-src="${src.trim()}" data-alt="${word.trim()}"></hoverword>`,
    )

    // Step 2: Remove <p> wrappers around details/summary tags
    // This handles cases where WordPress wraps these tags in <p> elements
    processedHtml = processedHtml
      .replace(/<p[^>]*>\s*<details>\s*<br\s*\/?>\s*/gi, "<details>")
      .replace(/<p[^>]*>\s*<details>\s*<\/p>/gi, "<details>")
      .replace(/\s*<br\s*\/?>\s*<\/details>\s*<\/p>/gi, "</details>")
      .replace(/<p[^>]*>\s*<\/details>\s*<\/p>/gi, "</details>")
      .replace(/<p[^>]*>\s*<summary>/gi, "<summary>")
      .replace(/<\/summary>\s*<\/p>/gi, "</summary>")
      .replace(/<br\s*\/?>\s*<summary>/gi, "<summary>")
      .replace(/<\/summary>\s*<br\s*\/?>/gi, "</summary>")

    // Step 3: Parse with accordion replacement
    const accordionCounter = { value: 0 }

    return parse(processedHtml, {
      replace: domNode => {
        // Handle <details> element
        if (domNode.name === "details") {
          accordionCounter.value++
          const accordionId = `accordion-${accordionCounter.value}`

          // Collect content inside details
          let summaryText = ""
          const contentNodes = []
          let insideSummary = false

          domNode.children?.forEach(child => {
            if (child.name === "summary") {
              insideSummary = true
              // Extract text from summary
              child.children?.forEach(summaryChild => {
                if (summaryChild.type === "text") {
                  summaryText += summaryChild.data
                }
              })
              insideSummary = false
            } else if (!insideSummary) {
              // Collect non-summary content
              if (child.type === "text" && child.data.trim()) {
                contentNodes.push(child.data.trim())
              } else if (child.type === "tag") {
                contentNodes.push(child)
              }
            }
          })

          // Convert content nodes back to HTML string for re-parsing
          const contentHtml = contentNodes
            .map(node => {
              if (typeof node === "string") {
                return `<p>${node}</p>`
              }
              return domNodeToHtml(node)
            })
            .join("")

          return (
            <Accordion type="single" collapsible key={accordionId}>
              <AccordionItem value={accordionId}>
                <AccordionTrigger className="text-sm xl:!text-sm">
                  {summaryText}
                </AccordionTrigger>
                <AccordionContent>
                  {contentHtml ? parse(contentHtml) : null}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        }

        // Handle custom inline hover words
        if (domNode.name === "hoverword") {
          const label = domNode.attribs?.["data-word"] || ""
          const imageSrc = domNode.attribs?.["data-src"] || ""
          const imageAlt = domNode.attribs?.["data-alt"] || label

          return (
            <InlineHoverImageWord
              label={label}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
            />
          )
        }
      },
    })
  }

  // Helper function to convert DOM node back to HTML string
  const domNodeToHtml = node => {
    if (!node) return ""
    if (node.type === "text") return node.data

    const attrs = node.attribs
      ? Object.entries(node.attribs)
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ")
      : ""

    const openTag = attrs ? `<${node.name} ${attrs}>` : `<${node.name}>`
    const closeTag = `</${node.name}>`
    const children = node.children
      ? node.children.map(domNodeToHtml).join("")
      : ""

    return `${openTag}${children}${closeTag}`
  }

  return (
    <div className="w-full mx-auto p-4 sm:p-8 sm:py-12 flex flex-col gap-8 sm:gap-20 text-md xl:text-xl [&_h3]:text-sm [&_summary]:text-sm">
      {/* Intro Section */}
      {testoIntroduttivo && (
        <div className="[&_p]:pb-4 text-xl lg:text-2xl pt-28 xl:tracking-[-0.01em] max-w-4xl">
          {parseWithAccordion(testoIntroduttivo)}
        </div>
      )}

      {/* Staff Section */}
      <div className="grid sm:grid-cols-2 gap-4 border-t border-black pt-20">
        {colonnaSinistra && (
          <div className="">{parseWithAccordion(colonnaSinistra)}</div>
        )}
      </div>

      {/* Images Section */}
      {(immagine1?.img?.sourceUrl || immagine2?.img?.sourceUrl) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {immagine1?.img?.sourceUrl && (
            <CoverHoverMedia
              className="w-full"
              baseUrl={immagine1.img.sourceUrl}
              hoverUrl={immagine1.imgHover?.mediaItemUrl}
              alt="Studio Saglietti"
              aspectClass="aspect-[4/3]"
              hoverScale
            />
          )}
          {immagine2?.img?.sourceUrl && (
            <CoverHoverMedia
              className="w-full"
              baseUrl={immagine2.img.sourceUrl}
              hoverUrl={immagine2.imgHover?.mediaItemUrl}
              alt="Studio Saglietti"
              aspectClass="aspect-[4/3]"
              hoverScale
            />
          )}
        </div>
      )}

      {/* Services/Clients Section */}
      <div className="grid sm:grid-cols-2 gap-4 border-t border-black pt-20">
        {colonnaFinaleSinistra && (
          <div>{parseWithAccordion(colonnaFinaleSinistra)}</div>
        )}
        <div />
        <div className="col-span-full flex flex-col gap-8 md:gap-12 pt-8">
          {services?.map(({ name, services }) => (
            <div key={name} className="flex flex-col gap-2">
              <h3>{name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {services?.map(service => (
                  <div key={service.title} className="flex flex-col gap-2">
                    <CoverHoverMedia
                      className="w-full"
                      baseUrl={
                        service?.servizi_acf?.media?.sourceUrl ||
                        service?.featuredImage?.node?.sourceUrl
                      }
                      fallbackUrl={
                        service?.servizi_acf?.media?.sourceUrl
                          ? service?.featuredImage?.node?.sourceUrl
                          : undefined
                      }
                      hoverUrl={service?.servizi_acf?.mediaHover?.mediaItemUrl}
                      alt={service.title}
                      aspectClass="aspect-video"
                    />
                    <h4 className="text-xs">{service.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 border-t border-black pt-20">
        {colonnaFinaleDestra && (
          <div>{parseWithAccordion(colonnaFinaleDestra)}</div>
        )}
      </div>

      {/* Contacts Section */}
      <div className="grid sm:grid-cols-2 gap-4 border-y border-black py-20">
        {colonnaDestra && <div>{parseWithAccordion(colonnaDestra)}</div>}
      </div>
    </div>
  )
}

export default ChiSiamoPage
