import { CommandSelectionChangedHandler } from 'src/ui/Grid';

export const gridColumns = (scope) => {
    return [
        {
            key: 'id',
            name: 'ID',
            fieldName: 'id',
            minWidth: 40,
            maxWidth: 60,
            isResizable: false,
            sortable: true,
            isSortedDescending: false,
        },
        {
            key: 'code',
            name: 'Code',
            fieldName: 'code',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
            sortable: true,
        },
        {
            key: 'name',
            name: 'Name',
            fieldName: 'name',
            minWidth: 100,
            isResizable: true,
            sortable: true,
        },
    ];
};

export const gridCommands = (scope) => {
    return {
        items: [
            {
                key: 'newItem',
                name: 'New',
                icon: 'Add',
                disabled: true,
                onGridSelectionChange: CommandSelectionChangedHandler.disableOnNoSelection,
                ariaLabel: 'New. Use left and right arrow keys to navigate',
                onClick: () => {
                    console.log(this);
                    return;
                },
                items: [
                    {
                        key: 'emailMessage',
                        name: 'Email message',
                        icon: 'Mail',
                        onGridSelectionChange: 'onGridSelectionChangeEmail',
                        onClick: () => {
                            console.log(module);
                            return;
                        },
                    },
                    {
                        key: 'calendarEvent',
                        name: 'Calendar event',
                        icon: 'Calendar'
                    }
                ]
            },
            {
                key: 'upload',
                name: 'Upload',
                icon: 'Upload',
                disabled: true,
                onGridSelectionChange: CommandSelectionChangedHandler.disableOnNotSingleSelection,
                onClick: () => {
                    return;
                },
                ['data-automation-id']: 'uploadNonFocusButton'
            }
        ],
        farItems: [
            {
                key: 'saveStatus',
                name: 'Your page has been saved',
                icon: 'CheckMark',
                ['data-automation-id']: 'saveStatusCheckMark'
            },
            {
                key: 'publish',
                name: 'Publish',
                icon: 'ReadingMode',
                onClick: () => {
                    return;
                }
            }
        ]
    }
};

export const gridActions = (scope) => {
    return {
        label: 'Action',
        icon: 'Settings',
        isIconOnly: true,
        items: [
            {
                key: 'edit',
                name: 'Edit',
                icon: 'edit',
                onClick: (e, item) => {
                    scope.editItem(item)
                }
            },
            {
                key: 'calendarEvent',
                name: 'Calendar event',
                icon: 'Calendar',
                onClick: 'onClickCalendar',
            }
        ]
    }
};
