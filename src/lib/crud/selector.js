import { createSelector } from 'reselect';

export const getCrudSchemaState = state => state.schema;

export const getCrudListState = (schema) => {
    return createSelector([getCrudSchemaState], state => {
        const List = state.get(schema.getReducerKey());

        if (List) {
            return List.entities[schema.getKey()];
        }

        return null;
    });
};

export const getCrudEntityState = (schema) => {
    return createSelector([getCrudListState(schema)], state => {
        if (state) {
            return state.first();
        }

        return null;
    });
};
