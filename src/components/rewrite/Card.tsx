import React from "react";

import { Draggable } from "react-smooth-dnd";

import { Item, ItemId } from "../../store";

export function Card({ card, cardId }: { card: Item, cardId: ItemId }) {
  return <Draggable key={cardId}>
    <div className="card" style={{ backgroundColor: card.metadata['color'] || '#aabbcc' }}>
      <p>{card.description}</p>
    </div>
  </Draggable>;
}

export default Card;
