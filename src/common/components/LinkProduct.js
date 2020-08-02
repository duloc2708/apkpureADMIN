class LinkProduct extends React.Component {
    onChange(id) {
        window.open(Routes.productDetail.view + '?idproduct=' + id, 'header', 'fullscreen="yes"', true)
        // this.props.push(Routes.productDetail.view + '?idproduct=' + id)
    }
    render() {
        let { id } = this.props
        return (
            <a onClick={() => this.onChange(id)}>{id}</a>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions
    }, dispatch)
}

module.exports = ReactRedux.connect(null, mapDispatchToProps)(LinkProduct) 
