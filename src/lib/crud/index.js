import { takeLatest } from 'redux-saga';
import { Map } from 'immutable';

import { CRUD_LIST_BEGIN, doList, actions as listActions, reducer as listReducer } from './_list'
import { CRUD_READ_BEGIN, doRead, actions as readActions, reducer as readReducer } from './_read'
import { CRUD_UPDATE_BEGIN, doUpdate, actions as updateActions, reducer as updateReducer } from './_update'
import { CRUD_CREATE_BEGIN, doCreate, actions as createActions, reducer as createReducer } from './_create'

let API;
export const CRUD_EDIT_CALLER = `@@dos-crud/EDIT_CALLER`;

export const actions = {
    edit: (payload) => {
        return {
            type: CRUD_EDIT_CALLER,
            payload,
        };
    },
    ...listActions,
    ...readActions,
    ...updateActions,
    ...createActions,
};

export const schemaSagas = {
    watchCrud: function* watchCrud() {
        yield takeLatest(CRUD_LIST_BEGIN, doList(API));
        yield takeLatest(CRUD_READ_BEGIN, doRead(API));
        yield takeLatest(CRUD_UPDATE_BEGIN, doUpdate(API));
        yield takeLatest(CRUD_CREATE_BEGIN, doCreate(API));
    }
};

const initState = new Map({
    pending: false,
    pager: undefined,
    afterEdit: undefined,
});

const reducers = [
    listReducer,
    readReducer,
    updateReducer,
    createReducer,
];

function reducer(state = initState, action) {
    let newState;

    switch (action.type) {
        // Handle cross-topic actions here
        default:
            newState = state;
            break;
    }

    return reducers.reduce((s, r) => r(s, action), newState);
}

export const schemaReducer = (config) => {
    API = config['api'];

    return reducer;
};

export * from './dto';
export * from './selector';
