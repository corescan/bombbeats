import BufferLoader from '../lib/bufferLoader';
import applyEffects from '../lib/applyEffects';
import Synthesizer from '../lib/synthesizer';

export const EFFECTS = [
    {
        key: 'compressor',
        label: 'compressor'
    },
    {
        key: 'distortion',
        label: 'distortion'
    },
    {
        key: 'highpass',
        label: 'high pass'
    },
    {
        key: 'lowpass',
        label: 'low pass'
    }
]

class AudioService {
    constructor() {
        this.audioCtx = new AudioContext();
        this.trackBuffers = [];

        // bind context
        this.scheduleAudio = this.scheduleAudio.bind(this);
        this.createSynthesizer = this.createSynthesizer.bind(this);
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

    createSynthesizer() {
        return new Synthesizer(this.audioCtx, 2);;
    }
}

function handleSamplesLoaded(files) {
    files.forEach(file => {
      this.trackBuffers[file.name] = file.buffer;
    });
}

const audioService = new AudioService();
export default audioService;