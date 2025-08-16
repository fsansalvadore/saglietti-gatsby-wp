import React, { useEffect } from "react"
import styled from "styled-components"

import { gsap } from "gsap"
import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import { TweenLite, TimelineLite } from "gsap/all"
import CustomEase from "../../common/vendor/gsap/CustomEase"
import { StaticImage } from "gatsby-plugin-image"

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
  color: #fff;

  h1 {
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
    document.body.style.backgroundColor = "#000000"
    return () => (document.body.style.backgroundColor = "#fff")
  }, [])

  return (
    <>
      <StudioContent>
        <header className="p-4 pb-8 sm:p-8 !pt-[120px] sm:!pt-[150px] mx-auto max-w-7xl">
          <h1 className="sr-only">Studio Saglietti</h1>
          <p className="fade-in w-full lg:w-2/3 !text-2xl md:!text-4xl">
            La nostra curiosità è la forza che ci guida nel dare vita a nuovi
            immaginari visivi. Progettiamo linguaggi che esplorano nuovi codici,
            tra materia, spazio, movimento e strumenti digitali.
          </p>
        </header>
        <div className="w-full mx-auto max-w-7xl p-4 sm:p-8 sm:py-24 flex flex-col sm:!grid sm:grid-cols-12 gap-8 sm:gap-20">
          <div className="flex flex-col gap-4 col-span-full md:col-span-8 text-xl">
            <p className="fade-in">
              Crediamo che un buon design richieda tempo e dedizione, per questo
              esploriamo con attenzione l'identità e il carattere di ogni
              cliente con cui collaboriamo. Lavorando a stretto contatto con
              loro, emerge in modo naturale un design funzionale e
              contemporaneo.
            </p>
            <p>
              Lo studio è stato fondato nel 2015 da Alessandro Saglietti. Nel
              corso degli anni, abbiamo collaborato con strategist, designer,
              copywriter e sviluppatori che hanno costruito con noi i numerosi
              progetti che hanno contribuito a definire lo stile e la creatività
              del nostro studio di comunicazione.
            </p>
          </div>
          <StaticImage
            src="../../../images/alessandro-saglietti.webp"
            alt="Alessandro Saglietti"
            className="w-full col-span-full md:!col-span-4 aspect-[582/577]"
          />
        </div>
        <div className="w-full mx-auto max-w-7xl p-4 sm:p-8 sm:py-24 flex flex-col sm:!grid sm:grid-cols-12 gap-8 sm:gap-20">
          <div className="flex flex-col gap-4 lg:col-start-5 col-span-full lg:col-span-8 text-lg">
            <p className="fade-in">
              I nostri servizi i non soddisfano solo le esigenze immediate del
              cliente, ma puntano alla loro comprensione in modo più profondo e
              significativo, con l'obiettivo di generare soluzioni complete e
              che portano a risultati concreti.
            </p>
            <p className="fade-in">
              Branding: Strategia, Direzione creativa, Architettura del brand,
              Art direction, Marchi e logotipi, Graphic design, Identità visiva,
              Progettazione editoriale, Illustrazione, Packaging, Mostre e
              installazioni, Segnaletica, Illustrazione, Packaging,
              Merchandising
            </p>
            <p className="fade-in">
              Digital: Strategia digitale, Comunicazione digitale, Motion
              graphic, Siti web, App design, Interface design, User interface,
              User experience, Social media, Fotografia, Video
            </p>
            <p className="fade-in">
              Collaboriamo con OGR Torino, Intesa Sanpaolo, Gallerie d’Italia,
              National Geographic, Fondazione CRC, Biennale di Venezia, Nitto
              ATP Finals, Fondazione CRT per l’Arte Contemporanea, Condè Nast,
              Musei Reali Torino, Politecnico di Torino, Hatje Cantz, Kappa,
              FIDIVI, Fondazione Artea, Aromitalia, Gioari Cioccolato, Versace,
              IBC Corp, Feat. Ventures, CEI Piemonte, Movement festival, Talent
              Garden, LaGemma Venture, MAXXI Roma, GQ Italia, Circolo del
              Design, Enway, CRA Carlo Ratti Associati, Istituto di Architettura
              Montana, Hiroshima Mon Amour, IPI Immobiliare, Dear Onlus, New
              Monday GmbH, Dear Onlus, Camera di Commercio di Torino, Mondo
              Mostre, Democrance, Grigno Spirits
            </p>
          </div>
        </div>
      </StudioContent>
    </>
  )
}

export default StudioPage
