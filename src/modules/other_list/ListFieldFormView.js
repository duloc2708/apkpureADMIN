import * as otherListActions from "modules/other_list/actions/form";
class ListFieldFormView extends React.Component {
  handleInput(e) {
    let { id, value } = e.target;
    let objData = {};
    objData.value = value;
    objData.key = id;
    this.props.updateInputOtherList(objData);
  }
  render() {
    let { listField } = this.props.other_list;
    return (
      <div className="PostFeed">
        <div className="panel panel-default">
          <div className="panel-heading">Thông tin chung</div>
          <div className="panel-body">
            <form id="form_articles">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="row">
                      {listField.length > 0 &&
                        listField.map(item => {
                          const { value, type, label, code } = item;
                          return (
                            <div className="col-md-3" key={code}>
                              <label>{label}</label>
                              <input
                                type={`${type}`}
                                className="form-control"
                                value={value}
                                onChange={event => this.handleInput(event)}
                                name={`${code}`}
                                id={`${code}`}
                                ref={`${code}`}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userAuth, i18n, other_list }, ownProps) => {
  return {
    userAuth,
    i18n,
    ownProps,
    other_list
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...otherListActions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ListFieldFormView);
