
class DetailFormView extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div className="main__content">
              detail
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    list,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...productsActions,
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DetailFormView)

