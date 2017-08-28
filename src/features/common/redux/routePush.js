import { COMMON_ROUTE_PUSH } from './constants';

export function routePush(payload) {
    return {
        type: COMMON_ROUTE_PUSH,
        payload
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_ROUTE_PUSH:
            return {
                ...state,
                selectedRouteKey: action.payload.key,
                pageTitle: action.payload.name,
            };

        default:
            return state;
    }
}
