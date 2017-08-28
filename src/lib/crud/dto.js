import { fromJS } from 'immutable';

export class SchemaDTO {
    constructor(entity) {
        this.phantom = undefined;
        this.persistent = undefined;
        this.entity = entity;
    }

    persist(value) {
        this.phantom = fromJS(value);
        this.persistent = value;
    }

    commit(data) {
        if (data) {
            this.data = data;
        } else {
            this.data = this.phantom.toJS();
        }

        this.phantom = undefined;
        this.persistent = undefined;

        return this.data;
    }
}
