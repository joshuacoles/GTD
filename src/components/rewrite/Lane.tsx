import React from "react";

import { DropResult } from "smooth-dnd";
import { Container, Draggable } from "react-smooth-dnd";

import Card from "./card/Card";

import { Lane as LaneModel, Item as ItemModel, LaneId, ItemId } from "../../store";

// TODO: Move laneId also into Lane
export function Lane({ laneId, lane, onCardDrop, getCard, removeCard }: {
  laneId: LaneId,
  lane: LaneModel,
  onCardDrop: (laneId: LaneId, dropResult: DropResult) => void,
  getCard: (cardId: ItemId) => ItemModel,
  removeCard: (cardId: ItemId) => void,
}) {
  return <Draggable key={laneId}>
    <div className="card-container">
      <div className="card-column-header">
        <span className="column-drag-handle">&#x2630;</span>
        {lane.title}
      </div>
      <Container
        orientation="vertical"
        className="card-container"
        groupName="col"
        onDrop={dr => onCardDrop(laneId, dr)}
        getChildPayload={index => lane.items[index]}
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
        {lane.items.map(cardId => <Card
          key={cardId}
          card={getCard(cardId)}
          cardId={cardId}
          editable={true /* TODO */}
          removeCard={removeCard}
        />)}
      </Container>
    </div>
  </Draggable>;
}

export default Lane;