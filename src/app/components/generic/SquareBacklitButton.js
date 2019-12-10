import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './SquareBacklitButton.css';

export default function SquareBacklitButton(props) {
    let img;
    if (props.icon) {
        img = (
            <img
                alt={props.icon.alt}
                src={props.icon.src}
                className='SquareBacklitButton--icon'
            />
        );
    }
    return (
        <button
            className={classnames('SquareBacklitButton--button',{enabled: props.enabled})}
            onClick={props.onClick}
        >
            {props.label}
            {img}
        </button>
    )
}

SquareBacklitButton.propTypes = {
    label: PropTypes.string,
    enabled: PropTypes.bool,
    icon: PropTypes.shape({
        alt: PropTypes.string,
        src: PropTypes.string
    }),
    onClick: PropTypes.func.isRequired
}