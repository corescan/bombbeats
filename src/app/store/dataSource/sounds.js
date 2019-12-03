import kick from '../../../assets/sounds/RT_Ian_Chang_Kick_1_Drums_Ian_Chang_one_shot.wav';
import snare from '../../../assets/sounds/RT_Ian_Chang_Tea_Towel_Snare_1_Medium_1_Drums_Ian_Chang_one_shot.wav';
import hat from '../../../assets/sounds/Hat_XL_13.wav';

export default [
  {
    id: 0,
    name:'kick',
    src: kick,
    params: {
      gain: 0.4
    }
  },
  {
    id:1,
    name:'snare',
    src: snare,
    params: {
    gain: 0.6
    }
  },
  {
    id: 2,
    name:'hat',
    src: hat,
    params: {
      gain: 0.2
    }
  }
];
