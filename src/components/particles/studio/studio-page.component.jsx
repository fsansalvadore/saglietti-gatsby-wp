import React, { useEffect } from "react"
import styled from "styled-components"
import AIAP from "../../../images/AIAP-FIRMA-SOCIO-SENIOR.png"

import { gsap } from "gsap"
import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import { TweenLite, TimelineLite } from "gsap/all"
import CustomEase from "../../particles/vendor/gsap/CustomEase"
import Img from "gatsby-image"

if (typeof window !== `undefined`) {
  gsap.registerPlugin(CustomEase)
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const StudioContent = styled.div`
  position: relative;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;

  h1 {
    font-size: 1rem;
    font-family: "Inter", sans-serif;
    font-weight: 200;
  }

  h2 {
    font-size: 0.8rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    font-weight: 300;
    line-height: 140%;
    letter-spacing: 0;
    margin: 0;

    strong {
      font-weight: 400;
    }
  }

  .text-lg {
    font-family: "Inter", sans-serif;
    font-size: 1.6rem;
    font-weight: normal;
    line-height: 120%;
  }

  section {
    padding: 60px 1rem;
  }

  .studio_container.intro {
    padding: 150px 1rem 5rem 1rem;
  }

  .studio_content-container {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #000;
  }

  .studio_content-left {
    border-top: 1px solid #000;
    border-right: none;
    width: 100%;
  }
  .studio_content-right {
    flex: 1;
    border-top: 1px solid #000;
  }

  .filosofia_container {
    border-bottom: 1px solid #000;
  }

  .clienti_container {
    ul {
      display: block;
      margin: 0;
    }

    li.fade-in {
      display: block;
    }

    .clients_list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 4rem;
      row-gap: 4rem;
      margin-top: 4rem;

      li {
        list-style: none;
        display: flex;
        align-items: center;
        font-weight: 300;
      }
    }
  }

  .metodo_container {
    h2 {
      font-size: 0.8rem;
      font-weight: bold;
      margin-bottom: 1.8rem;
    }

    ul {
      padding: 0;
      margin: 0 0 1rem 0;
    }

    li {
      list-style: none;
      display: flex;
      align-items: flex-start;
      font-weight: 300;
      font-size: 1rem;
      margin-bottom: 15px;

      span {
        font-family: "Inter", sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        min-width: 30px;
        min-height: 30px;
        font-size: 0.7rem;
        font-weight: bold;
        margin-right: 15px;
        border: 1px solid #000;
        border-radius: 50%;

        * {
          line-height: 0;
        }
      }
    }
  }

  .servizi_container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    ul {
      padding: 0;
      margin: 2rem 0;
    }

    li {
      list-style: none;
      font-size: 1rem;
      font-weight: 400;
      line-height: 140%;
      letter-spacing: 0;
    }

    img {
      max-height: 60px;
      justify-self: flex-end;
    }
  }

  @media (min-width: 900px) {
    section {
      padding: 2rem;
    }

    .studio_content-left {
      width: 60vw;
      border-right: 1px solid #000;
    }

    .studio_container.intro {
      padding: 150px 20% 5rem 2rem;
    }

    .studio_content-container {
      flex-direction: row;
    }

    h2 {
      font-size: 0.8rem;
      font-weight: bold;
    }

    p {
      font-size: 1.25rem;
      line-height: 140%;
    }

    .text-lg {
      font-size: 2.9rem;
      line-height: 110%;
    }

    .clienti_container {
      .clients_list {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
      }
    }

    .metodo_container li {
      font-size: 1.25rem;
      margin-bottom: 15px;
    }
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    .clienti_container {
      .clients_list {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }

  @media (min-width: 600px) and (max-width: 768px) {
    .clienti_container {
      .clients_list {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
`

const StudioPage = ({ data }) => {
  console.log("data", data)
  const page = data.wordpress.pages.nodes.find(page => page.slug === "studio")
  useEffect(() => {
    if (typeof window !== `undefined`) {
      const fadeInController = new ScrollMagic.Controller()

      if (document.querySelectorAll(".fade-in").length !== 0) {
        document.querySelectorAll(".fade-in").forEach(fadeInItem => {
          let TextReveaFadeInlTL = new TimelineLite()
          TextReveaFadeInlTL.fromTo(
            fadeInItem,
            {
              opacity: 0,
              y: 50,
            },
            {
              duration: 1.5,
              opacity: 1,
              y: 0,
              ease: CustomEase.create(
                "custom",
                "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1",
              ),
            },
          )

          new ScrollMagic.Scene({
            triggerElement: fadeInItem,
            triggerHook: 0,
            offset: -600,
            reverse: false,
          })
            .setTween(TextReveaFadeInlTL)
            .addTo(fadeInController)
        })
      }
    }
  })

  return (
    <>
      <StudioContent className="bg-[#F3E1C2]">
        <header className="studio_container intro">
          <h1 className="sr-only">Studio Saglietti</h1>
          <p className="fade-in text-lg">
            Costruiamo brand con idee semplici e rilevanti. Il nostro mantra è
            l'essenzialità, che applichiamo in ogni parte del progetto: concept,
            messaggio, design e colore. Perché, eliminando il superfluo, rimanga
            tutto ciò che conta.
          </p>
        </header>
        <div className="w-full flex flex-col sm:grid sm:grid-cols-4 p-8 gap-4">
          <figure className="w-full aspect-video relative border-t border-b border-black">
            <Img
              src={page.featuredImage?.node?.sourceUrl}
              alt="Studio Saglietti"
              className="absolute object-cover object-center inset-0 w-full h-full"
            />
          </figure>
          <div className="col-span-2 col-start-3">
            <p className="fade-in">
              Con la nostra esperienza, sviluppiamo ogni progetto con passione e
              contaminazione internazionale collaborando con professionisti come
              strategist, designer, copywriter, sviluppatori e videomakers
              attenti a realizzare progetti ricercati e unici.
            </p>
            <div>
              <p>Hanno collaborato con noi +</p>
              <p>
                Marzia Anania, Gaia Bonessa, Chiara Bourlot, Sofia Calvo, Evan
                Cigna, Marta Doria, Francesca De Bortoli, Federica Favretti,
                Rachele Fasoli, Ester Galletto, Gloria Geri, Alessia Leonetti,
                Erika Lo Bianco, Alessia Mastrorilli, Laura Notarpietro, Elisa
                Peroglio Carus, Gaia Perenno, Fabrizio Primo, Sara Sartini, Luca
                Sommadossi, Andrea Vinci, Stefano Vitti
              </p>
            </div>
          </div>
        </div>
        <section className="metodo_container flex flex-col md:flex-row">
          <div className="w-full md:!w-1/3">
            <h2 className="">Metodo</h2>
          </div>
          <div className="w-full md:flex-1 flex flex-col">
            <ul>
              <li className="">
                <span>1</span> Riceviamo i need del cliente.
              </li>
              <li className="">
                <span>2</span> Analizziamo i valori del brand.
              </li>
              <li className="">
                <span>3</span> Creiamo un concetto.
              </li>
            </ul>
            <p className="fade-in">
              Sono i tre step con i quali nascono tutti i nostri progetti.
              <br />
              L'obiettivo? Dare vita a una strategia di comunicazione completa,
              innovativa, in grado di offrire forte distintività e generare
              engagement.
            </p>
            <br />
            <p className="fade-in">
              Creiamo linguaggi di comunicazione per qualsiasi tipo di progetto,
              budget, media. Ma il nostro approccio al lavoro è sempre lo
              stesso: offrire al cliente non un collaboratore, ma un partner con
              cui condividere una visione. Un’intesa che ci porta a comprendere
              a fondo gli obiettivi e generare fiducia, massimizzando i
              risultati.
            </p>
            <br />
            <p className="fade-in">
              Mettiamo il nostro know-how e la nostra idea di design al servizio
              di tutti i settori: food &amp; beverage, fashion, technology,
              manifattura, interior design, istituzioni e organizzazioni
              culturali.
            </p>
          </div>
        </section>
        <div className="studio_content-container">
          <div className="studio_content-left">
            <section className="filosofia_container">
              <h2 className="">Filosofia</h2>
              <p className="">
                Il nostro design nasce da qui. Mettendo in relazione{" "}
                <strong>Essenza</strong>, <strong>Espressione</strong> ed{" "}
                <strong>Emozione</strong> per stabilire connessioni armoniche
                con gli utenti. Succede tutti i giorni, facciamo scorrere in
                ogni progetto più di 10 anni di know how, passione e
                contaminazione internazionale. Noi lo chiamiamo Pensiero
                Circolare.
              </p>
            </section>
          </div>
          <div className="studio_content-right">
            <section className="servizi_container">
              <div>
                <h2 className="">Servizi</h2>
                <p className="">
                  <strong>
                    La qualità non è solo un punto d’arrivo. È la partenza e
                    l’ispirazione.
                  </strong>{" "}
                  Una gamma di servizi ampia e strutturata. Uno standard
                  qualitativo che quotidianamente accetta la sfida più
                  importante: pensare avanti, sempre.
                </p>
                <ul>
                  <li className="fade-in">Art Direction</li>
                  <li className="fade-in">Identità Visiva</li>
                  <li className="fade-in">Progettazione Editoriale</li>
                  <li className="fade-in">Grafica Ambientale</li>
                  <li className="fade-in">Wayfinding</li>
                  <li className="fade-in">Exhibition Design</li>
                  <li className="fade-in">Packaging Design</li>
                  <li className="fade-in">Digital Design + Development</li>
                  <li className="fade-in">Motion Graphics</li>
                </ul>
              </div>
              <img
                className="aiap"
                src={AIAP}
                alt="Associazione Italiana Design della Comunicazione Visiva"
              />
            </section>
          </div>
        </div>
        <section className="clienti_container">
          <h2 className="">Clienti e collaborazioni</h2>
          <ul className="clients_list">
            {data.wordpress.clients.nodes.map(client => (
              <li
                key={`${client.title}-${Math.floor(
                  Math.random() * (100 - 999) + 100,
                )}`}
              >
                <span className="">
                  {client.featuredImage && (
                    <img
                      src={client.featuredImage.node.link}
                      alt={client.title}
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </StudioContent>
    </>
  )
}

export default StudioPage
