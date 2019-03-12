import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import * as videoActions from 'modules/video/actions/form'
import VideoDetailFormView from './VideoDetailFormView'
class VideoFormView extends React.Component {
    componentDidMount() {
        this.props.getListDataVideo()
    };
    onDeleteProductSelected(cell, row) {

        let listId = row.id;
        var txt;
        var r = confirm(`Bạn có muốn xoá blog này ?`);
        if (r == true) {
            this.props.deleteVideo(row.id).then(() => {
                this.loaddata()
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
    render() {
        let { list_data, isOpen } = this.props.video
        var selectRowProp = { clickToSelect: true, clickToSelectAndEditCell: true, mode: "radio" };
        const cellEditProps = {
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell
        };
        const options = {
            onDeleteRow: this.onDeleteRow,
            paginationPosition: 'bottom'
        };
        function imageFormatter(cell, row) {
            let pathSrc = '';
            if (cell) {
                // pathSrc = LINK_IMAGE_THUMBNAIL + '/' + row.id + '/' + row.thumbnail
            } else {
                pathSrc = 'http://digitalpolymer.com/image/cache/catalog/no_image-1024x1269.jpg'
            }
            return '<image width="100px" src="' + pathSrc + '"/>';
        }

        return (
            <div style={{ "margin": "10px", "marginBottom": "50px", "height": "500px" }} >
                <ButtonAddNew parentObject={this} />
                {isOpen
                    ?
                    <VideoDetailFormView parentObject={this} />
                    : ''
                }
                {!isOpen ?
                    <BootstrapTable
                        pagination
                        selectRow={selectRowProp}
                        data={list_data}
                        cellEdit={cellEditProps}
                        options={options}
                        search
                        searchPlaceholder='Tìm kiếm...'
                        striped={true} hover={true}>
                        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true} hidden={true}></TableHeaderColumn>
                        <TableHeaderColumn dataField="thumbnail" dataFormat={imageFormatter} dataSort={true}>Thumbnail</TableHeaderColumn>
                        <TableHeaderColumn dataField="title" dataSort={true}>Tiêu đề</TableHeaderColumn>
                        <TableHeaderColumn dataField="link" dataSort={true}>Link video</TableHeaderColumn>
                        <TableHeaderColumn width="120px"
                            dataField='button'
                            dataFormat={this.cellButton.bind(this)}>Update </TableHeaderColumn>
                        <TableHeaderColumn width="120px"
                            dataField='button'
                            dataFormat={this.delButton.bind(this)}> Delete </TableHeaderColumn>
                    </BootstrapTable>
                    : ''
                }
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
        ...videoActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(VideoFormView)


