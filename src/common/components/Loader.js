class Loader extends React.Component{
	shouldComponentUpdate (nextProps) { 
	return !Immutable.fromJS(nextProps).equals(Immutable.fromJS(this.props))
 }
	render(){
		const {loading, className,color,size} = this.props || {}
		return (
			<div className={`loading-container ${className} ${loading ? 'active' : ''}`}>
				<div className={`loading-dots ${color} ${size}`}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			)
	}
}
Loader.propTypes = {
	loading: PropTypes.bool.isRequired,
	className: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.string
}
Loader.defaultProps = {
	loading: false,
	className: '',
	color:'',
	size:''
}
module.exports = Loader