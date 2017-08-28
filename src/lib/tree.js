import TreeModel from 'tree-model';

/**
 * @param data
 * @param childrenPropertyName
 *
 * @return TreeModel
 */
const create = (data, childrenPropertyName) => {
    const tree = new TreeModel({
        childrenPropertyName: childrenPropertyName,
    });

    return tree.parse(data);
};

/**
 * @param data Array
 * @param childKey String
 *
 * @returns TreeModel
 */
const createNode = (data, childKey) => {
    const tree = create({ [childKey]: data }, childKey);

    restructure('before', tree);
    restructure('after', tree);

    rsort(tree.model[childKey], 'position', childKey);

    return tree;
};

/**
 * @param data
 *
 * @returns TreeModel
 */
const createNavNode = (data) => {
    return createNode(data, 'items');
};

/**
 * @param data Array
 *
 * @returns TreeModel
 */
const createRouteNode = (data) => {
    return createNode(data, 'childRoutes');
};

/**
 * @param type String
 * @param tree TreeModel
 */
const restructure = (type, tree) => {
    tree.all((node) => typeof node.model[type] !== 'undefined').forEach((node) => {
        const key = node.model[type];
        const target = tree.first((item) => {
            return item.model['key'] === key;
        });

        if (!target) {
            console.warn(`No found target key: ${key}`);

            return;
        }

        const index = target.getIndex();

        if (isNaN(target.model['position'])) {
            target.model['position'] = index;
        }

        let position = target.model['position'];

        // use decimal to make sure new node not over/less than at the side of target node
        position = 'before' === type ? position - 0.1 : position + 0.1;

        // move node to target
        target.parent.addChildAtIndex(node.drop(), position < 0 ? 0 : position);

        // assign new node position
        node.model['position'] = position;

        // delete restructor flag
        delete node.model[type];
    });
};

/**
 * @param data
 * @param sortPropertyName
 * @param childrenPropertyName
 * @param reverse
 *
 * @returns {*}
 */
const sort = (data, sortPropertyName, childrenPropertyName, reverse = false) => {
    // todo string sort
    data.sort((a, b) => {
        const aPosition = a[sortPropertyName] || 0;
        const bPosition = b[sortPropertyName] || 0;

        if (aPosition < bPosition) return reverse ? 1 : -1;
        if (aPosition > bPosition) return reverse ? -1 : 1;

        return 0;
    });

    data.forEach((item) => {
        if (item[childrenPropertyName] && item[childrenPropertyName].length) {
            sort(item[childrenPropertyName], sortPropertyName, childrenPropertyName);
        }
    });

    return data;
};

/**
 * @param data
 * @param sortPropertyName
 * @param childrenPropertyName
 * @return {*}
 */
const rsort = (data, sortPropertyName, childrenPropertyName) => {
    return sort(data, sortPropertyName, childrenPropertyName, true);
};

const apply = (node, data) => {
    Object.assign(node.model, data);
};

const findApply = (node, data, compare) => {
    const found = node.first(compare);

    if (found) {
        apply(found, data);
    } else {
        console.warn(`No found node.`);
    }
};

const findApplyBy = (node, data, criteria) => {
    const found = node.first((node) => {
        for (let key in criteria) {
            if (node.model[key] !== criteria[key]) {
                return false;
            }
        }

        return true;
    });

    if (found) {
        apply(found, data);
    } else {
        console.warn(`No found node.`);
    }
};

export {
    create,
    createNode,
    createNavNode,
    createRouteNode,
    restructure,
    sort,
    apply,
    findApply,
    findApplyBy,
}
