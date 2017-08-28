import { fromJS } from 'immutable';
import { createRouteNode, findApplyBy } from 'src/lib/tree';
import { COMMON_ROUTE_RESET } from './constants';

export function routeReset(key, payload) {
    return {
        type: COMMON_ROUTE_RESET,
        key,
        payload,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_ROUTE_RESET:
            findApplyBy(createRouteNode(state.routes), action.payload, { key: action.key });

            return fromJS(state).toJS();

        default:
            return state;
    }
}
