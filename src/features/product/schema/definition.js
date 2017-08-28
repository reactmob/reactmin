import { Schema, arrayOf } from 'normalizr-immutable';
import * as R from './records';

export const ProductList = new Schema('ProductList', R.ProductRecord, {
    reducerKey: 'ProductList'
});

export const ProductMainTaxon = new Schema('ProductMainTaxon', R.ProductMainTaxonRecord, {
    reducerKey: ProductList.getReducerKey(),
});

export const ProductTranslation = new Schema('ProductTranslation', R.ProductTranslationRecord, {
    reducerKey: ProductList.getReducerKey(),
    idAttribute: 'locale',
});

export const ProductImage = new Schema('ProductImage', R.ProductImageRecord, {
    reducerKey: ProductList.getReducerKey(),
});

ProductList.define({
    translations: arrayOf(ProductTranslation),
    images: arrayOf(ProductImage),
    mainTaxon: ProductMainTaxon,
});

export const ProductItem = new Schema('ProductItem', R.ProductRecord, {
    reducerKey: 'ProductItem'
});

export const ProductItemMainTaxon = new Schema('ProductItemMainTaxon', R.ProductMainTaxonRecord, {
    reducerKey: ProductItem.getReducerKey(),
});

export const ProductItemTranslation = new Schema('ProductItemTranslation', R.ProductTranslationRecord, {
    reducerKey: ProductItem.getReducerKey(),
    idAttribute: 'locale',
});

export const ProductItemImage = new Schema('ProductItemImage', R.ProductImageRecord, {
    reducerKey: ProductItem.getReducerKey(),
});

ProductItem.define({
    translations: arrayOf(ProductItemTranslation),
    images: arrayOf(ProductItemImage),
    mainTaxon: ProductItemMainTaxon,
});
