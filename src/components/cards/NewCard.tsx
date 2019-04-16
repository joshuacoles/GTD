import React, { useState } from 'react';
import EditableLabel from '../widgets/EditableLabel';

import { CardHeader, CardRightContent, CardTitle, CardWrapper, Detail } from '../../styles/Base';
import { AddButton, CancelButton } from '../../styles/Elements';

import { Item } from "../../store";

function NewCard({ onCancel, onAdd }: Props) {
  const [title, updateTitle] = useState('');
  const [label, updateLabel] = useState('');
  const [description, updateDescription] = useState('');

  return (
    <div style={{ background: '#E3E3E3' }}>
      <CardWrapper>
        <CardHeader>
          <CardTitle>
            <EditableLabel placeholder="title" onChange={updateTitle} autoFocus/>
          </CardTitle>

          <CardRightContent>
            <EditableLabel placeholder="label" onChange={updateLabel}/>
          </CardRightContent>
        </CardHeader>

        <Detail>
          <EditableLabel placeholder="description" onChange={updateDescription}/>
        </Detail>
      </CardWrapper>

      <AddButton onClick={() => onAdd({ title, label, description })}>Add</AddButton>
      <CancelButton onClick={onCancel}>Cancel</CancelButton>
    </div>
  );
}

interface Props {
  onCancel: () => void;
  onAdd: (item: Partial<Item>) => void;
}

export default NewCard;
