import { call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { createEmptyNormalizedRecord, doNormalize } from './normalizer';

export const CRUD_UPDATE_BEGIN = `@@dos-crud/UPDATE_BEGIN`;
export const CRUD_UPDATE_SUCCESS = `@@dos-crud/UPDATE_SUCCESS`;
export const CRUD_UPDATE_FAILURE = `@@dos-crud/UPDATE_FAILURE`;

export const actions = {
    update: (payload) => {
        return {
            type: CRUD_UPDATE_BEGIN,
            payload,
        };
    },
};

export const doUpdate = (API) => function* doUpdate(action) {
    let data;
    try {
        const { path, criteria, method, dto, property } = action.payload;
        data = yield call(() => API[method](path, criteria, dto[property || 'persistent']));
    } catch (error) {
        let err;
        if (error.data) {
            err = yield (error.data);
        } else {
            err = {
                errors: {
                    _error: `Runtime Error: ${error.message}`
                }
            }
        }

        // redux-form reject
        yield call(action.payload.reject, new SubmissionError({ _error: err.message, ...err.errors }));

        // crud error
        err.payload = action.payload;
        yield put({ type: CRUD_UPDATE_FAILURE, error: err });

        return;
    }

    yield put({
        type: CRUD_UPDATE_SUCCESS,
        schema: action.payload.schema,
        data: action.payload.dto.commit(data),
    });
};

export const reducer = function (state, action) {
    switch (action.type) {
        case CRUD_UPDATE_BEGIN:
            return state.set('pending', true);

        case CRUD_UPDATE_SUCCESS:
            return state.withMutations(state => {
                const reducerKey = action.schema.getReducerKey();
                state = createEmptyNormalizedRecord(state, reducerKey);

                return state
                    .set('pending', false)
                    .set(reducerKey, state.get(reducerKey).merge(
                        doNormalize(state, action.data, action.schema)
                    ))
            });

        case CRUD_UPDATE_FAILURE:
            return state.set('pending', false);

        default:
            return state;
    }
};
