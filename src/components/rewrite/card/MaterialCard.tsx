import React from "react";

import { CardProps } from "./Card";
import DeleteButton from "../../widgets/DeleteButton";

export function Card({ card, editable, removeCard, cardId }: CardProps) {
  return <div className="card" style={{ backgroundColor: card.metadata['color'] || '#aabbcc' }}>
    <p>{card.description}</p>
  </div>
}

export default Card;
