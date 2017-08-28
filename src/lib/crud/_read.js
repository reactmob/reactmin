import { call, put } from 'redux-saga/effects';
import { createEmptyNormalizedRecord, doNormalize } from './normalizer';

export const CRUD_READ_BEGIN = `@@dos-crud/READ_BEGIN`;
export const CRUD_READ_SUCCESS = `@@dos-crud/READ_SUCCESS`;
export const CRUD_READ_FAILURE = `@@dos-crud/READ_FAILURE`;

export const actions = {
    read: (payload) => {
        return {
            type: CRUD_READ_BEGIN,
            payload,
        };
    },
};

export const doRead = (API) => function* doRead(action) {
    let data;
    try {
        const { path, criteria } = action.payload;
        data = yield call(() => API.get(path, criteria));
    } catch (error) {
        yield put({
            type: CRUD_READ_FAILURE,
            error: yield (error.data),
        });

        return;
    }

    yield put({
        type: CRUD_READ_SUCCESS,
        schema: action.payload.schema,
        data,
    });
};

export const reducer = function (state, action) {
    switch (action.type) {
        case CRUD_READ_BEGIN:
            return state.set('pending', true);

        case CRUD_READ_SUCCESS:
            return state.withMutations(state => {
                const reducerKey = action.schema.getReducerKey();
                state = createEmptyNormalizedRecord(state, reducerKey);

                return state
                    .set('pending', false)
                    .set(reducerKey, state.get(reducerKey).merge(
                        doNormalize(state, action.data, action.schema)
                    ))
            });

        case CRUD_READ_FAILURE:
            return state.set('pending', false);

        default:
            return state;
    }
};
