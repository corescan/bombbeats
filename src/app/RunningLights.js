import React from 'react';
import classnames from 'classnames';
import './RunningLights.css';

import Clock from './util/Clock';

function renderLights(count, props) {
    let html = [];
    for (let idx = 0; idx < count; idx++) {
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
    let stepCount = Clock.getSequenceLength();
    return (
        <ul className="RunningLights-container">
            {renderLights(stepCount, props)}
        </ul>
    );
}
