import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import './WaveformSelector.css';

import { WAVEFORM } from '../../util/AudioService';
import SquareBacklitButton from '../generic/SquareBacklitButton';

export default function WaveformSelector(props) {

    function renderButtons(selection) {

        return Object.keys(WAVEFORM).map(key => {
            const type = WAVEFORM[key];
            return (
            <SquareBacklitButton
                key={key}
                label={type}
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