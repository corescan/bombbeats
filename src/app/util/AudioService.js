import BufferLoader from './BufferLoader';
import distortionCurve from './distortionCurve';

const HIGH_PASS_Hz = 750;
const LOW_PASS_Hz = 500;
const DISTORTION_AMOUNT = 33;
const DISTORTION_CURVE = distortionCurve(DISTORTION_AMOUNT);

export const WAVEFORM = {
    SINE: "sine",
    TRIANGLE: "triangle",
    SAW: "sawtooth",
    SQUARE: "square"
}

export const EFFECTS = [
    'compressor',
    'distortion',
    'highpass',
    'lowpass'
]

class AudioService {
    constructor() {
        this.audioCtx = new AudioContext();
        this.trackBuffers = [];
        this.masterChannel = [];        

        this.osc = this.audioCtx.createOscillator();
        this.osc.type = WAVEFORM.SAW;

        this.oscGainNode = this.audioCtx.createGain();
        this.oscGainNode.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
        this.oscFilter = this.audioCtx.createBiquadFilter();
        this.oscFilter.type = 'lowshelf';
        this.oscFilter.gain.setValueAtTime(20, this.audioCtx.currentTime);
        
        this.scheduleAudio = this.scheduleAudio.bind(this);
        this.oscillateOn = this.oscillateOn.bind(this);
    }

    loadAudio(files) {
        let bufferLoader = new BufferLoader(
            this.audioCtx,
            files
          );
        
        bufferLoader.load()
            .then((stuff) => {
                handleSamplesLoaded.call(this, stuff);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    scheduleAudio(bufferName, time, params, effects) {
        let audioCtx = this.audioCtx;
        // console.log(`schedule: @${time || 'now'}. currentTime: ${this.audioCtx.currentTime}`);
        let source = audioCtx.createBufferSource();
        source.buffer = this.trackBuffers[bufferName]
        
        // run through effects options
        let node = applyEffects(source, audioCtx, params, effects);
        
        node.connect(audioCtx.destination);
        source.start(time);
    }

    oscillateOn(type, pitch) {
        this.osc.type = type; // see WAVEFORM
        this.osc.frequency.setValueAtTime(pitch, this.audioCtx.currentTime); // value in hertz
        this.osc.connect(this.oscGainNode);
        this.oscGainNode.connect(this.oscFilter);
        this.oscFilter.connect(this.audioCtx.destination);
        // go!
        this.osc.start();
    }

    oscillateOff() {
        try {
            this.osc.stop();
        } catch(err) {
            console.error(err);
        } finally {
            this.osc = this.audioCtx.createOscillator();
        }
    }

    setOscPitch(pitch) {
        this.osc.frequency.setValueAtTime(pitch, this.audioCtx.currentTime);
    }

    setOscWaveform(type) {
        this.osc.type = type;
    }

    getCurrentTime() {
        return this.audioCtx.currentTime;
    }
}

function handleSamplesLoaded(files) {
    files.forEach(file => {
      this.trackBuffers[file.name] = file.buffer;
    });
}

function applyEffects(node, audioCtx, params, effects) {
    if (params && params.gain) {
        let gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(params.gain, audioCtx.currentTime);
        node.connect(gainNode);
        node = gainNode;
    }

    if (effects && effects.getIn(['compressor','enabled'])) {
        let compressor = makeCompressor(audioCtx);
        node.connect(compressor);
        node = compressor;
    }

    if (effects && effects.getIn(['distortion','enabled'])) {
        let distortion = makeDistortion(audioCtx);
        node.connect(distortion);
        node = distortion;
    }

    if (effects && effects.getIn(['highpass','enabled'])) {
        let highpass = makeFilter(audioCtx, {type: 'highpass', frequency: HIGH_PASS_Hz});
        node.connect(highpass);
        node = highpass;
    }

    if (effects && effects.getIn(['lowpass','enabled'])) {
        let lowpass = makeFilter(audioCtx, {type: 'lowpass', frequency: LOW_PASS_Hz});
        node.connect(lowpass);
        node = lowpass;
    }

    return node;
}

function makeCompressor(audioCtx) {
    let compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
    compressor.knee.setValueAtTime(40, audioCtx.currentTime);
    compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
    compressor.attack.setValueAtTime(0.25, audioCtx.currentTime);
    compressor.release.setValueAtTime(0.67, audioCtx.currentTime);
    return compressor;
}

function makeFilter(audioCtx, opts) {
    let filter = audioCtx.createBiquadFilter();
    filter.type = opts.type;
    if (opts.frequency) {
        filter.frequency.setValueAtTime(opts.frequency, audioCtx.currentTime);
    }
    return filter;
}

function makeDistortion(audioCtx) {
    let waveShaper = audioCtx.createWaveShaper();
    waveShaper.curve = DISTORTION_CURVE;
    waveShaper.oversample = '4x';
    return waveShaper;
}

const audioService = new AudioService();
export default audioService;