import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Set } from 'immutable';
import { Filter, ChoiceRemoteConfig } from 'reactmob-filter';
import { FilterList, StringType, NumberType, DateType, ChoiceType, ExistsType } from 'reactmob-filter/lib/Fabric';

import * as actions from './redux/actions';
import { navReset, routeReset } from 'src/features/common/redux/actions';

const countries = [
    { abbr: 'AL', name: 'Alabama' },
    { abbr: 'AK', name: 'Alaska' },
    { abbr: 'AZ', name: 'Arizona' },
    { abbr: 'AR', name: 'Arkansas' },
    { abbr: 'CA', name: 'California' },
    { abbr: 'CO', name: 'Colorado' },
    { abbr: 'CT', name: 'Connecticut' },
    { abbr: 'DE', name: 'Delaware' },
    { abbr: 'FL', name: 'Florida' },
    { abbr: 'GA', name: 'Georgia' },
    { abbr: 'HI', name: 'Hawaii' },
    { abbr: 'ID', name: 'Idaho' },
    { abbr: 'IL', name: 'Illinois' },
    { abbr: 'IN', name: 'Indiana' },
    { abbr: 'IA', name: 'Iowa' },
    { abbr: 'KS', name: 'Kansas' },
];

const countryOptions = {
    //items: [],
    valueField: 'id',
    displayField: item => `${item['firstName']} ${item['lastName']}`,
    items: ChoiceRemoteConfig.create({
        url: 'http://127.0.0.1:8899/api/v1/customers/',
        parser: (data) => {
            if (data && data['_embedded']) {
                return data['_embedded']['items'];
            } else {
                return data;
            }
        }
    })
};

const fields = new Set([
    Filter.create({ name: 'first_name', label: 'First Name', type: StringType }),
    Filter.create({ name: 'birthday', label: 'Birthday', type: DateType }),
    Filter.create({ name: 'age', label: 'Age', type: NumberType }),
    Filter.create({ name: 'country', label: 'Country', type: ChoiceType, options: countryOptions }),
    Filter.create({ name: 'enabled', label: 'Enabled', type: ExistsType }),
]);

export class Dashboard extends Component {
    static propTypes = {
        dashboard: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    navReset = (e) => {
        const navReset = this.props.actions.navReset;
        navReset('upload', { name: "Upload 111" });
        navReset('calendarEvent', { name: "Calendar Event ครับ" });
    };

    routeReset = (e) => {
        const routeReset = this.props.actions.routeReset;
        routeReset('dashboard', { name: "Dashboard ครับ" });
    };

    render() {
        return (
            <div className="dashboard-dashboard">
                <FilterList fields={fields} onChange={(e) => console.log(e)} onSubmit={(filters) => console.log(filters)}/>
                {/*<div className="ms-font-su ms-fontColor-themePrimary">Big blue text ครับพี่</div>
                 <div>Page Content: dashboard/DefaultPage</div>
                 <button onClick={this.navReset}>navTree</button>
                 <button onClick={this.routeReset}>routeReset</button>*/}
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        dashboard: state.dashboard,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions, navReset, routeReset }, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
