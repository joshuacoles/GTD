import React, { ReactElement } from 'react';
import { MovableCardWrapper } from '../../styles/Base';
import DeleteButton from '../widgets/DeleteButton';
import classNames from 'classnames';
import { Item } from "../../store";
import { StandardCard } from "./StandardCard";

function Card({
  cardId,
  laneId,

  className = '',

  cardStyle = {},
  dragStyle = {},

  editable = false,
  deletable,
  onDelete = (_id, _laneId) => {},
  removeCard,

  customCardLayout = false,
  customCard,

  ...otherProps
}: Props) {
  const body = customCardLayout ?
    React.cloneElement(customCard!, { ...otherProps }) :
    (<StandardCard {...otherProps}/>);

  return (
    <MovableCardWrapper
      className={classNames('react-trello-board', className)}
      key={cardId}
      data-id={cardId}

      style={{
        ...cardStyle,
        padding: customCardLayout ? 0 : cardStyle.padding,

        ...dragStyle
      }}

      {...otherProps}>

      {body}

      {editable && !deletable && <DeleteButton onClick={event => {
        removeCard!(laneId, cardId);
        onDelete(cardId, laneId);
        event.stopPropagation();
      }}/>}
    </MovableCardWrapper>
  );
}

interface Props {
  className?: string,

  cardId: string;
  card: Item,

  laneId: string;

  onClick?: Function,
  onDelete?: Function,

  removeCard?: (laneId: string, id: string) => void,

  cardStyle?: any
  dragStyle?: any

  customCardLayout?: boolean
  customCard?: ReactElement,

  editable?: boolean,
  deletable?: boolean,
}

export default Card;
