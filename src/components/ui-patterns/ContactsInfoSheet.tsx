import React from "react"
import InfoSheet from "./InfoSheet/InfoSheet"
import { useInfoSheet } from "./InfoSheet/InfoSheetProvider"
import ContactForm from "./contact-form/contact-form.component"
import { useLocation } from "react-use"
import cn from "classnames"

const ContactsInfoSheet = () => {
  const { isOpen, setIsOpen } = useInfoSheet()

  const isStudio = useLocation().pathname?.startsWith("/studio")

  return (
    <InfoSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={cn(
        "!fixed bottom-0",
        !isStudio &&
          "!bg-black !text-white [&_*]:!text-white [&_input]:!border-white [&_textarea]:!border-transparent [&_input]:!bg-black [&_input]:autofill:!bg-black [&_textarea]:!bg-black [&_input]:!placeholder-white [&_textarea]:!placeholder-white [&_input]:!text-white [&_textarea]:!text-white",
      )}
    >
      <div className="flex flex-col gap-2 lg:gap-4 w-full max-w-[650px]">
        <ContactForm />
      </div>
    </InfoSheet>
  )
}

export default ContactsInfoSheet
