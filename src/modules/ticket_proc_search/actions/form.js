import {
    GET_LIST_BAG_TICKET_PROC,
    CHANGE_INPUT_SEARCH
} from '../types'
export const changeInputSearch = (objSearch) => {
    return (dispatch) => {
      dispatch({
          type: CHANGE_INPUT_SEARCH,
          payload: {
            objSearch
          }
      })
    }
}
export const getListBagInAllTicketProc = () => {
    return (dispatch, getState) => {
        const {objSearch}=getState().ticketProcSearch
        return new Promise((resolve, reject) => {
            axios
                .get(`${Config.API_URL_USER}ticket_proc/search_bag_all_process`, {
                    params: { page: 1, total: 100, key: objSearch.input }
                })
                .then(
                    response => {
                        const { data } = response.data

                        dispatch({
                            type: GET_LIST_BAG_TICKET_PROC,
                            payload: {
                                list_data: data
                            }
                        })
                    })


        })
    }
}
