import { Record, List } from 'immutable';

export const ProductMainTaxonRecord = new Record({
    id: undefined,
    name: undefined,
    code: undefined,
});

export const ProductImageRecord = new Record({
    id: undefined,
    file: undefined,
    path: undefined,
    type: undefined,
});

export const ProductTranslationRecord = new Record({
    id: undefined,
    locale: undefined,
    name: undefined,
    slug: undefined,
    description: undefined,
    shortDescription: undefined,
});

export const ProductRecord = new Record({
    id: undefined,
    code: undefined,
    name: undefined,
    translations: new List(),
    images: new List(),
    mainTaxon: new ProductMainTaxonRecord(),
});
