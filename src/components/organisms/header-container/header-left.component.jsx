import React from "react"
import { Link } from "gatsby"
import ArrowRightSVG from "../../../images/icons/arrow-right.svg"
import styled from "styled-components"

const LinkComponent = styled.div`
  width: 100%;
  padding: 20px 0;

  a {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
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
      margin-right: 8.33%;
      font-size: 1.3rem;
    }
  }
`

const HeaderLeftContainer = styled.div``

const HeaderLeft = () => {
  return (
    <HeaderLeftContainer className="header-left">
      <div className="header-text-center flex align-center h-screen fade-in">
        <h1>
          Saglietti è uno studio di comunicazione specializzato in identità
          visiva, advertising, editoria ed exhibit design.
        </h1>
      </div>
      <div className="header-text-center flex align-center h-screen fade-in">
        <div>
          <p>
            Creiamo progetti in grado di trasformare il brand in un racconto,
            con un unico obiettivo: <strong>creare valore</strong>.
          </p>
          <LinkComponent className="contacts-container TextRevealAnim">
            <Link to="/progetti" className="TextRevealItem">
              Scopri tutti i progetti{" "}
              <span>
                <img src={ArrowRightSVG} alt="" />
              </span>
            </Link>
          </LinkComponent>
        </div>
      </div>
    </HeaderLeftContainer>
  )
}

export default HeaderLeft
