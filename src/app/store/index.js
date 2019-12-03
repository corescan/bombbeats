import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

import effectsReducer from './reducers/effectsReducer';
import soundsReducer from './reducers/soundsReducer';
import beatsReducer from './reducers/beatsReducer';

const rootReducer = combineReducers({
    effects: effectsReducer,
    sounds: soundsReducer,
    beats: beatsReducer
  });

const store = createStore(rootReducer);
export default store;