import {
    ASSIGN_CONTROL
} from '../types'
const assignControl = (code) => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        let { listControl } = getState().renderform
        let content = listControl.filter(x => x.key === code)
        dispatch({
            type: ASSIGN_CONTROL,
            payload: {
                keyControl: code,
                contentControl: content[0].col
            }
        })
        resolve(ASSIGN_CONTROL)
    })
}
module.exports = assignControl