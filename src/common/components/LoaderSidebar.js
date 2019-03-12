class LoaderSidebar extends React.Component {
    shouldComponentUpdate (nextProps) { 
 return !Immutable.fromJS(nextProps).equals(Immutable.fromJS(this.props))
 }
    render() {
        const { loading, className, size, style } = this.props || {}
        return (
            <div style={style} className={`dimmer ${className} ${loading ? 'active' : ''}`}>
                <div className="dimmer__content ">
                    <div className={`loading-image ${size ? size : ''}`}></div>
                </div>
            </div>
        )
    }
}
LoaderSidebar.propTypes = {
    loading: PropTypes.bool.isRequired,
    className: PropTypes.string
}
LoaderSidebar.defaultProps = {
    loading: false,
    className: ''
}
module.exports = LoaderSidebar