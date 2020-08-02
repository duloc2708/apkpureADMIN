class Line extends React.Component {
    componentDidUpdate() {
        const value = this.props.value
        if (!_.isNull(value) &&
            !_.isUndefined(value) &&
            value > 0) {
            $(this.refs.themeOdds).addClass(SportConfig.theme.oddsPositive)
            $(this.refs.themeOdds).removeClass(SportConfig.theme.oddsNegative)
        } else {
            $(this.refs.themeOdds).addClass(SportConfig.theme.oddsNegative)
            $(this.refs.themeOdds).removeClass(SportConfig.theme.oddsPositive)
        }
    }
    componentDidMount() {
        const value = this.props.value
        if (!_.isNull(value) &&
            !_.isUndefined(value) &&
            value > 0) {
            $(this.refs.themeOdds).addClass(SportConfig.theme.oddsPositive)
            $(this.refs.themeOdds).removeClass(SportConfig.theme.oddsNegative)
        } else {
            $(this.refs.themeOdds).addClass(SportConfig.theme.oddsNegative)
            $(this.refs.themeOdds).removeClass(SportConfig.theme.oddsPositive)
        }
    }
    componentWillReceiveProps(nextProps) {
        const nextType = nextProps.type
        const currentType = this.props.type
        const lastAction = nextProps.lastAction
        const mapActionTypeToMarketEnum = {
            0: ['REFRESH_ODDS_TODAY', 'GET_ODDS_TODAY'],
            1: ['REFRESH_ODDS_LIVE', 'GET_ODDS_LIVE'],
            2: ['REFRESH_ODDS_EARLY','GET_ODDS_EARLY']
        }
        const mapTypeToClassChange = {
        	1: 'odds-change',
        	0: 'odds-change',
        	2: 'odds-change'
        }
            switch (true) {
                case (mapActionTypeToMarketEnum[nextType].indexOf(lastAction.type)>=0 &&
                    nextType == currentType):
                let currentValue = this.props.value
                let nextValue = nextProps.value
                    if (currentValue != nextValue &&
                        !_.isNull(currentValue) &&
                        !_.isUndefined(currentValue) &&
                        !_.isNull(nextValue) &&
                        !_.isUndefined(nextValue)) {
                        const current = $(this.refs.oddsChange)
                        $(this.refs.oddsChange).addClass(mapTypeToClassChange[nextType])
                        nextValue = parseFloat(nextValue)
                        currentValue = parseFloat(currentValue)
                        if (currentValue < nextValue) {
                            $(this.refs.iconOddsUpDown).removeClass('fa fa-caret-down text-red')
                            $(this.refs.iconOddsUpDown).addClass('fa fa-caret-up text-green')
                        } else if(this.props.value){
                            $(this.refs.iconOddsUpDown).removeClass('fa fa-caret-up text-green')
                            $(this.refs.iconOddsUpDown).addClass('fa fa-caret-down text-red')
                        }
                    } else {
                        $(this.refs.oddsChange).removeClass(mapTypeToClassChange[nextType])
                        $(this.refs.iconOddsUpDown).removeClass('fa fa-caret-up text-green')
                        $(this.refs.iconOddsUpDown).removeClass('fa fa-caret-down text-red')
                    }
                    break
                default:
                    break
            }
    }
    _onClick() {
        if (this.props &&
            this.props.onClick) {
            this.props.onClick()
        }
    }
    render() {
        const {type, className, value} = this.props || {}
        let newValue = value//SportConfig.function._roundSBO(value,2)
        return (
            <div ref="oddsChange" 
                 className={`td ${className} ${this.props.value<0?'text-red':''} 
                 ${(type==1 && !_.isNull(this.props.value) &&
                  !_.isUndefined(this.props.value)) ? 'odds-hover-live' : (!_.isNull(this.props.value) &&
                  !_.isUndefined(this.props.value)) ? 'odds-hover-today' : ''} pointer`} 
                 onClick={event=>{this._onClick()}}>
            	<a className="text-nowrap">
	            	{this.props.value ? `${newValue} ` : '' }
	            	<i ref="iconOddsUpDown"></i>
            	</a>
            </div>
        )
    }
}
module.exports = Line