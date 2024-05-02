// import { gsap } from "gsap";

import * as ScrollMagic from "scrollmagic-with-ssr" // Or use scrollmagic-with-ssr to avoid server rendering problems
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import { TweenMax, TimelineMax, TweenLite, TimelineLite } from "gsap/all"
// import CustomEase from '../../../common/vendor/gsap/CustomEase'

if (typeof window !== `undefined`) {
  //   gsap.registerPlugin( CustomEase )
  ScrollMagicPluginGsap(
    ScrollMagic,
    TweenMax,
    TimelineMax,
    TweenLite,
    TimelineLite,
  )
}

/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
const projectHover = () => {
  // from http://www.quirksmode.org/js/events_properties.html#position
  const getMousePos = e => {
    let posx = 0
    let posy = 0
    if (!e) e = window.event
    if (e.pageX || e.pageY) {
      posx = e.pageX
      posy = e.pageY
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft
      posy =
        e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
    return { x: posx, y: posy }
  }

  // Effect 1
  class HoverImgFx1 {
    constructor(el) {
      this.DOM = { el: el }
      this.DOM.reveal = document.createElement("div")
      this.DOM.reveal.className = "hover-reveal"
      this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`
      this.DOM.el.appendChild(this.DOM.reveal)
      this.DOM.revealInner = this.DOM.reveal.querySelector(
        ".hover-reveal__inner",
      )
      this.DOM.revealInner.style.overflow = "hidden"
      this.DOM.revealImg =
        this.DOM.revealInner.querySelector(".hover-reveal__img")

      this.initEvents()
    }
    initEvents() {
      this.positionElement = ev => {
        const mousePos = getMousePos(ev)
        const docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop,
        }
        this.DOM.reveal.style.top = `${mousePos.y + 20 - docScrolls.top}px`
        this.DOM.reveal.style.left = `${mousePos.x + 20 - docScrolls.left}px`
      }
      this.mouseenterFn = ev => {
        this.positionElement(ev)
        this.showImage()
      }
      this.mousemoveFn = ev =>
        requestAnimationFrame(() => {
          this.positionElement(ev)
        })
      this.mouseleaveFn = () => {
        this.hideImage()
      }

      this.DOM.el.addEventListener("mouseenter", this.mouseenterFn)
      this.DOM.el.addEventListener("mousemove", this.mousemoveFn)
      this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn)
    }
    showImage() {
      TweenMax.killTweensOf(this.DOM.revealInner)
      TweenMax.killTweensOf(this.DOM.revealImg)

      this.tl = new TimelineMax({
        onStart: () => {
          this.DOM.reveal.style.opacity = 1
          TweenMax.set(this.DOM.el, { zIndex: 1000 })
        },
      })
        .add("begin")
        .add(
          new TweenMax(this.DOM.revealInner, 0.2, {
            ease: "Sine.easeOut",
            startAt: { x: "-100%" },
            x: "0%",
          }),
          "begin",
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.2, {
            ease: "Sine.easeOut",
            startAt: { x: "100%" },
            x: "0%",
          }),
          "begin",
        )
    }
    hideImage() {
      TweenMax.killTweensOf(this.DOM.revealInner)
      TweenMax.killTweensOf(this.DOM.revealImg)

      this.tl = new TimelineMax({
        onStart: () => {
          TweenMax.set(this.DOM.el, { zIndex: 999 })
        },
        onComplete: () => {
          TweenMax.set(this.DOM.el, { zIndex: "" })
          TweenMax.set(this.DOM.reveal, { opacity: 0 })
        },
      })
        .add("begin")
        .add(
          new TweenMax(this.DOM.revealInner, 0.2, {
            ease: "Sine.easeOut",
            x: "100%",
          }),
          "begin",
        )

        .add(
          new TweenMax(this.DOM.revealImg, 0.2, {
            ease: "Sine.easeOut",
            x: "-100%",
          }),
          "begin",
        )
    }
  }

  // [...document.querySelectorAll('[data-fx="1"] > a, a[data-fx="1"]')].forEach(link => new HoverImgFx1(link));
  ;[...document.querySelectorAll('[data-fx="1"]')].forEach(
    link => new HoverImgFx1(link),
  )

  // Demo purspose only: Preload all the images in the page..
  // const contentel = document.querySelector('.content');
  // [...document.querySelectorAll('.block__title, .block__link, .content__text-link')].forEach((el) => {
  //     const imgsArr = el.dataset.img.split(',');
  //     for (let i = 0, len = imgsArr.length; i <= len-1; ++i ) {
  //         const imgel = document.createElement('img');
  //         imgel.style.visibility = 'hidden';
  //         imgel.style.width = 0;
  //         imgel.src = imgsArr[i];
  //         imgel.className = 'preload';
  //         contentel.appendChild(imgel);
  //     }
  // });
  // imagesLoaded(document.querySelectorAll('.preload'), () => document.body.classList.remove('loading'));
}

export default projectHover
