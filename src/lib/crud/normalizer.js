import { normalize, arrayOf, NormalizedRecord } from 'normalizr-immutable';

export const doNormalize = (state, data, schema, isArray) => {
    if (!data) {
        throw new Error(`In order to 'normalizer', data should have no empty.`)
    }

    return normalize(data, isArray ? arrayOf(schema) : schema, {
        getState: () => ({ [schema.getReducerKey()]: state.get(schema.getReducerKey()) }),
        useMapsForEntityObjects: true,
        useProxyForResults: true,
    });
};

export const emptyNormalizedRecord = new NormalizedRecord({});
export const createEmptyNormalizedRecord = (state, reducerKey) => {
    if (!state.get(reducerKey)) {
        return state.set(reducerKey, emptyNormalizedRecord);
    }

    return state;
};
