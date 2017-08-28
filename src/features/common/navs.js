import React from 'react';
import { PersonaSize, PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';
import AvatarCallout from './AvatarCallout';

const navs = [
    {
        position: 1,
        key: 'newItem',
        name: 'New',
        icon: 'Add',
        ariaLabel: 'New. Use left and right arrow keys to navigate',
        onClick: () => {
            console.log(this);
        },
        items: [
            {
                key: 'emailMessage',
                name: 'Email message',
                icon: 'Mail',
                checked: true,
                canCheck: true,
            },
            {
                key: 'calendarEvent',
                name: 'Calendar event',
                icon: 'Calendar',
                onClick: () => {
                    console.log(this);
                },
            }
        ]
    },
    {
        position: 2,
        key: 'upload',
        name: 'Upload',
        icon: 'Upload',
        onClick: () => {
        },
        ['data-automation-id']: 'uploadNonFocusButton'
    },
    {
        position: 3,
        key: 'persona2',
        name: 'Persona2',
        onRender: (item) => <AvatarCallout menus={item.items} personaDetails={item.data}/>,
        data: {
            imageInitials: 'XS',
            primaryText: 'Xs Lindqvist',
            secondaryText: 'Software Engineer',
            size: PersonaSize.size28,
            initialsColor: PersonaInitialsColor.teal,
        },
        items: [
            {
                key: 'emailMessage',
                name: 'Email message',
                icon: 'Mail',
                checked: true,
                canCheck: true,
            }
        ],
    },
    {
        position: 0,
        key: 'persona',
        name: 'Persona',
        onRender: (item) => <AvatarCallout menus={item.items} personaDetails={item.data}/>,
        data: {
            imageInitials: 'AL',
            primaryText: 'Annie Lindqvist',
            secondaryText: 'Software Engineer',
            size: PersonaSize.size28,
            initialsColor: PersonaInitialsColor.teal,
        },
        items: [
            {
                key: 'emailMessage',
                name: 'Email message',
                icon: 'Mail',
                checked: true,
                canCheck: true,
            },
            {
                key: 'calendarEvent',
                name: 'Calendar event',
                icon: 'Calendar',
                onClick: () => {
                    console.log(this);
                },
            }
        ],
    }
];

export default navs;
