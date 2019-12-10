import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SquareBacklitButton from '../generic/SquareBacklitButton';
import './Effects.css';

import { EFFECTS } from '../../services/AudioService';

export default function Effects(props) {
    function renderButtons(settings) {
        return EFFECTS.map(effect => (
            <SquareBacklitButton
                key={effect.key}
                label={effect.label}
                enabled={settings.getIn([effect.key,'enabled'])}
                onClick={() => {
                    props.onClick(effect.key);
                }}
            />
        ))
    }

    return (
        <div
            className={'Effects-container'}
        >
            {renderButtons(props.settings)}
        </div>
    );
}

Effects.propTypes = {
    settings: PropTypes.instanceOf(Immutable.Map)
}