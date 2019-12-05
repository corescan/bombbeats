function sineWaveAt(sampleNumber, tone) {
    let sampleFreq = context.sampleRate / tone
    return Math.sin(sampleNumber / (sampleFreq / (Math.PI*2)))
}

export default function playSound(tone, context) {

    let arr = [], volume = 0.2, seconds = 0.5, tone = 441

    for (let i = 0; i < context.sampleRate * seconds; i++) {
        arr[i] = sineWaveAt(i, tone) * volume
    }

    let buf = arr.slice(0);
    
    let buffer = context.createBuffer(1, buf.length, context.sampleRate)
    buffer.copyToChannel(buf, 0)
    let source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
}