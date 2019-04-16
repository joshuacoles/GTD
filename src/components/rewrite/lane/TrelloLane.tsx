import React, { useState } from "react";
import { LaneProps } from "./Lane";
import { Section, LaneHeader, Title, RightContent, LaneFooter, AddCardLink } from "../../../styles/Base";
import {
  CollapseBtn, DeleteWrapper,
  ExpandBtn, GenDelButton, LaneMenuContent,
  LaneMenuHeader,
  LaneMenuItem,
  LaneMenuTitle,
  MenuButton
} from "../../../styles/Elements";
import Card from "../card/Card";
import { Container } from "react-smooth-dnd";
import NewCard from "../../cards/NewCard";
import Popover from '@terebentina/react-popover';
import { Item, LaneId } from "../../../store";

/*
  cardDragClass: 'react_trello_dragClass', // TODO
  laneDragClass: 'react_trello_dragLaneClass', ? // TODO
  addLaneTitle: '+ Add another lane',
  addCardTitle: 'Add Card'
 */

function addNewCard(props: LaneProps, setCurrentlyAdding: (b: boolean) => void, addCard: (laneId: LaneId, card: Item) => void, params: Partial<Item>) {
  if (params.title === undefined) return;

  // @ts-ignore We verify this is valid in the above check
  addCard(props.laneId, new Item(params));
  setCurrentlyAdding(false);
}


function LaneMenu({ canRemoveLanes, removeLane }) {
  return (
    <Popover className="menu" position="bottom" trigger={<MenuButton>⋮</MenuButton>}>
      <LaneMenuHeader>
        <LaneMenuTitle>Lane actions</LaneMenuTitle>
        <DeleteWrapper>
          <GenDelButton>&#10006;</GenDelButton>
        </DeleteWrapper>
      </LaneMenuHeader>
      <LaneMenuContent>
        {canRemoveLanes && <LaneMenuItem onClick={removeLane}>Delete Lane...</LaneMenuItem>}
      </LaneMenuContent>
    </Popover>
  );
}

export function TrelloLane(props: LaneProps) {
  const {
    lane, laneId,
    onCardDrop, getCard,
    removeCard,

    canAddLanes,
    canRemoveLanes, removeLane,
    canAddCards, addCard,
  } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [currentlyAdding, setCurrentlyAdding] = useState(false);

  const renderCollapseControl = lane.items.length > 0;
  const renderAddCardButton = canAddCards && !currentlyAdding;

  return <Section className="react-trello-board">
    <LaneHeader onDoubleClick={() => setCollapsed(!collapsed)}>
      <Title>{lane.title}</Title>

      {lane.label && (
        <RightContent>
          <span>{lane.label}</span>
        </RightContent>
      )}

      {canAddLanes && <LaneMenu canRemoveLanes={canRemoveLanes} removeLane={removeLane}/>}
    </LaneHeader>

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

      {renderAddCardButton && <AddCardLink onClick={() => setCurrentlyAdding(true)}>Add Card</AddCardLink>}

      {currentlyAdding && <NewCard onCancel={() => setCurrentlyAdding(false)}
                                   onAdd={p => addNewCard(props, setCurrentlyAdding, addCard, p)}/>}
    </Container>

    {renderCollapseControl && <LaneFooter onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? <ExpandBtn/> : <CollapseBtn/>}
    </LaneFooter>}
  </Section>;
}

export default TrelloLane;