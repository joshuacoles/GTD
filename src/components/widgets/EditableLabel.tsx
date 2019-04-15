import React, { useState } from 'react';

function EditableLabel({
  autoFocus = false,
  onChange = () => {},
  placeholder = ''
}: Props) {
  const [text, updateText] = useState('');

  return (<input
    onChange={event => updateText(event.target.value)}
    onBlur={() => onChange(text)}
    onKeyPress={event => event.key === 'Enter' ? (event.target as HTMLInputElement).blur() : null}

    autoFocus={autoFocus}
    placeholder={placeholder}

    style={{
      border: 'none',
      outline: 'none',

      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      fontStyle: 'inherit',
      textAlign: 'inherit',

      width: '100%',
      backgroundColor: '#00000000',
      margin: '1px',
    }}
  />);
}

interface Props {
  onChange: (String) => void;
  placeholder: string;
  autoFocus?: boolean;
};

export default EditableLabel;
