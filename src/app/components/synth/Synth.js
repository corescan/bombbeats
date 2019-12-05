import React, { Component } from 'react';
import TrackPad from './TrackPad';
import Audio, { WAVEFORM } from '../../util/AudioService';

import './Synth.css';
import WaveformSelector from './WaveformSelector';

const TRACKPAD_WIDTH = 592;     // todo: find this value (pixel width) by reference
const TONE_RESOLUTION = 8;      // the distance in pixels between semitones
const TONES_PER_OCTAVE = 12;    // 12 semitones
const A0 = 27.5;                // Hz

const FREQUENCIES = new Array(TRACKPAD_WIDTH);
const PIXELS_PER_OCTAVE = TONE_RESOLUTION * TONES_PER_OCTAVE;

/**
 * 
 * @param {Number} refHz                The pitch in Hz, p0, of the interval to be calculated.
 * @param {Integer} interval            The value in {0, octaveDivisor} signifying which subdivision of the octave the interval should end on.
 * @param {Integer} octaveDivisor       The number by which one octave is to be divided.
 * @returns {Float}                     The value in Hz of the pitch $interval above refHz
 */
function calcHzFromInterval(refHz, interval, octaveDivisor) {
    return refHz * Math.pow(2, interval / octaveDivisor);
}

function generateOctavesOfA(numOctaves) {
    let octavesHz = new Array(numOctaves);
    octavesHz[0] = A0;
    for (let i=1; i < numOctaves ;i++) {
        octavesHz[i] = octavesHz[i-1] * 2;
    }
    return octavesHz;
}

function initFrequencies() {
    let ref;
    let interval = 0;
    let octaveDivisor = PIXELS_PER_OCTAVE;
    let A = generateOctavesOfA(Math.ceil(TRACKPAD_WIDTH / PIXELS_PER_OCTAVE));

    for (let i = 0; i < TRACKPAD_WIDTH; i++) {
        if (i % octaveDivisor === 0) {
            // reset the reference pitch and interval count every octave
            let octaveN = i / octaveDivisor;
            ref = A[octaveN];
            interval = 0;
        }
        FREQUENCIES[i] = calcHzFromInterval(ref, interval++,octaveDivisor);
    }
}

export default class Synth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackPadEnabled: false,
            osc: {
                type: WAVEFORM.TRIANGLE,
                pitch: 440
            }
        }

        initFrequencies();

        this.handleTrackPadMove = this.handleTrackPadMove.bind(this);
        this.handleTrackPadChange = this.handleTrackPadChange.bind(this);
        this.handleWaveformSelected = this.handleWaveformSelected.bind(this);
    }

    handleTrackPadMove(pos) {
        const x =  Math.floor(Math.abs(pos.x));
        const pitch = FREQUENCIES[x];
        Audio.setOscPitch(pitch);
        this.setState(state => ({
            osc: {
                type: state.osc.type,
                pitch: pitch
            }
        }));
    }

    handleTrackPadChange(trackPadEnabled) {
        if (trackPadEnabled) {
            const { type, pitch } = this.state.osc
            Audio.oscillateOn(type, pitch);
        } else {
            if (this.state.trackPadEnabled) {
                Audio.oscillateOff();
            }
        }
        this.setState({
            trackPadEnabled: trackPadEnabled
        });
    }

    handleWaveformSelected(type) {
        Audio.setOscWaveform(type);
        this.setState(state => ({
            osc: {
                type: type,
                pitch: state.osc.pitch
            }
        }));
    }

    render() {
        const { type } = this.state.osc
        return (
            <div className='Synth--container'>
                <label className='Synth--label'>Hold Shift &darr;</label>
                <TrackPad 
                    onMouseMove={this.handleTrackPadMove}
                    onChange={this.handleTrackPadChange}
                />
                <WaveformSelector
                    onSelect={this.handleWaveformSelected}
                    selected={type}
                />
            </div>
        )
    }
}