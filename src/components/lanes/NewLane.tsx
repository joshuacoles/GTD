import React, { useState } from 'react';
import EditableLabel from '../widgets/EditableLabel';

import { AddButton, CancelButton } from '../../styles/Elements';
import { LaneTitle, NewLaneButtons, Section } from '../../styles/Base';

import { Lane } from "../../store";

function NewLane({ onCancel, onAdd }: Props) {
  const [title, updateTitle] = useState('');

  return (
    <Section>
      <LaneTitle>
        <EditableLabel placeholder="title" onChange={updateTitle} autoFocus/>
      </LaneTitle>
      <NewLaneButtons>
        <AddButton onClick={() => onAdd(new Lane({ title }))}>Add</AddButton>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </NewLaneButtons>
    </Section>
  );
}

interface Props {
  onCancel: () => void;
  onAdd: (item: Lane) => void;
}

export default NewLane;
