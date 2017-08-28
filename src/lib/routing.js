import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Immutable from 'immutable';

export const ROUTING_UPDATE = '@@dos/ROUTING_UPDATE';
export function updateRouting(payload) {
    return {
        type: ROUTING_UPDATE,
        payload,
    };
}

export function reducer(state = new Immutable.Map(), action) {
    if (action.type === ROUTING_UPDATE) {
        return state.merge(action.payload);
    }

    return state;
}

export class Routing extends React.Component {
    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    componentWillMount() {
        this.context.store.dispatch(updateRouting({
            match: this.props.computedMatch,
        }));
    }

    render() {
        return <Route {...this.props}/>
    }
}
