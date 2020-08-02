import {
    SHOW_MODAL,
    HIDE_MODAL
} from '../types'
const INITIAL_STATE = {
    modalNoti: {
        isOpen: false,
        message: ''
    },
    modalConfirm: {
        isOpen: false,
        message: ''
    },
    modalLeague: {
        isOpen: false,
        isScroll: true
    }
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                [action.payload.modal.type]: {
                    isOpen: true,
                    message: action.payload.modal.message,
                    isScroll: false
                }
            }
        case HIDE_MODAL:
            return {
                ...state,
                [action.payload.modal.type]: {
                    isOpen: false,
                    message: '',
                    isScroll: true
                }
            }
        default:
            return state
    }
    return state
}
export default Reducer
