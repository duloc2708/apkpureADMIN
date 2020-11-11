
import * as createReportActions from 'modules/report.createReport/actions/form'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
const { Translate, I18n } = ReactReduxI18n;

import Modal from 'react-modal';
const customStyles = {
    content: {
        width: "50%",
        top: '52%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
Modal.setAppElement('#yourAppElement')
class ParamReportFormView extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        // this.props.getListDataReport()
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { objParams } = this.props.createReport
        let objParamsNew = _.clone(objParams, true)
        objParamsNew[id] = value
        this.props.updateInputItemParams(objParamsNew)
    }
    _changeStatus(status) {
        let { objParams } = this.props.createReport
        objParams["ISREQUIRE"] = status
        this.props.updateInputItemParams(objParams)
    }
    saveParams() {
        this.props.addListParams().then(res => {
            alert('Cập nhật thành công!')
        })
    }

    _handleInput(e) {
        let { id, value } = e.target
        let { objParams } = this.props.createReport
        objParams[id] = value
        this.props.updateInputItemParams(objParams)
    }
    _onAddParams() {
        let { objParams } = this.props.createReport
        if (objParams.FIELD) {
            this.props.addItemParams()
        } else {
            alert('Nhập dữ liệu đi...')

        }
    }
    closeModal() {
        this.props.clearParamsReport()
    }
    _onRemove(item) {
        this.props.removeParams(item)
    }
    _checkClickRow(item) {
        this.props.editRowsParams(item)
    }
    render() {
        const { list_data, objParams, isShow, listHeaderParams, listParams } = this.props.createReport
        const {
            FIELD,
            TEXT,
            FORMAT,
            SQL,
            ORDERBY,
            TYPE,
            ISREQUIRE,
            DATEVALUE
        } = objParams
        let sort_data = _.orderBy(listParams, 'ORDERBY', 'asc')
        return (
            <div >
                <AlertCustom onRef={ref => (this.child = ref)} />
                <Modal
                    isOpen={isShow}
                    // onAfterOpen={() => this.afterOpenModal()}
                    onRequestClose={() => this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <div className="left">
                                    <label htmlFor="name">Field</label>
                                </div>
                                <div className="right" >
                                    <input onChange={(e) => this._handleInput(e)}
                                        className="name form-control" value={FIELD} type="text" id="FIELD" name="FIELD" required="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <div className="left">
                                    <label htmlFor="name">Tên tham số</label>
                                </div>
                                <div className="right" >
                                    <input onChange={(e) => this._handleInput(e)}
                                        className="name form-control" value={TEXT} type="text" id="TEXT" name="TEXT" required="" />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <div className="left">
                                    <label htmlFor="name">Thứ tự</label>
                                </div>
                                <div className="right" >
                                    <input onChange={(e) => this._handleInput(e)}
                                        className="name form-control" value={ORDERBY} type="number" id="ORDERBY" name="ORDERBY" required="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <div className="left">
                                    <label htmlFor="name">Loại tham số</label>
                                </div>
                                <div className="right" >
                                    <Combobox type_code='DATATYPE' value={TYPE} id='TYPE' parentObject={this} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <div className="left">
                                    <label htmlFor="name">Format</label>
                                </div>
                                <div className="right" >
                                    <input onChange={(e) => this._handleInput(e)}
                                        className="name form-control" value={FORMAT} type="text" id="FORMAT" name="FORMAT" required="" />
                                </div>
                            </div>
                        </div>
                        {
                            TYPE == "DATETIME" ?
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <div className="left">
                                            <label htmlFor="name">Date value</label>
                                        </div>
                                        <div className="right" >
                                            <Combobox type_code='DATEVALUE' value={DATEVALUE} id='DATEVALUE' parentObject={this} />

                                        </div>
                                    </div>
                                </div>
                                : ''
                        }
                        <div className="col-md-3">
                            <div className="form-group">
                                <div className="left">
                                    <label htmlFor="name">Require</label>
                                </div>
                                <div className="right">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" ref="ISREQUIRE"
                                                checked={ISREQUIRE == 1 ? true : false}
                                                onChange={() => this._changeStatus(ISREQUIRE == 1 ? 0 : 1)}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        TYPE == 'LIST' ?
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <div className="left">
                                            <label htmlFor="name">SQL</label>
                                        </div>
                                        <div className="right" >
                                            <input onChange={(e) => this._handleInput(e)}
                                                className="name form-control" value={SQL} type="text" id="SQL" name="SQL" required="" />
                                        </div>
                                        <b>Example: {`SELECT code AS "code", name as "name" FROM OTHER_LIST WHERE type_code='DSM'`} </b>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <div className="left">
                                    <br />
                                </div>
                                <div className="right" >
                                    <button onClick={() => this._onAddParams()}>Thêm tham số</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <label>
                                        <input type="checkbox" checked={false} />
                                    </label>
                                </th>
                                {listHeaderParams.map((item, i) => {
                                    let { title, key } = item
                                    return (
                                        <th scope="col" key={'col' + i + key}>{title}</th>
                                    )
                                })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {sort_data && sort_data.map((item, i) => {
                                let { FIELD,
                                    TEXT,
                                    FORMAT,
                                    SQL,
                                    ORDERBY,
                                    TYPE,
                                    ISREQUIRE,
                                    DATEVALUE,
                                    checked
                                } = item
                                return (
                                    <tr key={`data_${i}`} >
                                        <th scope="row">
                                            <label>
                                                <input type="checkbox" checked={checked}
                                                    onChange={() => this._checkClickRow(item)}
                                                />
                                            </label>
                                        </th>
                                        <td>{FIELD}</td>
                                        <td>{TEXT}</td>
                                        <td>{TYPE}</td>
                                        <td>{DATEVALUE}</td>
                                        <td>{ORDERBY}</td>
                                        <td onClick={() => this._onRemove(item)}><button><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    <hr />
                    <div>
                        <div style={{ "textAlign": "right" }}>
                            <button onClick={() => this.saveParams()}>Lưu</button>
                            <button onClick={() => this.closeModal()}>Đóng</button>
                            {/* <button onClick={() => this._onArrowLeft()} ><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                            <button onClick={() => this._onArrowRight()}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                            <button onClick={() => this.saveStoneConfig()}>C.Hình đá</button>
                            <button onClick={() => this._onViewPrint()} >In bag</button>
                            <button onClick={() => this.saveBag()}>Lưu</button>
                            <button onClick={() => this.closeModal()}>Đóng</button> */}
                        </div>
                    </div>

                </Modal>
            </div >
        )
    }
}

const mapStateToProps = ({
    createReport,
    i18n
}, ownProps) => {
    return {
        createReport,
        i18n
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...createReportActions,
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ParamReportFormView)
