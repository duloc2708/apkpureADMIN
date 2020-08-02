import {
    UPDATE_HTML
} from '../types'
const checkRows = (listRow) => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        let htmlContent = ''
        listRow.map((item => {
            htmlContent = htmlContent + item
        }))
        let strHtml = `<div id="sortable"> ${htmlContent}</div>`
        dispatch({
            type: UPDATE_HTML,
            payload: {
                strHTML: strHtml,
                listRow: listRow
            }
        })
        resolve(UPDATE_HTML)
    })
}
module.exports = checkRows