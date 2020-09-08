import React, {useRef, useState} from 'react'
import styled from 'styled-components'

const CursorFollowComponent = styled.div`
    body, a, a:hover, * {
        cursor: auto !important;
    }

    position: fixed;
    display: none;
    height: 10px;
    width: 10px;
    background-blend-mode: difference !important;
    border: 1px solid #000;
    background: #000;
    border-radius: 50%;
    z-index: 9999;
    pointer-events: none;
    transform: translate(-50%, -50%);
    will-change: scale;
    opacity: 0.75;

    &.hover {
        opacity: 0 !important;
    }

    &.clicked {
        animation-name: clicked;
        animation-fill-mode: forwards;
        animation-duration: 0.4s;
        animation-timing-function: ease;
    }

    @media screen and (min-width: 1000px) {
        body, a, a:hover {
          cursor: auto;
        }
    
        display: block;
    }
`

const CursorFollow = () => {
    const cursorFollowRef = useRef(null)
    const [isFollowHover, setIsFollowHover] = useState(false);
    const [isFollowClicked, setIsFollowClicked] = useState(false);
    let endFollowX = React.useRef(0)
    let endFollowY = React.useRef(0)

    function useEventListener(eventName, handler, element = document) {
        const savedFollowHandler = React.useRef()
      
        React.useEffect(() => {
          savedFollowHandler.current = handler
        }, [handler])
      
        React.useEffect(() => {
          const isSupported = element && element.addEventListener
          if (!isSupported) return
      
          const eventListener = (event) => savedFollowHandler.current(event)
      
          element.addEventListener(eventName, eventListener)
      
          return () => {
            element.removeEventListener(eventName, eventListener)
          }
        }, [eventName, element])
    }

    const onMouseMove = React.useCallback(({ clientX, clientY }) => {
        setTimeout(() => {
            if (cursorFollowRef.current) {
                cursorFollowRef.current.style.opacity = '0.75';
                cursorFollowRef.current.style.top = (clientY - 0) + 'px'
                cursorFollowRef.current.style.left = (clientX - 0) + 'px'
                endFollowX.current = clientX
                endFollowY.current = clientY
            }
        }, 150)
    }, [cursorFollowRef])
    
    useEventListener('mousemove', onMouseMove, document)
    
    React.useEffect(() => {
        if (isFollowHover) {
            cursorFollowRef.current.style.opacity = '0';
        } else {
            cursorFollowRef.current.style.opacity = '0.75';
        }
    }, [isFollowHover])
    
    React.useEffect(() => {
        if (isFollowClicked) {
            cursorFollowRef.current.classList.add("clicked")
        } else {
            if(isFollowHover) {
                cursorFollowRef.current.style.opacity = '0';
            } else {
                cursorFollowRef.current.style.opacity = '0.75';
            }
        }
    }, [isFollowClicked, isFollowHover])

    React.useEffect(() => {
        const followHoverables = document.querySelectorAll(
            'a, input[type="submit"], input[type="image"], label[for], select, button, .link, .slick-slide img'
        )

        followHoverables.forEach((el) => {
            el.style.cursor = 'none'
            el.addEventListener('mouseover', () => {
                setIsFollowHover(true)
            });
            el.addEventListener('click', () => {
                setIsFollowClicked(true)
            });
            el.addEventListener('mousedown', () => {
                setIsFollowClicked(true)
            });
            el.addEventListener('mouseout', () => {
                setIsFollowHover(false)
                setIsFollowClicked(false)
            });
        });
    })
    
    return (
        <CursorFollowComponent ref={cursorFollowRef}>

        </CursorFollowComponent>
    )
}

export default CursorFollow