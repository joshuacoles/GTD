import React, { ReactChild, useState } from "react";

import './Material.css'
import { NewLaneButtons } from "../../../styles/Base";
import { AddButton, CancelButton } from "../../../styles/Elements";
import { Lane } from "../../../store";
import { Container } from "react-smooth-dnd";
import EditableLabel from "../../widgets/EditableLabel";
import styled from 'styled-components';

interface ThemeBoardProps {
  children: ReactChild,
  canAddLanes: boolean,
  addLane: (lane: Lane) => boolean,
}

function MaterialNewLane({ onCancel, onAdd }: {
  onCancel: () => void;
  onAdd: (lane: Lane) => void;
}) {
  const [title, updateTitle] = useState('');

  return (
    <div className="card-container">
      <div className="card-column-header">
        <EditableLabel placeholder="Title" onChange={updateTitle} autoFocus/>
      </div>

      <NewLaneButtons>
        <AddButton style={{ padding: '6px 18px', fontSize: '16px' }} onClick={() => onAdd(new Lane({ title }))}>Add</AddButton>
        <CancelButton style={{ padding: '6px 18px', fontSize: '16px', float: 'right' }} onClick={onCancel}>Cancel</CancelButton>
      </NewLaneButtons>
    </div>
  );
}

export default function MaterialBoard({ children, canAddLanes, addLane }: ThemeBoardProps) {
  const [currentlyAddingLanes, setCurrentlyAddingLanes] = useState(false);

  return (
    <div className="card-scene">
      {children}

      {canAddLanes && <Container orientation="horizontal">
        {currentlyAddingLanes ? (
          <MaterialNewLane onCancel={() => setCurrentlyAddingLanes(false)} onAdd={lane => {
            if (addLane(lane)) setCurrentlyAddingLanes(false);
          }}/>
        ) : (
          <div className="card-container">
            <div className="card-column-header">
              <NewLaneButton onClick={() => setCurrentlyAddingLanes(true)}>
                + Add another lane
              </NewLaneButton>
            </div>
          </div>
        )}
      </Container>}
    </div>
  );
}

const NewLaneButton = styled.button`
  background: none;
  font-size: inherit;
  color: #666666;

  border: none;
  outline: none;
  
  transition: background 0.3s ease;
  min-height: 32px;
  padding: 4px 16px;
  vertical-align: top;
  margin-top: 0;
  margin-right: 0px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 0;
`;
