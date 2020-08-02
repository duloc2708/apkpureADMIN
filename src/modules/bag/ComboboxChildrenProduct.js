class ComboboxChildrenProduct extends React.Component {
    _onChange(e) {
        let { data, value, IdProductParent } = this.props
        this.props.parentObject.ChangeValueComboboxIdProductChildren(JSON.parse(e.target.value));
    }
    render() {
        let { data, value, IdProduct, Color,disable } = this.props
        data = data.map((item) => {
            item.Color = Color
            return item
        })        
        return (
            <select disabled={disable}  onChange={(e) => this._onChange(e)}>
                {data.map((item, i) => {
                    return (
                        <option value={JSON.stringify(item)} key={`IdProductChildren_${i}`}>{item && item.IdProductChildren || ''}</option>
                    )
                })}
            </select>
        )
    }
}
export default ComboboxChildrenProduct