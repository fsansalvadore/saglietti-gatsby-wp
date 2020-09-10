import React, { useState } from "react"
import { Link } from 'gatsby'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'
import { TextField, Checkbox} from '@material-ui/core'
import styled from 'styled-components'

import FormErrorComponent from '../../atoms/form-error.component'

const CONTACT_MUTATION = gql`
 mutation CreateSubmissionMutation($clientMutationId: String!, $email: String!, $nome: String!, $messaggio: String!){
  createSubmission(input: {clientMutationId: $clientMutationId, email: $email, nome: $nome, messaggio: $messaggio}) {
    data
    success
  }
 }
`

const ContactFormContainer = styled.div`
  width: 100%;
  letter-spacing: -0.015rem;

  h2 {
    font-weight: 400;
    font-size: 0.8rem;
  }
  form, input, textarea,
  .MuiFormControl-root {
    width: 100% !important;
  }

  .MuiInputBase-input, .MuiInput-input,
  .MuiFormLabel-root, p {
    color: #000;
    font-size: 0.75rem !important;
    font-weight: bold;
    font-family: 'FFMarkWebProLight', sans-serif !important;
    letter-spacing: -0.015rem;
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
  input:-webkit-autofill:active  {
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
    font-weight: bold;
    letter-spacing: -0.015rem;
    background: #000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    box-shadow: none;
    border-radius: 0;
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1200px) {
    
  }
` 

const ContactForm = () => {
  
  const [emailValue, setEmailValue] = useState('')
  const [nomeValue, setNomeValue] = useState('')
  const [messaggioValue, setMessaggioValue] = useState('')
  
  return (
    <Mutation mutation={CONTACT_MUTATION}>
      {(createSubmission, { loading, error, data }) => (
        <ContactFormContainer>
          <h2>Lasciaci un messaggio</h2>
          <form  noValidate autoComplete="off"
            onSubmit={async event => {
              event.preventDefault()
              createSubmission({
                variables: {
                  clientMutationId: 'Contatti',
                  email: emailValue,
                  nome: nomeValue,
                  messaggio: messaggioValue
                }
              })
            }}
          >
            {/* <label htmlFor='emailInput'>Email: </label> */}
              <TextField id='emailInput' label="Email" value={emailValue} required
                onChange={event => {
                  setEmailValue(event.target.value)
                }}
              />

              <br /><br />

              {/* <label htmlFor='nomeInput'>Nome: </label> */}
              <TextField id='nomeInput' label="Nome" value={nomeValue} required
                onChange={event => {
                  setNomeValue(event.target.value)
                }}
              />

              <br /><br />

              {/* <label htmlFor='messaggioInput'>Messaggio: </label> */}
              <TextField id='messaggioInput' label="Messaggio" value={messaggioValue} required
                onChange={event => {
                  setMessaggioValue(event.target.value)
                }}
              >
              </TextField>
              <div className="form-disclaimer">
                <div className="privacy-check">
                  <Checkbox
                    value="checkedA"
                    inputProps={{ 'aria-label': 'Checkbox A' }}
                  /> <p>Ho letto e accettato l’<Link to="/privacy">informativa sulla privacy</Link>.*</p>
                </div>
                <div className="required-label">
                  <p>* Campi obbligatori</p>
                </div>
              </div>

              <br /><br />

              <button type="submit">Invia messaggio</button>
          </form>
          
          <FormErrorComponent>
            {loading && <p>Attendi un attimo...</p>}
            {error && (
              <p>Accerti di aver compilato tutti i campi.</p>
            )}
            {data && <p>Messaggio inviato.</p>}
          </FormErrorComponent>
        </ContactFormContainer>
      )}
    </Mutation>
  )
}

export default ContactForm