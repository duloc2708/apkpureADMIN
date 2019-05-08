import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import * as videoActions from 'modules/video/actions/form'
import VideoDetailFormView from './VideoDetailFormView'
import * as postActions from 'modules/post/actions/form'

const ComponentImage = (props) => {
    let { cell } = props
    let pathSrc = '';
    if (cell.indexOf('image.winudf') != -1) {
        pathSrc = cell
    } else if (cell.indexOf('youtube') != -1) {
        pathSrc = cell
    } else {
        pathSrc = Helper._getImageIndex(cell, 175, 175);

    }
    return (
        <img key={cell} width="100px" height="100px" src={`${pathSrc}`} alt={cell} />
    )

}
class VideoFormView extends React.Component {
    componentDidMount() {
        this.props.getListDataVideo()
        this.props.getListDataPost()
    };
    onDeleteProductSelected(row) {

        let listId = row.id;
        var txt;
        var r = confirm(`Bạn có muốn xoá blog này ?`);
        if (r == true) {
            this.props.deleteVideo(row.id).then(() => {
                this.props.getListDataVideo()
            })

        }

    }
    delButton(cell, row, enumObject, rowIndex) {
        return (
            <button className="btn btn-warning btn-icon"
                type="button"
                onClick={() =>
                    this.onDeleteProductSelected(cell, row)}
            >
                Xoá
            </button>
        )
    }
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button className="btn btn-success btn-icon"
                type="button"
                onClick={() =>
                    this.onClickProductSelected(cell, row, rowIndex)}
            >
                Cập nhật
            </button>
        )
    }
    onClickProductSelected(cell, row, rowIndex) {
        // this.showRow(row)
    }
    AddNew() {
        this.props.openModalDetailVideo(true)
    };
    _onKeyPress(e) {
        if (e.key == 'Enter') {
            // this.props.filterData()
        }
    }
    showRow(row) {
        this.props.changeRowEditVideo(row)
    }
    render() {

        let jobTypes = [{
            value: 'active',
            text: 'active'
        }, {
            value: 'deactive',
            text: 'deactive'
        }];
        var selectRowProp = {
            clickToSelect: true,
            clickToSelectAndEditCell: true,
            mode: "radio",
            onSelect: this.onRowSelect
        };
        const cellEditProps = {
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell
        };
        function imageFormatter(cell, row) {
            let pathSrc = '';
            pathSrc = Config.LOCALHOST_PHOTO + cell;
            return '<image src="' + pathSrc + '"/>';
        }
        const options = {
            onDeleteRow: this.onDeleteRow,
            paginationPosition: 'bottom'
        };
        let { list_data, isOpen, listHeader, fieldSearch } = this.props.video
        return (
            <div style={{ "margin": "10px", "marginBottom": "50px", "height": "500px" }} >
                {isOpen
                    ?
                    <VideoDetailFormView parentObject={this} />
                    :
                    <ButtonAddNew parentObject={this} />
                }
                {!isOpen
                    ?
                    <div className="table-responsive" style={{ "marginTop": "10px" }}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text"
                                        className="form-control"
                                        value={fieldSearch}
                                        onChange={(event) => this.changeInputSearch(event)}
                                        name="fieldSearch"
                                        id="fieldSearch"
                                        onKeyPress={this._onKeyPress.bind(this)} />

                                </div>
                                <div className="col-md-6">
                                    <button type='button' onClick={() => this.search()}> Tìm kiếm</button>
                                </div>
                            </div>
                        </div>


                        <table className="table">
                            <thead>
                                <tr>
                                    {
                                        listHeader.map((item, i) => {
                                            return (
                                                <th key={item.key}>{item.title}</th>
                                            )
                                        })
                                    }

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list_data.map((item, i) => {
                                        let { id, link, thumbnail, title, tags, type_name, created_id, status, atr3 } = item
                                        return (
                                            <tr key={id}>
                                                <td><ComponentImage cell={thumbnail} /></td>
                                                <td>{title}</td>
                                                <td>{tags}</td>
                                                <td>{link}</td>
                                                <td><button
                                                    onClick={() => this.showRow(item)}
                                                    className="btn btn-warning btn-icon"
                                                    type="button">Cập nhật</button></td>
                                                <td><button
                                                    onClick={() => this.onDeleteProductSelected(item)}
                                                    className="btn btn-danger btn-icon"
                                                    type="button">Xoá</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    :
                    ''
                }
                <hr />
            </div>
        )

    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    video
},
    ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        video
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...videoActions,
        ...postActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(VideoFormView)


