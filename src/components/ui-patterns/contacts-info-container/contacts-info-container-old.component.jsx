import React from "react"
import ContactForm from "../contact-form/contact-form.component"

const ContactsInfoContainer = () => {
  return (
    <div className="header-left contacts-container">
      <div className="header-text-center flex align-center h-screen">
        <div className="flex">
          <div className="text-block half">
            <h2>New Business.</h2>
            <p>
              Ogni nuovo progetto lancia una sfida. La tua qual è?
              <br />
              Siamo pronti ad ascoltare le tue esigenze e quelle del tuo brand.
              <br />
              Sarà un piacere incontrarti.
            </p>
            <a
              href="mailto:alessandro@saglietti.it"
              target="_blank"
              rel="noreferrer"
              className="tw-block tw-mb-20"
            >
              alessandro@saglietti.it
            </a>
            <a
              href="mailto:alessandrosaglietti@pec.it"
              target="_blank"
              rel="noreferrer"
              className="tw-block tw-mb-20"
            >
              alessandrosaglietti@pec.it
            </a>
          </div>
          <div className="text-block half">
            <h2>Internship.</h2>
            <p>
              Mandaci il tuo portfolio insieme a una breve presentazione.
              <br />
              Ti ricontatteremo appena possibile. Al momento l'organico è al
              completo.
            </p>
            <a href="mailto:info@saglietti.it" target="_blank" rel="noreferrer">
              info@saglietti.it
            </a>
          </div>
        </div>
      </div>
      <hr className="line" />
      <div className="header-text-center flex align-center h-screen">
        <ContactForm />
      </div>
    </div>
  )
}

export default ContactsInfoContainer
