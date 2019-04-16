import React from "react";

import { DropResult } from "smooth-dnd";
import { Draggable } from "react-smooth-dnd";

import { Item, ItemId, Lane as LaneModel, LaneId } from "../../../store";
import { MaterialLane } from "./MaterialLane";

export interface LaneProps {
  laneId: LaneId,
  lane: LaneModel,
  onCardDrop: (laneId: LaneId, dropResult: DropResult) => void,
  getCard: (cardId: ItemId) => Item,
  removeCard: (cardId: ItemId) => void,

  // FIXME: Actually implement these
  canAddLanes: boolean,
  canRemoveLanes: boolean, removeLane: (laneId: LaneId) => void,
  canAddCards: boolean, addCard: (laneId: LaneId, card: Item) => void,
}

// TODO: Move laneId also into Lane
export function Lane(props: LaneProps) {
  const { laneId } = props;

  return <Draggable key={`draggable-lane-${laneId}`}>
    <MaterialLane {...props}/>
  </Draggable>;
}

export default Lane;