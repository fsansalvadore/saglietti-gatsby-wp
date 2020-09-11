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

const Studio2 = styled.div`
    position: relative;
    width: 100%;
    padding: 60px 1rem;

    p {
        color: #fff;
        font-size: 1.25rem;
        line-height: 140%;
        font-weight: bold;
        width: 100%;
    }

    .container_mask {
        position: absolute;
        width: 0;
        height: 100%;
        background-color: #fff;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 10;
    }

    .bg_black,
    .container_img_bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
        background-position: center;
        background-size: cover;

        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
        }
    }

    @media (min-width: 1200px) {
        padding: 200px 6rem;

        p {
            width: 50%;
            font-size: 2rem;
        }
    }
`

const Studio3 = styled.div`
    position: relative;
    width: 100%;
    padding: 60px 1rem;
    display: flex;
    justify-content: center;
    
    .image_container {
        position: relative;
        margin: 0;
        flex: 1;

        .img_box {
            width: 100%;
            height: 400px;
            overflow: hidden;

            .img_mask {
                position: absolute;
                display: none;
                width: 100%;
                top: -20px;
                right: 0;
                height: 120%;
                z-index: 10;
                background: #fff;
            }

            .img_content {
                background-size: cover;
                background-position: center;
                width: 100%;
                height: 100%;
            }
        }
    }

    .content_container {
        flex: 1;
        margin: 0;

        h2 {
            font-size: 0.8rem;
            font-weight: bold;
        }
    
        p {
            font-size: 1.25rem;
            font-weight: bold;
            line-height: 130%;
            letter-spacing: -0.055rem;
        }
    
        .clienti_container {
            margin-top: 8rem;

            h2 {
                text-align: center;
            }
    
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

                li {
                    list-style: none;
                    display: flex;
                    align-items: center;
                    font-weight: bold;
                    margin-bottom: 15px;

                    span {
                        padding: 2rem;
                    }
                }
            }
        }

    }

    .center_container {
        flex-direction: column;
    }

    .image_container.servizi {
        margin-top: 80px;
    }

    @media (min-width: 1200px) {
        padding: 200px 6rem;

        .image_container {
            margin: 0 3rem;

            &.servizi {
                margin: 0px;
            }
        }
        .content_container {
            margin: 0 0 0 2.5%;

            p {
                font-size: 2rem;
            }

            .clienti_container {
                .clients_list {
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                }
            }
        }

        
        
        .center_container {
            flex-direction: row;
        }
    }


    @media (min-width: 768px) and (max-width: 1200px) {
        .content_container {
            .clienti_container {
                .clients_list {
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                }
            }
        }
    }

    @media (min-width: 600px) and (max-width: 768px) {
        .content_container {
            .clienti_container {
                .clients_list {
                    grid-template-columns: 1fr 1fr 1fr;
                }
            }
        }
    }
`

const Studio4 = styled.div`
    position: relative;
    width: 100%;
    padding: 60px 1rem;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        color: #fff;
        font-size: 1.25rem;
        font-weight: bold;
        line-height: 140%;
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
            align-items: center;
            font-weight: bold;
            font-size: 1.2rem;
            margin-bottom: 15px;
            
            span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                font-size: 0.7rem;
                font-weight: bold;
                margin-right: 15px;
                border: 1px solid #fff;
                border-radius: 50%;
                
                * {
                    line-height: 0;
                }
            }
        }
    }

    .image_container {
        position: relative;
        margin-right: 0;
        flex: 1;
        display: flex;
        justify-content: center;

        .img_box {
            width: 100%;
            height: 400px;
            overflow: hidden;

            .img_mask {
                position: absolute;
                display: none;
                width: 100%;
                top: -20px;
                right: 0;
                height: 110%;
                z-index: 10;
                background: #000;
            }

            .img_content {
                background-size: cover;
                background-position: center;
                width: 100%;
                height: 100%;
            }
        }
    }

    .center_container.wide {
        margin-top: 0;
        max-width: none;
        flex-direction: column;
    }

    .obiettivo_container {
        margin: 80px 0 0 0; 
        flex: 1;

        p {
        }
    }

    @media (min-width: 1200px) {
        padding: 200px 6rem;

        p {
            font-size: 2rem;
        }

        .center_container.wide {
            margin-top: 100px;
            flex-direction: row;
        }

        .image_container {
            margin-right: 5rem;
        }

        .obiettivo_container {
            margin: 0; 
        }

        .metodo_container {
            display: flex;
            flex-direction: row;
    
            & > div {
                width: 50%;
            }
        }
    }
`

