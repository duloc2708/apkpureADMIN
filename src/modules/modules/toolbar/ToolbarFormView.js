import * as toolbarActions from 'modules/toolbar/actions/form'
class ToolbarFormView extends React.Component {
    _onChangeButton(value) {
        let { is_save } = this.props.toolbar
        this.props.parentObject.ChangeButton(value);
    }
    render() {
        let { listButton , listBtnReport} = this.props.toolbar
        let { isReport } = this.props        
        return (
            <div className="list__function">
                <ul className="list-unstyled">
                    {isReport ?
                        listBtnReport.map((item, i) => {
                            let { code, name, classBtn, status } = item
                            return (
                                <li key={i}>
                                    <a className={status} onClick={() => this._onChangeButton(code)}><span><i className={classBtn} aria-hidden="true"></i></span>{name}</a>
                                </li>
                            )
                        })
                        :
                        listButton.map((item, i) => {
                            let { code, name, classBtn, status } = item
                            return (
                                <li key={i}>
                                    <a className={status} onClick={() => this._onChangeButton(code)}><span><i className={classBtn} aria-hidden="true"></i></span>{name}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    toolbar,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        toolbar,
        header
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...toolbarActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ToolbarFormView)
