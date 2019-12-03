import BufferLoader from './BufferLoader';

/**
 * Recipe for a distortion curve, taken from 
 * https://code-examples.net/en/docs/dom/waveshapernode
 * 
 * @param {Number} amount 
 */
function makeDistortionCurve(amount) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;

    for (let i = 0 ; i < n_samples; i++ ) {
      let x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
};

const HIGH_PASS = 750;
const LOW_PASS = 500;
const DISTORTION_AMOUNT = 33;
const DISTORTION_CURVE = makeDistortionCurve(DISTORTION_AMOUNT);

class AudioService {
    constructor() {
        this.audioCtx = new AudioContext();
        this.trackBuffers = [];
        this.masterChannel = [];        
        this.scheduleAudio = this.scheduleAudio.bind(this);
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

    if (effects && effects.getIn(['compression','enabled'])) {
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
        let highpass = makeFilter(audioCtx, {type: 'highpass', frequency: HIGH_PASS});
        node.connect(highpass);
        node = highpass;
    }

    if (effects && effects.getIn(['lowpass','enabled'])) {
        let lowpass = makeFilter(audioCtx, {type: 'lowpass', frequency: LOW_PASS});
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