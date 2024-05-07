import React, { useEffect } from "react"
import styled from "styled-components"

import { gsap } from "gsap"
import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import { TweenLite, TimelineLite } from "gsap/all"
import CustomEase from "../../common/vendor/gsap/CustomEase"
import { StaticImage } from "gatsby-plugin-image"
import SectionContainer from "../../SectionContainer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/Accordion"

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

  h1 {
    font-family: "Inter", sans-serif;
    font-weight: 200;
  }

  p {
    font-weight: 400;
    line-height: 140%;
    letter-spacing: 0;
  }

  .filosofia_container {
    border-bottom: 1px solid #000;
  }

  .servizi_container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    img {
      max-height: 60px;
      justify-self: flex-end;
    }
  }

  @media (min-width: 900px) {
    .studio_content-left {
      width: 60vw;
      border-right: 1px solid #000;
    }

    .studio_content-container {
      flex-direction: row;
    }
  }
`

const StudioPage = ({ data }) => {
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

  useEffect(() => {
    document.body.style.backgroundColor = "#d7e1e1"
    return () => (document.body.style.backgroundColor = "#fff")
  }, [])

  const sortedClients = data.wordpress.clients.nodes.sort((a, b) =>
    a.title > b.title ? 1 : -1,
  )

  return (
    <>
      <StudioContent>
        <header className="p-4 pb-8 sm:p-8 !pt-[120px] sm:!pt-[150px]">
          <h1 className="sr-only">Studio Saglietti</h1>
          <p className="fade-in max-w-[1000px] !text-2xl md:!text-4xl">
            Costruiamo <i>brand</i> con idee semplici e rilevanti.
            <br />
            Il nostro mantra è l'essenzialità, che applichiamo in ogni parte del
            progetto: <i>concept</i>, <i>messaggio</i>, <i>design</i> e{" "}
            <i>colore</i>. Perché, eliminando il superfluo, rimanga tutto ciò
            che conta.
          </p>
        </header>
        <SectionContainer>
          <StaticImage
            src="../../../images/studio/saglietti-about-1.jpeg"
            alt="Studio Saglietti"
            className="w-full sm:!col-span-2 lg:!col-span-1 h-auto"
          />
          <div className="flex flex-col gap-4 col-span-2 col-start-3 text-xl">
            <p className="fade-in">
              Con la nostra esperienza, sviluppiamo ogni progetto con passione e
              contaminazione internazionale collaborando con professionisti come{" "}
              <i>strategist</i>, <i>designer</i>, <i>copywriter</i>,{" "}
              <i>sviluppatori</i> e <i>videomakers</i> attenti a realizzare
              progetti ricercati e unici.
            </p>
            <div className="flex flex-col gap-2">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Hanno collaborato con noi</AccordionTrigger>
                  <AccordionContent className="!text-sm">
                    Marzia Anania, Gaia Bonessa, Chiara Bourlot, Sofia Calvo,
                    Evan Cigna, Marta Doria, Francesca De Bortoli, Federica
                    Favretti, Rachele Fasoli, Ester Galletto, Gloria Geri,
                    Alessia Leonetti, Erika Lo Bianco, Alessia Mastrorilli,
                    Laura Notarpietro, Elisa Peroglio Carus, Gaia Perenno,
                    Fabrizio Primo, Sara Sartini, Luca Sommadossi, Andrea Vinci,
                    Stefano Vitti
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </SectionContainer>
        <SectionContainer>
          <div className="flex flex-col gap-4 col-span-2 col-start-3">
            <StaticImage
              src="../../../images/studio/saglietti-about-2.jpeg"
              alt="Studio Saglietti"
              className="object-cover object-center w-full h-auto"
            />
          </div>
        </SectionContainer>
        <SectionContainer bgColor="#fff">
          <div className="w-full sm:col-span-2">
            <h2 className="text-xl">metodo.</h2>
          </div>
          <div className="flex flex-col gap-4 col-span-2 text-xl">
            <p className="mb-4 sm:mb-10">
              Crediamo che un design efficace sia il risultato di un'idea che
              funziona, un'idea che scaturisce da intuizioni strategiche ben
              ponderate. Per noi, giungere al cuore di ogni progetto è una
              missione.
            </p>
            <p className="">
              Noi lo chiamiamo <strong>Pensiero Circolare</strong>: un processo
              generativo che guida ogni aspetto del nostro lavoro e si articola
              in tre fasi chiave:
            </p>
            <Accordion type="multiple" collapsible>
              <AccordionItem value="ascolto">
                <AccordionTrigger className="">1 Ascolto</AccordionTrigger>
                <AccordionContent className="text-xl">
                  Raccogliamo i bisogni e le esigenze del cliente, per ottenere
                  una comprensione completa del contesto e dei desideri del
                  brand.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="analisi">
                <AccordionTrigger className="">2 Analisi</AccordionTrigger>
                <AccordionContent className="text-xl">
                  Esaminiamo i valori e la personalità della marca, adottando un
                  approccio strategico per concretizzare i passi successivi.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="design">
                <AccordionTrigger className="">3 Design</AccordionTrigger>
                <AccordionContent className="text-xl">
                  Elaboriamo il messaggio e lo traduciamo in un'espressione
                  visiva che colpisca nel segno.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </SectionContainer>
        <SectionContainer bgColor="#FFF50F">
          <div className="w-full sm:col-span-2">
            <h2 className="text-xl">servizi.</h2>
          </div>
          <div className="flex flex-col gap-4 col-span-2 text-xl">
            <p>
              Le nostre soluzioni non soddisfano solo le esigenze immediate del
              cliente, ma puntano a una comprensione della marca più profonda e
              significativa, con l'obiettivo di creare una connessione autentica
              e duratura con il suo pubblico.
            </p>
            <p className="md:mb-8">
              Offriamo una gamma di servizi ampia e strutturata. Uno standard
              qualitativo che non è solo un punto d'arrivo, ma è la partenza e
              l'ispirazione e accetta la sfida più importante: creare un
              incontro tra il brand e il suo pubblico, utilizzando solo gli
              strumenti che apportano significato e valore alle idee.
            </p>
            <div>
              <h3 className="m-0 text-base">Branding</h3>
              <p className="m-0">
                Strategy, Creative direction, Art direction, Brand architecture,
                Brand logotype, Graphic design, Identità visiva, Progettazione
                editoriale, Illustrazione, Packaging, Retail design, Exhibit
                design, Environmental, Wayfinding & Signage
              </p>
            </div>
            <div>
              <h3 className="m-0 text-base">Digital</h3>
              <p className="m-0">
                Digital strategy, Digital communication, Design systems, Motion
                graphics, Web & App design, Interface design, User interface,
                User experience, Social media
              </p>
            </div>
          </div>
        </SectionContainer>
        <SectionContainer>
          <div className="w-full sm:col-span-2">
            <h2 className="text-xl">clienti.</h2>
          </div>
          <div className="flex flex-col gap-4 col-span-2 text-xl">
            <p>
              Creiamo linguaggi di comunicazione per qualsiasi tipo di{" "}
              <strong>progetto</strong>,<strong>budget</strong> e{" "}
              <strong>media</strong>. Ma il nostro approccio al lavoro è sempre
              lo stesso: offrire al cliente un partner con cui condividere una
              visione. Un'intesa che ci porta a comprendere a fondo gli
              obiettivi e generare fiducia, massimizzando i risultati.
            </p>
            <p>
              Mettiamo il nostro know-how la nostra esperienza e la nostra idea
              di design al servizio di tutti i settori: <i>food & beverage</i>,
              <i>fashion</i>, <i>technology</i>, <i>manifattura</i>,{" "}
              <i>interior design</i>, <i>istituzioni</i> e
              <i>organizzazioni culturali</i>.
            </p>
          </div>
        </SectionContainer>
        <SectionContainer>
          <div className="col-span-1 h-full flex sm:items-end">
            <StaticImage
              src="../../../images/AIAP-FIRMA-SOCIO-SENIOR.png"
              alt="AIAP - Socio Professionista Senior"
              className="w-full max-w-40 h-auto"
            />
          </div>
          <div className="flex flex-col gap-4 col-span-2 col-start-3 text-xl">
            <p>
              Abbiamo collaborato con{" "}
              {sortedClients?.map(client => (
                <span
                  className="inline  [&_span]:last:hidden"
                  key={`${client.title}-${Math.floor(
                    Math.random() * (100 - 999) + 100,
                  )}`}
                >
                  {client.title}
                  <span>, </span>
                </span>
              ))}
            </p>
          </div>
        </SectionContainer>
      </StudioContent>
    </>
  )
}

export default StudioPage
