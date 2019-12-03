export const Constants = {
    TOGGLE_EFFECT: 'TOGGLE_EFFECT'
};

/*
 * action creators
 */

export function toggleEffect(effectName) {
    return {
        type: Constants.TOGGLE_EFFECT,
        effectName
    };
};
