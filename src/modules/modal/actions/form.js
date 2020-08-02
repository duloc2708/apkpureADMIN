import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../types'
export const showModal = (modal) => {
    return {
        type: SHOW_MODAL,
        payload: {
            modal: modal
        }
    }
}
export const hideModal = (modal) => {
    return {
        type: HIDE_MODAL,
        payload: {
            modal: modal
        }
    }
}
