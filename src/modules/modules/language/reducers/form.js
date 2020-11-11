import {
    CHANGE_LANG
} from '../types'
const INITIAL_STATE = {
    lang: 'enGB',
    list_id_livechat:[
        {lang:'enGB',id:'581f3e54'},
        {lang:'inIn',id:'ded45f23'},
        {lang:'zhCN',id:'e56c097b'},
    ] 
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_LANG:
            return {
                ...state,
            }
        default:
            return state
    }
    return state
}

export default Reducer
