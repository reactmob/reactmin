import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { schemaCrudMiddleware } from 'src/lib/crud/middleware';
import { breadcrumbMiddleware, routePushMiddleware } from 'src/features/common/redux/middleware';
import { routePush } from 'src/features/common/redux/actions';
import history from './history';
import rootReducer from './rootReducer';
import initialState from './initialState';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

// NOTE: Do not change middleares delaration pattern since rekit plugins may register middlewares to it.
const middlewares = [
    thunk,
    sagaMiddleware,
    schemaCrudMiddleware(history),
    routerMiddleware(history),
    breadcrumbMiddleware(history),
    routePushMiddleware(history),
];

let devToolsExtension = f => f;

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'dev') {
    const createLogger = require('redux-logger').createLogger;

    middlewares.push(createLogger({ collapsed: true }));

    if (window.devToolsExtension) {
        devToolsExtension = window.devToolsExtension();
    }
}

export default function configureStore(state = initialState) {
    const store = createStore(rootReducer, state, compose(
        applyMiddleware(...middlewares),
        devToolsExtension
    ));

    // manual page load eg. f5
    store.dispatch(routePush(history['location']));

    /* istanbul ignore if  */
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./rootReducer', () => {
            const nextRootReducer = require('./rootReducer').default; // eslint-disable-line
            store.replaceReducer(nextRootReducer);
        });
    }

    sagaMiddleware.run(rootSaga);

    return store;
}
