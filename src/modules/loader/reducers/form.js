import {
    SHOW_LOADING,
    HIDE_LOADING
} from '../types'
const INITIAL_STATE = {
    ticketParlay: false,
    myBet: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                [action.payload.name]: true
            }
        case HIDE_LOADING:
            return {
                ...state,
                [action.payload.name]: false
            }
        default:
            return state
    }
    return state
}
export default Reducer
