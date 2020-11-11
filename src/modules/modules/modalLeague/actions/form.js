import {
    SHOW_MODAL_LEAGUE,
    HIDE_MODAL_LEAGUE,
    GET_LEAGUES,
    CHANGE_SELECT,
    CHANGE_SELECT_ALL
} from '../types'
const { Map } = Immutable
export const showModalLeague = () => {
    return {
        type: SHOW_MODAL_LEAGUE,
        payload: false
    }
}
export const hideModalLeague = () => {
    return {
        type: HIDE_MODAL_LEAGUE,
        payload: false
    }
}
export const getLeagues = () => {
    return (dispatch, getState) => {
        const { listLive, listToday, listEarly } = getState().odds || {}
        const { market } = getState().menuSportMarket || {}
        const { Seq } = Immutable
        let leagues
        switch (market) {
            case 0:
                const listTodayLive = Immutable.List(listToday).concat(listLive)
                leagues = Immutable.Seq(listTodayLive).map((league, iL) => {
                    return { name: league.get('Name'), id: league.get('Id') }
                })
                break
            case 1:
                leagues = Immutable.Seq(listLive).map((league, iL) => {
                    return { name: league.get('Name'), id: league.get('Id') }
                })
                break
            case 2:
                leagues = Immutable.Seq(listEarly).map((league, iL) => {
                    return { name: league.get('Name'), id: league.get('Id') }
                })
                break
            case 3:
                const listTodayLiveEarlyML = Immutable.List(listEarly).concat(Immutable.List(listToday).concat(listLive))
                leagues = Immutable.Seq(listTodayLiveEarlyML).map((league, iL) => {
                    return { name: league.get('Name'), id: league.get('Id') }
                })
                break
            case 4:
                const listTodayLiveEarly = Immutable.List(listEarly).concat(Immutable.List(listToday).concat(listLive))
                leagues = Immutable.Seq(listTodayLiveEarly).map((league, iL) => {
                    return { name: league.get('Name'), id: league.get('Id') }
                })
                break
            default:
                const listDef = Immutable.List(listEarly).concat(Immutable.List(listToday).concat(listLive))
                leagues = Immutable.Seq(listDef).map((league, iL) => {
                    return { name: league.get('Name'), id: league.get('Id') }
                })
                break
        }
        leagues = leagues.groupBy(x => x.name).map(x => x.first()).toList()
        dispatch({
            type: GET_LEAGUES,
            payload: {
                leaguesSelect: leagues
            }
        })
    }
}
export const changeSelectAll = (status) => {
    return (dispatch, getState) => {
        let selects = Map({})
        const { leaguesSelect } = getState().modalLeague || {}
        leaguesSelect.valueSeq().forEach(val => {
            selects = selects.set(val.id, status)
        })
        dispatch({
            type: CHANGE_SELECT_ALL,
            payload: {
                selects: selects
            }
        })
    }
}
export const changeSelect = (leagueId) => {
    return (dispatch, getState) => {
        let { selects } = getState().modalLeague || {}
        let current = selects.get(leagueId)
        if (current == false) {
            selects = selects.set(leagueId, true)
        } else {
            selects = selects.set(leagueId, false)
        }
        dispatch({
            type: CHANGE_SELECT,
            payload: {
                selects: selects
            }
        })
    }
}