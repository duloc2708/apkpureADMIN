import HeaderFormView from 'modules/header/HeaderFormView'

class ToolbarFormView extends React.Component {
    getName() {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var code = url.searchParams.get("code");
        let { list } = this.props.header
        let name
        if (list) {
            name = list.find(x => x.code === code && code.toUpperCase() || '')
        }
        return name
    }
    render() {
        let item = this.getName()
        let { title } = this.props
        return (
            <div className="brackcrum">
                {title ? title + ' ' : 'Danh mục '}
                {title ? ' ' : <span>
                    <i className="fa fa-angle-double-right" aria-hidden="true">
                    </i>
                </span>}

                {item && item.name || ''}
            </div>

        )
    }
}
const mapStateToProps = ({
    header,
    i18n
}, ownProps) => {
    return {
        header,
        i18n
    }
}

export default ReactRedux.connect(mapStateToProps, null)(ToolbarFormView)
