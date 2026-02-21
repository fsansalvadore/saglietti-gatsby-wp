import React from "react"
import parse from "html-react-parser"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/Accordion"

const ChiSiamoPage = ({ data }) => {
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
    let accordionCounter = 0

    return parse(processedHtml, {
      replace: domNode => {
        // Handle <details> element
        if (domNode.name === "details") {
          accordionCounter++
          const accordionId = `accordion-${accordionCounter}`

          // Collect content inside details
          let summaryText = ""
          let contentNodes = []
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
                <AccordionTrigger className="text-md xl:text-xl">
                  {summaryText}
                </AccordionTrigger>
                <AccordionContent>
                  {contentHtml ? parse(contentHtml) : null}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
    <div className="w-full mx-auto p-4 sm:p-8 sm:py-20 flex flex-col gap-8 sm:gap-20">
      {/* Intro Section */}
      {testoIntroduttivo && (
        <div className="[&_p]:pb-4 text-xl lg:text-2xl xl:text-4xl pt-20 xl:tracking-[-0.01em]">
          {parseWithAccordion(testoIntroduttivo)}
        </div>
      )}

      {/* Staff/Contacts Section */}
      <div className="grid sm:grid-cols-2 gap-4 text-md xl:text-xl">
        {colonnaSinistra && (
          <div className="">{parseWithAccordion(colonnaSinistra)}</div>
        )}
        {colonnaDestra && (
          <div className="">{parseWithAccordion(colonnaDestra)}</div>
        )}
      </div>

      {/* Images Section */}
      {(immagine1?.sourceUrl || immagine2?.sourceUrl) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {immagine1?.sourceUrl && (
            <img
              src={immagine1.sourceUrl}
              alt="Studio Saglietti"
              className="w-full aspect-[4/3] object-cover"
            />
          )}
          {immagine2?.sourceUrl && (
            <img
              src={immagine2.sourceUrl}
              alt="Studio Saglietti"
              className="w-full aspect-[4/3] object-cover"
            />
          )}
        </div>
      )}

      {/* Services/Clients Section */}
      <div className="grid sm:grid-cols-2 gap-4 text-md xl:text-xl">
        {colonnaFinaleSinistra && (
          <div>{parseWithAccordion(colonnaFinaleSinistra)}</div>
        )}
        {colonnaFinaleDestra && (
          <div>{parseWithAccordion(colonnaFinaleDestra)}</div>
        )}
      </div>
    </div>
  )
}

export default ChiSiamoPage
