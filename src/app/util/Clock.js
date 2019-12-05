import { EventEmitter } from 'events';
import Audio from './AudioService';

/**
 * Calculate the duration in milliseconds of 1 sequence step.
 * @param {Number} bpm              beats per minute
 * @param {Number} subdivision      rhythmic value of one sequence step (eg: quarter, 8th, 16th note)
 */
function calcStepDurationMillis(bpm, subdivision) {
    
    // quarter note;
    const beatValue = 4;

    // return-value units per minute
    const ms = 60000;

    // (millis per min / beats per min) * (beat value / sequence-step value)
    return ( ms / bpm ) * ( beatValue / subdivision );
}

class Clock extends EventEmitter {
    constructor() {
        super();

        // input parameters (defaults)
        this.subdivision = void 0;
        this.bpm = void 0;        

        // timer variables
        this.startTime = 0;
        this.expectedTime = 0;      // expected time-elapsed
        this.actualTime = 0;        // actual time-elapsed
        
        // run-time vars
        this.isRunning = false;
        this.timeoutId = null;
        this.interval = calcStepDurationMillis(this.bpm, this.subdivision);
        this.currentStep = 0;

        // method bindings
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.step = this.step.bind(this);
        this.setBPM = this.setBPM.bind(this);
        this.setParams = this.setParams.bind(this)
    }

    start() {
        if (this.isRunning) {
            return;
        }        
        
        // reset timing variables
        this.startTime = Audio.getCurrentTime();
        this.expectedTime = 0;
        this.actualTime = 0;

        this.currentStep = 0;
        this.isRunning = true;
        
        this.emit('start');
        this.step();
    }

    stop() {
        this.isRunning = false;
        clearTimeout(this.timeoutId);
        this.emit('stop');
    }

    step() {
        // how much time actually elapsed?
        this.actualTime = Audio.getCurrentTime() - this.startTime;
        // console.warn(`ACTUAL ${this.actualTime}`)
        // console.warn(`EXPECTED ${this.expectedTime}`)

        // get the diff: actualTime is >= than expectedTime due to the potential lag in `setTimeout` function.
        var diff = this.actualTime - this.expectedTime;
        // console.warn(`TIMEOUT ${this.interval - diff}`)
        this.timeoutId = setTimeout(this.step, this.interval - diff)
        

        this.emit('step', this.currentStep);
        this.currentStep++;
        this.expectedTime += this.interval / 1000;
    }
    
    setBPM(bpm) {
        this.bpm = bpm;
        this.interval = calcStepDurationMillis(bpm, this.subdivision);
    }

    setParams(params) {
        // assignment order matters.
        this.subdivision = params.subdivision;
        this.setBPM(params.bpm)
    }
}

const clock = new Clock();
export default clock;
