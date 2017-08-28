import { fromJS } from 'immutable';
import { createNavNode, findApplyBy } from 'src/lib/tree';
import { COMMON_NAV_RESET } from './constants';

export function navReset(key, payload) {
    return {
        type: COMMON_NAV_RESET,
        key,
        payload,
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_NAV_RESET:
            findApplyBy(createNavNode(state.navs), action.payload, { key: action.key });

            return fromJS(state).toJS();

        default:
            return state;
    }
}
