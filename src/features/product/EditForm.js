import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form'
import { autobind } from '@uifabric/utilities';
import { LoadMask } from 'src/ui/LoadMask';

import {
    FileType,
    TextType,
    TranslationType,
    CollectionType,
    CollectionItemRemove,
} from 'src/ui/Form';

const errors = {};

errors.code = 'ABC';

export class EditForm extends React.Component {
    static propTypes = {
        ...propTypes,
        isLoading: PropTypes.bool.isRequired,
    };

    @autobind
    addImageItem(e) {
        this.refs['imageCollection'].addNewItem({ path: 'abc-def' })
    }

    render() {
        const { isLoading, handleSubmit } = this.props;

        return (
            <LoadMask loading={isLoading} label="Loading ...">
                <form onSubmit={handleSubmit}>
                    <TextType name="code"/>

                    <CollectionType name="images">
                        <TextType name="path" label="Path"/>
                        <FileType name="file" label="File"/>
                        <CollectionItemRemove/>
                    </CollectionType>

                    <TranslationType name="translations">
                        <TextType name="name" label="Name"/>
                        <TextType name="slug" label="Slug"/>
                        <TextType name="description" multiline rows={4}/>
                        <TextType name="shortDescription" multiline rows={4}/>
                    </TranslationType>

                    <button type="submit">Submit</button>
                </form>
            </LoadMask>
        )
    }
}

const validate = values => {
    return errors;
};

export default reduxForm({
    form: 'EditForm',
    enableReinitialize: true,
    //validate,
})(EditForm);
