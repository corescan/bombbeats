/**
 * Given an initial tone, the frequency (Hz) of a target tone can be calculated as 
 * 
 * HzTarget = HzInitial * ( 2^(n/k) )
 * 
 * where k is the constant that divides the octave into k semitones, and n is a variable indicating
 * the distance in semitones from the initial frequency.
 * 
 * Example: In a 12-tone octave, calculate the note B above A:440, given that B is 2 semi-tones above A:
 *          HzB = 440 * (2 ^ 2/12) 
 *          HzB = 493.8833012561241
 * 
 * @param {Number} refHz                The initial reference pitch in Hz.
 * @param {Integer} n                   The value in range {0, octaveDivisor} indicating the distance in semitones from refHz.
 * @param {Integer} k                   The integer constant by which one octave is divided. Default to 12-tone octave.
 * @returns {Float}                     The value in Hz of the pitch $n semitones from refHz.
 */
export default function calcHzByInterval(refHz, n, k = 12) {
    return refHz * Math.pow(2, n / k);
}