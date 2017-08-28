import { schemaSagas } from './configSchema';
import * as commonSagas from '../features/common/redux/sagas';
import * as dashboardSagas from '../features/dashboard/redux/sagas';
import * as productSagas from '../features/product/redux/sagas';

const featureSagas = [
    schemaSagas,
    commonSagas,
    dashboardSagas,
    productSagas,
];

// a saga should be function, below filter avoids error if redux/sagas.js is empty;
const sagas = featureSagas.reduce((prev, curr) => [
    ...prev,
    ...Object.keys(curr).map(k => curr[k]),
], []).filter(s => typeof s === 'function');

function* rootSaga() {
    yield sagas.map(saga => saga());
}

export default rootSaga;
