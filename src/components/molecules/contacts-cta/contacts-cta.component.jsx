import React from "react"
import { Link } from "gatsby"
// import TransitionLink from 'gatsby-plugin-transition-link'
import styled from "styled-components"
import ArrowRightSVG from "../../../images/icons/arrow-right.svg"

const ContactsComponent = styled.div`
  width: 100%;
  padding: 100px 5%;
  border-top: 1px solid #000;

  a {
    font-family: "Inter", sans-serif;
    width: 100%;
    float: right;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 300;
    margin-right: 0;

    &:hover span {
      transform: translate3d(10px, 0, 0);
    }

    span {
      width: 30px;
      height: 30px;
      min-width: 30px;
      min-height: 30px;
      border-radius: 50%;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }
  }

  @media (min-width: 900px) {
    padding: 150px 5%;

    a {
      width: 33%;
      margin-right: 8.33%;
      font-size: 2rem;

      span {
        width: 42px;
        height: 42px;
        min-width: 42px;
        min-height: 42px;
      }
    }
  }
`

const ContactsCTA = () => {
  return (
    <ContactsComponent className="contacts-container TextRevealAnim">
      <Link to="/contatti" className="TextRevealItem">
        Contattaci{" "}
        <span>
          <img src={ArrowRightSVG} alt="" />
        </span>
      </Link>
    </ContactsComponent>
  )
}

export default ContactsCTA
