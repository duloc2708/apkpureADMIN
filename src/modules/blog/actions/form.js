import {
    CHANGE_INPUT_CONTENT,
    EDIT_POST,
    OPEN_CALENDAR,
    UPDATE_INPUT_DATA,
    CONVERT_LIST_CHECK_TYPE,
    OPEN_MODAL_DETAIL_POST,
    ADD_NEW_POST,
    GET_LIST_DATA_POST,
    CLEAR_DATA_POST,
    INIT_DATA_LISTTYPE,
    CHECKED_LIST_TYPE,
    INSERT_TAGS,
    UPDATE_DATEIME_UP
} from '../types'
const { LOCALHOST_PHOTO } = Config
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

export const downFileAPK = (item) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let fileName = item.title_slug
            fetch(`${Config.API_URL}articles/getfileapk?namefile=${fileName}`)
                .then(res => {
                    console.log('res>>>>>>>', res.url);
                    const link = document.createElement('downloadgame');
                    link.href = res.url;
                    link.setAttribute('download', fileName + '_apksafety'); //or any other extension
                    link.click();
                    resolve(res)
                })
            // axios.get(`${Config.API_URL}articles/getfileapk`, { params: { namefile: fileName } })
            //     .then((response) => {
            //         const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/vnd.android.package-archive" }));
            //         const link = document.createElement('a');
            //         link.href = url;
            //         link.setAttribute('download', fileName); //or any other extension
            //         document.body.appendChild(link);
            //         link.click();
            //         resolve(response)
            //     }, (err) => {
            //         reject(err)
            //     })
        })
    }
}
export const uploadImageAvatarAPI = (obj) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}articles/upload_avatar`, obj)
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const insertTags = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: INSERT_TAGS,
            payload: {
                listTagsDefault: data
            }
        })
    }
}
export const updateDateTimeUp = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_DATEIME_UP,
            payload: {
                dateTimeUp: data
            }
        })
    }
}
export const relaceAllImageContent = (data, title) => {
    let slug = Helper.ChangeToSlug(title);
    // Hinh
    let image_firts = '';
    // Convert title to slug
    // Lay link hinh anh
    let content = data,
        base64Data = '',
        link = '', base64Image = [], type = '', imageName = ''
    let cheerio = require('cheerio');
    let $ = cheerio.load(<div id="main">{content}</div>);
    var elem = document.createElement("div");
    elem.innerHTML = content;
    var images = elem.getElementsByTagName("img");
    let listImages = []
    for (var i = 0; i < images.length; i++) {
        listImages.push(images[i].src)
    }
    if (listImages.length > 0) {
        listImages.map((item, i) => {
            let link = item;
            let objImage = '';
            // Nếu là link copy địa chỉ thì xử lý cách 1
            if (link.includes('http')) {
                type = link.split('.').pop();
                imageName = slug + i + '.' + type;
                base64Image.push(link);
                content = content.replace(link, LOCALHOST_PHOTO + imageName);
            } else {
                base64Data = link;
                // replace dấu , thành dấu chấm tham
                let linkReplace = link.replace(',', '!');
                base64Image.push(linkReplace);
                //base64Image.push(base64Data.split(';base64,').pop());
                type = base64Data.split(';')[0].split('/')[1];
                imageName = slug + i + '.' + type;
                content = content.replace(link, LOCALHOST_PHOTO + imageName);
            }
        })
    }
    return {
        content: content,
        list_image: base64Image
    }
}
export const updateBlog = () => {
    return (dispatch, getState) => {
        const { listTypeDefault, objData,
            listTagsDefault, dateTimeUp, objImageUpload, is_edit } = getState().blog
        const objImage = _.clone(objImageUpload, true)
        let objData_temp = _.clone(objData, true)
        let slug = Helper.ChangeToSlug(objData_temp.title)

        if (!is_edit) {
            delete objData_temp['id']
        }

        //==============UPDATE LIST TYPE
        let str_type = ''
        listTypeDefault.map((item) => {
            if (item.value)
                str_type = str_type + item.type + ','
        })
        if (str_type) str_type = str_type.substr(0, str_type.length - 1)
        objData_temp['type'] = str_type
        //==============UPDATE LIST TYPE



        //==============UPDATE TAGS, TIMEUP, SLUG
        let str_tags = ''
        listTagsDefault.map((item) => {
            str_tags = str_tags + item + ','
        })
        if (str_tags) str_tags = str_tags.substr(0, str_tags.length - 1)
        objData_temp['tags'] = str_tags
        objData_temp['title_slug'] = slug
        objData_temp['time_up'] = dateTimeUp.getTime()
        //==============UPDATE TAGS, TIMEUP, SLUG


        //==============UPDATE THUMBNAIL
        if (objImage) {
            let link = objImage.replace('!', ',');
            let dataImg = link.split(';base64,').pop()
            let type = link.split(';')[0].split('/')[1]
            let thumbnail = `thumnail_${slug}.` + type
            objData_temp['thumbnail'] = thumbnail
        }
        //==============UPDATE THUMBNAIL

        //==============UPDATE CONTENT, IMAGE
        let infoContent = relaceAllImageContent(objData_temp.content_long, objData_temp.title)
        objData_temp['content_long'] = infoContent.content
        objData_temp['list_image'] = infoContent.list_image
        //==============UPDATE CONTENT, IMAGE

        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}articles/add`, objData_temp)
                .then((response) => {
                    const { StatusCode, Message } = response.data
                    if (StatusCode != 0) {
                        alert(Message)
                        resolve(response)
                    } else {
                        //==============UPDATE AVATAR
                        if (objImage) {
                            dispatch(uploadImageAvatarAPI({ filename: `thumnail_${slug}`, image: objImage })).then(resUpload => {
                                dispatch({
                                    type: CLEAR_DATA_POST,
                                    payload: null
                                })
                                resolve(response)
                            })
                        } else {
                            dispatch({
                                type: CLEAR_DATA_POST,
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
export const deletePost = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}articles/delete`, { params: { id: id } })
                .then((response) => {
                    const { StatusCode, Message } = response.data
                    if (StatusCode != 0) alert(Message)
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const getListDataBlog = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}articles`)
                .then((response) => {
                    let { Data } = response.data
                    dispatch({
                        type: GET_LIST_DATA_POST,
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
export const addPost = (data) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}/articles`, data)
                .then((response) => {
                    dispatch({
                        type: ADD_NEW_POST,
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
export const updatePost = (data) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}/articles_update`, data)
                .then((response) => {
                    dispatch({
                        type: ADD_NEW_POST,
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
export const openModalDetailPost = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: OPEN_MODAL_DETAIL_POST,
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
        let { objData } = getState().blog
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
        // relaceAllImageContent(content, objData_temp.title)
    }
}
export const changeRowEditPost = (item) => {
    return (dispatch, getState) => {
        dispatch({
            type: EDIT_POST,
            payload: {
                objData: item,
                is_edit: true,
                isOpen: true
            }
        })
    }
}
export const openCalendar = (item) => {
    return (dispatch, getState) => {
        let { isdisplayCalendar } = getState().blog

        dispatch({
            type: OPEN_CALENDAR,
            payload: {
                isdisplayCalendar: !isdisplayCalendar
            }
        })
    }
}


export const clearDataPost = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_DATA_POST,
            payload: null
        })
    }
}


export const initDefaultPost = () => {
    return (dispatch, getState) => {
        const { list_data } = getState().listtype
        const { objData } = getState().blog
        let listobj = [], convertListtype = [], convertListtags = [];
        //=============INIT CHUYEN MỤC
        if (objData.type) {
            convertListtype = objData.type.split(',')
        }
        list_data.forEach(function (item) {
            let valType = false
            if (convertListtype.length > 0 && convertListtype.filter(x => x == item.code).length > 0) {
                valType = true
            }
            let obj = {
                id: item.id,
                type: item.code,
                text: item.name,
                value: valType
            };
            listobj.push(obj);
        });
        //=============INIT CHUYEN MỤC

        //=============INIT TAGS
        if (objData.tags) {
            convertListtags = objData.tags.split(',')
        }
        //=============INIT TAGS
        dispatch({
            type: INIT_DATA_LISTTYPE,
            payload: {
                listTypeDefault: listobj.sort((a, b) => Number(b.id) - Number(a.id)),
                listTagsDefault: convertListtags
            }
        })
    }
}

export const checkedListType = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHECKED_LIST_TYPE,
            payload: {
                listTypeDefault: data
            }
        })
    }
}