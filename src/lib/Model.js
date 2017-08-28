import { Model as OrmModel } from "redux-orm";
import Api from 'src/common/configApi';

export default class Model extends OrmModel {
    getData() {
        return this._fields;
    }

    static clear() {
        this.all()
            .toModelArray()
            .forEach(r => r.delete())
    }

    static createNewCollectionFromJson(data) {
        this.clear();
        this.parseData(data).forEach(data => this.create(data))
    }

    static createNewFromJson(data) {
        this.clear();
        this.create(data);
    }

    static getAll() {
        return this.all().toModelArray();
        //return this.all().toRefArray();
    }

    static parseData(data) {
        return (data && data['items'] ? data['items'] : data) || [];
    }

    static fetch(path, params) {
        return Api.get(path, params);
    }

    static put(path, params, data) {
        return Api.put(path, params, data);
    }
}
