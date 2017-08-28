import React from 'react';
import PropTypes from 'prop-types';
import { FormSection } from 'redux-form';
import { Pivot, PivotItem } from 'src/ui/Pivot';

export class TranslationType extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
    };

    static contextTypes = {
        _reduxForm: PropTypes.object.isRequired
    };

    render() {
        const { name, children } = this.props;
        const { values } = this.context._reduxForm;
        const codes = Object.keys(values[name] || {});

        if (!codes) return;

        return (
            <FormSection name={name}>
                <Pivot>
                    {codes.map(code => {
                        return (
                            <PivotItem key={code} linkText={code}>
                                <FormSection name={code}>{children}</FormSection>
                            </PivotItem>
                        );
                    })}
                </Pivot>
            </FormSection>
        );
    }
}
