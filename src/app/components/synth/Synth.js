import React, { Component } from 'react';
import TrackPad from './TrackPad';
import Audio from '../../services/AudioService';
import calcHzByInterval from '../../lib/calcHzByInterval';

import './Synth.css';
import OscillatorControls from './OscillatorControls';

const TRACKPAD_WIDTH = 592;         // todo: find this value (pixel width) by reference
const SEMITONE_RESOLUTION = 8;      // the distance in pixels between semitones
const SEMITONES_PER_OCTAVE = 12;    // 12 semitones
const A0 = 27.5;                    // Hz

const FREQUENCIES = new Array(TRACKPAD_WIDTH);
const PIXELS_PER_OCTAVE = SEMITONE_RESOLUTION * SEMITONES_PER_OCTAVE;

const NUM_OSCILLATORS = 2;

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
        FREQUENCIES[i] = calcHzByInterval(ref, interval++, octaveDivisor);
    }
}

export default class Synth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackPadEnabled: false
        }

        initFrequencies();

        this.synth = Audio.createSynthesizer(NUM_OSCILLATORS);

        this.handleTrackPadMove = this.handleTrackPadMove.bind(this);
        this.handleTrackPadChange = this.handleTrackPadChange.bind(this);
        this.handleWaveformSelected = this.handleWaveformSelected.bind(this);
        this.handleDetuneChange = this.handleDetuneChange.bind(this);
    }

    handleTrackPadMove(pos) {
        const x =  Math.floor(Math.abs(pos.x));
        const pitch = FREQUENCIES[x];
        this.synth.setPitch(pitch);
    }

    handleTrackPadChange(trackPadEnabled) {
        if (trackPadEnabled) {
            const { pitch } = this.state
            this.synth.noteOn(pitch);
        } else if (this.state.trackPadEnabled) {
            this.synth.noteOff();
        }
        this.setState({
            trackPadEnabled: trackPadEnabled
        });
    }

    handleWaveformSelected(type, id) {
        this.synth.setWaveform(type, id);
    }

    handleDetuneChange(osc) {
        this.synth.setDetune(osc.detune, osc.id);
    }

    render() {
        const { synth } = this;
        return (
            <div className='Synth--container'>
                <OscillatorControls
                    oscillators={synth.getOscillators()}
                    onWaveformSelect={this.handleWaveformSelected}
                    onDetuneChange={this.handleDetuneChange}
                />
                <TrackPad 
                    onMouseMove={this.handleTrackPadMove}
                    onChange={this.handleTrackPadChange}
                />
            </div>
        )
    }
}