import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, SpinnerSize } from 'src/ui/Spinner';
import { Label } from 'src/ui/Label';

export class LoadMask extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        loading: PropTypes.bool,
        size: PropTypes.string,
        label: PropTypes.string,
    };

    static defaultProps = {
        size: 'medium',
    };

    render() {
        if (this.props.loading) {
            const size = SpinnerSize[this.props.size];

            return (
                <div className="dos-load-mask">
                    <div className="dos-load-mask__el" color="#000">
                        <Spinner size={size}/>
                        {this.props.label && <Label>{this.props.label}</Label>}
                    </div>
                    <div className="dos-load-mask__children">
                        {this.props.children}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
