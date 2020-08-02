import { resetListImage, updateAllCheckData, updateCodeObjSearch, getListImage, updateScroll, checkImage, exportListProducts, getListDataBaoGiaInImage } from 'modules/listimage/actions/form'
import LoaderData from 'react-loader-advanced';

class ListImageFormView extends React.Component {
  constructor() {
    super()
    this.state = {
      codeProduct: ''
    }
  }
  _onSearch() {
    this.props.getListImage(this.refs.code_image && this.refs.code_image.value || '')
  }
  componentDidMount() {
    this.props.getListImage()
    this.props.getListDataBaoGiaInImage()
    let that = this
    $(window).scroll(function () {
      var wintop = $(window).scrollTop(),
        docheight = $(document).height(),
        winheight = $(window).height();
      var scrolltrigger = 0.95;
      if ((wintop / (docheight - winheight)) > scrolltrigger) {
        let { isLoad, totalRecord, list_data } = that.props.listimage
        if (!isLoad && list_data.length != totalRecord) {
          that.props.updateScroll().then(() => {
            that._onSearch()
          })
        }
      }
    });
    KeyboardJS.bind('enter', (event) => {
      if ($('#code_image').is(':focus')) {
        this._onSearch()
      }
    })
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.listimage.list_data.length !== this.props.listimage.list_data.length) {
  //     return true;
  //   } ̰
  //   return false;
  // }
  checkImage(item, status) {
    this.props.checkImage(item, status)
  }
  _onExportData() {
    let { list_data } = this.props.listimage
    let checkData = list_data.filter(x => x.checked == true)
    if (checkData.length > 0) {
      this.props.exportListProducts()
    } else {
      alert('Vui lòng chọn sản phẩm!')
    }
  }
  _parseDataComboBaoGia(data) {
    let arr_data = []
    data.map((item) => {
      let { Pricename, Pricecode } = item
      arr_data.push({ value: Pricecode, code: Pricecode, label: Pricename, name: Pricename })

    })
    return arr_data;
  }
  ChangeValueCombobox(obj) {
    let { id, value } = obj
    let { objSearch } = this.props.listimage
    let objSearchTemp = _.clone(objSearch, true)
    objSearchTemp[id] = value
    this.props.updateCodeObjSearch(objSearchTemp).then(() => {
        this.props.resetListImage().then(() => {
          this.props.getListImage(this.refs.code_image && this.refs.code_image.value || '')
        })
    })

  }
  _onChangeAll(value) {
    let { objSearch } = this.props.listimage
    let objSearchTemp = _.clone(objSearch, true)
    objSearchTemp["IsAll"] = value
    this.props.updateCodeObjSearch(objSearchTemp)
    this.props.updateAllCheckData(value)
  }
  _onChangeInput(e) {
    let { objSearch } = this.props.listimage
    let objSearchTemp = _.clone(objSearch, true)
    objSearchTemp["Key"] = e.target.value
    this.props.updateCodeObjSearch(objSearchTemp)
  }
  render() {
    let { list_data, isLoad, list_data_baogia,
      objSearch: { CodeBaoGia, IsAll, Key, Top }, listTop } = this.props.listimage
    let list_data_baogia_parse = this._parseDataComboBaoGia(list_data_baogia)
    return (
      <div className="listimage" >
        <section className="row recent_uploads">
          <div>
            <div className="row title_row"><h3>Tra cứu sản phẩm</h3>
              <div className="form__personnal">
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group ">
                      <div className="left">
                        <label htmlFor="name">Mã sản phẩm</label>
                      </div>
                      <div className="right">
                        <input className="name form-control"
                          onChange={(e) => this._onChangeInput(e)}
                          type="text"
                          ref="code_image"
                          id="code_image"
                          value={Key}
                          name="code_image" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group ">
                      <div className="left">
                        <label htmlFor="name">Bảng giá</label>
                      </div>
                      <div className="right">
                        {list_data_baogia_parse.length > 0 ? <Combobox data_order={list_data_baogia_parse} type_code='CodeBaoGia' id='CodeBaoGia' value={CodeBaoGia} parentObject={this} /> : ''}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group ">
                      <div className="left">
                        <label htmlFor="name">Top 100 sản phẩm bán chạy </label>
                      </div>
                      <div className="right">
                        <Combobox data_order={listTop} type_code='Top' id='Top' value={Top} parentObject={this} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <div className="left">
                        <label htmlFor="name"></label>
                      </div>
                      <div className="right"  >
                        <input type="checkbox" checked={IsAll} onChange={() => this._onChangeAll(!IsAll)} />
                        <b style={{ "marignTop": "5px" }}>Xuất tất cả</b>
                        <button onClick={() => this._onSearch()} style={{ "marginLeft": "10px" }} className="btn btn-primary" >Tìm kiếm</button>
                        <button onClick={() => this._onExportData()} style={{ "marginLeft": "10px" }} className="btn btn-primary" >Xuất file</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <LoaderData show={isLoad} message={'Đang tải dữ liệu ...'}> */}
            <div style={{ "marginLeft": "0px" }} className="row media-grid content_video_posts">
              {
                list_data.map((item, i) => {
                  let { Image, Id, Weight, Price, checked } = item
                  let filename = Image ? 'http://61.28.230.226:3000/' + Image : "images/image-not-found.jpg"
                  return (
                    <article style={{ "pointerEvents": `auto` }} onClick={() => this.checkImage(item, !checked)} key={`image_${i}`} className="col-sm-3 video_post postType3">
                      <div className="inner row m0">
                        <a>
                          <div className="row screencast m0">
                            <img src={filename} alt={Id} className="cast img-responsive" />
                            {/* <i className="fa fa-check top-right" aria-hidden="true"></i> */}
                            <input checked={checked ? true : false} type="checkbox" className="top-right" />
                            <div className="play_btn" /></div>
                        </a>
                        <p>Mã sản phẩm: <b>{Id}</b></p>
                        <p>Trọng lượng: <b>{Helper.roundNumber(Weight, 4)}</b></p>
                        {/* <p>Giá: <b>{SportConfig.function._formatMoney(Price || 0)}</b></p> */}
                      </div>
                    </article>
                  )
                })
              }
            </div>
            {/* </LoaderData> */}
          </div>
          <div className="load-more-image"></div>
        </section>

      </div>
    )
  }
}
const mapStateToProps = ({
  userAuth,
  i18n,
  listimage
}, ownProps) => {
  return {
    userAuth,
    i18n,
    listimage
  }
}
const mapDispatchToProps = (dispatch) => {
  return Redux.bindActionCreators({
    ...ReactRouterRedux.routerActions,
    getListImage,
    updateScroll,
    checkImage,
    exportListProducts,
    getListDataBaoGiaInImage,
    updateCodeObjSearch,
    updateAllCheckData,
    resetListImage
  }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListImageFormView)