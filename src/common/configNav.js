import { createNavNode }  from 'src/lib/tree';
import commonNavs from 'src/features/common/navs';

const navs = [].concat(
    commonNavs,
);

export default createNavNode(navs).model['items'];
