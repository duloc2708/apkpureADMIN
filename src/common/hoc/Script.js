const ScriptParams = (LoadScripts) => {
	return ComposedComponent => {
		class Script extends React.Component{
			constructor(){
				super();
				this.state = {
					isLoaded: false
				}
			}
			componentDidMount(){
				LoadScripts().then(() => {
					this.setState({
						isLoaded: true
					});
				});
			}
			componentWillUnmount(){
				this.state = {
					isLoaded: false
				}
			}
			render(){
				const newProps = {
					isLoaded: this.state.isLoaded
				}
				return <ComposedComponent {...this.props} {...newProps}/>
			}
		};

		return Script;
	};
};

module.exports = ScriptParams;