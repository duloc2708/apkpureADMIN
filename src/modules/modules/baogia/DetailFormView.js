import ComponentDetail from './ComponentDetail';
class DetailFormView extends React.Component {
    render() {
        let { isSave } = this.props
        return (
            
            <div className="main__content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="main__content__right">
                            <ComponentDetail/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    order,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header
    }
}
export default ReactRedux.connect(mapStateToProps, null)(DetailFormView)
