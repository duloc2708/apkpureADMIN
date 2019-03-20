import {
    GET_LINK_GAME,
    CHANGE_LINK_GAME,
    RESET_LEECH
} from '../types'

const INITIAL_STATE = {
    url: '',
    data: '',
    isDisplay: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_LEECH:
            return {
                ...INITIAL_STATE
            }
        case CHANGE_LINK_GAME:
            return {
                ...state,
                ...action.payload
            }
        case GET_LINK_GAME:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
    return state
}
export default Reducer