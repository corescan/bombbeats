import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import './WaveformSelector.css';

import sineIcon from '../../../assets/images/sine.png';
import squareIcon from '../../../assets/images/square.png';
import sawtoothIcon from '../../../assets/images/sawtooth.png';
import triangleIcon from '../../../assets/images/triangle2.png';

import { WAVEFORM } from '../../lib/oscillator';
import SquareBacklitButton from '../generic/SquareBacklitButton';

function modifyLabelForButton(key) {
    switch (WAVEFORM[key]) {
        case WAVEFORM.SQUARE:
            return 'squa re';
        case WAVEFORM.TRIANGLE:
            return 'tri angle';
        case WAVEFORM.SAW:
            return 'saw tooth'
        default:
            return WAVEFORM[key];
    }
}

function getWaveformIcon(key) {
    switch (WAVEFORM[key]) {
        case WAVEFORM.SQUARE:
            return squareIcon;
        case WAVEFORM.TRIANGLE:
            return triangleIcon;
        case WAVEFORM.SAW:
            return sawtoothIcon;
        case WAVEFORM.SINE:
            return sineIcon;
        default:
            return void 0;
    }
}

export default function WaveformSelector(props) {

    function renderButtons(selection) {
        return Object.keys(WAVEFORM).map(key => {
            const type = WAVEFORM[key];
            return (
            <SquareBacklitButton
                key={key}
                icon={getWaveformIcon(key)}
                enabled={selection === type}
                onClick={() => {
                    props.onSelect(type);
                }}
            />
        )})
    }

    return (
        <div
            className={'WaveformSelector--container'}
        >
            {renderButtons(props.selected)}
        </div>
    );
}

WaveformSelector.propTypes = {
    settings: PropTypes.instanceOf(Immutable.Map)
}