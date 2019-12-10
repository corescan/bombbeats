import React from 'react';
import classnames from 'classnames';
import './Controls.css';

import Metronome from '../../lib/metronome';

export default function Controls(props) {
    const BPM = props.bpm;
    return (
        <ul
            className={classnames("Controls-container", {active: props.active})}
            onClick={props.onClick}
        >
            <li className={classnames('play', 'playback')}>
                <button 
                    className={classnames('play', {active: props.isPlaying})}
                    onClick={Metronome.start}
                >
                    play_arrow
                </button>
                <button
                    className={classnames('stop', {active: props.isPlaying})}
                    onClick={Metronome.stop}
                >
                    stop
                </button>
            </li>
            <li className="bpm-slider-container">
                <input
                    className="bpm-slider"
                    type="range"
                    value={BPM}
                    min={10}
                    max={300}
                    onChange={props.onChangeBPM}
                />
            </li>
            <li className="bpm-readout">
                <div>{BPM}</div>
            </li>
        </ul>
    );
}
