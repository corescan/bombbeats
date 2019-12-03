import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classnames from 'classnames';
import './Effects.css';

export default function Effects(props) {

    function handleClickCompressor() {
        props.onClick('compression');
    }

    function handleClickDistortion() {
        props.onClick('distortion');
    }

    function handleClickHighpass() {
        props.onClick('highpass');
    }

    function handleClickLowpass() {
        props.onClick('lowpass');
    }

    // function handleClickDelay() {
    //     props.onClick('delay');
    // }

    return (
        <div
            className={'Effects-container'}
        >
            <button
                className={classnames('Effects-compressor',{enabled: props.settings.getIn(['compression','enabled'])})}
                onClick={handleClickCompressor}
            >
                compressor
            </button>
            <button
                className={classnames('Effects-distortion',{enabled: props.settings.getIn(['distortion','enabled'])})}
                onClick={handleClickDistortion}
            >
                distortion
            </button>
            <button
                className={classnames('Effects-highpass',{enabled: props.settings.getIn(['highpass','enabled'])})}
                onClick={handleClickHighpass}
            >
                high pass
            </button>
            <button
                className={classnames('Effects-lowpass',{enabled: props.settings.getIn(['lowpass','enabled'])})}
                onClick={handleClickLowpass}
            >
                low pass
            </button>
            {/* <button
                className={classnames('Effects-delay',{enabled: props.delay.enabled})}
                onClick={handleClickDelay}
            >
                delay
            </button> */}
        </div>
    );
}

Effects.propTypes = {
    settings: PropTypes.instanceOf(Immutable.Map)
}