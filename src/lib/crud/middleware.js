import withQuery  from 'with-query';
import pathToRegexp from 'path-to-regexp';
import { flash } from 'src/ui/FlashMessage';

import { CRUD_EDIT_CALLER } from './';
import { CRUD_LIST_FAILURE } from './_list';
import { CRUD_READ_FAILURE } from './_read';
import { CRUD_UPDATE_SUCCESS } from './_update';

const createEditAction = (action) => {
    let { path, criteria } = action.payload;

    // parse url
    const holders = pathToRegexp.parse(path);
    holders.shift();

    path = pathToRegexp.compile(path)(criteria);

    for (let i in holders) {
        delete criteria[holders[i].name];
    }

    // perform url
    path = withQuery(path, criteria);

    // clean then return
    return path.replace(/\/+/g, '/').replace(':/', '://')
};

// flash alert util
export const schemaCrudMiddleware = history => store => next => action => {
    let oldSchemaState;

    switch (action.type) {
        case CRUD_READ_FAILURE:
        case CRUD_LIST_FAILURE:
            action.error && store.dispatch(flash.error(`[${action.error.code || '00'}] ${action.error.message}`));
            break;

        case CRUD_EDIT_CALLER:
            // side effect
            const state = store.getState();
            oldSchemaState = state.schema = state.schema.set('afterEdit', action.payload.afterEdit);

            // goto edit page
            history.push(createEditAction(action));

            break;
    }

    next(action);

    // after
    switch (action.type) {
        case CRUD_UPDATE_SUCCESS:
            let schema = store.getState().schema;
            const afterEdit = schema.get('afterEdit');

            if (afterEdit) {
                let returnState;

                // side effect
                schema = schema.set('afterEdit', undefined);

                if (returnState = (afterEdit(schema, oldSchemaState, action))) {
                    schema = returnState;
                }

                store.getState.schema = schema;
            }

            break;
    }
};
