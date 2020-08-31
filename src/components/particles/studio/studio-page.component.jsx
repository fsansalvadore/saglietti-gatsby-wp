import React, {useEffect} from 'react'
import styled from 'styled-components'

import { gsap } from "gsap";
import { TweenLite, TimelineLite } from "gsap/all";

import * as ScrollMagic from "scrollmagic-with-ssr"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import CustomEase from '../../particles/vendor/gsap/CustomEase'

if(typeof window !== `undefined`) {
  gsap.registerPlugin( CustomEase )
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite)
}

const Studio2 = styled.div`
    position: relative;
    width: 100%;
    padding: 200px 6rem;

    p {
        color: #fff;
        font-size: 1.6rem;
        line-height: 140%;
        width: 50%;
        letter-spacing: -0.025rem;
    }

    .bg_black {
        position: absolute;
        width: 0;
        height: 100%;
        background-color: #000;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
    }
`

const Studio3 = styled.div`
    position: relative;
    width: 100%;
    padding: 200px 6rem 200px 50%;

    h2 {
        font-size: 0.8rem;
        font-weight: 200;
        font-family: 'FFMarkWebProLight';
    }

    p {
        font-size: 1.2rem;
        line-height: 130%;
        letter-spacing: -0.025rem;
    }

    .clienti_container {
        margin-top: 8rem;

        ul {
            display: block;
            margin: 0;
        }

        li.fade-in {
            display: block;
        }

        li {
            list-style: none;
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
    }
`

const Studio4 = styled.div`
    position: relative;
    width: 100%;
    padding: 200px 6rem;
    color: #fff;

    p {
        color: #fff;
        font-size: 1rem;
    }

    .bg_black {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
    }

    .metodo_container {
        h2 {
            font-size: 0.8rem;
            margin-bottom: 1.8rem;
            font-family: 'FFMarkWebProLight';
        }

        ul {
            padding: 0;
            margin: 0 0 3rem 0;
        }
    
        li {
            list-style: none;
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            
            span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                font-size: 0.7rem;
                margin-right: 15px;
                border: 1px solid #fff;
                border-radius: 50%;
                
                * {
                    line-height: 0;
                }
            }
        }
    }

    .obiettivo_container {
        margin: 250px 4rem 0 50%; 
    }

`

const StudioPage = ({data}) => {
    useEffect(() => {
        if(typeof window !== `undefined`) {
            const studioController = new ScrollMagic.Controller();

            const studioTL = gsap.timeline();
            studioTL.fromTo(".bg_black", 1, {width: 0}, {width: "100%",ease: "power4.inOut"})

            const studioScrollTL = gsap.timeline();
            studioScrollTL.fromTo(".bg_black.scroll", 1, {translateX: "-100%"}, {translateX: 0, ease: "power4.inOut"})

            new ScrollMagic.Scene({
                triggerElement: ".bg_black.scroll",
                triggerHook: 0,
                offset: -600,
                reverse: false
            })
            .setTween(studioScrollTL)
            .addTo(studioController);
        }
    })

    return (
        <>
            <Studio2>
                <p className="fade-in">Creiamo progetti in grado di trasformare il brand in un racconto, con un unico obiettivo: creare valore.</p>
                <div className="bg_black"></div>
            </Studio2>
            <Studio3>
                <h2 className="fade-in">Filosofia</h2>
                <p className="fade-in">
                    Il nostro design nasce da qui.
                    <br/><br/>
                    Mettendo in relazione <strong>Essenza</strong>, <strong>Espressione</strong> ed <strong>Emozione</strong> per stabilire connessioni armoniche con gli utenti.
                    <br/><br/>
                    Succede tutti i giorni, facciamo scorrere in ogni progetto più di 10 anni di know how, passione e contaminazione internazionale.
                    <br/><br/>
                    Noi lo chiamiamo Pensiero Circolare.
                </p>
            </Studio3>
            <Studio4>
                <div className="metodo_container">
                    <h2 className="fade-in">Metodo</h2>
                    <ul>
                        <li className="fade-in"><span>1</span> Riceviamo i need del cliente</li>
                        <li className="fade-in"><span>2</span> Analizziamo i valori del brand</li>
                        <li className="fade-in"><span>3</span> Creiamo un concetto</li>
                    </ul>
                    <p className="fade-in">Sono i tre step con i quali nascono tutti i nostri progetti.</p>
                </div>
                <div className="obiettivo_container">
                    <h2 className="fade-in">L'obiettivo</h2>
                    <p className="fade-in">
                    Dare vita a una strategia di comunicazione completa, innovativa, in grado di offrire forte distintività e generare engagement.
                    <br/><br/>
                    Creiamo linguaggi di comunicazione per qualsiasi tipo di progetto, budget, media.<br/>
                    Ma il nostro approccio al lavoro è sempre lo stesso: offrire al cliente non un collaboratore, ma un partner con cui condividere una visione. Un’intesa che ci porta a comprendere a fondo gli obiettivi e generare fiducia, massimizzando i risultati.
                    <br/><br/>
                    Mettiamo il nostro know-how e la nostra idea di design al servizio di tutti i settori:<br/>
                    food &amp; beverage, fashion, technology, manifattura, interior design, istituzioni e organizzazioni culturali.
                    </p>
                </div>
                <div className="bg_black scroll"></div>
            </Studio4>
            <Studio3>
                <div className="servizi_container">
                    <h2 className="fade-in">Servizi</h2>
                    <p className="fade-in">
                    La qualità non è solo un punto d’arrivo.
                    È la partenza e l’ispirazione.

                    Una gamma di servizi ampia e strutturata. Uno standard qualitativo che quotidianamente accetta la sfida più importante: pensare avanti, sempre.
                    </p>
                </div>
                <div className="clienti_container">
                    <h2>Clienti</h2>
                    <ul className="clients_list">
                        {
                        data.wordpress.clients.nodes.map(client => (
                        <li className="fade-in" key={`${client.title}-${Math.floor(Math.random() * (100 - 999) + 100)}`}>{client.title}</li>
                        ))
                        }
                    </ul>
                </div>
            </Studio3>
        </>
    )
}

export default StudioPage