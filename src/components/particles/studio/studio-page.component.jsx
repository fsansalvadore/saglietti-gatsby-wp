import React, {useEffect} from 'react'
import styled from 'styled-components'

import { gsap } from "gsap";
import * as ScrollMagic from "scrollmagic-with-ssr"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { TweenLite, TimelineLite } from "gsap/all";
import CustomEase from '../../particles/vendor/gsap/CustomEase'

if(typeof window !== `undefined`) {
  gsap.registerPlugin( CustomEase )
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}


const StudioContent = styled.div`
    position: relative;
    width: 100%;
    padding: 100px 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;

    h1 {
        font-size: 1rem;
        font-family: 'FFMarkWebProLight', sans-serif;
        font-weight: 200;
    }

    h2 {
        font-size: 0.8rem;
        font-weight: bold;
    }

    p {
        font-size: 1.25rem;
        font-weight: bold;
        line-height: 140%;
        letter-spacing: -0.012em;
    }

    .text-lg  {
        font-size: 1.75rem;
        line-height: 120%;
    }

    section {
        margin: 2rem 0;
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
                font-weight: bold;
            }
        }
    }

    .metodo_container {
        width: 100%;
        display: flex;
        flex-direction: column;

        & > div {
            width: 100%;
        }

        h2 {
            font-size: 0.8rem;
            font-weight: bold;
            margin-bottom: 1.8rem;

        }

        ul {
            padding: 0;
            margin: 0 0 3rem 0;
        }
    
        li {
            list-style: none;
            display: flex;
            align-items: flex-start;
            font-weight: bold;
            font-size: 1.35rem;
            margin-bottom: 15px;
            
            span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                min-width: 30px;
                min-height: 30px;
                font-size: 0.8rem;
                font-weight: bold;
                margin-right: 15px;
                border: 2px solid #000;
                border-radius: 50%;
                
                * {
                    line-height: 0;
                }
            }
        }
    }

    @media (min-width: 900px) {
        padding: 150px 12rem 80px 2rem;

        h2 {
            font-size: 0.8rem;
            font-weight: bold;
        }
    
        p {
            font-size: 1.75rem;
            line-height: 130%;
        }

        .text-lg {
            font-size: 3rem;
            line-height: 100%;
        }

        .clienti_container {
            .clients_list {
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            }
        }

        .metodo_container li {
            font-size: 1.75rem;
            margin-bottom: 15px;
        }
    }


    @media (min-width: 768px) and (max-width: 1200px) {
        .clienti_container {
            .clients_list {
                grid-template-columns: 1fr 1fr 1fr 1fr;
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


const StudioPage = ({data}) => {

    useEffect(() => {
        if(typeof window !== `undefined`) {
          const fadeInController = new ScrollMagic.Controller();
    
          if(document.querySelectorAll(".fade-in").length !== 0) {
    
    
            document.querySelectorAll(".fade-in").forEach(fadeInItem => {
              let TextReveaFadeInlTL = new TimelineLite();
              TextReveaFadeInlTL.fromTo(fadeInItem,
                {
                  opacity: 0,
                  y: 50
                },
                {
                  duration: 1.5,
                  opacity: 1,
                  y: 0,
                  ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"),
              })
    
              new ScrollMagic.Scene({
                  triggerElement: fadeInItem,
                  triggerHook: 0,
                  offset: -600,
                  reverse: false
              })
              .setTween(TextReveaFadeInlTL)
              .addTo(fadeInController);
            });
          }
        }
    })

    return (
        <>
            <StudioContent>
                <section className="studio_container">
                    <h1 className="fade-in">Studio</h1>
                    <p className="fade-in text-lg">Saglietti è uno studio di comunicazione specializzato in identità visiva, advertising, editoria ed exhibit design.<br/>
                    Creiamo progetti in grado di trasformare il brand in un racconto, con un unico obiettivo: creare valore.</p>
                </section>
                <section className="filosofia_container">
                    <h2 className="fade-in">Filosofia</h2>
                    <p className="fade-in">
                        Il nostro design nasce da qui. Mettendo in relazione <strong>Essenza</strong>, <strong>Espressione</strong> ed <strong>Emozione</strong> per stabilire connessioni armoniche con gli utenti.
                        <br/><br/>
                        Succede tutti i giorni, facciamo scorrere in ogni progetto più di 10 anni di know how, passione e contaminazione internazionale. Noi lo chiamiamo Pensiero Circolare.
                    </p>
                </section>
                <section className="metodo_container">
                    <h2 className="fade-in">Metodo</h2>
                    <ul>
                        <li className="fade-in"><span>1</span> Riceviamo i need del cliente</li>
                        <li className="fade-in"><span>2</span> Analizziamo i valori del brand</li>
                        <li className="fade-in"><span>3</span> Creiamo un concetto</li>
                    </ul>
                    <p className="fade-in">Sono i tre step con i quali nascono tutti i nostri progetti.</p>
                </section>
                <section className="obiettivo_container">
                    <h2 className="fade-in">L'obiettivo</h2>
                    <p className="fade-in">
                    Dare vita a una strategia di comunicazione completa, innovativa, in grado di offrire forte distintività e generare engagement.
                    Creiamo linguaggi di comunicazione per qualsiasi tipo di progetto, budget, media.
                    <br/><br/>
                    Ma il nostro approccio al lavoro è sempre lo stesso: offrire al cliente non un collaboratore, ma un partner con cui condividere una visione. Un’intesa che ci porta a comprendere a fondo gli obiettivi e generare fiducia, massimizzando i risultati.
                    <br/><br/>
                    Mettiamo il nostro know-how e la nostra idea di design al servizio di tutti i settori: food &amp; beverage, fashion, technology, manifattura, interior design, istituzioni e organizzazioni culturali.
                    </p>
                </section>
                <section className="servizi_container">
                    <h2 className="fade-in">Servizi</h2>
                    <p className="fade-in">
                    La qualità non è solo un punto d’arrivo. È la partenza e l’ispirazione.
                    Una gamma di servizi ampia e strutturata. Uno standard qualitativo che quotidianamente accetta la sfida più importante: pensare avanti, sempre.
                    </p>
                </section>
                <section className="clienti_container">
                    <h2 className="fade-in">Clienti</h2>
                    <ul className="clients_list fade-in">
                        {
                        data.wordpress.clients.nodes.map(client => (
                            <li key={`${client.title}-${Math.floor(Math.random() * (100 - 999) + 100)}`}>
                                <span className="fade-in">
                                    {
                                        client.featuredImage &&
                                        <img src={client.featuredImage.node.link} alt={client.title}/>                                            }
                                </span>
                            </li>
                        ))
                        }
                    </ul>
                </section>
            </StudioContent>
        </>
    )
}

export default StudioPage