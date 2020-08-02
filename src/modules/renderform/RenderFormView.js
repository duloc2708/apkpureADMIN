
import { addhtml, checkRows, changeValue, assignControl, updateListRow } from 'modules/renderform/actions'
class RenderFormView extends React.Component {
    componentWillMount() {
        $("#id_custom").attr("href", "/styles/custom/renderform.css");
    }
    _addHtml(item) {
        let { strHTML, listRow } = this.props.renderform
        let that = this
        let idCol = parseInt(listRow.length) + 1
        let htmlCopy = ` <div id="1" class="row item_data_1 row_data">${item.col} </div>`
        htmlCopy = htmlCopy.replace(/id="1"/g, `id="${idCol}"`);
        htmlCopy = htmlCopy.replace(`item_data_1`, `item_data_${idCol}`)
        htmlCopy = htmlCopy.replace(`col-1-0`, `col-${idCol}-${0}`)
        htmlCopy = htmlCopy.replace(`label-1-0`, `label-${idCol}-${0}`)
        htmlCopy = htmlCopy.replace(`button-1-0`, `button-${idCol}-${0}`)
        if (listRow.length == 0) {
            listRow.push(htmlCopy)
            this.props.addhtml(listRow)
        } else {
            let arr = []
            $('.row_data').each(function () {
                arr.push($(this)[0].outerHTML)
            })
            arr.push(htmlCopy)
            that.props.addhtml(arr)
        }

    }
    componentDidMount() {
        $("#sortable").sortable();
        setTimeout(() => {
            $.getScript('/js/dragndrop.table.columns.js', function () {
                $('.table').dragableColumns();
            });
        }, 0)
        axios.get(`http://localhost:3001/api/common/grouplist`)
    }
    componentDidUpdate() {
        $("#sortable").sortable();
        $('.table').dragableColumns();

        let that = this
        let { strHTML, listRow } = this.props.renderform
        $(document).ready(function () {
            // copy col hiện tại
            $(".icon-copy").click(function () {
                // lấy id div class row_data
                let id = parseInt($(this).parent("a").parent("div").parent("div").parent("div").parent("div").attr('id'));
                // lấy id div class của col hiện tại 
                let idCol = parseInt($(this).parent("a").parent("div").parent("div").parent("div").attr('id'));
                // lấy nội dung html của col hiện tại
                let htmlCopy = $(this).parent("a").parent("div").parent("div").parent("div")[0].outerHTML
                // tăng id của elem hiện tại để add col tiếp theo
                htmlCopy = htmlCopy.replace(`id="${idCol}"`, `id="${idCol + 1}"`)
                htmlCopy = htmlCopy.replace(`col-${id}-${idCol}`, `col-${id}-${idCol + 1}`)
                htmlCopy = htmlCopy.replace(`label-${id}-${idCol}`, `label-${id}-${idCol + 1}`)
                htmlCopy = htmlCopy.replace(`button-${id}-${idCol}`, `button-${id}-${idCol + 1}`)
                let idColTemp = `col-${id}-${idCol + 1}`
                if ($(`.${idColTemp}`).length == 0) {
                    $(`.item_data_${id}`).append(htmlCopy);
                    let elemCurrent = $(`.item_data_${id}`)[0].outerHTML
                    let listRowTemp = []
                    // cập nhật lại row hiện tại 
                    listRow.map(item => {
                        if (item.indexOf(`item_data_${id}`) != -1) {
                            listRowTemp.push(elemCurrent)
                        } else {
                            listRowTemp.push(item)
                        }
                    })
                    that.props.updateListRow(listRowTemp)
                } else {
                    let arrCol = []
                    $(`.item_data_${id} .col-list`).each(function () {
                        let idTemp = parseInt($(this).attr("id"))
                        let idColCurrent = idCol
                        let idParentRow = parseInt($(this).parent("div").attr("id"))
                        if (idTemp == idColCurrent) {
                            // add current hiện tại
                            arrCol.push($(this)[0].outerHTML)
                            // add col copy
                            let htmlCopy = $(this)[0].outerHTML
                            htmlCopy = htmlCopy.replace(`id="${idColCurrent}"`, `id="${idColCurrent + 1}"`)
                            htmlCopy = htmlCopy.replace(`col-${idParentRow}-${idTemp}`, `col-${idParentRow}-${idTemp + 1}`)
                            htmlCopy = htmlCopy.replace(`label-${idParentRow}-${idTemp}`, `label-${idParentRow}-${idTemp + 1}`)
                            htmlCopy = htmlCopy.replace(`button-${idParentRow}-${idTemp}`, `button-${idParentRow}-${idTemp + 1}`)
                            arrCol.push(htmlCopy)
                        }
                        if (idTemp < idColCurrent) {
                            arrCol.push($(this)[0].outerHTML)
                        }
                        if (idTemp > idColCurrent) {
                            let htmlCopy = $(this)[0].outerHTML
                            htmlCopy = htmlCopy.replace(`id="${idTemp}"`, `id="${idTemp + 1}"`)
                            htmlCopy = htmlCopy.replace(`col-${idParentRow}-${idTemp}`, `col-${idParentRow}-${idTemp + 1}`)
                            htmlCopy = htmlCopy.replace(`label-${idParentRow}-${idTemp}`, `label-${idParentRow}-${idTemp + 1}`)
                            htmlCopy = htmlCopy.replace(`button-${idParentRow}-${idTemp}`, `button-${idParentRow}-${idTemp + 1}`)
                            arrCol.push(htmlCopy)
                        }

                    })
                    let stringHtml = ''
                    let listRowTemp = []
                    arrCol.map(item => {
                        stringHtml = stringHtml + item
                    })
                    // cập nhật lại row hiện tại 
                    listRow.map(item => {
                        if (item.indexOf(`item_data_${id}`) != -1) {
                            listRowTemp.push(` <div id="${id}" class="row item_data_${id}" row_data">${stringHtml} </div>`)
                        } else {
                            listRowTemp.push(item)
                        }
                    })
                    that.props.updateListRow(listRowTemp)
                }
            })
            // remove col hiện tại
            $(".icon-remove").click(function () {
                let id = parseInt($(this).parent("a").parent("div").parent("div").parent("div").parent("div").attr('id'));
                let idCol = parseInt($(this).parent("a").parent("div").parent("div").parent("div").attr('id'));
                let rowData = `.item_data_${id}`
                $(`.col-${id}-${idCol}`).remove();
                // trường hợp không còn colum nào thì xoá row
                let checkRows = false
                $(rowData).children().each((index, element) => {
                    checkRows = true
                })
                // console.log('checkRows',checkRows);
                if (!checkRows) {
                    $(`#sortable #drag_${id}`).remove();
                    let listRowTemp = []
                    listRow.map(item => {
                        if (item.indexOf(`item_data_${id}`) == -1) {
                            listRowTemp.push(item)
                        }
                    })
                    that.props.updateListRow(listRowTemp)
                } else {
                    // that._updateListRow()
                }
            })

            // edit button hiện tại
            $(".icon-edit-button").click(function () {
                let id = parseInt($(this).parent("a").parent("div").parent("div").parent("div").parent("div").attr('id'));
                let idCol = parseInt($(this).parent("a").parent("div").parent("div").parent("div").attr('id'));
                let lable = `button-${id}-${idCol}`
                var txt = $(`#${lable}`).text();
                if (txt) {
                    $(`#${lable}`).replaceWith(`<input id=${lable}  type="text" style="width:75px" class='mytxt'>`);
                    $(`#${lable}`).val(txt.trim());
                    $(`.item_data_${id} .col-${id}-${idCol} .icon-remove-button`).css({ "display": "" });
                    $(`.item_data_${id} .col-${id}-${idCol} .icon-edit-button`).css({ "display": "none" });
                }
            })

            // đóng button hiện tại
            $(".icon-remove-button").click(function () {
                let id = parseInt($(this).parent("a").parent("div").parent("div").parent("div").parent("div").attr('id'));
                let idCol = parseInt($(this).parent("a").parent("div").parent("div").parent("div").attr('id'));
                let input = `button-${id}-${idCol}`
                var txt = $(`#${input}`).val();
                if (txt) {
                    $(`#${input}`).replaceWith(`<button id=${input} class='mytxt'></button>`);
                    $(`#${input}`).text(txt.trim());
                    $(`.item_data_${id} .col-${id}-${idCol} .icon-remove-button`).css({ "display": "none" });
                    $(`.item_data_${id} .col-${id}-${idCol} .icon-edit-button`).css({ "display": "" });
                    that._updateListRow()
                }

            })

            // edit lable hiện tại
            $(".icon-edit-label").click(function () {
                let id = parseInt($(this).parent("a").parent("div").parent("div").parent("div").parent("div").attr('id'));
                let idCol = parseInt($(this).parent("a").parent("div").parent("div").parent("div").attr('id'));
                let lable = `label-${id}-${idCol}`
                var txt = $(`#${lable}`).text();
                if (txt) {
                    $(`#${lable}`).replaceWith(`<input id=${lable}  type="text" style="width:75px" class='mytxt'>`);
                    $(`#${lable}`).val(txt.trim());
                    $(`.item_data_${id} .col-${id}-${idCol} .icon-remove-label`).css({ "display": "" });
                    $(`.item_data_${id} .col-${id}-${idCol} .icon-edit-label`).css({ "display": "none" });
                }
            })

            // đóng lable hiện tại
            $(".icon-remove-label").click(function () {
                let id = parseInt($(this).parent("a").parent("div").parent("div").parent("div").parent("div").attr('id'));
                let idCol = parseInt($(this).parent("a").parent("div").parent("div").parent("div").attr('id'));
                let input = `label-${id}-${idCol}`
                var txt = $(`#${input}`).val();
                if (txt) {
                    $(`#${input}`).replaceWith(`<label id=${input} class='mytxt'></label>`);
                    $(`#${input}`).text(txt.trim());
                    $(`.item_data_${id} .col-${id}-${idCol} .icon-remove-label`).css({ "display": "none" });
                    $(`.item_data_${id} .col-${id}-${idCol} .icon-edit-label`).css({ "display": "" });
                    that._updateListRow()
                }
            })

            // edit lable column
            $(".icon-edit-col").click(function () {
                event.preventDefault();
                event.stopPropagation();
                let id = parseInt($(this).parent("a").parent("th").attr('id'));
                let lable = `label-col-${id}`
                var txt = $(`#${lable}`).text();
                if (txt) {
                    $(`#${lable}`).replaceWith(`<input id=${lable}  type="text" style="width:75px" >`);
                    $(`#${lable}`).val(txt.trim());
                    $(`.th-${id} .icon-remove-col`).css({ "display": "" });
                    $(`.th-${id} .icon-edit-col`).css({ "display": "none" });
                }
            })

            // đóng lable colum hiện tại
            $(".icon-remove-col").click(function () {
                let id = parseInt($(this).parent("a").parent("th").attr('id'));
                let input = `label-col-${id}`
                var txt = $(`#${input}`).val();
                if (txt) {
                    $(`#${input}`).replaceWith(`<label id=${input}></label>`);
                    $(`#${input}`).text(txt.trim());
                    $(`.th-${id} .icon-remove-col`).css({ "display": "none" });
                    $(`.th-${id} .icon-edit-col`).css({ "display": "" });
                }
            })



            // thêm cột bên phải của lưới
            $(".add-col-right").click(function () {
                let id = parseInt($(this).parent("a").parent("th").attr('id'));
                let htmlCopy = $(this).parent("a").parent("th")[0].outerHTML
                htmlCopy = htmlCopy.replace(`id="${id}"`, `id="${id + 1}"`)
                htmlCopy = htmlCopy.replace(`th-${id}`, `th-${id + 1}`)
                htmlCopy = htmlCopy.replace(`label-col-${id}`, `label-col-${id + 1}`)
                $(htmlCopy).insertAfter(`.th-${id}`);

                let arr = []
                $('.row_data').each(function () {
                    arr.push($(this)[0].outerHTML)
                })
                that.props.updateListRow(arr)
                $('table').find('td:last').after('<td>...</td>');
            })
        });
    }
    // _saveHtml() {
    //     $('.item_data').each(function () {
    //         let str = $(this).get(0).outerHTML;
    //     })
    // }
    _saveHtml() {
        let htmlContent = ''
        $('.row_data').each(function () {
            let item = $(this)[0].outerHTML
            var count = (item.match(/col-list/g) || []).length;
            let cloneItem = item
            let calWidth = 12 / count
            if (cloneItem.indexOf('col-md-12') != -1) {
                item = item.replace(/col-md-12/ig, `col-md-${calWidth}`)
            }
            if (cloneItem.indexOf('col-md-6') != -1) {
                item = item.replace(/col-md-6/ig, `col-md-${calWidth}`)
            }
            if (cloneItem.indexOf('col-md-4') != -1) {
                item = item.replace(/col-md-4/ig, `col-md-${calWidth}`)
            }
            if (cloneItem.indexOf('col-md-3') != -1) {
                item = item.replace(/col-md-3/ig, `col-md-${calWidth}`)
            }
            htmlContent = htmlContent + item
        })
        htmlContent = htmlContent.replace(/<a>(.*?)<\/a>/ig, "")
        htmlContent = htmlContent.replace(/profile-pic/ig, "")
        axios.post('http://localhost:3090/savefile', { data: htmlContent }).then(res => {
            alert('lưu thành công')
        })

    }
    drop(event) {
        let { keyControl, contentControl, listRow } = this.props.renderform
        let checkClassInsert = $(event.target).attr('class');
        if (['fa-remove', 'edit'].indexOf(checkClassInsert) != -1) {
            console.log('checkClassInsert>>>>>>', checkClassInsert);
            let that = this
            let classDiv = $(event.target).attr('class').split(' ')[1]
            let id = $(event.target).parent('div').attr('id');
            let idCol = parseInt($(event.target).attr('id'));
            let idColTemp = `col-${id}-${idCol + 1}`
            $(`.col-${id}-${idCol}`).css({ "border": "none" })
            if ($(`.${idColTemp}`).length) {
                let arrData = []
                $(`.item_data_${id}`).children().each((index, element) => {
                    let idChild = $(element).find('a').attr('id');
                    let idColChild = parseInt($(element).attr('id'));
                    if (idColChild > idCol) {
                        let htmlCopy = $(element)[0].outerHTML
                        htmlCopy = htmlCopy.replace(`col-${id}-${idCol}`, `col-${id}-${idCol + 1}`)
                        htmlCopy = htmlCopy.replace(`label-${id}-${idCol}`, `label-${id}-${idCol + 1}`)
                        htmlCopy = htmlCopy.replace(`button-${id}-${idCol}`, `button-${id}-${idCol + 1}`)
                        arrData.push(htmlCopy)
                        htmlCopy = $(element)[0].outerHTML
                        htmlCopy = htmlCopy.replace(`id="${idColChild}"`, `id="${idColChild + 1}"`)
                        htmlCopy = htmlCopy.replace(`col-${idChild}-${idColChild}`, `col-${id}-${idColChild + 1}`)
                        htmlCopy = htmlCopy.replace(`button-${idChild}-${idColChild}`, `button-${idChild}-${idColChild + 1}`)
                        arrData.push(htmlCopy)
                    } else {
                        arrData.push($(element)[0].outerHTML)
                    }
                });

                $(`.item_data_${id}`).children().remove();
                let str = ''
                arrData.map(item => {
                    str = str + item
                })
                $(`.item_data_${id}`).append(str)

                let elemCurrent = $(`.item_data_${id}`)[0].outerHTML
                let listRowTemp = []
                // cập nhật lại row hiện tại 
                listRow.map(item => {
                    if (item.indexOf(`item_data_${id}`) != -1) {
                        listRowTemp.push(elemCurrent)
                    } else {
                        listRowTemp.push(item)
                    }
                })
                that.props.updateListRow(listRowTemp)

            } else {
                // console.log('>>>> drop');
                // // lấy control được chọn
                // let htmlCopy = contentControl//$(event.target)[0].outerHTML
                // // chèn sau vị trí được drag
                // //.attr('id');
                // htmlCopy = htmlCopy.replace(`id="0"`, `id="${idCol + 1}"`)
                // htmlCopy = htmlCopy.replace(`col-1-0`, `col-${id}-${idCol + 1}`)
                // htmlCopy = htmlCopy.replace(`label-1-0`, `label-${id}-${idCol + 1}`)
                // htmlCopy = htmlCopy.replace(`button-1-0`, `button-${id}-${idCol + 1}`)
                // $(htmlCopy).insertAfter(`.${classDiv}`);
                // this._updateưListRow()
            }
        }


    }
    _updateListRow() {
        // cập lại data
        let listRowTemp = []
        $('.row_data').each(function () {
            listRowTemp.push($(this)[0].outerHTML);
        })
        this.props.updateListRow(listRowTemp)
    }
    allowDrop(event) {
        let id = $(event.target).parent('div').attr('id');
        let idCol = parseInt($(event.target).attr('id'));
        let idColTemp = `col_${id}_${idCol}`
        event.preventDefault();
    }
    onDragStart(event) {
        this.props.assignControl(event.target.id)
    }
    dragging(event) {
        // document.getElementById("demo").innerHTML = "The p element is being dragged";
    }
    _onDragLeave(event) {

        // let idCol = parseInt($(event.target).attr('id'));
        // let idColTemp = `col-${id}-${idCol}`
        // if ($(event.target).find('.edit')[0]) {
        //     let classCol = $(event.target).find('.edit').parent('div').parent('div').attr('class').split(' ')[1]
        //     // console.log('_onDragLeave>>>>', $(event.target).find('.edit').parent('div').parent('div').attr('class').split(' ')[1]);
        //     $(`.${classCol}`).css({ "border": "solid" })
        // }else{
        // }
        console.log('event.target', event.target);

    }
    _linkForm() {
        var win = window.open('/testform', '_blank');
        win.focus();
    }

