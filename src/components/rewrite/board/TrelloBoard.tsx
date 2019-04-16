import React, { useState } from "react";

import './Material.css'
import { BoardDiv, GlobalStyle, LaneSection, LaneTitle, NewLaneButtons, Section } from "../../../styles/Base";
import { Lane } from "../../../store";
import EditableLabel from "../../widgets/EditableLabel";
import { AddButton, CancelButton, NewLaneButton } from "../../../styles/Elements";
import { Container } from "react-smooth-dnd";

function NewLane({ onCancel, onAdd }: {
  onCancel: () => void;
  onAdd: (lane: Lane) => void;
}) {
  const [title, updateTitle] = useState('');

  return (
    <Section>
      <LaneTitle>
        <EditableLabel placeholder="Title" onChange={updateTitle} autoFocus/>
      </LaneTitle>

      <NewLaneButtons>
        <AddButton onClick={() => onAdd(new Lane({ title }))}>Add</AddButton>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </NewLaneButtons>
    </Section>
  );
}

export default function TrelloBoard({ children, canAddLanes, addLane, ...rest }) {
  const [currentlyAddingLanes, setCurrentlyAddingLanes] = useState(false);

  return (
    <>
      <GlobalStyle/>

      <BoardDiv className='react-trello-board' draggable={false} {...rest}>
        {children}

        {canAddLanes && <Container orientation="horizontal">
          {currentlyAddingLanes ? (
            <NewLane onCancel={() => setCurrentlyAddingLanes(false)} onAdd={lane => {
              if (addLane(lane)) setCurrentlyAddingLanes(false);
            }}/>
          ) : (
            <LaneSection style={{ width: 200 }}>
              <NewLaneButton onClick={() => setCurrentlyAddingLanes(true)}>
                + Add another lane
              </NewLaneButton>
            </LaneSection>
          )}
        </Container>}
      </BoardDiv>
    </>
  );
}
