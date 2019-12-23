export const WAVEFORM = {
    SINE: "sine",
    TRIANGLE: "triangle",
    SAW: "sawtooth",
    SQUARE: "square"
}

const A4 = 440;

const MUTE_GAIN = 0.00001;
const DEFAULT_GAIN = 0.05;
const LOW_SHELF_GAIN = 20;

const DEFAULT_ATTACK = 0.03;
const DEFAULT_RELEASE = 2; // seconds

export default class Oscillator {
    constructor(context, id) {
        this.ctx = context;
        this.id = id;

        this.osc = null;
        this.pitch = A4;
        this.waveform = WAVEFORM.TRIANGLE;
        this.detune = 0;
        this.gainNode = null;
        
        // bump the osc low end
        this.filter = context.createBiquadFilter();
        this.filter.type = 'lowshelf';
        this.filter.gain.setValueAtTime(LOW_SHELF_GAIN, context.currentTime);

        // method binding
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.setPitch = this.setPitch.bind(this);
        this.setWaveform = this.setWaveform.bind(this);
        this.setDetune = this.setDetune.bind(this);
    }

    on() {
        const osc = this.ctx.createOscillator();
        osc.type = this.waveform;
        osc.frequency.setValueAtTime(this.pitch, this.ctx.currentTime); // value in hertz
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(MUTE_GAIN, this.ctx.currentTime);
        osc.connect(this.gainNode);
        this.gainNode.connect(this.filter);
        this.filter.connect(this.ctx.destination);
        // go!
        this.isOn = true;
        this.osc = osc;
        this.setDetune(this.detune);
        osc.start();
        this.gainNode.gain.exponentialRampToValueAtTime(DEFAULT_GAIN, this.ctx.currentTime + DEFAULT_ATTACK);
    }

    off() {
        this.isOn = false;
        
        /**
         * Implement RELEASE by controlling gain.
         */
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(MUTE_GAIN, this.ctx.currentTime + DEFAULT_RELEASE);
        const oldOsc = this.osc;
        setTimeout(() => {
            oldOsc.stop();
        }, DEFAULT_RELEASE*1000);
    }

    setPitch(pitch) {
        this.pitch = pitch;
        if (this.isOn && this.osc !== null) {
            this.osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
        }
    }

    setWaveform(type) {
        this.waveform = type;
    }

    setDetune(cents) {
        this.detune = cents;
        if (this.isOn && this.osc !== null) {
            this.osc.detune.setValueAtTime(this.detune, this.ctx.currentTime);
        }
    }

    getWaveform() {
        return this.waveform;
    }

    getDetune() {
        return this.detune;
    }
}