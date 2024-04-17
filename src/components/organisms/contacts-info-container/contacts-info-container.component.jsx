import React from "react"

const ContactsInfoContainer = () => {
  return (
    <div className="header-left border-b lg:border-b-0 lg:border-r flex-grow">
      <div className="w-full h-full p-4 sm:p-8 flex flex-col gap-8">
        <div className="flex-1">
          <p className="text-4xl md:text-5xl xl:text-7xl">
            Vuoi contattarci o <i>lavorare insieme</i> al tuo progetto?
            <br />
            <i>Scrivici!</i>
          </p>
        </div>
        <div className="text-block">
          <p>
            Per tirocini curricolari o stage invia CV e portfolio a{" "}
            <a href="mailto:info@saglietti.it" target="_blank" rel="noreferrer">
              info@saglietti.it
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactsInfoContainer
