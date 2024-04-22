import React from "react"

const MailchimpForm = () => {
  return (
    <form
      action="https://Saglietti.us19.list-manage.com/subscribe/post?u=672ca9d3553b6d3ef2d5e8100&id=33b3cd6aa8&f_id=002eb0e4f0"
      method="post"
      className="relative border-b -mt-1"
    >
      <input
        type="email"
        name="EMAIL"
        required
        id="mce-EMAIL"
        placeholder="Iscriviti alla newsletter"
        className="placeholder-black !bg-transparent focus-visible:!bg-transparent focus-visible:outline-none focus-visible:placeholder-[#00000050] pt-1 pb-4 inline-flex gap-2 items-center justify-between w-full"
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
        className="absolute top-1 right-0 flex items-center justify-center my-auto"
      >
        <svg
          className="w-5 h-5"
          width="100%"
          height="100%"
          viewBox="0 0 32 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17 2L29 13L17 23" stroke="black" strokeWidth="3" />
          <path d="M0 13L29 13" stroke="black" strokeWidth="3" />
        </svg>
      </button>
    </form>
  )
}

export default MailchimpForm
