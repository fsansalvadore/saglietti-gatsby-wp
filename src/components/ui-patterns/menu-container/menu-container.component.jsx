import React from "react"
import styled from "styled-components"
import MenuItems from "../menu-items/menu-items.component"

const Menu = ({ isOpen }) => {
  return (
    <MenuContainer isOpen={isOpen} classname="menu-container">
      <MenuItems isOpen={isOpen}></MenuItems>
    </MenuContainer>
  )
}

const MenuContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 990;
  font-weight: 400;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  transition: opacity 0.5s cubic-bezier(0.42, 0.05, 0.2, 0.98);
  backdrop-filter: ${({ isOpen }) => (isOpen ? "blur(6px)" : "blur(0)")};
  -webkit-backdrop-filter: ${({ isOpen }) =>
    isOpen ? "blur(6px)" : "blur(0)"};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 900px) {
    flex-direction: row;
    align-items: center;
  }
`

export default Menu
