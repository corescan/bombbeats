/**
 * Recipe for a distortion curve, taken from 
 * https://code-examples.net/en/docs/dom/waveshapernode
 * 
 * @param {Number} amount 
 */
export default function distortionCurve(amount) {
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
