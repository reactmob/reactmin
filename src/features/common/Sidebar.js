import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

export class Sidebar extends Component {
    static propTypes = {
        routes: PropTypes.array,
        actions: PropTypes.object,
    };

    renderLinks(items, basePath) {
        return items.reduce((prev, item) => {
            if (item.autoIndexRoute) return prev;

            let path;

            if (/^\//.test(item.path)) {
                path = item.path;
            } else if (basePath === '/') {
                path = `/${item.path}`;
            } else {
                path = `${basePath}/${item.path}`;
            }

            // to support attributes of https://dev.office.com/fabric#/components/nav
            prev.push(Object.assign({ ...item }, {
                path: path,
                url: item.url || path,
                key: item.key
            }));

            if (item.childRoutes && item.childRoutes.length) {
                let last = prev.slice(-1).pop();
                last.isExpanded = true;
                last.links = this.renderLinks(item.childRoutes, path);
            }

            return prev;
        }, []);
    }

    onLinkClick = (e, el) => {
        e.preventDefault();

        // custom link click on demand
        if (el.onLinkClick) {
            return el.onLinkClick.call(this, el, e);
        }

        // heading menu click
        if (el.links) {
            el.isExpanded = !el.isExpanded;
            return;
        }

        this.props.actions['routePush'](el);
    };

    onRenderLink = (a, b) => {
        // TODO: custom link with badge etc..
    };

    render() {
        const menus = this.renderLinks(this.props.routes[0].childRoutes, '');
        const props = Object.assign({}, {
            groups: [{ links: menus }],
            initialSelectedKey: 'menu-1',
            expandedStateText: 'expanded',
            collapsedStateText: 'collapsed',
            onLinkClick: this.onLinkClick,
            //onRenderLink: this.onRenderLink,
        }, { ...this.props });

        delete props.routes;
        delete props.actions;

        return (
            <Nav {...props}/>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        routes: state.common.routes,
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
)(Sidebar);
