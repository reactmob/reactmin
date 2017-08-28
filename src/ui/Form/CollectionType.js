import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, FormSection } from 'redux-form';
import { autobind } from '@uifabric/utilities';
import { DefaultButton } from 'src/ui/Button';

export class CollectionItemRemove extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    };

    static contextTypes = {
        collection: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
    };

    @autobind
    remove() {
        const { collection, index } = this.context;
        const { onClick } = this.props;

        if (onClick) {
            onClick.call(this, collection, index);
        } else {
            collection.remove(index);
        }
    }

    render() {
        const { remove, props: { children } } = this;

        return (
            <div className="dos-collection-remove" onClick={remove}>
                {children ? children : <button type="button">Remove</button>}
            </div>
        );
    }
}

export class CollectionItemField extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
    };

    static childContextTypes = {
        index: PropTypes.number,
    };

    getChildContext() {
        return { index: this.props.index }
    }

    render() {
        const { name, children } = this.props;

        return <FormSection name={name}>{children}</FormSection>;
    }
}

export class CollectionField extends React.Component {
    static childContextTypes = {
        collection: PropTypes.object,
        collectionLift: PropTypes.func,
    };

    getChildContext() {
        return { collection: this.props.fields }
    }

    componentWillMount() {
        this.props.collectionLift(this.props.fields);
    }

    render() {
        const { fields, children } = this.props;

        return (
            <div className="dos-collection-items">
                {fields.map((n, i) =>
                    <CollectionItemField key={i} index={i} name={n}>{children}</CollectionItemField>
                )}
            </div>
        );
    }
}

export class CollectionAddItemButton extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        icon: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: 'dos-collection-add-btn',
        label: 'Add',
        icon: 'Add',
    };

    render() {
        const { icon, label, className, onClick } = this.props;

        return (
            <DefaultButton className={className} iconProps={{ iconName: icon }} type="button"
                    onClick={onClick}>{label}</DefaultButton>
        );
    }
}

export class CollectionType extends React.Component {
    collection = null;

    static propTypes = {
        name: PropTypes.string.isRequired,
        addItemButton: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
        addItemButtonPisition: PropTypes.oneOf(['top', 'bottom']).isRequired,
        onAddItem: PropTypes.func,
    };

    static defaultProps = {
        addItemButtonPisition: 'bottom',
    };


    @autobind
    collectionLifting(collection) {
        this.collection = collection;
    }

    @autobind
    onAddNewItem(e) {
        this.onAddItem ? (
            this.onAddItem(e, this, this.collection)
        ) : this.addNewItem();
    }

    addNewItem(data) {
        this.collection.push(data)
    }

    render() {
        const { addItemButton, addItemButtonPisition } = this.props;
        const addCollectionItemButton = addItemButton === false ? (null) : React.createElement(addItemButton ? addItemButton : CollectionAddItemButton, {
            onClick: this.onAddNewItem,
            collection: this.collection,
        });

        const { isTopPosition, isBottomPosition } = {
            isTopPosition: 'top' === addItemButtonPisition,
            isBottomPosition: 'bottom' === addItemButtonPisition,
        };

        return (
            <div className="dos-collection">
                {(addCollectionItemButton && isTopPosition) &&
                    <div className="dos-collection-add">{addCollectionItemButton}</div>
                }
                <FieldArray component={CollectionField} {...this.props} collectionLift={this.collectionLifting}/>
                {(addCollectionItemButton && isBottomPosition) &&
                    <div className="dos-collection-add">{addCollectionItemButton}</div>
                }
            </div>
        );
    }
}
