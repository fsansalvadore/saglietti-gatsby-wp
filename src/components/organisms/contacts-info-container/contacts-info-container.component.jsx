import { Link } from "gatsby"
import React from "react"

const ContactsInfoContainer = () => {
  return (
    <div className="header-left border-b flex-grow">
      <div className="w-full h-full p-4 sm:p-8 flex flex-col gap-8">
        <div className="flex-1">
          <p className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl max-w-4xl">
            Vuoi contattarci <br className="block" />o <i>lavorare insieme</i>
            <br className="block" /> al tuo progetto?
            <br />
            <Link
              href="mailto:info@saglietti.it"
              className="underline cursor-pointer opacity-100 transition-opacity hover:opacity-90"
            >
              <i>Scrivici!</i>
            </Link>
          </p>
        </div>
        <div className="text-block">
          <p>
            Per tirocini curricolari o stage invia CV e portfolio a{" "}
            <a
              href="mailto:info@saglietti.it"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              info@saglietti.it
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactsInfoContainer
