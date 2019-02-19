class App extends React.Component {
    componentDidMount() {
        Helper.DisableWebKeyboard()
    }
    
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
module.exports = App