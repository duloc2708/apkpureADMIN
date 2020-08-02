
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
                if (!checkRows) {
                    $(`#sortable #drag_${id}`).remove();
                    let listRowTemp = []
                    listRow.map(item => {
                        if (item.indexOf(`item_data_${id}`) == -1) {
                            listRowTemp.push(item)
                        }
                    })
                    that.props.updateListRow(listRowTemp)
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
                let id = parseInt($(this).parent("th").attr('id'));
                let htmlCopy = $(this).parent("th")[0].outerHTML
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
    _saveHtml() {
        $('.item_data').each(function () {
            let str = $(this).get(0).outerHTML;
        })

    }
    // _saveHtml() {
    //     var htmlContent = $("#sortable").get(0).outerHTML;
    //     console.log('htmlContent>>>',htmlContent);
    //     htmlContent = htmlContent.replace(/className=/g, 'className=')
    //     let strHtml = `
    //     class ComFormView extends React.Component {
    //         render() {
    //             return (
    //                 <section className="content" id="explore-market">
    //                 <div id="sortable"> ${htmlContent}</div>
    //                 </section>
    //             )
    //         }
    //     }
    //     export default ComFormView`
    //     axios.post('http://localhost:2041/savefile', { data: strHtml }).then(res => {
    //         alert('lưu thành công')
    //     })

    // }
    drop(event) {
        let { keyControl, contentControl, listRow } = this.props.renderform
        let that = this
        event.preventDefault();
        // this._addHtml(keyControl)
        let classDiv = $(event.target).attr('class').split(' ')[1]
        let id = $(event.target).parent('div').attr('id');
        let idCol = parseInt($(event.target).attr('id'));
        let idColTemp = `col_${id}_${idCol + 1}`
        if ($(`.${idColTemp}`).length) {
            let arrData = []
            $(`.item_data_${id}`).children().each((index, element) => {
                let idChild = $(element).find('a').attr('id');
                let idColChild = parseInt($(element).attr('id'));
                if (idColChild > idCol) {
                    let htmlCopy = $(element)[0].outerHTML
                    htmlCopy = htmlCopy.replace(`col_${id}_${idCol}`, `col_${id}_${idCol + 1}`)
                    htmlCopy = htmlCopy.replace(`label_${id}-${idCol}`, `label_${id}-${idCol + 1}`)
                    arrData.push(htmlCopy)

                    htmlCopy = $(element)[0].outerHTML
                    htmlCopy = htmlCopy.replace(`id="${idColChild}"`, `id="${idColChild + 1}"`)
                    htmlCopy = htmlCopy.replace(`col_${idChild}_${idColChild}`, `col_${id}_${idColChild + 1}`)
                    htmlCopy = htmlCopy.replace(`label_${idChild}-${idColChild}`, `label_${idChild}-${idColChild + 1}`)
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
            // lấy control được chọn
            let htmlCopy = contentControl//$(event.target)[0].outerHTML
            // chèn sau vị trí được drag
            htmlCopy = htmlCopy.replace(`id="0"`, `id="${idCol + 1}"`)
            htmlCopy = htmlCopy.replace(`col-1-0`, `col-${id}-${idCol + 1}`)
            htmlCopy = htmlCopy.replace(`label-1-0`, `label-${id}-${idCol + 1}`)
            $(htmlCopy).insertAfter(`.${classDiv}`);

            // cập lại data
            let listRowTemp = []
            $('.row_data').each(function () {
                listRowTemp.push($(this)[0].outerHTML);
            })
            that.props.updateListRow(listRowTemp)
        }
    }
    allowDrop(event) {
        event.preventDefault();
    }
    onDragStart(event) {
        this.props.assignControl(event.target.id)
        event.dataTransfer.setData("Text", event.target.id);
    }
    dragging(event) {
        // document.getElementById("demo").innerHTML = "The p element is being dragged";
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
                                    listRow.map((item, i) => {
                                        var seed = Date.now();
                                        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                                            var r = (seed + Math.random() * 16) % 16 | 0;
                                            seed = Math.floor(seed / 16);
                                            return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
                                        });
                                        return (
                                            <div id={`drag_${i + 1}`} key={uuid} className="row droptarget"
                                                onDrop={(e) => this.drop(e)}
                                                onDragOver={(e) => this.allowDrop(e)} >
                                                <div dangerouslySetInnerHTML={{
                                                    __html: item
                                                }}>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>

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
