import React, { Component } from 'react'
import classnames from 'classnames';
import './TrackPad.css';

export default class TrackPad extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            keyOn: false,
            mouseOn: false
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.isEnabled = this.isEnabled.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    handleChangeState(key, value) {
        this.setState({
            [key]: value
        }, () => {
            this.props.onChange(this.isEnabled());
        });
    }

    handleKeyDown(event) {
        // check key code SHIFT
        const key = event.which || event.key
        if (key === 16 || key === 'Shift') {
            this.handleChangeState('keyOn', true);
        }
    }
    
    handleKeyUp(event) {
        // check key code SHIFT
        const key = event.which || event.key;
        if (key === 16 || key === 'Shift') {
            this.handleChangeState('keyOn', false);
        }
    }

    handleMouseEnter() {
        this.handleChangeState('mouseOn', true);
    }

    handleMouseLeave() {
        this.handleChangeState('mouseOn', false);
    }

    handleMouseMove(event) {
        const { pageX, pageY } = event;
        const rect = event.target.getBoundingClientRect();
        const touchPadX = pageX - rect.left;
        const touchPadY = pageY - rect.top;
        this.props.onMouseMove({
            x: touchPadX,
            y: touchPadY
        });
    }

    isEnabled() {
        return this.state.keyOn && this.state.mouseOn;
    }

    render() {
        const isEnabled = this.isEnabled();
        return (
            <div
                className={classnames('TrackPad--container', {active: isEnabled})}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseMove={this.handleMouseMove}
            >
                <label className='TrackPad--label'>Hold Shift &darr;</label>
            </div>                
        )
    }
}
