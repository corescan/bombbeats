import Oscillator from './oscillator';

const DETUNE = 11;

export default class Synthesizer {
    constructor(context, numberOfOscillators = 1) {
        if (numberOfOscillators < 1) {
            throw new Error('Illegal argument: number of oscillators cannot be less than 1.');
        }
        this.ctx = context;
        this.numberOfOscillators = numberOfOscillators;
        this.osc = new Array(numberOfOscillators);

        for (let i=0; i < numberOfOscillators; i++) {
            this.osc[i] = new Oscillator(context);
        }

        // hardcode a detune value until further dev
        this.osc[0].setDetune(DETUNE);
    }

    noteOn(pitch) {
        for (let i=0; i < this.numberOfOscillators; i++) {
            this.osc[i].on(pitch);
        }        
    }

    noteOff() {
        for (let i=0; i < this.numberOfOscillators; i++) {
            this.osc[i].off();
        }     
    }

    setPitch(pitch) {
        for (let i=0; i < this.numberOfOscillators; i++) {
            this.osc[i].setPitch(pitch);
        }      
    }

    setWaveform(type, idx) {
        if (typeof idx === Number && idx < this.numberOfOscillators && idx >= 0) {
            this.osc[idx].setWaveform(type);
            return;
        }

        for (let i=0; i < this.numberOfOscillators; i++) {
            this.osc[i].setWaveform(type);
        }    
        this.osc[0].setDetune(DETUNE);
    }

    setDetune(cents, id = 0) {
        this.osc[id].setDetune(cents);
    }

    getDetune() {
        return this.osc.map(osc => osc.detune);
    }
}