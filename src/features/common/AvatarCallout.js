import React from 'react';
import PropTypes from 'prop-types';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Persona } from 'office-ui-fabric-react/lib/Persona';

export default class AvatarCallout extends React.Component {
    static propTypes = {
        menus: PropTypes.array,
        personaDetails: PropTypes.object,
    };

    static defaultProps = {
        menus: [],
        personaDetails: {},
    };

    state = {
        isContextMenuVisible: false,
    };

    openContextMenu = (e) => {
        if (0 === this.props.menus.length) {
            return;
        }

        this.setState({
            isContextMenuVisible: true
        });
    };

    closeContextMenu = (e) => {
        this.setState({
            isContextMenuVisible: false,
        });
    };

    render() {
        const dataId = `dch-` + Date.now();
        const dataIdAttr = `[data-context-holder="${dataId}"]`;

        return (
            <CommandButton className="AvatarCallout"
                           data-context-holder={dataId}
                           style={{ height: 'inherit' }}
                           //menuIconProps={ { iconName: 'chevronDown' } }
                           onClick={this.openContextMenu}>
                <Persona { ...this.props.personaDetails }/>
                {this.state.isContextMenuVisible ? (
                    <ContextualMenu 
                                    shouldFocusOnMount={true}
                                    onDismiss={this.closeContextMenu}
                                    items={this.props.menus}
                                    target={dataIdAttr}/>
                ) : (null)}
            </CommandButton>
        );
    }
}
