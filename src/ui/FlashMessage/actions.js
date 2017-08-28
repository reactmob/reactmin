import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

const FLASH_MESSAGE_SHOW = 'FLASH_MESSAGE_SHOW';
const FLASH_MESSAGE_DISMISS = 'FLASH_MESSAGE_DISMISS';

function action(type, payload) {
    if (typeof payload !== 'object') {
        payload = {
            message: payload,
        }
    }

    // array
    if (Array.isArray(payload)) {
        payload = {
            message: payload,
        }
    }

    payload.messageBarType = MessageBarType[type];

    return {
        type: FLASH_MESSAGE_SHOW,
        payload,
    };
}

export const flash = {
    info: (payload) => action('info', payload),
    error: (payload) => action('error', payload),
    blocked: (payload) => action('blocked', payload),
    severeWarning: (payload) => action('severeWarning', payload),
    success: (payload) => action('success', payload),
    warning: (payload) => action('warning', payload),
};

export function dismiss() {
    return {
        type: FLASH_MESSAGE_DISMISS,
    };
}

export function reducer(state = null, action) {
    switch (action.type) {
        case FLASH_MESSAGE_SHOW:
            return { ...action.payload };

        case FLASH_MESSAGE_DISMISS:
            return null
    }

    return state
}
