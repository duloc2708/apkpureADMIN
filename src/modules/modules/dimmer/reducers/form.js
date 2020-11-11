import {
    LOADING,
    LOADED
} from '../types'
const INITIAL_STATE = {
    active: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                active: true
            }
        case LOADED:
            return {
                ...state,
                active: false
            }
        default:
            return state
    }
    return state
}
export default Reducer
