import React, {Component} from 'react'

import { gsap, TweenMax } from "gsap";
import * as ScrollMagic from "scrollmagic-with-ssr"; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { TweenLite, TimelineLite } from "gsap/all";
import CustomEase from '../vendor/gsap/CustomEase'


if(typeof window !== `undefined`) {
    gsap.registerPlugin(CustomEase)
    ScrollMagicPluginGsap(ScrollMagic, TimelineLite, TweenLite )
  }

class TextRevealAnimation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            children: props.children,
            addClass: props.addClass,
            skew: props.skew
        }
    }

    componentDidMount() {
        if(typeof window !== `undefined`) {
            const TextRevealController = new ScrollMagic.Controller();
        
            if (document.querySelectorAll(".TextRevealAnim").length !== 0 && document.querySelector(".TextRevealItem")) {
                document.querySelectorAll(".TextRevealAnim").forEach(txtReveal => {
                let item = txtReveal.querySelector('.TextRevealItem')
                let TextRevealTL = gsap.timeline();
                TextRevealTL.from(item, {
                    duration: 1.5,
                    opacity: 0,
                    y: 50,
                    skewY: (this.state.skew ? 5 : 0),
                    ease: CustomEase.create("custom", "M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1"),
                })
        
                new ScrollMagic.Scene({
                    triggerElement: txtReveal,
                    triggerHook: 0,
                    offset: -600,
                    reverse: false
                })
                .setTween(TextRevealTL)
                .addTo(TextRevealController);
                });
            };
        }
    }

    render() {
        return (
            <div className={`TextRevealAnim ${this.state.addClass}`}>
                {this.state.children}
            </div>
        )
    }
}

export default TextRevealAnimation