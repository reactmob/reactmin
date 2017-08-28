import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Breadcrumb as FabricBreadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';

export class Breadcrumb extends Component {
    static propTypes = {
        breadcrumbs: PropTypes.array,
        actions: PropTypes.object,
    };

    onLinkClick = (e, el) => {
        e.preventDefault();

        this.props.actions['routePush'](el);
    };

    render() {
        const length = this.props.breadcrumbs.length;
        const breadcrumbs = this.props.breadcrumbs.reduce((bc, item, index) => {
            if (length === index + 1 || !item.component) {
                bc.push({ ...item });
            } else {
                bc.push({ ...item, onClick: this.onLinkClick });
            }

            return bc;
        }, []);

        return (
            <FabricBreadcrumb items={breadcrumbs}/>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        breadcrumbs: state.common.breadcrumbs,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Breadcrumb);
