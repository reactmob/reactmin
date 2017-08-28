import { DefaultPage, Edit, Create } from './';

export default {
    path: 'product',
    name: 'Product',
    childRoutes: [
        { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
        { path: 'create', name: 'Create', component: Create },
        { path: 'edit/:code', name: 'Edit', component: Edit },
    ],
};
