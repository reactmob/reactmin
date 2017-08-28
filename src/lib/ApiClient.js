import 'whatwg-fetch';
import withQuery  from 'with-query';
import pathToRegexp from 'path-to-regexp';

export default class ApiClient {
    config = {};

    constructor(config) {
        this.config = { ...this.config, ...config };
    }

    static parseData(data) {
        return data;
    }

    static parseError(data) {
        return data;
    }

    static parseRequest(path, params, method, data) {
        const holders = pathToRegexp.parse(path);
        holders.shift();

        path = pathToRegexp.compile(path)(params);

        for (let i in holders) {
            delete params[holders[i].name];
        }

        return {
            path,
            params,
            method,
            data,
        };
    };

    static cleanPath(path) {
        return path.replace(/\/+/g, '/').replace(':/', '://');
    };

    /**
     * @param response
     *
     * @return Response
     */
    static httpStatusInterceptor(response) {
        if (response.status === 204) {
            return Promise.resolve();
        } else if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else if (response.status === 404) {
            const error = new Error(response.statusText);
            error.response = response;
            error.data = Promise.resolve({
                code: response.status,
                message: response.statusText,
            }).then(ApiClient.parseError);
            throw error
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            error.data = response.json().then(ApiClient.parseError);
            throw error
        }
    }

    /**
     * @param promise Promise
     *
     * @return Promise
     */
    static responseHandler(promise) {
        return promise
            .then(ApiClient.httpStatusInterceptor)
            .then(ApiClient.parseData)
            ;
    }

    /**
     * @param {String} _path
     * @param {Object} _criteria
     *
     * @return Promise
     */
    get(_path, _criteria = {}) {
        const { path, params, method } = ApiClient.parseRequest(`${_path}`, _criteria, 'GET');
        const url = `${this.config.base}/${path}`;

        return ApiClient.responseHandler(
            fetch(withQuery(ApiClient.cleanPath(url), params), { method: method })
        );
    }

    put(_path, _criteria = {}, _data) {
        const { path, params, method, data } = ApiClient.parseRequest(`${_path}`, _criteria, 'PUT', _data);
        const url = `${this.config.base}/${path}`;

        return ApiClient.responseHandler(
            fetch(withQuery(ApiClient.cleanPath(url), params), {
                method: method,
                body: data,
                credentials: 'same-origin',
                headers: {
                    "Content-Type": "application/json"
                }
            })
        );
    }
}
