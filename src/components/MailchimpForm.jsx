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
          className="w-3 h-3 rotate-45"
          width="100%"
          height="100%"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.29289 15.2929L0.585786 16L2 17.4142L2.70711 16.7071L1.29289 15.2929ZM16.7071 2.70711L17.4142 2L16 0.585786L15.2929 1.29289L16.7071 2.70711ZM2 0H1V2H2V0ZM17 1H18V0H17V1ZM16 16V17H18V16H16ZM2.70711 16.7071L16.7071 2.70711L15.2929 1.29289L1.29289 15.2929L2.70711 16.7071ZM2 2H17V0H2V2ZM16 1V16H18V1H16Z"
            fill="black"
          />
        </svg>
      </button>
    </form>
  )
}

export default MailchimpForm
