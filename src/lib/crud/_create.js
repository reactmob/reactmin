import { call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { createEmptyNormalizedRecord, doNormalize } from './normalizer';

export const CRUD_CREATE_BEGIN = `@@dos-crud/CREATE_BEGIN`;
export const CRUD_CREATE_SUCCESS = `@@dos-crud/CREATE_SUCCESS`;
export const CRUD_CREATE_FAILURE = `@@dos-crud/CREATE_FAILURE`;

export const actions = {
    create: (payload) => {
        return {
            type: CRUD_CREATE_BEGIN,
            payload,
        };
    },
};

export const doCreate = (API) => function* doCreate(action) {
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
        yield put({ type: CRUD_CREATE_FAILURE, error: err });

        return;
    }

    yield put({
        type: CRUD_CREATE_SUCCESS,
        schema: action.payload.schema,
        data: action.payload.dto.commit(data),
    });
};

export const reducer = function (state, action) {
    switch (action.type) {
        case CRUD_CREATE_BEGIN:
            return state.set('pending', true);

        case CRUD_CREATE_SUCCESS:
            return state.withMutations(state => {
                const reducerKey = action.schema.getReducerKey();
                state = createEmptyNormalizedRecord(state, reducerKey);

                return state
                    .set('pending', false)
                    .set(reducerKey, state.get(reducerKey).merge(
                        doNormalize(state, action.data, action.schema)
                    ))
            });

        case CRUD_CREATE_FAILURE:
            return state.set('pending', false);

        default:
            return state;
    }
};
