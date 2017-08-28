import { createRouteNode } from 'src/lib/tree';
import { COMMON_BREADCRUMB_RESET } from './constants';

export function breadcrumbReset(location) {
    return {
        type: COMMON_BREADCRUMB_RESET,
        location
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case COMMON_BREADCRUMB_RESET:
            const path = action.location.pathname;
            const pathWithoutSlash = path.startsWith('/') ? path.substr(1) : path;
            const routeTree = createRouteNode(state.routes);
            const indexRoute = routeTree.first(node => true === node.model['isIndex']);

            // find page or page not found
            const route = routeTree.first(node => {
                return node.model['slug'] === path || node.model['slug'] === pathWithoutSlash;
            }) || routeTree.first(node => '*' === node.model['path']);

            let paths = route.getPath();

            if (indexRoute) {
                paths.shift();

                if (paths.length) {
                    if ('/' === paths[0].model['path']) {
                        paths.shift();
                    }
                }

                if (paths.length) {
                    if (indexRoute.model['path'] === paths[0].model['path']) {
                        paths.shift();
                    }

                    paths = [indexRoute].concat(paths);
                } else {
                    paths = [indexRoute];
                }
            }

            const breadcrumbs = paths.reduce((bc, node) => {
                if (node.model['path']) {
                    bc.push({ ...node.model, text: node.model['name'] })
                }

                return bc;
            }, []);

            return {
                ...state, breadcrumbs
            };

        default:
            return state;
    }
}
