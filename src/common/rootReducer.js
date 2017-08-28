import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import { reducer as notificationsReducer } from 'reapop';
import { reducer as flashMessageReducer } from 'src/ui/FlashMessage';
import { reducer as routingReducer } from 'src/lib/routing';
import { schemaReducer } from './configSchema';
import Api from './configApi';

import commonReducer from '../features/common/redux/reducer';
import dashboardReducer from '../features/dashboard/redux/reducer';
import productReducer from '../features/product/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
const reducerMap = {
    flashMessage: flashMessageReducer,
    notifications: notificationsReducer(),
    schema: schemaReducer({ api: Api }),
    routing: routingReducer,
    router: routerReducer,
    form: formReducer,
    common: commonReducer,
    dashboard: dashboardReducer,
    product: productReducer,
};

export default combineReducers(reducerMap);
