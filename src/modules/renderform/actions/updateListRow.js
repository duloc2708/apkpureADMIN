import {
    UPDATE_LIST_ROWDATA
} from '../types'
const updateListRow = (listRow) => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        dispatch({
            type: UPDATE_LIST_ROWDATA,
            payload: {
                listRow: listRow
            }
        })
        resolve(UPDATE_LIST_ROWDATA)
    })
}
module.exports = updateListRow