import React, { useRef, useState } from "react"
import styled from "styled-components"

const CursorComponent = styled.div`
  body,
  a,
  a:hover,
  * {
    cursor: auto !important;
  }

  position: fixed;
  display: none;
  height: 5px;
  width: 100px;
  border: 1px solid #fff;
  z-index: 9999;
  background-color: #fff;
  background: #fff;
  mix-blend-mode: difference;
  pointer-events: none;
  transform: translate(-50%, -50%);
  will-change: scale;
  opacity: 0;
  transition:
    height 0.6s ease,
    width 0.6s ease,
    transform 0.1s ease,
    opacity 0.1s ease;

  &::before {
    content: "";
    position: absolute;
    top: calc(-100% + 3px);
    transform-origin: left;
    left: 0;
    width: 50px;
    height: 5px;
    transform: rotate(-45deg);
    background-color: #fff;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: calc(-100% + 3px);
    left: 0;
    transform-origin: left;
    width: 50px;
    height: 5px;
    transform: rotate(45deg);
    background-color: #fff;
  }

  span.cursor_secondary {
    position: absolute;
    left: -11px;
    top: -11px;
    /* width: 4px;
    height: 40px; */
    border: 1px solid #fff;
    border-radius: 50%;
    opacity: 0;
    transform: scale(0.7);
    transition: all 0.6s ease 0.1s;
    mix-blend-mode: difference;

    &.hover {
      transform: scale(1);
      opacity: 1;
    }

    &.clicked {
      animation-name: clicked;
      animation-fill-mode: forwards;
      animation-duration: 0.4s;
      animation-timing-function: ease;
    }
  }

  @media screen and (min-width: 1000px) {
    body,
    a,
    a:hover {
      cursor: auto;
    }

    display: block;
  }
`

const CursorLeft = () => {
  const cursorRef = useRef(null)
  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)
  let endX = React.useRef(0)
  let endY = React.useRef(0)
  let inner = ""

  function useEventListener(eventName, handler, element = document) {
    const savedHandler = React.useRef()

    React.useEffect(() => {
      savedHandler.current = handler
    }, [handler])

    React.useEffect(() => {
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      const eventListener = event => savedHandler.current(event)

      element.addEventListener(eventName, eventListener)

      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    }, [eventName, element])
  }

  const onMouseMove = React.useCallback(({ clientX, clientY }) => {
    if (!cursorRef?.current) return
    cursorRef.current.style.opacity = "0.75"
    cursorRef.current.style.top = clientY - 10 + "px"
    cursorRef.current.style.left = clientX - 10 + "px"
    endX.current = clientX - cursorRef.current.offsetWidth / 2
    endY.current = clientY - cursorRef.current.offsetHeight / 2
  }, [])

  useEventListener("mousemove", onMouseMove, document)

  React.useEffect(() => {
    if (!cursorRef?.current) return
    if (isHover) {
      cursorRef.current.style.transform = `scale(1.2)`
      cursorRef.current
        .querySelector(".cursor_secondary")
        .classList.add("hover")
    } else {
      cursorRef.current.style.transform = "scale(0.8)"
      cursorRef.current
        .querySelector(".cursor_secondary")
        .classList.remove("hover")
    }
  }, [isHover])

  React.useEffect(() => {
    if (!cursorRef?.current) return
    if (isClick) {
      cursorRef.current
        .querySelector(".cursor_secondary")
        .classList.add("clicked")
      cursorRef.current.style.transform = `scale(0.8)`
    } else {
      if (isHover) {
        cursorRef.current
          .querySelector(".cursor_secondary")
          .classList.remove("clicked")
        cursorRef.current.style.transform = "scale(1.2)"
      } else {
        cursorRef.current
          .querySelector(".cursor_secondary")
          .classList.remove("clicked")
        cursorRef.current.style.transform = "scale(0.8)"
      }
    }
  }, [isClick, isHover])

  React.useEffect(() => {
    const hoverables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link, .slick-slide img',
    )

    hoverables.forEach(el => {
      el.style.cursor = "none"
      el.addEventListener("mouseover", () => {
        setIsHover(true)
      })
      el.addEventListener("click", () => {
        setIsClick(true)
      })
      el.addEventListener("mousedown", () => {
        setIsClick(true)
      })
      el.addEventListener("mouseout", () => {
        setIsHover(false)
        setIsClick(false)
      })
    })
  })

  return (
    <CursorComponent ref={cursorRef}>
      <span className="cursor_secondary"></span>
      {inner && <span>{inner}</span>}
    </CursorComponent>
  )
}

export default CursorLeft
