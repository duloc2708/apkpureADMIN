import {
    CHECK_TOKEN_URL,
    LOGIN_SUCCESS
} from '../types'

const { push } = ReactRouterRedux.routerActions || {}

const check = (ownProps) => {
    return (dispatch, getState) => {
        const { location, pathname } = ownProps || {}
        const token = Helper._getCookie('token')
        if (token) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: decodeURI(token)
                }
            })
            dispatch(push(Routes.home.view))
        }
    }
}
module.exports = check