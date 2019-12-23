import React from 'react'
import PropTypes from 'prop-types';

import './OscillatorControls.css';
import Knob from '../generic/Knob';
import WaveformSelector from './WaveformSelector';

/**
 * Absolute value in cents representing +/- detuning value.
 */
const ABS_DETUNE = 25;

/**
 * Converts the value of a <Knob> to a detuning value for a given Oscillator instance.
 * 
 * @param {Oscillator} osc      an oscillator
 * @param {Number} percent      a value in {0,101}
 * @return {Object}
 */
function handleDetuneChange(osc, percent) {
    return {
        detune: percent2Detune(percent),
        id: osc.id
    }
}

function percent2Detune(percent) {
    const fraction = percent / 100;
    return ABS_DETUNE * 2 * fraction - ABS_DETUNE;
}

function detune2Percent(detune) {
    const fraction = (detune + ABS_DETUNE) / (ABS_DETUNE * 2);
    return fraction * 100;
}

function renderControls(props) {
    return props.oscillators.map((osc, idx) => {
       
        const knobProps = {
            value: detune2Percent(osc.detune),
            className: 'OscillatorControls--knob',
            label: {
                message: 'detune',
                position: 'top'
            },
            onChange: percent => props.onDetuneChange(handleDetuneChange(osc, percent))
        };

        const waveformSelectorProps = {
            id: osc.id,
            selected: osc.waveform,
            onSelect: props.onWaveformSelect
        };
        
        return idx % 2 === 0 ? (
            <div
                key={idx}
                className='OscillatorControls--row'
            >
                <Knob {...knobProps} />
                <WaveformSelector {...waveformSelectorProps} />
            </div>
        ) : (
            <div
                key={idx}
                className='OscillatorControls--row'
            >
                <WaveformSelector {...waveformSelectorProps} />
                <Knob {...knobProps}/>
            </div>
        );
    })
}

export default function OscillatorControls(props) {
    // UI:
    // detune knob +/- 25 cents
    // octave control
    // interval selector 
    // waveform selector

    return (
        <div className='OscillatorControls--container'>
            {renderControls(props)} 
        </div>
    )
}

OscillatorControls.propTypes = {
    oscillators: PropTypes.arrayOf(Object),
    onWaveformSelect: PropTypes.func.isRequired
}
