import { LOCATION_CHANGE } from 'react-router-redux';
import { COMMON_ROUTE_PUSH } from './constants';
import { breadcrumbReset } from './actions';

export const breadcrumbMiddleware = (history) => store => next => action => {
    if (LOCATION_CHANGE === action.type) {
        store.dispatch(breadcrumbReset(history.location))
    }

    return next(action)
};

export const routePushMiddleware = (history) => store => next => action => {
    if (COMMON_ROUTE_PUSH !== action.type) {
        return next(action)
    }

    const el = action.payload;

    // push from history.location
    if (el.pathname) {
        const { createRouteNode } = require('src/lib/tree');
        const routeTree = createRouteNode(store.getState().common.routes);
        const routeNode = routeTree.first(node => {
            if ('/' === el.pathname) {
                return node.model['isIndex'] === true;
            }

            return node.model['slug'] === el.pathname;
        });

        if (routeNode) {
            action.payload = routeNode.model;
        }
    }

    // without component
    if (!el.component) {
        // external url
        if (/\/\//.test(el.url)) {
            window.location = el.url;
            return;
        }

        return next(action);
    }

    // https://github.com/OfficeDev/office-ui-fabric-react/issues/915
    // https://github.com/OfficeDev/office-ui-fabric-react/issues/1315
    if (el.path) {
        history.push(el.path);
    }

    return next(action)
};
