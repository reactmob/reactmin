## Add Collection

### 1. Default to add collection
```jsx
<CollectionType name="images">
    <TextType name="path" label="path"/>
</CollectionType>
```

### 2. Custom element to add collection
```jsx

const addItemButton = (props) => {
    return (
        <button type="button" onClick={props.onClick}>Add Me</button>
    );
};

<CollectionType name="images" addItemButton={addItemButton}>
    <TextType name="path" label="path"/>
</CollectionType>
```

### 3. Wrapp element to add collection
```jsx
import { CollectionAddItemButton } from 'src/ui/form';

const addItemButtonWrap = (props) => {
    return (
        <div className="sample-remove-collection-hoc">
            <CollectionAddItemButton {...props}/>
        </div>
    );
};

<CollectionType name="images" addItemButton={addItemButtonWrap}>
    <TextType name="path" label="path"/>
</CollectionType>
```

### 4. HOC element to add collection
```jsx
import { CollectionAddItemButton } from 'src/ui/form';

const addItemButtonHOC = (WrappedComponent) => (props) => {
    return (
        <div className="sample-remove-collection-hoc">
            <WrappedComponent {...props}/>
        </div>
    );
};

<CollectionType name="images" addItemButton={addItemButtonHOC(CollectionAddItemButton)}>
    <TextType name="path" label="path"/>
</CollectionType>
```

### 5. Access to Collection instance to add collection
This way is `up to you` to place `AddItem` button in somewhere in your template.

```jsx
import { CollectionAddItemButton } from 'src/ui/form';
import { autobind } from 'src/lib/utils';

export class Form extends React.Component {
    @autobind
    addImageItem(e) {
        // access to collection via ref and use `addNewItem`
        this.refs['imageCollection'].addNewItem({ path: 'abc-def' });
        // OR
        // access to collection via ref and use `collection` directly
        this.refs['imageCollection'].collection.push|insert(..)
    }

    render() {
        return (
            <CollectionAddItemButton onClick={this.addImageItem}/>
        
            <CollectionType name="images" addItemButton={false} ref="imageCollection">
                <TextType name="path" label="path"/>
            </CollectionType>
        );
    }
}
```
