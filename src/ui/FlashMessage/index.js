import React from 'react';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dismiss } from './actions';

export * from './actions';
export class FlashMessage extends React.Component {
    static propTypes = {
        flashMessage: PropTypes.object,
        onDismiss: PropTypes.func,
    };

    render() {
        const { flashMessage, ...props } = this.props;

        if (!flashMessage) return null;

        let { message, ...messageProps } = flashMessage;

        if (Array.isArray(message)) {
            if (message.length > 1) {
                message = message.map((msg, i) => {
                    return <div key={i}>{msg}</div>
                });
            } else  {
                message = message[0];
            }
        }

        return (
            <MessageBar {...props} {...messageProps}>{message}</MessageBar>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        flashMessage: state.flashMessage,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        onDismiss: () => dispatch(dismiss())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FlashMessage);
