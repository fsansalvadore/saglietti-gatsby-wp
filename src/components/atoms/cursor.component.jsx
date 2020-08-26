import React, {useRef, useState} from 'react'
import styled from 'styled-components'

const CursorComponent = styled.div`
    body, a, a:hover, * {
        cursor: none !important;
    }

    position: fixed;
    display: none;
    height: 24px;
    width: 24px;
    background-blend-mode: difference !important;
    border: 1px solid #000;
    border-radius: 50%;
    z-index: 9999;
    background-color: #000;
    background: #000;
    pointer-events: none;
    transform: translate(-50%, -50%);
    will-change: scale;
    opacity: 0;
    transition: height 0.6s ease, width 0.6s ease, transform 0.1s ease, opacity 0.1s ease;

    @media screen and (min-width: 1000px) {
        body, a, a:hover {
          cursor: none;
        }
    
        display: block;
    }
`

const Cursor = () => {
    const cursorRef = useRef(null)
    const [isHover, setIsHover] = useState(false);
    const [isClick, setIsClick] = useState(false);
    let endX = React.useRef(0)
    let endY = React.useRef(0)

    function useEventListener(eventName, handler, element = document) {
        const savedHandler = React.useRef()
      
        React.useEffect(() => {
          savedHandler.current = handler
        }, [handler])
      
        React.useEffect(() => {
          const isSupported = element && element.addEventListener
          if (!isSupported) return
      
          const eventListener = (event) => savedHandler.current(event)
      
          element.addEventListener(eventName, eventListener)
      
          return () => {
            element.removeEventListener(eventName, eventListener)
          }
        }, [eventName, element])
    }

    const onMouseMove = React.useCallback(({ clientX, clientY }) => {
        cursorRef.current.style.opacity = '1';
        cursorRef.current.style.top = (clientY - 12) + 'px'
        cursorRef.current.style.left = (clientX - 12) + 'px'
        endX.current = clientX
        endY.current = clientY
    }, [])

    useEventListener('mousemove', onMouseMove, document)
    
    React.useEffect(() => {
        if (isHover) {
          cursorRef.current.style.transform = `scale(2)`
        } else {
          cursorRef.current.style.transform = 'scale(1)'
        }
    }, [isHover])

    React.useEffect(() => {
        if (isClick) {
          cursorRef.current.style.transform = `scale(0.5)`
        } else {
            if(isHover) {
                cursorRef.current.style.transform = 'scale(2)'
            } else {
                cursorRef.current.style.transform = 'scale(1)'
            }
        }
    }, [isClick, isHover])

    React.useEffect(() => {
        const hoverables = document.querySelectorAll(
            'a, input[type="submit"], input[type="image"], label[for], select, button, .link, .slick-slide img'
        )

        hoverables.forEach((el) => {
            el.style.cursor = 'none'
            el.addEventListener('mouseover', () => {
                setIsHover(true)
            });
            el.addEventListener('click', () => {
                setIsClick(true)
            });
            el.addEventListener('mousedown', () => {
                setIsClick(true)
            });
            el.addEventListener('mouseout', () => {
                setIsHover(false)
                setIsClick(false)
            });
        });
    })
    
    return (
        <CursorComponent ref={cursorRef} />
    )
}

export default Cursor