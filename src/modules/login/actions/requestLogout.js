import { USER_LOGOUT } from "../types";
const requestLogout = params => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: USER_LOGOUT,
                payload: null
            });
            Helper._removeCookie("userInfo");
            Helper._removeCookie("token");
            resolve(USER_LOGOUT);
        });
    };
};

module.exports = requestLogout;
