import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

import Clock from './util/Clock';
import TouchPad from './TouchPad';


function renderTouchPads(props) {
    let stepCount = Clock.getSequenceLength();
    let html = [];
    for (let step=0; step < stepCount; step++) {
        html.push(
            <TouchPad
                key={`touch-pad-${step}`}
                active={props.sequence[step]}
                disabled={!props.enabled}
                onClick={props.onClickTouchPad.bind(null, props.trackname, step)}
            />
        )
    }
    return html;
}

export default function Track(props) {
    return (
        <ul className="Track-container">
            {renderTouchPads(props)}
        </ul>
    );
}

Track.propTypes = {
    trackname: PropTypes.string,
    sequence: PropTypes.array,
    onClickTouchPad: PropTypes.func
};

