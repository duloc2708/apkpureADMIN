const bgStyle = {
    backgroundColor: 'grey',
}

const withGreyBg = WrappedComponent => class NewComponent extends React.Component {
    render() {
        return (
            <div className='wrapper' style={bgStyle}>
                <WrappedComponent {...this.props} />
            </div>
        )
    }
}

const SmallCardWithGreyBg = withGreyBg(SmallCard);
const BigCardWithGreyBg = withGreyBg(BigCard);
const HugeCardWithGreyBg = withGreyBg(HugeCard);

class CardsDemo extends React.Component {
    render() {
        return (
            <div>
                <SmallCardWithGreyBg {...this.props} />
                <BigCardWithGreyBg {...this.props} />
                <HugeCardWithGreyBg {...this.props} />
            </div>

        )

    }
}
export default ReactRedux.connect(mapStateToProps, null)(DetailFormView)
