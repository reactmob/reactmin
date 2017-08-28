import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import '!style-loader!css-loader!font-awesome/css/font-awesome.min.css';
import FlashMessage from 'src/ui/FlashMessage';
import { Sidebar, Header, Breadcrumb } from './';

export class App extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        states: PropTypes.object,
    };

    static defaultProps = {
        children: 'No content.',
        states: {},
    };

    render() {
        const selectedRouteKey = this.props.states.common.selectedRouteKey;

        return (
            <SplitPane split="vertical" minSize={50} defaultSize={240}>
                <div className="dos-sidebar">
                    <Sidebar initialSelectedKey={selectedRouteKey} selectedKey={selectedRouteKey}/>
                </div>
                <div className="dos-container">
                    <div className="dos-header">
                        <Header/>
                    </div>
                    <div className="dos-breadcrumb">
                        <Breadcrumb />
                    </div>
                    <FlashMessage/>
                    <div className="dos-content">
                        {this.props.children}
                    </div>
                    <NotificationsSystem theme={theme}/>
                </div>
            </SplitPane>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        states: state,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
