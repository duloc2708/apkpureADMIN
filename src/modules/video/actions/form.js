import {
    CHANGE_INPUT_CONTENT,
    OPEN_CALENDAR,
    UPDATE_INPUT_DATA,
    CONVERT_LIST_CHECK_TYPE,
    OPEN_MODAL_DETAIL_VIDEO,
    ADD_NEW_VIDEO,
    GET_LIST_DATA_VIDEO,
    CLEAR_DATA_VIDEO,
    GET_LIST_DATA_PLAYLIST,
    CONVERT_LIST_PLAY_LIST,
    SHOW_PLAY_LIST,
    EDIT_VIDEO,
    UPDATE_THUMBNAIL_VIDEO,
    INSERT_TAGS_VIDEO,
    ADD_LIST_GAME
} from '../types'
export const addListGame = (item) => {
    console.log('addListGame', item);

    return (dispatch, getState) => {
        let { objData } = getState().video
        let objDataTemp = _.clone(objData, true)
        if (!objDataTemp["gameother"]) {
            objDataTemp["gameother"] = item.value
        } else {
            objDataTemp["gameother"] = objDataTemp["gameother"] + ',' + item.value
        }
        return new Promise((resolve, reject) => {
            dispatch({
                type: ADD_LIST_GAME,
                payload: {
                    objData: objDataTemp
                }
            })
        })

    }
}
export const updateDataImageUploads = (files) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: UPDATE_INPUT_DATA,
                payload: {
                    objImageUpload: files
                }
            })
        })

    }
}
// const { Config.API_URL, DOMAIN_READ_ARTICLE, LOCALHOST_PHOTO, URL_UPLOAD, URL_UPLOAD_THUMBAIL, PROD } = ConstantProject

