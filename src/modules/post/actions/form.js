import {
    UPDATE_LIST_CHAPTER,
    SHOW_MODAL_VIDEOS,
    CHANGE_TAB,
    UPDATE_INPUT_DATA,
    CHANGE_STATUS_TOOLBAR,
    GET_LIST_DATA_ARTICLE,
    UPDATE_INPUT_CHAPTER,
    UPDATE_LIST_VIDEO,
    UPDATE_INPUT_VIDEO
} from "../types";
const { LOCALHOST_PHOTO } = Config;
export const removeVideo = id => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${Config.API_URL}lessons/${id}`).then(response => {
                resolve(response);
            });
        });
    };
};
export const removeChapter = id => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${Config.API_URL}chapters/${id}`).then(response => {
                resolve(response);
            });
        });
    };
};
export const removeArticle = item => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${Config.API_URL}articles/${item.id}`)
                .then(response => {
                    resolve(response);
                });
        });
    };
};
export const editItemChapter = id => {
    return (dispatch, getState) => {
        console.log("id>>", id);
        return new Promise((resolve, reject) => {
            axios(`${Config.API_URL}chapters/${id}`).then(response => {
                let { data } = response.data;
                if (data) {
                    dispatch({
                        type: UPDATE_INPUT_DATA,
                        payload: {
                            objChapter: data
                        }
                    });
                    dispatch(updateListVideo(data.lessons));
                }

                resolve(response);
            });
        });
    };
};
export const editItemArticle = articleId => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios(`${Config.API_URL}articles/${articleId}`).then(response => {
                let { data } = response.data;
                if (data) {
                    dispatch({
                        type: UPDATE_INPUT_DATA,
                        payload: {
                            objArticle: data
                        }
                    });
                    dispatch(updateListChapter(data.chapters));
                }

                resolve(response);
            });
        });
    };
};
export const getListData = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios(`${Config.API_URL}articles`).then(response => {
                let { data } = response.data;
                data.map(x => (x.checked = true));
                dispatch({
                    type: GET_LIST_DATA_ARTICLE,
                    payload: {
                        list_data: data
                    }
                });
                resolve(response);
            });
        });
    };
};
export const changeStatus = value => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_STATUS_TOOLBAR,
            payload: {
                is_edit: value
            }
        });
    };
};
export const submitVideo = objVideo => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}lessons`, objVideo).then(response => {
                resolve(response);
            });
        });
    };
};
export const submitChapter = objChapter => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios
                .post(`${Config.API_URL}chapters`, objChapter)
                .then(response => {
                    resolve(response);
                });
        });
    };
};
export const submitArticle = obj => {
    return (dispatch, getState) => {
        const { objArticle } = getState().post;
        return new Promise((resolve, reject) => {
            if (!objArticle.id) {
                axios.post(`${Config.API_URL}articles`, objArticle).then(
                    response => {
                        const { data } = response.data;
                        objArticle.id = data.id;
                        dispatch(updateInputData(objArticle));
                        resolve(response);
                    },
                    err => {
                        reject(err);
                    }
                );
            } else {
                axios
                    .patch(
                        `${Config.API_URL}articles/${objArticle.id}`,
                        objArticle
                    )
                    .then(
                        response => {
                            const { data } = response.data;
                            resolve(response);
                        },
                        err => {
                            reject(err);
                        }
                    );
            }
        });
    };
};
export const updateInputChapter = obj => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_INPUT_CHAPTER,
            payload: {
                objChapter: obj
            }
        });
    };
};
export const updateInputData = obj => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_INPUT_DATA,
            payload: {
                objArticle: obj
            }
        });
    };
};
export const changeInputContent = (numWord, numChar, content) => {
    return (dispatch, getState) => {
        let { objArticle } = getState().post;
        let objData_temp = _.clone(objArticle, true);
        objData_temp["numWord"] = numWord;
        objData_temp["numChar"] = numChar;
        objData_temp["notes"] = content;
        dispatch({
            type: UPDATE_INPUT_DATA,
            payload: {
                objArticle: objData_temp
            }
        });
    };
};
export const changeTab = value => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_TAB,
            payload: {
                tabActive: value
            }
        });
    };
};
export const showModalVideo = value => {
    return (dispatch, getState) => {
        dispatch({
            type: SHOW_MODAL_VIDEOS,
            payload: {
                isModalVideo: value
            }
        });
    };
};
export const handleVideos = () => {
    return (dispatch, getState) => {
        const { objVideo, listDataVideos } = getState().post;
        let listDataVideosTemp = _.clone(listDataVideos);
        let objVideoTemp = _.clone(objVideo);
        // case add new
        if (!objVideoTemp.id) {
            // push item firts array
            listDataVideosTemp.unshift(objVideoTemp);
        } else {
            // case update item`
            listDataVideosTemp.map(item => {
                if (item.orderBy === objVideoTemp.orderBy) item = objVideoTemp;
                return item;
            });
        }
        // order by again
        listDataVideosTemp.map((item, i) => (item.orderBy = i));
        dispatch(updateListVideo(listDataVideosTemp));
    };
};

export const updateInputDataVideo = obj => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_INPUT_VIDEO,
            payload: {
                objVideo: obj
            }
        });
    };
};

export const updateListVideo = data => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_LIST_VIDEO,
            payload: {
                listDataVideos: data
            }
        });
    };
};
export const updateListChapter = data => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_LIST_CHAPTER,
            payload: {
                listDataChapter: data
            }
        });
    };
};
