import React, {Component} from 'react';
import { connect } from 'react-redux';

import Sequencer from './Sequencer';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedBeat: void 0
    };
    this.handleBeatSelected = this.handleBeatSelected.bind(this);
  }

  handleBeatSelected(event) {
    this.setState({
      selectedBeat: event.target.value
    });
  }

  componentDidMount() {
    const beatKeys = this.props.beats.map(beat => beat.key);
    this.setState({
      selectedBeat: beatKeys.length > 0 ? beatKeys[0] : void 0
    })
  }

  renderBeatSelect() {
    const options = this.props.beats.map(beat => (
        <option
          key={beat.key}
          value={beat.key}
        >
          {beat.name}
        </option>
      )
    );

    return (
      <select
        value={this.state.selectedBeat}
        onChange={this.handleBeatSelected}
        className='App--beat-select'
      >
        {options}
      </select>
    );
  }

  render () {
    const beat = this.props.beats.find(beat => beat.key === this.state.selectedBeat);
    return (
      <div className="App">
        {this.renderBeatSelect()}
        {beat ? 
          <Sequencer
            beat={beat}
          />
        : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const beats = state.get('beats');
  return {
    beats
  }
}

export default connect(mapStateToProps)(App);
