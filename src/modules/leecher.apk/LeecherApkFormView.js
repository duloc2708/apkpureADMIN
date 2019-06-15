import * as leecherActions from 'modules/leecher.apk/actions/form'
class LeecherApkFormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        }
    }
    componentWillUnmount() {
        this.props.resetLeech()
    }
    _onGetLink() {
        let { url } = this.props.leecherapk
        if (url) {
            this.props.getListGame()
        } else {
            alert('Vui lòng nhập url ...')
        }
    }
    _onChangeUrl(e) {
        this.props.changeUrl(e.target.value)
    }
    render() {
        let { url, isDisplay, data } = this.props.leecherapk
        let { title, content_long, atr4, type, title_slug } = data
        console.log('data>>>>>>', data);

        return (
            <div style={{ "margin": "10px", "marginBottom": "50px", "height": "500px" }} >
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group mb-3">
                            <input type="text" onChange={(e) => this._onChangeUrl(e)} className="form-control" placeholder="com.evozi.network or https://play.google.com/store/apps/details?id=" value={url} />
                            <div className="input-group-append">
                                <span onClick={() => this._onGetLink()} className="input-group-text">Submit</span>
                            </div>
                        </div>

                    </div>
                </div>
                {
                    isDisplay ?
                        <div className="row">
                            <div className="col-md-12">
                                <a target="_blank" href={`${Config.API_URL_USER + type + '/' + title_slug}`}>Xem chi tiết</a>
                            </div>
                        </div>
                        : ''
                }

                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <label>Tiêu đề</label>
                                <input type="text"
                                    className="form-control"
                                    defaultValue={title || ''}
                                    name="title"
                                    id="title"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}



const mapStateToProps = ({
    i18n
    , leecherapk
}, ownProps) => {
    return {
        i18n,
        leecherapk,
        ownProps
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...leecherActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LeecherApkFormView)


