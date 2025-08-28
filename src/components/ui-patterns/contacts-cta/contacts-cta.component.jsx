import React from "react"

const ContactsCTA = () => {
  return (
    <div className="w-full p-[1rem] sm:p-[2rem] py-12 md:py-[100px]">
      <div className="py-4 md:py-20 max-w-[900px] flex flex-col text-2xl">
        <p className="!m-0">Siamo sempre felici di incontrare nuove persone.</p>
        <p>
          Chiamaci al{" "}
          <a href="tel:00393406450856" className="underline">
            +39 340 645 0856
          </a>
          , <br className="hidden md:block" /> scrivi a{" "}
          <a
            href="mailto:info@saglietti.it"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            info@saglietti.it
          </a>{" "}
          o vieni a{" "}
          <a
            href="https://maps.app.goo.gl/pVxowrq4QRewAjbK6"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            trovarci
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default ContactsCTA
