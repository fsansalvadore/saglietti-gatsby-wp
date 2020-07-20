import React from 'react';
import styled from "styled-components";

const MenuBtnContainer = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  span {
    position: absolute;
    width: 18px;
    height: 1px;
    background-color: #000;
  }

  span:first-of-type {
    transform: translate3d(0, -4px, 0);
  }

  span:last-of-type {
    transform: translate3d(0, 4px, 0);
  }
`

const MenuBtn = () => {
  return (
    <MenuBtnContainer>
      <span></span>
      <span></span>
    </MenuBtnContainer>
  )
}

export default MenuBtn;