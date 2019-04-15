import { Draggable } from "react-smooth-dnd";
import React from "react";
import { CardModel } from "./utils";

export function Card({ card }: { card: CardModel }) {
  return <Draggable key={card.id}>
    <div className="card" style={{ backgroundColor: card.color }}>
      <p>{card.data}</p>
    </div>
  </Draggable>;
}

export default Card;
