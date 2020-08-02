import {
    ADD_HTML
} from '../types'
const addhtml = (listRow) => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        let htmlContent = ''
        listRow.map((item => {
            htmlContent = htmlContent + item
        }))
        let strHtml = `${htmlContent}`
        dispatch({
            type: ADD_HTML,
            payload: {
                strHTML: strHtml,
                listRow: listRow
            }
        })
        resolve(ADD_HTML)

        // class ComFormView extends React.Component {
        //     render() {
        //         return (
        //             <section className="content" id="explore-market">
        //             <div id="sortable"> ${htmlContent}</div>
        //             </section>
        //         )
        //     }
        // }
        // export default ComFormView`
    })
}
module.exports = addhtml