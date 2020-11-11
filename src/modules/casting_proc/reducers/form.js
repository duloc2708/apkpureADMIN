import {
    GET_LIST_CASTING_PROC
} from '../types'

const INITIAL_STATE = {
    list_data: [],
    isDetail: false,
    listHeaderTable:[]
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST_CASTING_PROC:
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