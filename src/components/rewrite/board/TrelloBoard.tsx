import React from "react";

import './Material.css'
import { BoardDiv, GlobalStyle } from "../../../styles/Base";

export default function MaterialBoard({ children, ...rest }) {
  return (
    <>
      <GlobalStyle/>

      <BoardDiv className='react-trello-board' draggable={false} {...rest}>
        {children}
      </BoardDiv>
    </>
  );
}
