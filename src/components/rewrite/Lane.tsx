import React from "react";

import { DropResult } from "smooth-dnd";
import { Container, Draggable } from "react-smooth-dnd";

import Card from "./Card";

import { CardModel, LaneModel } from "./utils";

export function Lane({ lane, onCardDrop, getCardPayload }: {
  lane: LaneModel,
  onCardDrop: (columnId: string, dropResult: DropResult) => void,
  getCardPayload: (columnId: string, index: number) => CardModel,
}) {
  return <Draggable key={lane.id}>
    <div className="card-container">
      <div className="card-column-header">
        <span className="column-drag-handle">&#x2630;</span>
        {lane.name}
      </div>
      <Container
        orientation="vertical"
        className="card-container"
        groupName="col"
        onDrop={e => onCardDrop(lane.id, e)}
        getChildPayload={index => getCardPayload(lane.id, index)}
        dragClass="card-ghost"
        dropClass="card-ghost-drop"

        // @ts-ignore
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'drop-preview'
        }}
        dropPlaceholderAnimationDuration={200}
      >
        {lane.cards.map(card => <Card card={card}/>)}
      </Container>
    </div>
  </Draggable>;
}

export default Lane;