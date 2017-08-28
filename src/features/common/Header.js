import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

export class Header extends React.Component {
    static propTypes = {
        navs: PropTypes.array,
        actions: PropTypes.object,
        pageTitle: PropTypes.string,
    };

    render() {
        return (
            <div className="Header ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm4">
                        <div className="dos-page-title">{this.props.pageTitle}</div>
                    </div>
                    <div className="ms-Grid-col ms-sm8">
                        <CommandBar farItems={this.props.navs}/>
                    </div>
                </div>
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        navs: state.common.navs,
        pageTitle: state.common.pageTitle,
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
)(Header);
