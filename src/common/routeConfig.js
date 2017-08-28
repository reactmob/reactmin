import { createRouteNode }  from 'src/lib/tree';
import { PageNotFound, App } from '../features/common';
import commonRoute from '../features/common/route';
import dashboardRoute from '../features/dashboard/route';
import productRoute from '../features/product/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
const childRoutes = [
    dashboardRoute,
    commonRoute,
    productRoute,
];

const routes = [{
    path: '/',
    name: 'Home',
    component: App,
    childRoutes: [
        ...childRoutes,
        { path: '*', name: 'Page not found', component: PageNotFound, position: 100, autoIndexRoute: true },
    ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}];

let routeIndex = 0;
const routeTree = createRouteNode(routes);

// Handle isIndex property of route config:
// Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
    routeIndex++;

    if (!route.key) {
        route.key = `route-${routeIndex}`;
    }

    if (!route.childRoutes || !route.childRoutes.length) {
        return;
    }

    const indexRoute = route.childRoutes.find(child => child.isIndex);

    if (indexRoute) {
        const first = { ...indexRoute };

        first.key = `${indexRoute.key}-index`;
        first.path = route.path;
        first.exact = true;
        first.isIndex = false;
        first.autoIndexRoute = true; // mark it so that the simple nav won't show it.

        route.childRoutes.unshift(first);
    }

    route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);

// add route slug
routeTree.walk((node) => {
    let paths = node.getPath().reduce((paths, item) => {
        if (item.model['path']) {
            paths.push('/' + item.model['path']);
        }

        return paths;
    }, []);

    node.model['slug'] = paths.join("").replace(/\/+/g, '/');
});

export default routeTree.model['childRoutes'];
