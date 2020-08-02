import {
  BootstrapTable,
  TableHeaderColumn,
  ButtonGroup
} from "react-bootstrap-table";

class Toolbar extends React.Component {
  _onChangeButton(value) {
    this.props.parentObject.ChangeButtonToolbar(value);
  }
  render() {
    const { listButton } = this.props.toolbar;
    return (
      <div>
        {listButton.map(item => {
          return (
            <React.Fragment key={`button_${item.key}`}>
              <button
                disabled={item.status}
                type="button"
                className={item.class}
                onClick={() => this._onChangeButton(item)}
              >
                <i className={item.icon} aria-hidden="true"></i>
                {item.name}
              </button>
              &nbsp;
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ i18n, toolbar }, ownProps) => {
  return {
    i18n,
    ownProps,
    toolbar
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions
    },
    dispatch
  );
};
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Toolbar);
