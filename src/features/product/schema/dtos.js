import { SchemaDTO } from 'src/lib/crud';

export class ProductDTO extends SchemaDTO {
    constructor(entity) {
        super(entity);

        if (!entity) return;

        this.data = {
            code: entity.code,
            images: entity.images.toJS(),
            translations: entity.translations.toJS(),
        };
    }

    persist(value) {
        super.persist(value);

        this.unsuportedFormMappingParser(value);
        this.emptyImageSubmitParser(value);
    }

    unsuportedFormMappingParser(data) {
        delete data['name'];
        delete data['averageRating'];
        delete data['reviews'];
    }

    assocationsRemoveParser(data) {
        delete data['associations'];

        return this;
    }

    static ChannelsSubmitParser(data) {
        if (isEmpty(data['channels'])) {
            delete data['channels'];
        } else {
            let channels = [];

            data['channels'].map(i => {
                channels.push(i['code'])
            });

            data['channels'] = channels;
        }

        return this;
    }

    static TaxonsSubmitParser(data) {
        if (isEmpty(data['productTaxons'])) {
            delete data['productTaxons'];
        } else {
            let taxons = [];

            data['productTaxons'].map(i => {
                taxons.push(i['taxon']['code'])
            });

            data['productTaxons'] = taxons.join(',');
        }

        return this;
    }

    static MainTaxonSubmitParser(data) {
        if (isEmpty(data['mainTaxon'])) {
            delete data['mainTaxon'];
        } else {
            data['mainTaxon'] = data['mainTaxon']['code'];
        }

        return this;
    }

    static AttributeSubmitParser(data) {
        const attributes = data['attributes'];

        let attrs = (attributes || []).reduce((prev, attr) => {
            prev.push({
                attribute: attr.code,
                localeCode: attr.localeCode,
                value: attr.value.join(','),
            });

            return prev;
        }, []);

        if (0 === attrs.length) {
            delete data['attributes'];
        }

        data['attributes'] = attrs;

        return this;
    }

    emptyImageSubmitParser(data) {
        (data['images'] || []).forEach((im) => {
            // no need for backend.
            delete im.path;

            // remove empty file
            if (im.file && 0 === im.file.length) {
                delete im.file;
            }
        });

        return this;
    }

}
