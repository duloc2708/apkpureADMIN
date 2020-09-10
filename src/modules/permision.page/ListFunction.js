import * as permisionActions from 'modules/permision.page/actions/form'
const { Translate, I18n } = ReactReduxI18n;
class ListFunction extends React.Component {
    componentDidMount() {
        this.props.getListFunction()
    }
    _onClickRow(item, checked) {
        let { itemUser } = this.props.permision
        if (itemUser && itemUser.username) {
            this.props.saveListFunction(item, checked)
        }
    }
    _onChangeStatusBtnDefault(itemFunc, codeBtn, status) {
        let { itemUser } = this.props.permision
        if (itemUser && itemUser.username) {
            this.props.saveListButton(itemFunc, codeBtn, status)
        }
    }
    _onChangeStatusBtnByPage(itemFunc, codeBtn, status) {
        let { itemUser } = this.props.permision
        if (itemUser && itemUser.username) {
            this.props.saveListButtonByPage(itemFunc, codeBtn, status)
        }
    }
    _onChangeStatusBtnDefaultAll(itemFunc, status) {
        let { itemUser } = this.props.permision
        if (itemUser && itemUser.username) {
            this.props.saveListButtonAll(itemFunc, status)
        }
    }
    render() {
        let { list_user, listHeaderFunction, list_function, list_btncustom_by_page } = this.props.permision
        let { listButton, listBtnReport } = this.props.toolbar
        // console.log(list_btncustom_by_page, list_function)
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderFunction.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })
                            }
                            {
                                listButton.map((item, i) => {
                                    let { code, name } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${code}`} scope="col">{name}</th>
                                    )
                                })
                            }
                            <th style={{ "textAlign": "left" }} key={`thead_${`list`}`} scope="col">{'Danh sách nút theo chức năng'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list_function && list_function.map((item, i) => {
                            let { name, checked, list_button, code, checkedAll, list_action, funcname, strListAction } = item
                            let list_btncustom =list_btncustom_by_page.filter(x => x.page == code)[0] && list_btncustom_by_page.filter(x => x.page == code)[0].listbtn || [];
                            return (
                                <tr key={`data_${i}`}>
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td width="120px">{name}</td>
                                    <td width="50px">
                                        <input class="pointer" type="checkbox" checked={checkedAll}
                                            onChange={() => this._onChangeStatusBtnDefaultAll(item, !checkedAll)}
                                        />
                                    </td>
                                    {
                                        list_button && list_button.length > 0 ? list_button.map(itemBtn => {
                                            return (
                                                <td key={`btn_${code}_${itemBtn.name}`}> <input class="pointer" type="checkbox" name={itemBtn.name} checked={itemBtn.status} onChange={() => this._onChangeStatusBtnDefault(item, itemBtn.name, !itemBtn.status)} /></td>
                                            )
                                        })
                                            : <td><span></span></td>
                                    }
                                    <td>
                                        <span className="list label-new">
                                            <ul className="ngc">
                                                {list_btncustom.length> 0 && list_btncustom.map((itemBtnPage, i) => {
                                                    let checkExits = false
                                                    if (strListAction && strListAction.indexOf(itemBtnPage.code) != -1) {
                                                        checkExits = true
                                                    }
                                                    return (
                                                        <li key={`btn_page_${i}`}>
                                                            <input onChange={() => this._onChangeStatusBtnByPage(item, itemBtnPage.code, !checkExits)}
                                                                checked={checkExits} className="any" id="any" name="any" type="checkbox" />
                                                            <label style={{ "margin-left": "5px" }} id="any" htmlFor="any">{itemBtnPage.name}</label>
                                                        </li>
                                                    )
                                                })
                                                }
                                            </ul>
                                        </span>
                                    </td>
                                </tr>)
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    permision,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        permision,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...permisionActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListFunction)
