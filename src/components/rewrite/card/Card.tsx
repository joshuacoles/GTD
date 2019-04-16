import React from "react";

import { Draggable } from "react-smooth-dnd";

import { Item, ItemId } from "../../../store";

import MaterialCard from './MaterialCard';
import TrelloCard from './TrelloCard';

export interface CardProps {
  card: Item;
  cardId: ItemId;
  editable: boolean;
  removeCard: (cardId: ItemId) => void;
}

export function Card(props: CardProps) {
  return <Draggable key={`draggable-card-${props.cardId}`}>
    <MaterialCard {...props}/>
  </Draggable>;
}

export default Card;
