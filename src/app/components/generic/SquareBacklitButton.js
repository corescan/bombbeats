import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './SquareBacklitButton.css';

export default function SquareBacklitButton(props) {
    return (
        <button
            className={classnames('SquareBacklitButton--button',{enabled: props.enabled})}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}

SquareBacklitButton.propTypes = {
    label: PropTypes.string,
    enabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
}