import { isEmpty, removeEmpty } from 'src/lib/utils';

const sfErrorParser = (obj) => {
    Object.keys(obj).forEach(function (key) {
        if (obj[key]['children']) {
            const children = obj[key]['children'];
            delete obj[key]['children'];

            if (!isEmpty(children)) {
                obj[key] = children;
            }
        }

        if (typeof obj[key] === 'object') {
            sfErrorParser(obj[key]);
        }

        if (obj[key]['errors']) {
            obj[key] = obj[key]['errors'].join(',')
        }
    });
};

export default (obj) => {
    sfErrorParser(obj);
    removeEmpty(obj);
};
