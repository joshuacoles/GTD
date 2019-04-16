import { Container } from "react-smooth-dnd";
import Card from "../card/Card";
import React from "react";
import { LaneProps } from "./Lane";

export function MaterialLane({ lane, laneId, onCardDrop, getCard, removeCard }: LaneProps) {
  return <div className="card-container">
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
        className: "drop-preview"
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
  </div>;
}