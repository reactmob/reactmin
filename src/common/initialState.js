import navs from './configNav';
import routes from './routeConfig';

const initialState = {
    common: {
        navs: navs,
        routes: routes,
        breadcrumbs: [],
        selectedRouteKey: null,
    }
};

export default initialState;
