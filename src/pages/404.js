import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link } from "gatsby"
import ArrowRightSVG from "../images/icons/arrow-right.svg"

const NotFound = styled.div`
  width: 100vw;
  height: 80vh;
  padding: 200px 1rem;

  .link-block {
    margin-top: 1rem;
  }

  @media (min-width: 900px) {
    padding: 200px 6rem 100px 40%;
  }
`

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

const NotFoundPage = () => (
  <Layout>
    <NotFound>
      <h1>404</h1>
      <p>
        Quello che stai cercando potrebbe essere momentaneamente irragiungibile
        o non esistere.
      </p>
      <div className="link-block">
        <LinkComponent className="contacts-container TextRevealAnim">
          <Link to="/" className="TextRevealItem">
            Torna alla Home Page{" "}
            <span>
              <img src={ArrowRightSVG} alt="Saglietti.it" />
            </span>
          </Link>
        </LinkComponent>
        <LinkComponent className="contacts-container TextRevealAnim">
          <Link to="/progetti" className="TextRevealItem">
            Scopri tutti i progetti{" "}
            <span>
              <img src={ArrowRightSVG} alt="Progetti" />
            </span>
          </Link>
        </LinkComponent>
      </div>
    </NotFound>
  </Layout>
)

export default NotFoundPage
