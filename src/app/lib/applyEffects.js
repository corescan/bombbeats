import distortionCurve from './distortionCurve';

const HIGH_PASS_Hz = 750;
const LOW_PASS_Hz = 500;

const DISTORTION_AMOUNT = 33;
const DISTORTION_CURVE = distortionCurve(DISTORTION_AMOUNT);

const DEFAULT_COMPRESSION = {
    threshold: -50,
    knee: 40,
    ratio: 12,
    attack: 0.25,
    release: 0.67
}

function makeCompressor(audioCtx, settings = DEFAULT_COMPRESSION) {
    let compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(settings.threshold, audioCtx.currentTime);
    compressor.knee.setValueAtTime(settings.knee, audioCtx.currentTime);
    compressor.ratio.setValueAtTime(settings.ratio, audioCtx.currentTime);
    compressor.attack.setValueAtTime(settings.attack, audioCtx.currentTime);
    compressor.release.setValueAtTime(settings.release, audioCtx.currentTime);
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

export default function applyEffects(node, audioCtx, params, effects) {
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
