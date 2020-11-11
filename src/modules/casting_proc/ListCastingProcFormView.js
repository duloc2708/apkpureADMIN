
import * as castingProcActions from 'modules/casting_proc/actions/form'

class ListCastingProcFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            codeProduct: ''
        }
    }
    componentDidMount() {
        let { page, total } = this.props.common
        let params = {
            page: page,
            total: total
        }
        this.props.getListDataCastingProc(params)
        KeyboardJS.bind('enter', (event) => {
            if ($('#codeProduct').is(':focus')) {
                this._onSearch()
            }
        })

        // // get list type
        // let list = ['CLSP', 'KC', 'DSM', 'LV', 'UNIT']
        // this.props.getListTypeByListCode(list)
    }
    _onSearch() {
        // this.props.resetInfoPage().then(() => {
        //     this.props.getListDataProductsBySearch(this.refs.codeProduct && this.refs.codeProduct.value || '')
        // })
    }
    render() {
        let { list_data, listHeaderTable } = this.props.casting_proc
        return (
            <div >
                <div className="form__personnal">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group ">
                                <div className="left">
                                    <label htmlFor="name">Mã / tên sản phẩm</label>
                                </div>
                                <div className="right">
                                    <input className="name form-control"
                                        value={this.state.codeProduct}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="codeProduct"
                                        id="codeProduct"
                                        name="codeProduct" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <div className="left"
                                // onClick={() => this._onSearch()}
                                >
                                    <button className="btn btn-primary">Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                <label>
                                    <input type="checkbox" 
                                    //onChange={() => this._checkAllRow(allChecked)}
                                    />
                                </label>
                            </th>
                            {
                                listHeaderTable.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <th></th>
                            {
                                listHeaderTable.map((item, i) => {
                                    let { key, type } = item
                                    return (
                                        <td key={`thead_${key}`}>
                                            <input className="name form-control" type={type} id={key} name="name" required="" />
                                        </td>
                                    )
                                })
                            }
                        </tr> */}
                        {list_data && list_data.map((item, i) => {
                            // let { Id, IdOdd, Price, status, checked, Name, Image, NameCLSP, Weight, WeightReal } = item
                            return (
                                <tr key={`data_${i}`}
                                // onDoubleClick={() => this._onClickRowDouble(item, !checked)}
                                >
                                </tr>)
                        })}
                    </tbody>
                </table>
                <PagingTable type="product" parentObject={this} />
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    common,
    casting_proc
}, ownProps) => {
    return {
        userAuth,
        i18n,
        common,
        ownProps,
        casting_proc
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...castingProcActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListCastingProcFormView)

