import Oscillator from './oscillator';

export default class Synthesizer {
    constructor(context, numberOfOscillators = 1) {
        if (numberOfOscillators < 1) {
            throw new Error('Illegal argument: number of oscillators cannot be less than 1.');
        }
        this.ctx = context;
        this.numberOfOscillators = numberOfOscillators;
        this.oscillators = new Array(numberOfOscillators);

        for (let i=0; i < numberOfOscillators; i++) {
            this.oscillators[i] = new Oscillator(context, i);
        }
    }

    noteOn(pitch) {
        for (let i=0; i < this.numberOfOscillators; i++) {
            this.oscillators[i].on(pitch);
        }        
    }

    noteOff() {
        for (let i=0; i < this.numberOfOscillators; i++) {
            this.oscillators[i].off();
        }     
    }

    setPitch(pitch) {
        for (let i=0; i < this.numberOfOscillators; i++) {
            this.oscillators[i].setPitch(pitch);
        }      
    }

    setWaveform(type, idx) {
        if (typeof idx === 'number') {
            if (idx < this.numberOfOscillators && idx >= 0) {
                this.oscillators[idx].setWaveform(type);
                return;
            } else { 
                throw new Error('Invalid oscillator index provided.');
            }
        }

        // set all oscillators
        for (let i=0; i < this.numberOfOscillators; i++) {
            this.oscillators[i].setWaveform(type);
        }    
    }

    setDetune(cents, idx) {
        if (typeof idx === 'number' && idx < this.numberOfOscillators && idx >= 0) {
            this.oscillators[idx].setDetune(cents);
            return;
        }
        throw new Error('Invalid oscillator index provided.');
    }

    getOscillators() {
        return this.oscillators.map(osc => ({
            id: osc.id,
            detune: osc.getDetune(),
            waveform: osc.getWaveform()
        }))
    }
}