import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import BlogDetailFormView from './BlogDetailFormView.js';
import * as blogActions from 'modules/blog/actions/form'
import { getListChuyenMuc } from 'modules/listtype/actions/form'
const ComponentImage = (props) => {
    let { cell } = props
    let pathSrc = '';
    if (cell.indexOf('image.winudf') != -1) {
        pathSrc = cell
    } else {
        pathSrc = Config.LOCALHOST_PHOTO + cell;

    }
    return (
        <img key={cell} width="100px" height="100px" src={`${pathSrc}`} alt={cell} />
    )

}
class BlogFormView extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.loaddata();
    };
    onDeleteRow(_id) {
        let listId = _id;
        fetch(URL_AUTH_API + '/articles_remove', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listId)
        })

    }
    openModal() {
        this.setState({
            isOpen: true
        })
    };
    loaddata() {
        this.props.getListDataBlog()
        this.props.getListChuyenMuc()
    }

    onDeleteRow(_id) {
        let listId = _id;
        fetch(URL_AUTH_API + '/articles_delete', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listId)
        })
    }
    onDeleteProductSelected(row) {
        let listId = row.id;
        var txt;
        var r = confirm(`Bạn có muốn xoá blog này ?`);
        if (r == true) {
            this.props.deletePost(row.id).then(() => {
                this.loaddata()
            })

        }

    }
    onClickProductSelected(item) {
        // temp_time_up = '';
        this.showRow(item)
    }
    showRow(row) {
        this.props.changeRowEditPost(row)
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
    componentWillUnmount() {
        this.props.clearDataPost()
    }
    onRowSelect(e) {
        // this.setState({ _id: e._id })
    }
    AddNew() {
        this.props.openModalDetailPost(true)
    };
    downFile(item) {
        let fileName = item.title_slug
        fetch(`${Config.API_URL}articles/getfileapk?namefile=${fileName}`)
            .then(res => {
                console.log('res>>>>>>>', res.url);
                const link = document.createElement('downloadgame');
                link.href = res.url;
                link.setAttribute('download', fileName); //or any other extension
                link.click();
            })
        // this.props.downFileAPK(item)
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
        let { list_data, isOpen, listHeader } = this.props.blog
        return (
            <div style={{ "margin": "10px", "marginBottom": "50px", "height": "500px" }} >
                {isOpen
                    ?
                    <BlogDetailFormView parentObject={this} />
                    :
                    <ButtonAddNew parentObject={this} />
                }
                {!isOpen
                    ?
                    <div className="table-responsive" style={{ "marginTop": "10px" }}>
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
                                        let { id, thumbnail, title, tags, type_name, created_id, status, atr3 } = item
                                        return (
                                            <tr key={id}>
                                                <td><ComponentImage cell={thumbnail} /></td>
                                                <td>{title}</td>
                                                <td>{tags}</td>
                                                <td>{type_name}</td>
                                                <td>{created_id}</td>
                                                <td>{status}</td>
                                                <td>
                                                    <a href={`${Config.API_URL}articles/getfileapk?namefile=${item.title_slug}&mineType=${atr3}`}>
                                                        <i className="fa fa-download" aria-hidden="true"></i>
                                                    </a>
                                                </td>
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
    blog
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        blog
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...blogActions,
        getListChuyenMuc
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BlogFormView)

