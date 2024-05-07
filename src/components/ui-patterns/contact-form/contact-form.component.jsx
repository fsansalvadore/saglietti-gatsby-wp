import React from "react"
import { Link } from "gatsby"
import { Input, Checkbox } from "antd"
import styled from "styled-components"
import { motion } from "framer-motion"
import FormErrorComponent from "../../ui/form-error.component"
import { ArrowRight } from "lucide-react"

const { TextArea } = Input

const ContactFormContainer = styled.div`
  position: relative;
  width: 100%;
  letter-spacing: 0;

  h2 {
    font-weight: 400;
    /* font-size: 0.8rem; */
  }
  form,
  input,
  textarea,
  .MuiFormControl-root,
  .ant-input {
    @apply !border-0 !p-4 md:!px-8 lg:!px-4 !border-b !border-black !rounded-0 !placeholder-black;
    width: 100% !important;
    flex: 1;
  }

  .MuiInputBase-input,
  .MuiInput-input,
  .MuiFormLabel-root,
  p,
  .ant-input {
    @apply !rounded-0 !placeholder-black;
    color: #000;
    font-size: 0.75rem !important;
    font-weight: 400;
    font-family: "Inter", sans-serif;
    letter-spacing: 0.03rem;
  }

  .MuiFormLabel-root.Mui-focused,
  .MuiInput-underline:after,
  .MuiCheckbox-colorSecondary.Mui-checked,
  .MuiTouchRipple-root,
  .MuiTouchRipple-root * {
    color: #000;
  }

  .MuiIconButton-root,
  .PrivateSwitchBase-root-1 {
    padding: 0;
  }

  .MuiTouchRipple-root {
    display: none !important;

    * {
      display: none !important;
    }
  }

  .MuiSvgIcon-root {
    margin-left: -5px;
    transform: scale(0.65);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  button {
    font-weight: 400;
    letter-spacing: 0.02rem;
    padding: 10px 20px;
    border: none;
    box-shadow: none;
    border-radius: 0;
    display: flex;
    pointer-events: auto;
    justify-content: space-between;
  }

  @media (max-width: 1200px) {
  }
`

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      message: "",
      btn: "Invia",
      feedback: "",
      loading: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = e => {
    this.setState({ loading: true })
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state }),
    })
      .then(() => {
        this.setState({
          feedback: "Messaggio inviato 👍",
          loading: false,
          name: "",
          message: "",
          email: "",
        })
        setTimeout(() => {
          this.setState({
            feedback: "",
          })
        }, 3000)
      })
      .catch(error => {
        this.setState({ feedback: error, loading: false })
      })

    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { name, email, message, btn, feedback, loading } = this.state

    return (
      <ContactFormContainer className="h-full">
        <form
          onSubmit={this.handleSubmit}
          name="contact"
          method="POST"
          data-netlify="true"
          className="h-full flex flex-col !m-0"
        >
          <input
            type="hidden"
            name="form-name"
            value="contact"
            netlify-honeypot="bot-field"
            hidden
          />

          <Input
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            required
            style={{ borderRadius: 0 }}
            onChange={this.handleChange}
            className="!border-0 !p-4 md:!px-8 lg:!px-4 !border-b !border-black !rounded-0 !placeholder-black"
          />
          <Input
            className="!border-0 !p-4 md:!px-8 lg:!px-4 !border-b !border-black !rounded-0 !placeholder-black"
            type="text"
            label="Nome"
            placeholder="Nome"
            name="name"
            style={{ borderRadius: 0 }}
            value={name}
            required
            onChange={this.handleChange}
          />
          <TextArea
            label="Messaggio"
            placeholder="Messaggio"
            name="message"
            value={message}
            style={{ borderRadius: 0 }}
            required
            rows={4}
            maxLength={900}
            onChange={this.handleChange}
            className="flex-2 md:!flex-4 !border-0 !p-4 md:!px-8 lg:!px-4 !border-b !border-black !rounded-0 !placeholder-black"
          />
          <div className="p-4 md:!px-8 lg:!px-4">
            <div className="flex items-center gap-2 !text-xs">
              <Checkbox
                value="checkedA"
                required
                inputProps={{ "aria-label": "Checkbox A" }}
              />{" "}
              <span>
                Ho letto e accettato l'
                <Link to="/privacy" className="underline">
                  informativa sulla privacy
                </Link>
                .
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="flex-1 hover:!bg-[#00000010] transition-colors flex items-center gap-2 !border-0 !border-solid !border-t border-black !p-4 md:!px-8 lg:!px-4 "
          >
            {
              // check if loading or success
              loading ? "loading" : btn
            }
            <ArrowRight className="w-3 h-3" />
          </button>
        </form>

        <FormErrorComponent>
          {feedback && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: [0, 0, 0, 1], duration: 0.5 }}
            >
              {feedback}
            </motion.p>
          )}
        </FormErrorComponent>
      </ContactFormContainer>
    )
  }
}

export default ContactForm