    render() {
        let { strHTML, listRow, valueTemp, listControl, listDrag } = this.props.renderform
        let todoList = document.querySelector('sortable');

        var seed2 = Date.now();
        var genKeySort = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (seed2 + Math.random() * 16) % 16 | 0;
            seed2 = Math.floor(seed2 / 16);
            return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
        });

        let listRowCotrol = [], listRowGrid = []
        listRow.map(item => {
            if (item.indexOf('table') != -1) {
                listRowGrid.push(item)
            } else {
                listRowCotrol.push(item)
            }
        })
        return (
            <div className="container">
                <section >
                    <div className="main__content">
                        <div className="form__personnal">
                            <p>Danh sách control</p>
                            <ul className="ul-control">
                                {
                                    listControl.map(item => {
                                        return (
                                            <li key={`control_${item.key}`}
                                                onClick={() => this._addHtml(item)}
                                                onDrop={(e) => this.drop(e)}
                                                onDragOver={(e) => this.allowDrop(e)}>
                                                <span
                                                    onDragStart={(e) => this.onDragStart(e)}
                                                    onDrag={(e) => this.dragging(e)}
                                                    draggable="true"
                                                    id={item.key}
                                                >
                                                    <i style={{ "margin-right": "5px" }} className={item.icon} aria-hidden="true"></i>
                                                    {item.text}
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <hr />
                            <div id="sortable" key={genKeySort} >
                                {
                                    listRowCotrol.map((item, i) => {
                                        var seed = Date.now();
                                        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                                            var r = (seed + Math.random() * 16) % 16 | 0;
                                            seed = Math.floor(seed / 16);
                                            return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
                                        });
                                        return (
                                            <div id={`drag_${i + 1}`} key={uuid} className="droptarget"
                                                onDrop={(e) => this.drop(e)}
                                                onDragOver={(e) => this.allowDrop(e)}
                                                onDragLeave={(e) => this._onDragLeave(e)}>
                                                <div dangerouslySetInnerHTML={{
                                                    __html: item
                                                }}>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                            {
                                listRowGrid.map((item, i) => {
                                    var seed = Date.now();
                                    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                                        var r = (seed + Math.random() * 16) % 16 | 0;
                                        seed = Math.floor(seed / 16);
                                        return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
                                    });
                                    return (
                                        <div dangerouslySetInnerHTML={{
                                            __html: item
                                        }}>
                                        </div>
                                    )
                                })
                            }
                            <button onClick={() => this._saveHtml()} >Generate </button>
                            <button onClick={() => this._linkForm()} >Test Form </button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = ({
    i18n,
    renderform
}) => {
    return {
        i18n,
        renderform
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        addhtml,
        checkRows,
        changeValue,
        assignControl,
        updateListRow
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(RenderFormView)
