import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import ArrowRightSVG from "../../../images/icons/arrow-right.svg"

const StudioCtaContainer = styled.div`
  padding: 200px 1rem 150px 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  h3 {
    font-family: "Inter";
    font-weight: normal;
  }

  p {
    font-size: 1.45rem;
  }

  @media screen and (min-width: 900px) {
    padding: 300px 10% 250px 10%;

    p {
      font-size: 2.35rem;
      padding-bottom: 1rem;
    }
  }
`

const LinkComponent = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;

  a {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    text-decoration: none;
    font-size: 1rem;
    font-family: "Inter-2", sans-serif;
    font-weight: 300;
    margin-right: 0;

    &:hover span {
      transform: translate3d(10px, 0, 0);
    }

    span {
      width: 20px;
      height: 20px;
      min-width: 20px;
      min-height: 20px;
      border-radius: 50%;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      margin-left: 12px;

      img {
        width: 50%;
        height: 50%;
      }
    }
  }

  @media (min-width: 900px) {
    a {
      font-size: 1.3rem;
    }
  }
`

const StudioCTA = () => {
  return (
    <StudioCtaContainer className="fade-in">
      <h3>Studio</h3>
      <p>
        Costruiamo linguaggi estetici in grado di trasformare il contatto con
        l’utente in una narrazione emotiva.
      </p>
      <LinkComponent className="contacts-container TextRevealAnim">
        <Link to="/studio" className="TextRevealItem">
          Approfondisci{" "}
          <span>
            <img src={ArrowRightSVG} alt="" />
          </span>
        </Link>
      </LinkComponent>
    </StudioCtaContainer>
  )
}

export default StudioCTA
