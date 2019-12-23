import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Knob.css';

const MIN_VALUE = 0;
const MAX_VALUE = 100;
const DEGREES_MAX = 290; // when the knob is at 100% value (turned clockwise)

export default class Knob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            mousedown: void 0,
        }

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    /**
     *  todo MAP PROPS TO STATE
     *  */

    handleChange(value) {
        this.setState({
            value: value
        })
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value);
        }
    }

    handleMouseDown(ev) {
        this.setState({
            mousedown: ev.pageY // save mouse position as a reference value to determine +/- motion
        });
    }

    handleMouseUp() {
        if (this.state.mousedown) {
            this.setState({
                mousedown: void 0
            });
        }
    }

    handleMouseMove(ev) {
        if (!this.state.mousedown) {
            return;
        }

        const { value, mousedown } = this.state;

        let newValue = value + (mousedown - ev.pageY);
        let newMousedown = ev.pageY; // update reference value by which mouse direction is determined
       
        if (newValue < MIN_VALUE) {
            newValue = 0;
        }
       
        if (newValue > MAX_VALUE) {
            newValue = 100;
        }

        this.setState({
            mousedown: newMousedown
        });

        this.handleChange(newValue);
    }

    render()  {
        const { value } = this.state;
        const { label, className, defaultValue } = this.props;
        const style = {
            transform: `rotate(${value / 100 * DEGREES_MAX}deg)`
        }
        return (
            <div
                className={classnames('Knob--container', className)}
            >
                <div
                    className={classnames('Knob--knob', className)}
                    style={style}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                >
                    <div className='Knob--pointer' />
                </div>
                <div
                    onClick={() => {
                        this.handleChange(defaultValue);
                    }}
                    className={classnames('Knob--label', label.position)}
                >
                    {label.message}
                </div>
            </div>
        );
    }
}

Knob.propTypes = {
    className: PropTypes.string,
    label: PropTypes.shape({
        message: PropTypes.string,
        position: PropTypes.oneOf(['top','right','bottom','left'])
    }),
    valueLabel: PropTypes.shape({
        min: PropTypes.string,
        max: PropTypes.string
    }),
    value: PropTypes.number,
    onChange: PropTypes.func
};

Knob.defaultProps = {
    value: MIN_VALUE,
    defaultValue: 50,
    label: {
        message: '',
        position: 'bottom'
    }
}
