import 'babel-polyfill';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';

import logger from './lib/logger';
logger.setLevel(logger.INFO);

import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';

/*loadTheme({
    palette: {
        'themePrimary': 'purple'
    }
});*/

const store = configStore();

function renderApp(app) {
    render(
        <AppContainer>
            {app}
        </AppContainer>,
        document.getElementById('dos-app')
    );
}

renderApp(<Root store={store} routeConfig={routeConfig}/>);

// Hot Module Replacement API
/* istanbul ignore if  */
if (module.hot) {
    module.hot.accept('./common/routeConfig', () => {
        // const nextRoot = require('./Root').default; // eslint-disable-line
        const nextRouteConfig = require('./common/routeConfig').default; // eslint-disable-line
        renderApp(<Root store={store} routeConfig={nextRouteConfig}/>);
    });
}
