import React, { ReactChild, ReactChildren, ReactElement } from 'react';

import classNames from 'classnames';

import { constants } from 'smooth-dnd';
const { wrapperClass } = constants;

function Draggable(props: Props & React.HTMLAttributes<HTMLDivElement>) {
  if (props.render) {
    return React.cloneElement(props.render(), { className: wrapperClass });
  }

  return (
    <div {...props} className={classNames(props.className, wrapperClass)}>
      {props.children}
    </div>
  );
}

interface Props {
  render?: () => ReactElement;
  children: ReactChildren | ReactChild,
}

export default Draggable;
