import { call, put } from 'redux-saga/effects';
import { createEmptyNormalizedRecord, doNormalize } from './normalizer';

export const CRUD_LIST_BEGIN = `@@dos-crud/LIST_BEGIN`;
export const CRUD_LIST_SUCCESS = `@@dos-crud/LIST_SUCCESS`;
export const CRUD_LIST_FAILURE = `@@dos-crud/LIST_FAILURE`;

export const actions = {
    list: (payload) => {
        return {
            type: CRUD_LIST_BEGIN,
            payload,
        };
    },
};

export const doList = (API) => function* doList(action) {
    let data;
    try {
        const { path, criteria } = action.payload;
        data = yield call(() => API.get(path, criteria));
    } catch (error) {
        yield put({
            type: CRUD_LIST_FAILURE,
            error: yield (error.data),
        });

        return;
    }

    yield put({
        type: CRUD_LIST_SUCCESS,
        schema: action.payload.schema,
        data,
    });
};

export const reducer = function (state, action) {
    switch (action.type) {
        case CRUD_LIST_BEGIN:
            return state.set('pending', true);

        case CRUD_LIST_SUCCESS:
            return state.withMutations(state => {
                const reducerKey = action.schema.getReducerKey();
                state = createEmptyNormalizedRecord(state, reducerKey);

                return state
                    .set('pending', false)
                    .set('pager', action.data.pager)
                    .set(reducerKey, state.get(reducerKey).merge(
                        doNormalize(state, action.data.items, action.schema, true)
                    ))
            });

        case CRUD_LIST_FAILURE:
            return state.set('pending', false);

        default:
            return state;
    }
};
