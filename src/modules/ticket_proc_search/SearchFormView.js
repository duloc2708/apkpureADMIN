const { Translate, I18n } = ReactReduxI18n;
import * as toolbarActions from "modules/toolbar/actions/form";
import * as tickeProSearchActions from "modules/ticket_proc_search/actions/form";
import BrackcrumFromView from "modules/brackcrum/BrackcrumFromView";
class SearchFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            inputSearch: ""
        };
    }
    componentDidMount() {
        this.props.getListBagInAllTicketProc();
        KeyboardJS.bind('enter', (event) => {
            if ($('#input').is(':focus')) {
              this.props.getListBagInAllTicketProc();
            }
        })
    }
    _handleInput(e) {
      const { objSearch} = this.props.ticketProcSearch
      this.props.changeInputSearch({
        ...objSearch,
        [e.target.id]:e.target.value
      })
    }
    _onSearch(){
        this.props.getListBagInAllTicketProc();
    }
    _onClickRow(obj){
      window.open(`/ticket_proc?type=${obj.CodeProcess}&referId=${obj.CodeTicket}`, '_blank');
      console.log(obj)
    }
    render() {
        const { objSearch,list_data, listHeaderTable } = this.props.ticketProcSearch
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section>
                    <BrackcrumFromView
                        title={` `}
                    />
                    <div className="main__content">
                        <div className="form__personnal">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="form-group ">
                                        <div className="left">
                                            <label htmlFor="name">Tìm kiếm bag trong quy trình</label>
                                        </div>
                                        <div className="right">
                                            <input
                                                className="name form-control"
                                                value={objSearch.input}
                                                onChange={e => this._handleInput(e)}
                                                type="text"
                                                id="input"
                                            />
                                            <span className="wpcf-not-valid-tip wpcf-display-none"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <div
                                            className="left"
                                        onClick={() => this._onSearch()}
                                        >
                                            <button className="btn btn-primary">Tìm kiếm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CustomTable
                            idTable='tableListTurnInOut'
                            idBody='bodyListTurnInOut'
                            list_col={listHeaderTable} list_data={list_data} parentObject={this} />
                        <PagingTable type="product" parentObject={this} />
                    </div>
                </section>
            </div>
        );
    }
}

// lấy ALL dữ liệu từ các reducer
const mapStateToProps = (
    { userAuth, i18n, ticketProcSearch, toolbar, header },
    ownProps
) => {
    return {
        userAuth,
        i18n,
        ownProps,
        ticketProcSearch,
        toolbar,
        header
    };
};
const mapDispatchToProps = dispatch => {
    return Redux.bindActionCreators(
        {
            ...ReactRouterRedux.routerActions,
            ...toolbarActions,
            ...tickeProSearchActions
        },
        dispatch
    );
};
export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchFormView);
