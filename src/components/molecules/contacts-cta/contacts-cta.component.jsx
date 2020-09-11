import React from 'react'
import { Link } from 'gatsby'
// import TransitionLink from 'gatsby-plugin-transition-link'
import styled from 'styled-components'
import ArrowRightSVG from '../../../images/icons/arrow-right.svg'

const ContactsComponent = styled.div`
  width: 100%;
  padding: 150px 5%;

  a {
    width: 100%;
    float: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    font-size: 2rem;
    font-weight: normal;
    margin-right: 0;

    &:hover span {
      transform: translate3d(10px, 0, 0);
    }

    span {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }
  }

  @media (min-width: 900px) {
    a {
      width: 33%;
      margin-right: 8.33%;
    }
  }
`

const ContactsCTA = () => {
  return (
    <ContactsComponent className="contacts-container TextRevealAnim">
      <Link to="/contatti" className="TextRevealItem">Contattaci <span><img src={ArrowRightSVG} alt=""/></span></Link>
    </ContactsComponent>
  )
}

export default ContactsCTA;