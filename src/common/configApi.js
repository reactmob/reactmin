import ApiClient from 'src/lib/ApiClient';
import sfErrorParser from 'src/lib/sf-errors-parser';
import { arrayUnique } from 'src/lib/utils';

// config api
ApiClient.parseData = (data) => {
    if (data && data['_embedded']) {
        const items = data['_embedded']['items'];
        delete data['_embedded'];

        return {
            pager: data,
            items: items,
        }
    } else {
        return data;
    }
};

ApiClient.parseError = (err) => {
    if (err.errors && err.errors.children) {
        sfErrorParser(err.errors.children);
    }

    return {
        code: err.code,
        message: err.errors && err.errors.errors ? arrayUnique(err.errors.errors) : err.message,
        errors: err.errors && err.errors.children ? err.errors.children : null
    }
};

const cleanSubmitData = (v) => {
    if (typeof v === "object") {
        for (let _k in v) {
            if (_k === '_links' || _k === 'id') {
                delete v[_k];
            } else {
                cleanSubmitData(v[_k]);
            }
        }
    }
};

const cleanSubmitTranslationData = (v, pk) => {
    if (typeof v === "object") {
        for (let _k in v) {
            // en_US:
            //     locale: en_US <= delete
            if (pk === v[_k]) {
                delete v[_k];
            }

            cleanSubmitTranslationData(v[_k], _k);
        }
    }
};

const baseParseRequest = ApiClient.parseRequest;

ApiClient.parseRequest = (path, criteria, method, data) => {
    let sorting;

    if (criteria['sorting']) {
        sorting = criteria['sorting'].reduce((prev, field) => {
            for (let key in field) {
                prev[key] = field[key];
            }

            return prev;
        }, {});

        criteria['sorting'] = sorting;
    }

    if ('PUT' === method) {
        cleanSubmitData(data);
        cleanSubmitTranslationData(data);
        data = JSON.stringify(data);
        //method = 'POST';
        //criteria._method = 'PUT';
    }

    return baseParseRequest(path, criteria, method, data);
};

const Api = new ApiClient({
    base: 'http://127.0.0.1:8899/api/v1/',
});

export default Api;
