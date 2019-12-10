import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Component} from 'react';
import classnames from 'classnames';

import Metronome from '../../lib/metronome';
import Audio from '../../services/AudioService';

import Track from './Track';
import Controls from './Controls';
import Effects from './Effects';
import RunningLights from './RunningLights';

import { toggleEffect } from '../../actions/effectsActions';

import './Sequencer.css';

const SEQUENCE_LENGTH = 16;

const setEnabledTracks = sounds => {
  let tracksEnabled = {};
  sounds.forEach(sound => {
    tracksEnabled[sound.name] = true
  });
  return tracksEnabled;
}

const setClockParamsFromProps = (props) => {
    Metronome.setParams({
      bpm: props.beat.bpm,
      subdivision: props.beat.subdivision
    });
}

const mapBeatDataToState = props => {
  return {
    beatKey: props.beat.key,

    // Control BPM value
    bpm: props.beat.bpm,

    // Control track-enabled state
    enabledTracks: setEnabledTracks(props.sounds),

    // Control sequence editing
    sequence: props.beat.sequence
  }
}

class Sequencer extends Component {
  constructor(props) {
    super(props);

    let state = {  
      // Control playback state
      isPlaying: false,

      // Control sequencer cursor
      currentStep: 0,
    };

    this.state = Object.assign({}, state, mapBeatDataToState(props));

    this.handleClickTouchPad = this.handleClickTouchPad.bind(this);
    this.handleClickTrackname = this.handleClickTrackname.bind(this);
    this.handleClickEffects = this.handleClickEffects.bind(this);
    this.handleClockStep = this.handleClockStep.bind(this);
    this.handleClockStart = this.handleClockStart.bind(this);
    this.handleClockStop = this.handleClockStop.bind(this);
    this.handleChangeBPM = this.handleChangeBPM.bind(this);
    this.scheduleSequenceStep = this.scheduleSequenceStep.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this);
  }

  componentDidMount() {
    Metronome.addListener('start', this.handleClockStart);
    Metronome.addListener('stop', this.handleClockStop);
    Metronome.addListener('step', this.handleClockStep);
    document.addEventListener('keydown', this.handleKeyDown);

    Audio.loadAudio(this.props.sounds);
    setClockParamsFromProps(this.props);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.beat.key !== state.beatKey) {
      // loaded a new beat
      if (state.isPlaying) Metronome.stop();
      setClockParamsFromProps(props);
      state = mapBeatDataToState(props);
    }

    return state;
  }

  componentWillUnmount() {
    Metronome.stop();
    Metronome.removeListener('start', this.handleClockStart);
    Metronome.removeListener('stop', this.handleClockStop);
    Metronome.removeListener('step', this.handleClockStep);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    // check key code SHIFT
    const key = event.which || event.key
    if (key === 32 || key === 'Space') {
      event.preventDefault();
      this.togglePlayback()
    }
  }

  togglePlayback() {
    if (this.state.isPlaying) {
      Metronome.stop();
    } else {
      Metronome.start();
    }
  }

  /**
   * The clock started. Update state.
   */
  handleClockStart() {
    this.setState({
      isPlaying: true
    });

    console.log({
      key: this.state.beatKey,
      bpm: this.props.beat.bpm,
      subdivision: this.props.beat.subdivision,
      sequence: this.state.sequence
    })
  }

  /**
   * The clock stopped. Stop & reset the sequence.
   */
  handleClockStop() {
    this.setState({
      isPlaying: false,
      currentStep: 0
    });
  }

  /**
   * The clock ticked. Do update.
   * @param {Number} clockStep   The nth step the clock has ticked since starting; 0 start.
   */
  handleClockStep(clockStep) {
    let sequenceStep = clockStep % SEQUENCE_LENGTH;
    this.scheduleSequenceStep(sequenceStep, Audio.getCurrentTime());
    this.setState({
      currentStep: sequenceStep
    });
  }

  handleChangeBPM(event) {
    const { value } = event.target;
    this.setState({
      bpm: value
    });
    Metronome.setBPM(value);
  }

  handleClickTrackname(soundName) {
    const enabledTracks = Object.assign({}, this.state.enabledTracks);
    enabledTracks[soundName] = !enabledTracks[soundName];
    this.setState({
      enabledTracks: enabledTracks
    });
  }

  handleClickTouchPad(track, step) {
    // copy the sequence array before performing update
    let updatedSeq = Object.assign({}, this.state.sequence);

    // toggle the on/off state
    updatedSeq[track][step] = !updatedSeq[track][step];

    this.setState({
      sequence: updatedSeq
    })
  }

  handleClickEffects(effectName) {
    this.props.dispatch(toggleEffect(effectName));
  }

  scheduleSequenceStep(step, when) {
    this.props.sounds.forEach(sound => {
      if (!this.state.enabledTracks[sound.name]) {
        return;
      }
      let triggerOn = this.state.sequence[sound.name][step];
      if (triggerOn) {
        let actualParams = Object.assign({}, sound.params);
        Audio.scheduleAudio(sound.name, when, actualParams, this.props.effects);
      }
    });
  }

  renderTracknames() {
    return this.props.sounds.map(sound => (
        <li
          key={sound.id}
          className="Sequencer-track-label"
          onClick={this.handleClickTrackname.bind(this,sound.name)}
        >
          <button
            className={classnames(
              'Sequencer-track-indicator',
              {active: this.state.enabledTracks[sound.name]}
            )}
          />
          <div
            className="Sequencer-track-name"
          >
            {sound.name}
          </div>
        </li>
      )
    );
  }

  renderTracks(sequence) {
    return this.props.sounds.map(sound => (
        <Track
          key={sound.id}
          enabled={this.state.enabledTracks[sound.name]}
          trackname={sound.name}
          sequence={sequence[sound.name]}
          length={SEQUENCE_LENGTH}
          onClickTouchPad={this.handleClickTouchPad}
        />
      )
    );
  }

  render() {
    const { isPlaying, currentStep, sequence, bpm } = this.state;
    const { effects } = this.props;
    return (
      <div className="Sequencer">
        <Controls
          bpm={bpm}
          onChangeBPM={this.handleChangeBPM}
          isPlaying={isPlaying}
        />
        <Effects
          settings={effects}
          onClick={this.handleClickEffects}
        />
        <RunningLights
          active={isPlaying}
          length={SEQUENCE_LENGTH}
          currentStep={currentStep}
        />
        <div className="Sequencer-sequencer">
          <ul className="Sequencer-tracklist">
            {this.renderTracknames()}
          </ul>
          <div className="Sequencer-track-container">
            {this.renderTracks(sequence)}
          </div>
        </div>
      </div>
    );
  }
}

Sequencer.propTypes = {
  beat: PropTypes.object.isRequired,
  sounds: PropTypes.array.isRequired,
  effects: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const sounds = state.get('sounds');
    const effects = state.get('effects');
    return {
      sounds,
      effects
    }
}
export default connect(mapStateToProps)(Sequencer);
