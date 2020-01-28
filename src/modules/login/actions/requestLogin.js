import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_RESET,
    LOGIN_FORM_CHANGE,
    USER_LOGOUT,
    SET_TOKEN,
    GET_BET_SETTING
} from "../types";
const requestLogin = params => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}users/login`, params).then(
                response => {
                    dispatch({
                        type: LOGIN_RESET,
                        payload: { username: params.username, password: "" }
                    });
                    let { data } = response.data;
                    if (data && data.token) {
                        let { token } = data;
                        Helper._setCookie("token", token);
                        Helper._setCookie(
                            "userInfo",
                            Helper._base64.encode(
                                JSON.stringify({
                                    username: params.username,
                                    password: ""
                                })
                            )
                        );
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: {
                                token: token
                            }
                        });
                    } else {
                        dispatch({
                            type: LOGIN_FAILURE,
                            payload: {
                                validate: "validate"
                            }
                        });
                    }
                    resolve(response);
                },
                err => {
                    dispatch({
                        type: LOGIN_RESET,
                        payload: { username: params.Username, password: "" }
                    });
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: {
                            validate: "validate"
                        }
                    });
                    reject(err);
                }
            );
        });
    };
};

module.exports = requestLogin;
