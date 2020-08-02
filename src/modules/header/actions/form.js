import {
    GET_OT_LIST_TYPE,
    CHANGE_CODE_TYPE,
    GET_OT_LIST_ALL,
    GET_LIST_CONFIG,
    GET_LIST_FUNCTION,
    GET_LIST_FUNCTION_BY_USER,
    GET_USER_NAME
} from "../types";
export const getListFunctionByUserHeader = itemData => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let oldUserInfo = SportConfig._getCookie("userInfo");
            try {
                oldUserInfo = JSON.parse(
                    SportConfig.function._base64.decode(oldUserInfo)
                );
            } catch (e) {
                oldUserInfo = null;
            }
            axios
                .get(`${Config.API_URL_USER}per/getListFunction_by_username`, {
                    params: { Username: oldUserInfo.user_name }
                })
                .then(
                    response => {
                        const { data } = response.data;
                        dispatch({
                            type: GET_LIST_FUNCTION_BY_USER,
                            payload: {
                                list_function_user: data
                            }
                        });
                        resolve(response);
                    },
                    err => {
                        reject(err);
                    }
                );
        });
    };
};
export const getListOtherAll = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_other_all`).then(
                response => {
                    let { data } = response.data;
                    dispatch({
                        type: GET_OT_LIST_ALL,
                        payload: {
                            list_other_all: data
                        }
                    });
                    resolve(response);
                },
                err => {
                    reject(err);
                }
            );
        });
    };
};
export const getListType = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_type`).then(
                response => {
                    let { data } = response;
                    dispatch({
                        type: GET_OT_LIST_TYPE,
                        payload: {
                            list: data
                        }
                    });
                    resolve(response);
                },
                err => {
                    reject(err);
                }
            );
        });
    };
};
export const getListConfig = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_config`).then(
                response => {
                    let { data } = response;
                    dispatch({
                        type: GET_LIST_CONFIG,
                        payload: {
                            list_config: data
                        }
                    });
                    resolve(response);
                },
                err => {
                    reject(err);
                }
            );
        });
    };
};

export const authLogin = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}user/authLogin`).then(
                response => {
                    const { Data } = response.data;
                    SportConfig._setCookie("usertype", Data.Usertype);
                    resolve(response);
                },
                err => {
                    reject(err);
                }
            );
        });
    };
};
export const getListConfigProcess = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_config_process`).then(
                response => {
                    let { data } = response.data;
                    dispatch({
                        type: GET_LIST_CONFIG,
                        payload: {
                            list_config_process: data
                        }
                    });
                    resolve(response);
                },
                err => {
                    reject(err);
                }
            );
        });
    };
};
export const getListFunction = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}per/getListFunction_by_user`).then(
                response => {
                    let { data } = response.data;
                    dispatch({
                        type: GET_LIST_FUNCTION,
                        payload: {
                            list_function: data
                        }
                    });
                    resolve(response);
                },
                err => {
                    reject(err);
                }
            );
        });
    };
};
export const changeCodeType = code => {
    return dispatch => {
        dispatch({
            type: CHANGE_CODE_TYPE,
            payload: {
                codeList: code
            }
        });
    };
};
export const getUsername = username => {
    return dispatch => {
        dispatch({
            type: GET_USER_NAME,
            payload: {
                username: username
            }
        });
    };
};