const StudioPage = ({data}) => {
    useEffect(() => {
        if(typeof window !== `undefined`) {
            const studioController = new ScrollMagic.Controller();

            const studioTL = new TimelineLite();
            studioTL.fromTo(".container_mask", 1.6, {width: "100%"}, {width: 0 ,ease: "power4.inOut"})
            
            const studioScrollTL = new TimelineLite();
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
    
    const imgAnimation = () => {
        const imgController = new ScrollMagic.Controller();
        const parallaxController = new ScrollMagic.Controller();

        if (document.querySelectorAll(".img_box").length !== 0) {
            document.querySelectorAll(".img_box").forEach(img => {
                // let mask    = img.querySelector(".img_mask")
                let content = img.querySelector(".img_content")
                
                let imgRevealTL = new TimelineLite();
                imgRevealTL
                .fromTo(img, 0.6, {opacity: 0}, {opacity: 1})
                .fromTo(content, 1, {width: 0}, {width: "100%", ease: "power2.inOut"}, 0)
                
                new ScrollMagic.Scene({
                    triggerElement: img,
                    triggerHook: 1,
                    offset: 0,
                    reverse: false
                })
                .setTween(imgRevealTL)
                .addTo(imgController);
                
                let imgParallaxTL = new TimelineLite();
                imgParallaxTL.fromTo(content, 1, {scale: 1.4}, {scale: 1})
                .fromTo(img, 1, {y: 100}, {y: -60}, 0)

                new ScrollMagic.Scene({
                    triggerElement: img,
                    duration: "180%",
                    triggerHook: 1
                })
                .setTween(imgParallaxTL)
                .addTo(parallaxController);
            })
        }
    }

    useEffect(() => {
        if(typeof window !== `undefined`) {
            requestAnimationFrame(() => imgAnimation())
        }
    }, [])

    return (
        <>
            <Studio2>
                <p className="fade-in">Creiamo progetti in grado di trasformare il brand in un racconto, con un unico obiettivo: creare valore.</p>

                <div className="container_mask white"></div>
                <div className="container_img_bg" ></div>
            </Studio2>
            <Studio3>
                <div className="center_container">
                    <div className="content_container">
                        <h2 className="fade-in">Filosofia</h2>
                        <p className="fade-in">
                            Il nostro design nasce da qui. Mettendo in relazione <strong>Essenza</strong>, <strong>Espressione</strong> ed <strong>Emozione</strong> per stabilire connessioni armoniche con gli utenti.
                            <br/><br/>
                            Succede tutti i giorni, facciamo scorrere in ogni progetto più di 10 anni di know how, passione e contaminazione internazionale. Noi lo chiamiamo Pensiero Circolare.
                        </p>
                    </div>
                </div>
            </Studio3>
            <Studio4>
                    <div className="metodo_container">
                        <div>
                            <h2 className="fade-in">Metodo</h2>
                            <ul>
                                <li className="fade-in"><span>1</span> Riceviamo i need del cliente</li>
                                <li className="fade-in"><span>2</span> Analizziamo i valori del brand</li>
                                <li className="fade-in"><span>3</span> Creiamo un concetto</li>
                            </ul>
                        </div>
                        <div>
                            <p className="fade-in">Sono i tre step con i quali nascono tutti i nostri progetti.</p>
                        </div>
                    </div>
                    <div className="center_container wide">
                        <div className="obiettivo_container">
                            <h2 className="fade-in">L'obiettivo</h2>
                            <p className="fade-in">
                            Dare vita a una strategia di comunicazione completa, innovativa, in grado di offrire forte distintività e generare engagement.
                            <br/><br/>
                            Creiamo linguaggi di comunicazione per qualsiasi tipo di progetto, budget, media.<br/>
                            Ma il nostro approccio al lavoro è sempre lo stesso: offrire al cliente non un collaboratore, ma un partner con cui condividere una visione. Un’intesa che ci porta a comprendere a fondo gli obiettivi e generare fiducia, massimizzando i risultati.
                            <br/><br/>
                            Mettiamo il nostro know-how e la nostra idea di design al servizio di tutti i settori: food &amp; beverage, fashion, technology, manifattura, interior design, istituzioni e organizzazioni culturali.
                            </p>
                        </div>
                    </div>
                <div className="bg_black scroll"></div>
            </Studio4>
            <Studio3>
                <div className="center_container">
                    <div className="content_container">
                        <div className="servizi_container">
                            <h2 className="fade-in">Servizi</h2>
                            <p className="fade-in">
                            La qualità non è solo un punto d’arrivo. È la partenza e l’ispirazione.
                            <br/><br/>
                            Una gamma di servizi ampia e strutturata. Uno standard qualitativo che quotidianamente accetta la sfida più importante: pensare avanti, sempre.
                            </p>
                        </div>
                        <div className="clienti_container">
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
                        </div>
                    </div>
                </div>
            </Studio3>
        </>
    )
}

export default StudioPage