import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
class ButtonAddNew extends React.Component {
  render() {
    return (
      <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
        <button type='button'
          className={`btn btn-primary`} onClick={() => this.props.parentObject.AddNew()}>
          Thêm mới
  </button>
      </ButtonGroup>
    )
  }
}
module.exports = ButtonAddNew
