/**
 * DEMO DATA in absence of a DB to read/write.
 * */

const NEW = {
    key: 'NEW',
    name: 'NEW',
    bpm: 120,
    subdivision: 16,
    sequence: {
        kick:  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        snare: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        hat:   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
}

const FOUR_ON_THE_FLOOR = {
    key: 'FOUR_ON_THE_FLOOR',
    name: '4 On The Floor',
    bpm: 112,
    subdivision: 16,
    sequence: {
        kick:  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        snare: [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
        hat:   [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0]
    }
}

const HIP_HOP = {
    bpm: "116",
    key: "HIP_HOP",
    name: "Hip Hop",
    sequence: {
        hat:    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        kick:   [1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0],
        snare:  [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]
    },
    subdivision: 16
}

const WONKY_ROCK = {
    bpm: "108",
    key: "WONKY_ROCK",
    name: "Wonky Rock",
    sequence: {
        hat:    [1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0],
        kick:   [1,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0],
        snare:  [0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0]
    },
    subdivision: 16
}

const THREE_AGAINST_FOUR = {
    key: 'THREE_AGAINST_FOUR',
    bpm: '140',
    name: '3 Against 4',
    sequence: {
        hat:    [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
        kick:   [1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0],
        snare:  [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    },
    subdivision: 16
}

const THRASH = {
    bpm: '220',
    key: 'THRASH',
    name: 'Thrash',
    sequence: {
        hat:    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        kick:   [1,0,1,1,0,0,1,0,1,0,1,0,0,0,1,0],
        snare:  [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    },
    subdivision: 16
}

const EXCUSE_ME = {
    key: 'EXCUSE_ME',
    bpm: '300',
    name: 'EXCUSE ME',
    sequence: {
        hat:    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
        kick:   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        snare:  [0,1,1,0,1,1,1,0,0,0,1,1,1,1,1,1]
    },
    subdivision: 16
}

export default [
    NEW,
    FOUR_ON_THE_FLOOR,
    HIP_HOP,
    WONKY_ROCK,
    THREE_AGAINST_FOUR,
    THRASH,
    EXCUSE_ME
];