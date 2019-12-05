import React from 'react';
import classnames from 'classnames';
import './RunningLights.css';

function renderLights(length, props) {
    let html = [];
    for (let idx = 0; idx < length; idx++) {
        html.push(
            <div 
                key={`running-light-${idx}`}
                className={classnames("RunningLights-light", {'active': props.active && props.currentStep === idx})}
            />
        )
    }
    return html;
}

export default function RunningLights(props) {
    let { length } = props;
    return (
        <ul className="RunningLights-container">
            {renderLights(length, props)}
        </ul>
    );
}
