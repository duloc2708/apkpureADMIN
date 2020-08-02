import {
    CHANGE_VALUE_HTML
} from '../types'
const changeValue = () => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        var seed = Date.now();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (seed + Math.random() * 16) % 16 | 0;
            seed = Math.floor(seed / 16);
            return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
        });
        dispatch({
            type: CHANGE_VALUE_HTML,
            payload: {
                valueTemp: uuid
            }
        })
        resolve(CHANGE_VALUE_HTML)
    })
}
module.exports = changeValue