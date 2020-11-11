import * as modalLeagueActions from 'modules/modalLeague/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import { changeLeague } from 'modules/option/actions/form'
import { displayFavourite } from 'modules/myFavourite/actions/form'
const { Translate, I18n } = ReactReduxI18n
const { Map } = Immutable
class ModalLeagueFormView extends React.Component {
	constructor(props) {
		super(props);
		this.isDeSelectAll = false
		this.listId = []
	}
	componentDidMount() {
		this.props.getLeagues()
	}

	componentDidUpdate() {
		const {hostname} = window.location || {}
		const subDM = SportConfig._getSubdomain(hostname)
		if(subDM!=Config.SUBDOMAIN_ASIA){
			if (this.props.modal.modalLeague.isScroll)
				$("body").css({ overflow: 'auto' })
			else
				$("body").css({ overflow: 'hidden' })
			}
	}

	_onCancel() {
		// if (this.isDeSelectAll == true) {
		// 	this.props.changeSelectAll(true)
		// 	this.isDeSelectAll = false;
		// }
		// if (this.listId.length > 0) {
		// 	for (let i = 0; i < this.listId.length; i++) {
		// 		var item = this.listId[i]
		// 		this._changeSelect(item)
		// 	}
		// 	this.listId = []
		// }
		this.props.hideModal({ type: 'modalLeague' })
		this.props.UIUnblock()
	}
	_onGo() {
		this.props.hideModal({ type: 'modalLeague' })
		this.props.UIUnblock()
		const { selects } = this.props.modalLeague || {}
		this.props.changeLeague(selects)
		this.listId = []
		this.props.displayFavourite(false)//return menu sport
	}
	_changeSelect(leagueId) {
		this.props.changeSelect(leagueId)
	}
	componentWillUnmount() {
		this.props.changeSelectAll(true)
	}
	render() {
		const {
			leaguesSelect,
			selects
		} = this.props.modalLeague || {}
		let { isOpen } = this.props.modal.modalLeague
		const {hostname} = window.location || {}
        const subDM = SportConfig._getSubdomain(hostname)
		return (
			<div className={`modal modal-leaguge ${subDM!=Config.SUBDOMAIN_ASIA?'':'modal-betonline'}`} style={{ display: isOpen ? 'block' : 'none' }}>
				<div className="modal-content">
					<div className="modal-header">
						<a className="modal-close pointer" onClick={() => {
							this._onCancel()
						}}><i className="fa fa-remove"></i></a>
						<h4 className="modal-title">
							<Translate value="modalLeague.selectLeagues" />
						</h4>
					</div>
					<div className="modal-sub-header text-center">
						<a className="button" onClick={event => {
							this.props.changeSelectAll(true)
						}}>
							<Translate value="modalLeague.selectAll" />
						</a>&nbsp;&nbsp;
						<a className="button" onClick={event => {
							this.isDeSelectAll = true;
							this.props.changeSelectAll(false)
						}}><Translate value="modalLeague.deselectAll" /></a>
					</div>
					<div className="modal-body">
						<div>
							{leaguesSelect.map((league, iL) => {
								return (
									<div key={`league_${iL}`} className="modal-col">
										<div className="margin-bottom-10">
											<label className="checkbox">
												<input onClick={() => {
													let findIndex = _.findIndex(this.listId, (i) => {
														return i == league.id
													})
													if (findIndex == -1) {
														this.listId.push(league.id)
													}
													else {
														this.listId.splice(findIndex, 1)
													}
													this._changeSelect(league.id)
												}} type="checkbox" checked={selects.get(league.id) != false} className={selects.get(league.id) != false ? 'check' : 'uncheck'} />
												<span></span>
												<span>{league.name}</span>
											</label>
										</div>
									</div>
								)
							})}
							<div className="clear"></div>
						</div>
					</div>
					<div className="modal-footer">
						<div className="text-center">
							<a className="button button-accent min-width-200"
								onClick={
									event => {
										this._onCancel()
									}}>
								<Translate value="modalLeague.cancel" />
							</a>&nbsp;&nbsp;
							<a className="button button"
								style={{ width: '100px' }}
								onClick={event => {
									this._onGo()
								}}>
								<Translate value="modalLeague.go" />
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
const mapStateToProps = ({ modal, odds, menuSportMarket, modalLeague, i18n }) => {
	return {
		modal,
		odds,
		menuSportMarket,
		modalLeague,
		i18n
	}
}
const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...modalLeagueActions,
		...modalActions,
		...dimmerActions,
		changeLeague,
		displayFavourite
	}, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ModalLeagueFormView)
