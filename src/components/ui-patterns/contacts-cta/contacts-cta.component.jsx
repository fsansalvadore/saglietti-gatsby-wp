import React from "react"
import styled from "styled-components"

const ContactsComponent = styled.div`
  width: 100%;
  padding: 100px 5%;
`

const ContactsCTA = () => {
  return (
    <ContactsComponent className="contacts-container">
      <div className="py-4 md:py-20 text-center max-w-[900px] mx-auto flex flex-col items-center text-2xl sm:text-3xl">
        <p className="!m-0">Vogliamo lavorare insieme al tuo progetto?</p>
        <p>
          Chiamaci al numero{" "}
          <a href="tel:00393406450856" className="underline">
            +39 340 645 0856
          </a>
          , <br className="hidden md:block" /> invia un'e-mail a{" "}
          <a href="mailto:info@saglietti.it" className="underline">
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
    </ContactsComponent>
  )
}

export default ContactsCTA
