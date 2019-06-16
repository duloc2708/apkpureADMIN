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
        let { url, isSearch } = this.props.leecherapk
        if (isSearch) {
            alert('Đang tìm ...')
        } else {
            if (url.indexOf('http') != -1) {
                var urlNew = new URL(url);
                var c = urlNew.searchParams.get("id");
                if (c) {
                    this.props.getListGame(c)
                } else {
                    alert('Id game không tồn tại')
                }
            } else {
                this.props.getListGame()
            }
        }

    }
    _onChangeUrl(e) {
        this.props.changeUrl(e.target.value)
    }
    render() {
        let { url, isDisplay, data, isSearch } = this.props.leecherapk
        let { title, content_long, atr4, type, title_slug } = data
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
                            {isSearch ?
                                <div className="col-md-12">
                                    <label>Searching and downloading APK...<br />It may take up to 3 minutes, depending on file size</label>
                                </div>
                                : ''
                            }
                            {data.status == 'error' && !isSearch ?
                                <div className="col-md-12">
                                    {data && data.data && data && data.data.indexOf('Invalid URL / Package Name') != -1 ?
                                        'The requested app is not found or invalid. Please make sure the app exist on Play Store' :
                                        <label>{data && data.data}</label>
                                    }
                                </div>
                                : ''
                            }
                            {data.status == 'success' && !isSearch ?
                                <div className="col-md-12">
                                    url:  <a href={data.url}>{data.url}</a><br />
                                    <label>filesize: {data.filesize}</label><br />
                                    <label>version: {data.version}</label>
                                </div>
                                : ''
                            }

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


