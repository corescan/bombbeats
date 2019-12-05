import React, { Component } from 'react';
import TrackPad from './TrackPad';
import Audio, { WAVEFORM } from '../../util/AudioService';

import './Synth.css';
import WaveformSelector from './WaveformSelector';

const TRACKPAD_WIDTH = 592;     // todo: find this value by reference
const C1 = 32.703;              // Hz
const C6 = 1046.502;
const SYNTH_RANGE = C6 - C1;

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

        this.handleTrackPadMove = this.handleTrackPadMove.bind(this);
        this.handleTrackPadChange = this.handleTrackPadChange.bind(this);
        this.handleWaveformSelected = this.handleWaveformSelected.bind(this);
    }

    handleTrackPadMove(pos) {
        const rangeRatio = pos.x / TRACKPAD_WIDTH;
        const pitch = SYNTH_RANGE * rangeRatio + C1;
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