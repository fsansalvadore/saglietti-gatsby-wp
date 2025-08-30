import React from "react"
import InfoSheet from "./InfoSheet/InfoSheet"
import { useInfoSheet } from "./InfoSheet/InfoSheetProvider"
import ContactForm from "./contact-form/contact-form.component"

const ContactsInfoSheet = () => {
  const { isOpen, setIsOpen } = useInfoSheet()

  return (
    <InfoSheet isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-2 lg:gap-4 w-full max-w-[650px]">
        <ContactForm />
      </div>
    </InfoSheet>
  )
}

export default ContactsInfoSheet
