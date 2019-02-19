class Double extends React.Component {
	shouldComponentUpdate (nextProps) { 
	return !Immutable.fromJS(nextProps).equals(Immutable.fromJS(this.props))
 }
	componentWillReceiveProps(nextProps) {
		const {oriOdds: oldData, lastAction} = this.props || {}
		const {oriOdds: nextData} = nextProps || {}
		const elem = $(ReactDOM.findDOMNode(this))
		let classAdd = null
		let classRemove = null
		switch(true){
			case (oldData > nextData 
				&& !_.isNull(oldData) 
				&& !_.isUndefined(oldData))://decrease
					classAdd = 'decrease'
					elem.addClass(classAdd)
					break
			case (oldData < nextData 
				&& !_.isNull(oldData) 
				&& !_.isUndefined(oldData)):
					classAdd = 'increase'
					elem.addClass(classAdd)
					break
			default:
					elem.addClass(classAdd)
					break
		}	
	}
	_onClickOdds(){
		let heightLeft = $(".market-container").outerHeight()+($('.tab-betSlip').outerHeight())/2
		$('body').scrollTop(heightLeft);
		$('body').scrollLeft(0);
	}
	render(){
		const {data, className} = this.props || {}
		return (
				<div className={`flex-1 odds ${className} pointer`} 
					onClick={event=>{
						this._onClickOdds()				
						if(this.props.onClick){
							return this.props.onClick()
						}											
					}}>
					{Helper._customOddView(data)}
				</div>
			)
	}
}
Double.propTypes = {
	data: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	oriOdds: PropTypes.number
}
module.exports =  Double