import Immutable from 'immutable';
import effects from '../dataSource/effects';
import { Constants } from '../../actions/effectsActions';

const initialState = Immutable.fromJS(effects);

function toggleEffect(state, effectName) {
    const path = [effectName,'enabled'];
    const effectState = state.getIn(path);
    return state.setIn(path, !effectState);
}

export default function effectsReducer(state, action) {
    if (typeof state === 'undefined') {
      return initialState
    }
  
    switch (action.type) {
        case Constants.TOGGLE_EFFECT:
          return toggleEffect(state, action.effectName);
        default:
          return state;
      }
}
