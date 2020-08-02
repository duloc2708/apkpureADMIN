import {
    SHOW_MODAL_LEAGUE,
    HIDE_MODAL_LEAGUE,
    GET_LEAGUES,
    CHANGE_SELECT_ALL,
    CHANGE_SELECT
} from '../types'
const INITIAL_STATE = {
    leaguesSelect: Immutable.fromJS([]),
    selects: Immutable.fromJS({})
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_MODAL_LEAGUE:
            return {
                ...state
            }
        case HIDE_MODAL_LEAGUE:
            return {
                ...state
            }
        case GET_LEAGUES:
            return {
                ...state,
                leaguesSelect: action.payload.leaguesSelect
            }
        case CHANGE_SELECT:
            return {
                ...state,
                selects: action.payload.selects
            }
        case CHANGE_SELECT_ALL:
            return {
                ...state,
                selects: action.payload.selects
            }
        default:
            return state
    }
    return state
}
export default Reducer
