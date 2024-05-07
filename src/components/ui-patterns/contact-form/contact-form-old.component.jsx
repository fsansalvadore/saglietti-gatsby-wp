import React from "react"
import { Link } from "gatsby"
import { Input, Checkbox } from "antd"
import styled from "styled-components"
import { motion } from "framer-motion"
import FormErrorComponent from "../../ui/form-error.component"

const ContactFormContainer = styled.div`
  position: relative;
  width: 100%;
  letter-spacing: 0;

  h2 {
    font-weight: 400;
    font-size: 0.8rem;
  }
  form,
  input,
  textarea,
  .MuiFormControl-root {
    width: 100% !important;
  }

  .MuiInputBase-input,
  .MuiInput-input,
  .MuiFormLabel-root,
  p {
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

  .form-disclaimer {
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 40px;

    p {
      margin: 0 0 2px 0;
    }

    .privacy-check {
      display: flex;
      align-items: center;
    }

    .required-label {
      text-align: right;
    }
  }

  button {
    float: right;
    font-weight: 400;
    letter-spacing: 0.02rem;
    background: #000;
    color: #fff;
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
      btn: "Invia messaggio",
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
      <ContactFormContainer>
        <h2>Lasciaci un messaggio</h2>
        <form
          onSubmit={this.handleSubmit}
          name="contact"
          method="POST"
          data-netlify="true"
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
            name="email"
            value={email}
            required
            onChange={this.handleChange}
          />

          <br />
          <br />

          <Input
            type="text"
            label="Nome"
            name="name"
            value={name}
            required
            onChange={this.handleChange}
          />

          <br />
          <br />

          <Input
            label="Messaggio"
            name="message"
            value={message}
            required
            onChange={this.handleChange}
          ></Input>
          <div className="form-disclaimer">
            <div className="privacy-check">
              <Checkbox
                value="checkedA"
                required
                inputProps={{ "aria-label": "Checkbox A" }}
              />{" "}
              <p>
                Ho letto e accettato l’
                <Link to="/privacy">informativa sulla privacy</Link>.*
              </p>
            </div>
            <div className="required-label">
              <p>* Campi obbligatori</p>
            </div>
          </div>

          <br />
          <br />
          <button type="submit">
            {
              // check if loading or success
              loading ? "loading" : btn
            }
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
