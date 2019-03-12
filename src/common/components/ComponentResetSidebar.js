
import { hide as hideResult } from 'modules/result/actions'
import { hide as hideAccount } from 'modules/account/actions'
import { hide as hideStatement } from 'modules/statement/actions'
import { hide as hideLivestream } from 'modules/livestream/actions'
import { hide as hideBetlist } from 'modules/betlist/actions'
import { hide as hideFavourite } from 'modules/slibar.favourite/actions'
import { hide as hideMessage } from 'modules/sidebar.message/actions'
import { toggleView } from 'modules/credit/actions'

class ComponentResetSidebar extends React.Component {
    shouldComponentUpdate (nextProps) { 
     return !Immutable.fromJS(nextProps).equals(Immutable.fromJS(this.props))
     }
    componentWillMount() {
        $(window).scrollTop(0)
        $('html').addClass(`no-scroll-popup-${this.props.type}`)
    }
    componentDidMount() {
        let { type } = this.props
        switch (type) {
            case 'message':
                this.props.hideStatement()
                this.props.hideResult()
                this.props.hideAccount()
                this.props.hideBetlist()
                this.props.hideLivestream()
                this.props.hideFavourite()
                this.props.toggleView('deposit', false)
                this.props.toggleView('withdraw', false)
                break;
            case 'myfavorite':
                this.props.hideStatement()
                this.props.hideResult()
                this.props.hideAccount()
                this.props.hideBetlist()
                this.props.hideLivestream()
                this.props.hideMessage()
                this.props.toggleView('deposit', false)
                this.props.toggleView('withdraw', false)
                break;
            case 'betlist':
                this.props.hideStatement()
                this.props.hideResult()
                this.props.hideAccount()
                this.props.hideLivestream()
                this.props.hideFavourite()
                this.props.hideMessage()
                this.props.toggleView('deposit', false)
                this.props.toggleView('withdraw', false)
                break;
            case 'account':
                this.props.hideStatement()
                this.props.hideResult()
                this.props.hideLivestream()
                this.props.hideBetlist()
                this.props.hideFavourite()
                this.props.hideMessage()
                this.props.toggleView('deposit', false)
                this.props.toggleView('withdraw', false)
                break;
            case 'statement':
                this.props.hideResult()
                this.props.hideAccount()
                this.props.hideLivestream()
                this.props.hideBetlist()
                this.props.hideFavourite()
                this.props.hideMessage()
                this.props.toggleView('deposit', false)
                this.props.toggleView('withdraw', false)
                break;
            case 'result':
                this.props.hideStatement()
                this.props.hideAccount()
                this.props.hideLivestream()
                this.props.hideBetlist()
                this.props.hideFavourite()
                this.props.hideMessage()
                this.props.toggleView('deposit', false)
                this.props.toggleView('withdraw', false)
                break;
            case 'livestream':
                this.props.hideStatement()
                this.props.hideResult()
                this.props.hideAccount()
                this.props.hideBetlist()
                this.props.hideFavourite()
                this.props.hideMessage()
                this.props.toggleView('deposit', false)
                this.props.toggleView('withdraw', false)
                break;
            case 'deposit':
                this.props.hideLivestream()
                this.props.hideStatement()
                this.props.hideResult()
                this.props.hideAccount()
                this.props.hideBetlist()
                this.props.hideFavourite()
                this.props.hideMessage()
                this.props.toggleView('withdraw', false)
                break;
            case 'withdraw':
                this.props.hideLivestream()
                this.props.hideStatement()
                this.props.hideResult()
                this.props.hideAccount()
                this.props.hideBetlist()
                this.props.hideFavourite()
                this.props.hideMessage()
                this.props.toggleView('deposit', false)
                break;
            default:

                break;
        }
    }
    componentWillUnmount() {
        $('html').removeClass(`no-scroll-popup-${this.props.type}`)
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        hideStatement,
        hideAccount,
        hideResult,
        hideLivestream,
        hideBetlist,
        hideFavourite,
        hideMessage, 
        toggleView, 
    }, dispatch)
}
module.exports = ReactRedux.connect(null, mapDispatchToProps)(ComponentResetSidebar)


