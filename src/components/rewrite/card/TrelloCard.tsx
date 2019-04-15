import React from 'react';

import { CardHeader, CardRightContent, CardTitle, Detail, Footer, MovableCardWrapper } from '../../../styles/Base';
import DeleteButton from "../../widgets/DeleteButton";

import { CardProps } from "./Card";

export function Card({ cardId, card: { title, label, description }, editable, removeCard }: CardProps) {
  return (
    <MovableCardWrapper
      className={'react-trello-board'}
    >
      <span>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardRightContent>{label}</CardRightContent>
        </CardHeader>

        <Detail>{description}</Detail>
      </span>

      {editable && <DeleteButton className="card-delete-button" onClick={event => {
        removeCard(cardId)
      }}/>}
    </MovableCardWrapper>
  );
}

export default Card;

/*
      {tags && (
        <Footer>
          {tags.map((tag: any) => (
            <Tag key={tag.title} {...tag} tagStyle={tagStyle}/>
          ))}
        </Footer>
      )}
 */