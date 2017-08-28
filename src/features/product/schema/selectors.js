import { createSelector } from 'reselect';
import { getCrudListState, getCrudEntityState, getCrudSchemaState } from 'src/lib/crud';
import { ProductList, ProductItem } from './definition'
import { ProductDTO } from './dtos'

const getRouteParams = state => state.routing.getIn(['match', 'params']);
const getProductList = createSelector([getCrudListState(ProductList)], state => state);
const getProductItem = createSelector([getCrudEntityState(ProductItem)], state => state);

const selector = {};

selector.pending = createSelector([getCrudSchemaState], state => state.get('pending'));
selector.pager = createSelector([getCrudSchemaState], state => state.get('pager'));

selector.list = createSelector([getProductList], state => {
    if (state) {
        return state.toList().toJS();
    }

    return [];
});

selector.formData = createSelector([getProductItem], entity => {
    return new ProductDTO(entity);
});

selector.path = createSelector([getRouteParams], routing => {
    return {
        list: {
            path: `/products`,
            criteria: undefined,
            schema: ProductList
        },
        read: {
            path: `/products/${routing.get('code')}`,
            criteria: undefined,
            schema: ProductItem
        },
        update: {
            path: `/products/${routing.get('code')}`,
            criteria: undefined,
            schema: ProductItem,
            method: 'put'
        },
        edit: {
            path: `/product/edit/:code`,
            criteria: undefined,
            schema: ProductItem,
            afterEdit: (newState, oldState, action) => {
                return newState;
            }
        },
    }
});

export const select = selector;
