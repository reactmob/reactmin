import React from 'react';
import { TextField as UiTextField } from 'office-ui-fabric-react/lib/TextField';
import { Field } from 'redux-form'

export const TextField = ({ input: { ...inputProps }, meta: ignoreMeta, ...props }) => {
    return <UiTextField {...inputProps} {...props} errorMessage={ignoreMeta.error}/>
};

export const TextType = (props) => {
    return (
        <Field component={TextField} {...props}/>
    );
};
