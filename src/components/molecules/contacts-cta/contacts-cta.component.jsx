import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const ContactsComponent = styled.div`
  width: 100%;
  padding: 100px 5%;
`

const ContactsCTA = () => {
  return (
    <ContactsComponent className="contacts-container">
      <div className="py-4 md:py-20 text-center max-w-[800px] mx-auto flex flex-col items-center text-2xl">
        <p className="!m-0">Vogliamo lavorare insieme al tuo progetto?</p>
        <p>
          Chiamaci al numero{" "}
          <a href="tel:00393406450856" className="underline">
            +39 340 645 0856
          </a>
          , invia un'e-mail a{" "}
          <a href="mailto:info@saglietti.it" className="underline">
            info@saglietti.it
          </a>{" "}
          o vieni a{" "}
          <Link to="/contatti" className="underline">
            trovarci
          </Link>
          .
        </p>
      </div>
    </ContactsComponent>
  )
}

export default ContactsCTA
