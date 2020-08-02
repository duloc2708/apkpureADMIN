class ConfigKeyCode extends React.Component {
  componentDidMount() {
    let that = this;
    $(document).keydown(function(e) {
      let value = "";
      if (e.altKey) {
        switch (e.keyCode) {
          case 78:
            value = "ALT_N";
            break;
          case 69:
            value = "ALT_E";
            break;
          case 83:
            value = "ALT_S";
            break;
          case 88:
            value = "ALT_X";
            break;
          case 40:
            value = "ALT_DOWN";
            break;
          case 38:
            value = "ALT_UP";
            break;
          case 68:
            value = "ALT_D";
            break;
          case 67:
            value = "ALT_C";
            break;
          default:
            break;
        }
      }
      if (e.ctrlKey) {
        switch (e.keyCode) {
          case 13:
            value = "CTRL_ENTER";
            break;
          default:
            break;
        }
      }
      if (value) {
        that.props.parentObject.changeKeyCode(value, e);
      }
    });
  }

  render() {
    return <div style={{ display: "none" }}></div>;
  }
}

module.exports = ConfigKeyCode;
