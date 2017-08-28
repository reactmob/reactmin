import initialState from './initialState';
import { reducer as navResetReducer } from './navReset';
import { reducer as routeResetReducer } from './routeReset';
import { reducer as breadcrumbResetReducer } from './breadcrumbReset';
import { reducer as routePushReducer } from './routePush';

const reducers = [
    navResetReducer,
    routeResetReducer,
    breadcrumbResetReducer,
    routePushReducer
];

export default function reducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        // Handle cross-topic actions here
        default:
            newState = state;
            break;
    }

    /* istanbul ignore next */
    return reducers.reduce((s, r) => r(s, action), newState);
}
