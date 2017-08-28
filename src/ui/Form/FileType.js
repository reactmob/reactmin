import React from 'react';
import { Field } from 'redux-form'
import { Label } from 'office-ui-fabric-react/lib/Label';

let _FileFieldIdGen = 0;
export const FileField = ({ input: { value: ignoreValue, ...inputProps }, meta: ignoreMeta, label: ignoreLabel, ...props }) => {
    const FileFieldId = `FileField${_FileFieldIdGen++}`;

    return (
        <div className="ms-TextField ms-FileField root_aac2334d">
            <div className="ms-TextField-wrapper wrapper_aac2334d">
                {ignoreLabel && <Label htmlFor={FileFieldId}>{ignoreLabel}</Label>}
                <div className="fieldGroup_aac2334d">
                    <input
                        type="file"
                        id={FileFieldId}
                        {...inputProps} {...props}/>
                </div>
            </div>
        </div>
    );
};

export const FileType = (props) => {
    return (
        <Field component={FileField} {...props}/>
    );
};
