export { autobind } from 'office-ui-fabric-react/lib/Utilities';
export * from 'throttle-debounce';

// https://stackoverflow.com/questions/4994201/is-object-empty
export const isEmpty = (obj) => {
    // null and undefined are "empty"
    if (obj === null) return true;
    if (obj === undefined) return true;

    // deep empty
    if ('[{}]' === JSON.stringify(obj)) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
};

export const removeObject = (obj, key) => {
    if (obj.splice) {
        obj.splice(obj.indexOf(obj[key]))
    } else {
        delete obj[key];
    }
};

export const removeEmpty = (obj) => {
    Object.keys(obj).forEach(function (key) {
        if (isEmpty(obj[key])) {
            removeObject(obj, key);
        }

        if (typeof obj[key] === 'object') {
            removeEmpty(obj[key]);
        }

        if (isEmpty(obj[key])) {
            removeObject(obj, key);
        }
    });
};

export const arrayUnique = (arr) => {
    return Array.from(new Set(arr));
};
