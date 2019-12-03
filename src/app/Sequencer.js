import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Component} from 'react';
import classnames from 'classnames';

import Clock from './util/Clock';
import Audio from './util/AudioService';

import Track from './Track';
import Controls from './Controls';
import Effects from './Effects';
import RunningLights from './RunningLights';

import { toggleEffect } from './actions/effectsActions';

import './Sequencer.css';

function setEnabledTracks(sounds) {
  let tracksEnabled = {};
  sounds.forEach(sound => {
    tracksEnabled[sound.name] = true
  });
  return tracksEnabled;
}

class Sequencer extends Component {
  constructor(props) {
    super(props);

    let clockParams = {
      bpm: props.beat.bpm,
      subdivision: props.beat.subdivision
    }

    let state = {
      beatKey: props.beat.key,
      enabledTracks: setEnabledTracks(props.sounds),
      sequence: props.beat.sequence,
      isPlaying: false,
      currentStep: 0,
      clockParams: clockParams
    };

    this.state = state;

    Clock.setParams(clockParams);

    this.handleClickTouchPad = this.handleClickTouchPad.bind(this);
    this.handleClickTrackname = this.handleClickTrackname.bind(this);
    this.handleClickEffects = this.handleClickEffects.bind(this);
    this.handleClockStep = this.handleClockStep.bind(this);
    this.handleClockStart = this.handleClockStart.bind(this);
    this.handleClockStop = this.handleClockStop.bind(this);
    this.handleClockParamChange = this.handleClockParamChange.bind(this);
    this.scheduleSequenceStep = this.scheduleSequenceStep.bind(this);
  }

  componentDidMount() {
    Clock.addListener('start', this.handleClockStart);
    Clock.addListener('stop', this.handleClockStop);
    Clock.addListener('step', this.handleClockStep);
    Clock.addListener('change', this.handleClockParamChange);

    Audio.loadAudio(this.props.sounds);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.beat.key !== state.beatKey) {
      if (state.isPlaying) {
        Clock.stop();
      }

      // MOVE CLOCK PARAMS TO STORE. RECEIVE PARAMS AS PROPS.

      let clockParams = {
        bpm: props.beat.bpm,
        subdivision: props.beat.subdivision
      };

      state.sequence = props.beat.sequence;
      state.beatKey = props.beat.key;
      state.enabledTracks = setEnabledTracks(props.sounds);
      state.clockParams = clockParams;
      Clock.setParams(clockParams);
    }

    return state;
  }

  componentWillUnmount() {
    Clock.stop();
    Clock.removeListener('start', this.handleClockStart);
    Clock.removeListener('stop', this.handleClockStop);
    Clock.removeListener('step', this.handleClockStep);
    Clock.removeListener('change', this.handleClockParamChange);
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
      bpm: this.state.clockParams.bpm,
      subdivision: this.state.clockParams.subdivision,
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
    let sequenceStep = clockStep % Clock.getSequenceLength();
    this.scheduleSequenceStep(sequenceStep, Audio.getCurrentTime());
    this.setState({
      currentStep: sequenceStep
    });
  }

  /**
   * Clock params changed. Do Update.
   */
  handleClockParamChange(params) {
    this.setState({
      clockParams: params
    })
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
          onClickTouchPad={this.handleClickTouchPad}
        />
      )
    );
  }

  render() {
    const { isPlaying, currentStep, sequence } = this.state;
    const { bpm } = this.state.clockParams;
    const { effects } = this.props;
    return (
      <div className="Sequencer">
        <Controls
          bpm={bpm}
          isPlaying={isPlaying}
        />
        <Effects
          settings={effects}
          onClick={this.handleClickEffects}
        />
        <RunningLights
          active={isPlaying}
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