// export const updateThumbnail = (name, files) => {
//     return (dispatch, getState) => {
//         let { objData } = getState().video
//         let objData_temp = _.clone(objData, true)
//         objData_temp["thumbnail"] = name
//         dispatch({
//             type: UPDATE_THUMBNAIL_VIDEO,
//             payload: {
//                 fileName: name,
//                 files: files,
//                 objData: objData_temp
//             }
//         })
//     }
// }
export const changeRowEditVideo = (item) => {
    return (dispatch, getState) => {
        let { list_play_default } = getState().video
        let list_play_temp = []
        if (item.playlist) {
            let converListType = item.playlist.split(',').map(function (n) {
                return n;
            });
            let data = [...list_play_default];
            if (data) {
                data.map(function (x) {
                    x.value = false;
                    return x
                });
                converListType.map((item, i) => {
                    let index = data.map(function (ar) { return ar.text; }).indexOf(item);
                    data[index].value = true;
                })
                list_play_temp = data
            }
        }
        dispatch({
            type: EDIT_VIDEO,
            payload: {
                list_play_default: list_play_temp.length > 0 ? list_play_temp : list_play_default,
                objData: item,
                is_edit: true,
                isOpen: true
            }
        })
    }
}
export const addPlaylist = (obj) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}/playlists_insert`, obj)
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const showPlaylist = () => {
    return (dispatch, getState) => {
        let { displayPlaylist } = getState().video
        let displayPlaylist_temp
        if (displayPlaylist == 'none') {
            displayPlaylist_temp = ''
        } else {
            displayPlaylist_temp = 'none'
        }
        dispatch({
            type: SHOW_PLAY_LIST,
            payload: {
                displayPlaylist: displayPlaylist_temp
            }
        })
    }
}

export const convertPlayList = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONVERT_LIST_PLAY_LIST,
            payload: {
                list_play_default: data
            }
        })
    }
}
export const getListPlayList = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}/playlists_user`, { params: { user: 'admin' } })
                .then((response) => {
                    let { data } = response
                    let list_play_default_temp = data
                    dispatch({
                        type: GET_LIST_DATA_PLAYLIST,
                        payload: {
                            list_play_default: data
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const deleteVideo = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}video/delete`, { params: { id: id } })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const getListDataVideo = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}video`)
                .then((response) => {
                    let { Data } = response.data
                    dispatch({
                        type: GET_LIST_DATA_VIDEO,
                        payload: {
                            list_data: Data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const uploadImageAvatarAPI = (objAvatar, objSlide) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let listAPI = []
            if (objAvatar) {
                listAPI.push(axios.post(`${Config.API_URL}post/upload_avatar`, objAvatar))
            }
            if (objSlide) {
                listAPI.push(axios.post(`${Config.API_URL}post/upload_slide`, objSlide))
            }
            Promise.all(listAPI)
                .then((response) => {
                    resolve(response)
                })
        })
    }
}
export const insertTags = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: INSERT_TAGS_VIDEO,
            payload: {
                listTagsDefault: data
            }
        })
    }
}
export const initDefaultVideo = () => {
    return (dispatch, getState) => {
        const { objData } = getState().video
        let listobj = [], convertListtype = [], convertListtags = [];
        //=============INIT TAGS
        if (objData.tags) {
            console.log('objData.tags>>>>', objData.tags);

            convertListtags = objData.tags.split(',')
        }
        //=============INIT TAGS
        dispatch({
            type: INSERT_TAGS_VIDEO,
            payload: {
                listTagsDefault: convertListtags
            }
        })
    }
}
export const addVideo = () => {
    return (dispatch, getState) => {
        let { listTagsDefault, objData, is_edit, list_play_default, objImageUpload } = getState().video
        let objData_temp = _.clone(objData, true)
        let slug = Helper.ChangeToSlug(objData_temp.title)

        const objImage = _.clone(objImageUpload, true)


        if (!is_edit) {
            delete objData_temp['id']
        }

        //==============UPDATE TAGS, TIMEUP, SLUG
        let str_tags = ''
        listTagsDefault.map((item) => {
            str_tags = str_tags + item + ','
        })
        if (str_tags) str_tags = str_tags.substr(0, str_tags.length - 1)
        objData_temp['tags'] = str_tags
        //==============UPDATE TAGS, TIMEUP, SLUG

        objData_temp['title_slug'] = slug

        //==============UPDATE THUMBNAIL
        if (objImage) {
            let link = objImage.replace('!', ',');
            let dataImg = link.split(';base64,').pop()
            let type = link.split(';')[0].split('/')[1]
            let thumbnail = `thumnail_${slug}.` + type
            objData_temp['thumbnail'] = thumbnail
        }
        //==============UPDATE THUMBNAIL
        let { link } = objData_temp
        if (link) {
            if (!objData_temp.thumbnail && link.indexOf('youtube') != -1) {
                var youtube_video_id = link.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
                var video_thumbnail = `//img.youtube.com/vi/${youtube_video_id}/0.jpg`
                objData_temp['thumbnail'] = video_thumbnail
            }
        }

        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}video/add`, objData_temp)
                .then((response) => {
                    const { StatusCode, Message } = response.data
                    if (StatusCode != 0) {
                        alert(Message)
                        resolve(response)
                    } else {
                        //==============UPDATE AVATAR
                        if (objImage) {
                            dispatch(uploadImageAvatarAPI(
                                { filename: `thumnail_${slug}`, image: objImage }, '')
                            ).then(resUpload => {
                                dispatch({
                                    type: CLEAR_DATA_VIDEO,
                                    payload: null
                                })
                                resolve(response)
                            })
                        } else {
                            dispatch({
                                type: CLEAR_DATA_VIDEO,
                                payload: null
                            })
                            resolve(response)
                        }
                    }
                }, (err) => {
                    reject(err)
                })
        })

    }
}

export const updateVideo = (data) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}/articles_update`, data)
                .then((response) => {
                    dispatch({
                        type: ADD_NEW_VIDEO,
                        payload: {
                            isOpen: false
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const convertListCheckType = (loadlisttype) => {
    return (dispatch) => {
        dispatch({
            type: CONVERT_LIST_CHECK_TYPE,
            payload: {
                loadlisttype: loadlisttype
            }
        })
    }
}
export const openModalDetailVideo = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: OPEN_MODAL_DETAIL_VIDEO,
            payload: {
                isOpen: value
            }
        })
    }
}

export const updateInputItem = (obj) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_INPUT_DATA,
            payload: {
                objData: obj
            }
        })
    }
}
export const changeInputContent = (numWord, numChar, content) => {
    return (dispatch, getState) => {
        let { objData } = getState().post
        let objData_temp = _.clone(objData, true)
        objData_temp["numWord"] = numWord
        objData_temp["numChar"] = numChar
        objData_temp["content_long"] = content
        dispatch({
            type: CHANGE_INPUT_CONTENT,
            payload: {
                objData: objData_temp
            }
        })
    }
}
export const openCalendar = (item) => {
    return (dispatch, getState) => {
        let { isdisplayCalendar } = getState().post

        dispatch({
            type: OPEN_CALENDAR,
            payload: {
                isdisplayCalendar: !isdisplayCalendar
            }
        })
    }
}


export const clearDataVideo = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_DATA_VIDEO,
            payload: null
        })
    }
}

