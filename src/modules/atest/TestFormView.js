
        import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
        import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
        class TestFormView extends React.Component {
            render() {
                return (
                    <div className="container">
                       <section>
                        <BrackcrumFromView title="Quản lý danh mục" />
                        <div className="main__content">
                            <ToolbarFormView parentObject={this} />
                            <div className="form__personnal">
                            <div id={1} className="row item_data_1 row_data">
  <div className="col-md-4 col-1-0 col-list" id={0}>
    <div className="input-text form-group ">
      <div className="left">
        <label id="label-1-0" className="mytxt">
          {`label 1`}
        </label>
      </div>
      <div className="right">
        <input type="text" className="name form-control" defaultValue="" id="Code" name="Code" />
      </div>
      <div className="edit">
      </div>
    </div>
  </div>
  <div className="col-md-4 col-1-1 col-list" id={1}>
    <div className="input-text form-group ">
      <div className="left">
        <label id="label-1-1" className="mytxt">
          {`label 1`}
        </label>
      </div>
      <div className="right">
        <input type="text" className="name form-control" defaultValue="" id="Code" name="Code" />
      </div>
      <div className="edit">
      </div>
    </div>
  </div>
  <div className="col-md-4 col-1-2 col-list" id={2}>
    <div className="input-text form-group ">
      <div className="left">
        <label id="label-1-2" className="mytxt">
          {`label 1`}
        </label>
      </div>
      <div className="right">
        <input type="text" className="name form-control" defaultValue="" id="Code" name="Code" />
      </div>
      <div className="edit">
      </div>
    </div>
  </div>
</div>

                            </div>
                        </div>
                    </section>
                </div>
                )
            }
        }
        export default TestFormView