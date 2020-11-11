import {
    CHANGE_PASS_INPUT_DATA
} from '../types'
const INITIAL_STATE = {
    objData: {
        passold: '',
        passnew: '',
        passnewagain: ''
    }
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_PASS_INPUT_DATA:
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