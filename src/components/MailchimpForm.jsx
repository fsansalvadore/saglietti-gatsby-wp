import React, { useState } from "react"
import { ArrowRight } from "lucide-react"

const MailchimpForm = () => {
  return (
    <form
      action="https://Saglietti.us19.list-manage.com/subscribe/post?u=672ca9d3553b6d3ef2d5e8100&id=33b3cd6aa8&f_id=002eb0e4f0"
      method="post"
      className="relative border-b"
    >
      <input
        type="email"
        name="EMAIL"
        required
        id="mce-EMAIL"
        placeholder="Iscriviti alla newsletter"
        className="placeholder-black !bg-transparent focus-visible:!bg-transparent focus-visible:outline-none focus-visible:placeholder-[#00000050] pb-4 inline-flex gap-2 items-center justify-between w-full"
      />
      <div aria-hidden="true" className="absolute left-[-5000px]">
        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups  */}
        <input
          type="text"
          name="b_672ca9d3553b6d3ef2d5e8100_33b3cd6aa8"
          tabindex="-1"
          value=""
        />
      </div>
      <button
        type="submit"
        value="Subscribe"
        className="absolute top-0 p-1 right-2 flex items-center justify-center my-auto"
      >
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  )
}

export default MailchimpForm
