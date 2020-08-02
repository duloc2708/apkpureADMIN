
import * as commonActions from 'modules/common/actions/form'

class PagingTable extends React.Component {
    _renderPage(page) {
        let data = [];
        let { totalPage, startPage, endPage } = this.props.common
        if (totalPage > 0) {
            for (var i = startPage; i <= endPage; i++) {
                data.push(<li key={`page_${i}`} className={`page-item ${i == page ? 'active' : ''}`}>
                    <a className={`page-link`} onClick={(e) => this.onChangePage(e)}>{i}</a>
                </li>);
            }
        }
        return data;
    }
    onChangePage(value) {
        this.props.ChangePage(parseInt(value.target.text))
        let { page, total } = this.props.common
        let params = {
            page: parseInt(value.target.text),
            total: total
        }
        this.props.parentObject._onChangePage({ params: params });

    }
    onNext() {
        let { type } = this.props
        this.props.onNextPageProduct(type).then(res => {
            let { page, total } = this.props.common
            let params = {
                page: page,
                total: total
            }
            this.props.parentObject._onNext({ params: params });
        })
    }
    onPrevious() {
        let { type } = this.props
        this.props.onPreviousPageProduct(type).then(res => {
            let { page, total } = this.props.common
            let params = {
                page: page,
                total: total
            }
            this.props.parentObject._onPrevious({ params: params });
        })
    }
    render() {
        let { page, totalPage } = this.props.common

        return (
            <div className="list__pagination">
                {
                    totalPage > 0 ?
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <a onClick={() => this.onPrevious()} className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                {
                                    this._renderPage(page)
                                }
                                <li className="page-item">
                                    <a className="page-link" onClick={() => this.onNext()} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        : ''
                }
            </div>
        )
    }
}
const mapStateToProps = ({
    i18n,
    common
}, ownProps) => {
    return {
        i18n,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...commonActions
    }, dispatch)
}
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PagingTable)


