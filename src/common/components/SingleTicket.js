const { I18n, Translate } = ReactReduxI18n || {}
class SingleTicket extends React.Component {
	shouldComponentUpdate (nextProps) { 
	return !Immutable.fromJS(nextProps).equals(Immutable.fromJS(this.props))
 }
	_onClose() {
		if (this.props.onClose) this.props.onClose()
	}
	_renderMarket() {
		const { data } = this.props || {}
		const sideOri = data.get('Side')
		const marketOri = data.get('Market')
		const marketText = Helper._mapMarketToText(parseInt(marketOri))
		const sideIgnoreMarket = Helper._getSideIgnoreMarket()
		switch (true) {
			case (sideIgnoreMarket.indexOf(parseInt(sideOri)) >= 0):
				return (<span />)
			default:
				return (
					<span className="market-title">
						(<Translate value={`left.betslip.ticket.${marketText}`} />)
						{/* ({I18n.t(`left.betslip.ticket.${marketText}`)}) */}
					</span>
				)
		}
	}
	_renderTeam() {
		const { data } = this.props || {}
		const team1 = data.getIn(['MatchNames', 0])
		const team2 = data.getIn(['MatchNames', 1])
		const sideOri = data.get('Side')
		switch (parseInt(sideOri)) {
			case 10:
				return (
					<div className="ticket__team__home">{team1}</div>
				)
			default:
				const teamNames = [
					<div key={`team1_${data.get('EventId')}`} className="ticket__team__home">{team1}</div>,
					<div key={`vs_${data.get('EventId')}`} className="ticket__team__vs">vs</div>,
					<div key={`team2_${data.get('EventId')}`} className="ticket__team__away">{team2}</div>
				]
				return teamNames
		}
	}
	_renderLine() {
		const { data } = this.props || {}
		const line = data.get('Line')
		const sideOri = data.get('Side')
		const sideIgnoreLine = Helper._getSideIgnoreLine()
		switch (true) {
			case (sideIgnoreLine.indexOf(parseInt(sideOri)) >= 0):
				return (<span />)
			default:
				return (<span className="point">{line}</span>)
		}
	}
	_renderScore() {
		const { data } = this.props || {}
		const status = data.get('Status')
		const team1Score = data.get('Team1Score')
		const team2Score = data.get('Team2Score')
		switch (parseInt(status)) {
			case 1:
				return (
					<span>[{team1Score} - {team2Score}]</span>
				)
				break
			default:
				return (<span className="hide" />)
		}
	}
	render() {
		const { data, isVirtualSports } = this.props || {}
		const start = moment(data.get('Start'), 'YYYY-MM-DD HH:mm:ss Z').format('MM/DD/YYYY HH:mm')
		const leagueName = data.get('LeagueName')
		const oddsTypeOri = data.get('OddType')
		const oddsValueOri = data.get('OddValue')
		const oddsEntry = data.get('OddsEntry')
		const sideOri = data.get('Side')
		const line = data.get('Line')
		const typeMap = Helper._mapSideToType(sideOri, parseInt(oddsEntry))
		const oddsTypeText = Helper._mapOddsTypeToText(typeMap)
		const oddsParsed = Helper._parseOddsEntry({			
			value: oddsValueOri,
			type: oddsTypeOri
		}, typeMap)
		const marketOri = data.get('Market')
		let sideSumm = Helper._mapSideToSumm(parseInt(sideOri))
		let teamBet = Helper._mapSideToTeam(parseInt(sideOri))
		// exist corners
		if (marketOri == 15) {
			sideSumm = 'F/L Corners'
			// replace no goal to no corners
			if (sideOri == 48) {
				teamBet = 'No Corner'
			}
		}

		if ([0, 1].indexOf(teamBet) >= 0) teamBet = data.getIn(['MatchNames', teamBet])
		const sportIcon = Helper._mapSportToIcon(data.get('SportId'), isVirtualSports)
		return (
			<div className="ticket">
				<div className="ticket__item">
					<a className="ticket__item__close"
						onClick={event => {
							this._onClose()
						}}>
						X
					</a>
					<div className="ticket__type">
						<i className={`${sportIcon} active`}></i>
						<span className="side-summary">
							<Translate value={`left.betslip.ticket.${sideSumm}`} />
							{/* {I18n.t(`left.betslip.ticket.${sideSumm}`)} */}
						</span>
						{this._renderMarket()}
					</div>
					<div className="ticket__team">
						{this._renderTeam()}
					</div>
					<div className={`${oddsParsed ?"odds-flash":""} ticket__odds `}>
						<span className="side"><Translate value={`left.betslip.ticket.${teamBet}`}/></span>
						{this._renderLine()}
						{this._renderScore()}
						<span className="symbol">@</span>
						<span className={`odds ${oddsParsed < 0 ? 'negative-number' : 'positive-number'}`}>{Helper._customOddView(oddsParsed)}</span>
						<span className="odds-type">({oddsTypeText})</span>
					</div>
					<div className="ticket__datetime">{start}</div>
					<div className="ticket__league">{leagueName}</div>
				</div>
			</div>
		)
	}
}
SingleTicket.propTypes = {
	data: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired
}
SingleTicket.defaultProps = {
	data: Immutable.fromJS({})
}
module.exports = SingleTicket