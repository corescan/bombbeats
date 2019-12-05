import React from 'react';
import classnames from 'classnames';
import './TouchPad.css';

function TouchPad(props) {
  return (
        <li
            className={classnames(
              'TouchPad-container',
              {
                active: props.active,
                disabled: props.disabled
              }
            )}
            onClick={props.onClick}
        />
  );
}

export default TouchPad;
