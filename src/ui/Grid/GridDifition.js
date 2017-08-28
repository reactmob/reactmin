import React from 'react';
import { IconButton, CommandButton } from 'src/ui/Button';

const scopeBinding = (elements, scope, data) => {
    const binding = (item) => {
        if (typeof item === 'object') {
            Object.keys(item).forEach(key => {
                if (/^on[A-Z][a-zA-Z0-9]+/.test(key)) {
                    if (typeof item[key] === 'string' && scope[item[key]]) {
                        item[key] = scope[item[key]];
                    }
                }

                if ('record' !== key && typeof item[key] === 'object') {
                    binding(item[key]);
                }
            });

            item['record'] = data
        }
    };

    elements.forEach(binding)
};

const visibilityCheck = (elements, scope, data) => {
    const checking = (item) => {
        if (typeof item === 'object') {
            if (item['checkBeakVisible']) {
                if (typeof item['checkBeakVisible'] === 'object') {
                    item['checkBeakVisible'].bind(scope);
                }

                if (typeof item['checkBeakVisible'] === 'string') {
                    item['checkBeakVisible'] = scope[item['checkBeakVisible']];
                }

                if (item['checkBeakVisible'](item, data, scope) === false) {
                    item.isBeakVisible = true;
                }
            }

            if (item['checkDisabled']) {
                if (typeof item['checkDisabled'] === 'object') {
                    item['checkDisabled'].bind(scope);
                }

                if (typeof item['checkDisabled'] === 'string') {
                    item['checkDisabled'] = scope[item['checkDisabled']];
                }

                if (item['checkDisabled'](item, data, scope) === false) {
                    item.disabled = true;
                }
            }

            Object.keys(item).forEach(key => {
                if (typeof item[key] === 'object') {
                    checking(item[key]);
                }
            });
        }
    };

    elements.forEach(checking)
};

export class GridDifition {
    constructor(scope, definition) {
        this.scope = scope;
        this.definition = definition;
    }

    getColumns(pushAction = true) {
        const columns = this.definition.gridColumns(this.scope);

        if (pushAction) {
            columns.push(this.getActions());
        }

        return columns;
    }

    getCommands() {
        const scope = this.scope;
        const commands = this.definition.gridCommands(scope);

        scopeBinding([commands], scope);
        visibilityCheck([commands], scope);

        return commands;
    }

    getActions() {
        const scope = this.scope;
        const { label, icon, isIconOnly } = this.definition.gridActions(scope);

        return {
            key: 'row.actions',
            name: { label },
            minWidth: isIconOnly ? 60 : 100,
            isIconOnly: { isIconOnly },
            isResizable: true,
            sortable: false,
            className: 'dos-grid__cell--row-action',
            onRender: (rec) => {
                // will take every record render
                const { items } = this.definition.gridActions(scope);

                visibilityCheck(items, scope, rec);
                scopeBinding(items, scope, rec);

                return (isIconOnly
                    ? <IconButton title={label} iconProps={{ iconName: icon }} menuProps={{ items: items }}
                                  menuIconProps={false}/>
                    : <CommandButton iconProps={{ iconName: icon }} menuProps={{ items: items }}>
                        {label}
                    </CommandButton>)
            }
        }
    }
}
