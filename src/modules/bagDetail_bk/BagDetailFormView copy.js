import * as bagDetailActions from 'modules/bagDetail/actions/form'
import { log } from 'util';
import { isBuffer } from 'util';
let { browserHistory } = ReactRouter
const { Translate, I18n } = ReactReduxI18n;
class BagDetailFormView extends React.Component {

    componentDidMount() {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var id = url.searchParams.get("idbag");
        var list_bag = id.split(',')
        list_bag.map(item => {
            if (item)
                this.props.getItemBagDetail(item)
        })
    }

    _onDown() {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var id = url.searchParams.get("idbag");
        id = id.substring(id, id.length - 1)
        // var list_bag = id.split(',')
        this.props.checkCodeExistsPrintBag(id).then(res => {
            let { data } = res
            console.log('checkCodeExistsPrintBag >>>>>>>>', data.data);

            if (data && data.data.length > 0) {
                let str_bag = ''
                data.data.map((item) => {
                    str_bag = str_bag + item.Id + ','
                })
                str_bag = str_bag.substring(str_bag, str_bag.length - 1)

                var txt;
                var r = confirm(`Bag (${str_bag}) đã được in, bạn có muốn tiếp tục in?`);
                if (r == true) {
                    this._output()
                }

            } else {
                this._output()
                this.props.updateStatusPrintBag(id)
            }

        })

        // var w = document.getElementById("bag_report").offsetWidth;
        // var h = document.getElementById("bag_report").offsetHeight;
        // html2canvas(document.getElementById("bag_report"), {
        //   dpi: 300, // Set to 300 DPI
        //   scale: 3, // Adjusts your resolution
        //   onrendered: function(canvas) {
        //     var img = canvas.toDataURL("image/jpeg", 1);
        //     var doc = new jsPDF('L', 'px', [w, h]);
        //     doc.addImage(img, 'JPEG', 0, 0, w, h);
        //     window.open(doc.output('bloburl'), '_blank');
        //   }
        // });
    }
    calculatePDF_height_width(selector, index) {
        page_section = $(selector).eq(index);
        HTML_Width = page_section.width();
        HTML_Height = page_section.height();
        top_left_margin = 15;
        PDF_Width = HTML_Width + (top_left_margin * 2);
        PDF_Height = (PDF_Width * 1.2) + (top_left_margin * 2);
        canvas_image_width = HTML_Width;
        canvas_image_height = HTML_Height;
    }
    generatePDF() {
        var pdf, page_section, HTML_Width, HTML_Height, top_left_margin, PDF_Width, PDF_Height, canvas_image_width, canvas_image_height;
        html2canvas($(".print-wrap:eq(0)")[0], {
            dpi: 300, // Set to 300 DPI
            scale: 3, // Adjusts your resolution
            onrendered: function (canvas) {
                page_section = $(".print-wrap").eq(0);
                HTML_Width = 200;
                HTML_Height = 160
                top_left_margin = 15;
                PDF_Width = 200
                PDF_Height = (PDF_Width * 1.2) + (top_left_margin * 2);
                canvas_image_width = HTML_Width;
                canvas_image_height = HTML_Height;
                var imgData = canvas.toDataURL("image/png", 1.0);
                pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'jpg', 5, 5, HTML_Width, HTML_Height);
            }
        });
        $('.print-wrap').each(function (i, obj) {
            if (i > 0) {
                html2canvas($(obj), {
                    dpi: 300, // Set to 300 DPI
                    scale: 3, // Adjusts your resolution
                    onrendered: function (canvas) {
                        page_section = $(obj)
                        // HTML_Width = page_section.width();
                        // HTML_Height = 500
                        // top_left_margin = 15;
                        // PDF_Width = HTML_Width + (top_left_margin * 2);

                        HTML_Width = 200;
                        HTML_Height = 160
                        top_left_margin = 15;
                        PDF_Width = 200
                        PDF_Height = (PDF_Width * 1.2) + (top_left_margin * 2);
                        canvas_image_width = HTML_Width;
                        canvas_image_height = HTML_Height;
                        var imgData = canvas.toDataURL("image/png", 1.0);
                        pdf.addPage('a4');
                        pdf.addImage(imgData, 'jpg', 5, 5, HTML_Width, HTML_Height);
                    }
                });
            }
        });

        setTimeout(() => {
            window.open(pdf.output('bloburl'), '_blank');
        }, 700)


    };
    _output() {
        // let doc = new jsPDF('p', 'mm', 'a5');
        // doc.addHTML(document.querySelector('#bag_report2'), function () {
        //     window.open(doc.output('bloburl'), '_blank');
        // });

        this.generatePDF()
        // html2canvas(document.getElementById("bag_report"), {
        //     dpi: 300, // Set to 300 DPI
        //     scale: 3, // Adjusts your resolution
        //     onrendered: function (canvas) {
        //         var imgData = canvas.toDataURL('image/png');
        //         var imgWidth = 210;
        //         var pageHeight = 295;
        //         var imgHeight = canvas.height * imgWidth / canvas.width;
        //         var heightLeft = imgHeight;

        //         var doc = new jsPDF('p', 'mm', 'a5');
        //         var position = 0;

        //         doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        //         heightLeft -= pageHeight;

        //         while (heightLeft >= 0) {
        //             position = heightLeft - imgHeight;
        //             doc.addPage();
        //             doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        //             heightLeft -= pageHeight;
        //         }
        //         window.open(doc.output('bloburl'), '_blank');
        //         // doc.save('file.pdf');
        //     }
        // });

        // var doc = new jsPDF('p', 'pt', 'a4');
        // var options = {
        //          pagesplit: true
        //     };

        // doc.addHTML($("#"), options, function()
        // {
        //     window.open(doc.output('bloburl'), '_blank');
        // });

    }

    _parseListStone(get_list_stone_detail) {
        let { list_stone_by_color } = this.props.bagDetail
        let arr_temp = []
        get_list_stone_detail.map((item) => {
            if (item.Total) {
                let listStoneSame = get_list_stone_detail.filter(x => x.Total == item.Total && x.IdProduct == item.IdProduct)
                if (arr_temp.filter(x => x.Total == item.Total && x.IdProduct == item.IdProduct).length == 0) {
                    let item_temp = item
                    let arr_color = []
                    arr_color.push({ Color: '001', Weight: 0, Weightperqty: 0 })
                    listStoneSame.map((item) => {
                        if (item.Color == '001') {
                            arr_color.map((item_arr_color) => {
                                if (item_arr_color.Color == '001') {
                                    item_arr_color.Weight = item.Weight
                                    item_arr_color.Weightperqty = item.Weight
                                }
                            })
                        }
                        arr_color.push({ Color: item.ordercolor, Weight: item.Weight, Weightperqty: item.Weightperqty })
                    })

                    list_stone_by_color.map((itemColor) => {
                        let check = arr_color.filter(x => x.Color == itemColor.ColorCode)
                        if (check.length == 0) {
                            arr_color.push({ Color: itemColor.ColorCode, Weight: 0, Weightperqty: 0 })
                        }
                    })
                    item_temp.arr_color = arr_color
                    arr_temp.push(item_temp)
                }
            }
        })
        return arr_temp
    }
    round(value, exp) {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    }

    render() {
        let { list_report_bag } = this.props.bagDetail
        let arr_data = [];
        let arr_data2 = [];
        list_report_bag && list_report_bag.map((item, i) => {
            let { listKey } = this.props.bagDetail
            let { Id, IdProduct, QtyCreated, IdOrder, Size, Type, Casting, Stone,
                TypeGold, Gamma, Custom, Image, Remark, DateCreated, nameMX, nameLH, nameLV, IdOdd } = item.itemDetail
            let arr_Casting = [], arr_stone = []
            if (Casting) {
                arr_Casting = Casting.split(',')
            }
            if (Stone) {
                arr_stone = Stone.split(',')
            }
            var IdProduct_temp = ''
            var IdProduct_temp2 = ''
            var ii = 0
            let get_list_stone_detail = this._parseListStone(item.get_list_stone_detail)
            var total2 = 0
            let arr_total_by_product = []
            let url_image = item.url_image
            let list_stone_by_color = item.list_stone_by_color
            arr_data.push(
                // <div style={{ "height": `${i != (list_report_bag.length - 1) ? "1020px" : "0px"}` }}>
                <table className="print-wrap" key={Id} style={{ "background": "white", "fontSize": "11px", "paddingBottom": "250px" }}  >
                    <tbody>
                        <tr>
                            {/*  */}
                            {/*  Bag common info */}
                            <td style={{ "border": "1px solid black", "verticalAlign": "top" }}>
                                <table style={{ "margin": "5px" }}>
                                    <tbody>
                                        <tr style={{ "fontSize": "12px" }}>
                                            <td colSpan="2">Bag No:<strong></strong> <div style={{ "border": "2px solid black", "display": "inline-block", "padding": "2px 20px" }}><strong>{Id}</strong></div></td>
                                            {/* <td><strong>Finish WK:</strong>0</td> */}
                                        </tr>
                                        <tr style={{ "fontSize": "12px" }}>
                                            <td>
                                                Item:<strong> {IdProduct} ({IdOdd})</strong>

                                            </td>
                                            <td> Qty:<strong> {QtyCreated}</strong></td>
                                            <td rowSpan="4">
                                                <img src={`data:image/jpeg;base64,${url_image}`} width="90" height="95" />
                                                {/* <img src={Image ? Config.API_URL_IMAGE + Image : "images/image-not-found.jpg"} width="120" height="120" />
                                           */}
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>
                                                Màu xi:<strong> {nameMX}</strong>
                                            </td>
                                            <td> Gold:<strong> {nameLV}</strong> </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Loại hội: <strong> {nameLH}</strong>
                                            </td>
                                            <td>Order No:<strong> {IdOrder}</strong> </td>
                                        </tr>
                                        <tr>
                                            <td style={{ "paddingRight": "5px", "width": "170px" }}>Size:
                                            <strong>
                                                    {Size}
                                                </strong>
                                            </td>
                                            <td style={{ "width": "130px" }}>Custom: <strong>{Custom} </strong></td>
                                        </tr>
                                        <tr>
                                            <td>Casting No:<strong></strong></td>
                                            <td>Ngày tạo: <strong>{moment(DateCreated).format('DD/MM/YYYY')}</strong></td>
                                        </tr>

                                        {/*  dynamically data as: components, moulds, stones */}
                                        <tr>
                                            <td colSpan="3">
                                                {arr_Casting.map((item, i) => {
                                                    return ([<span key={`casting_${i}`}>{item} </span>, <br />])
                                                })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="1" style={{ "width": "160px" }}>
                                                <span><strong></strong> </span><br />
                                                <span><strong>Stones:</strong> </span><br />

                                                {
                                                    get_list_stone_detail.map((item, i) => {
                                                        let arr = []
                                                        let check_temp = get_list_stone_detail.filter(x => x.IdProduct == item.IdProduct)
                                                        // if (IdProduct_temp && IdProduct_temp != item.IdProduct) {
                                                        //     arr.push([<span style={{ "fontWeight": "bold" }} key={`header_productùawa_${i}`}>{'Tổng theo màu'} </span>, <br />])
                                                        // }
                                                        let findNextProduct = get_list_stone_detail[i]
                                                        if (findNextProduct) {
                                                            if (IdProduct_temp && IdProduct_temp != findNextProduct.IdProduct) {
                                                                arr.push([<span key={`total_stone_${i}`}>{''} </span>, <br />])
                                                            }
                                                        }
                                                        if (IdProduct_temp != item.IdProduct) {
                                                            arr.push([<span style={{ "fontWeight": "bold" }} key={`header_product_${i}`}>{item.IdProduct} </span>, <br />])
                                                        }

                                                        if (item.Total != '') {
                                                            arr.push([<span key={`stone_${i}`}>{item.Total} </span>, <br />])
                                                        }
                                                        if (i == get_list_stone_detail.length - 1) {
                                                            arr.push([<span key={`total_stone_${i}`}>{''} </span>, <br />])
                                                        }
                                                        IdProduct_temp = item.IdProduct
                                                        return arr
                                                    })
                                                }
                                                <span><strong>&nbsp;</strong> </span>
                                            </td>

                                            {list_stone_by_color.length > 0 ?
                                                <td colSpan="2" >
                                                    <table  >
                                                        <thead>
                                                            <tr>
                                                                {
                                                                    list_stone_by_color && list_stone_by_color.map((item, i) => {
                                                                        return (
                                                                            <th key={`th_stone_${item.ColorCode}`}>{item.ColorName}</th>
                                                                        )
                                                                    })

                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                get_list_stone_detail.map((item2, ii) => {
                                                                    let arr = []
                                                                    let findNextProduct = get_list_stone_detail[ii]
                                                                    // if(item2.IdProduct!='005226'){
                                                                    // }
                                                                    if (findNextProduct) {
                                                                        if (IdProduct_temp2 && IdProduct_temp2 != findNextProduct.IdProduct) {
                                                                            arr.push(<tr style={{ "textAlign": "center" }} key={`tr_data_total_${item2.Weight}`}>
                                                                                {list_stone_by_color && list_stone_by_color.map((item, i) => {
                                                                                    let Weight_Temp = 0
                                                                                    arr_total_by_product.map((itemColor) => {
                                                                                        if (itemColor.Color == item.ColorCode) {
                                                                                            Weight_Temp = itemColor.Weightperqty
                                                                                        }
                                                                                    })
                                                                                    return (
                                                                                        ([<td key={`td_data_${ii}_${i}`} style={{ "fontWeight": "bold", "paddingLeft": "10px" }}>
                                                                                            {Weight_Temp && this.round(Weight_Temp, 4) || <span>&nbsp;</span>}
                                                                                            {Weight_Temp ? '/' + this.round(Weight_Temp / 0.0375, 1) : ''}
                                                                                        </td>])
                                                                                    )
                                                                                })}
                                                                            </tr>)
                                                                        }
                                                                    }

                                                                    if (IdProduct_temp2 != item2.IdProduct) {
                                                                        arr.push(<tr><td colSpan="10"><span>&nbsp;</span></td></tr>)
                                                                    }

                                                                    arr.push(<tr style={{ "textAlign": "center" }} key={`tr_data_${item2.Weight}`}>
                                                                        {list_stone_by_color && list_stone_by_color.map((item, i) => {
                                                                            let arr_temp = []
                                                                            let check_arr_total_by_product = arr_total_by_product.filter(x => x.IdProduct == item2.IdProduct)
                                                                            if (check_arr_total_by_product.length == 0) {
                                                                                item2.arr_color.map((itemColor) => {
                                                                                    arr_total_by_product.push({ IdProduct: item2.IdProduct, Color: itemColor.Color, Weight: 0, Weightperqty: 0 })
                                                                                })
                                                                            }

                                                                            item2.arr_color.map((itemColor) => {
                                                                                if (itemColor.Color == item.ColorCode) {

                                                                                    let Weight_Temp = 0
                                                                                    Weight_Temp = itemColor.Weightperqty
                                                                                    arr_temp.push(<td >{Weight_Temp && this.round(Weight_Temp, 4) || <span>&nbsp;</span>} </td>)
                                                                                    arr_total_by_product.map((item_arr_total) => {
                                                                                        if (item_arr_total.Color == itemColor.Color && item_arr_total.IdProduct == item2.IdProduct) {
                                                                                            item_arr_total.Weight = item_arr_total.Weight + itemColor.Weight
                                                                                            item_arr_total.Weightperqty = item_arr_total.Weightperqty + itemColor.Weightperqty
                                                                                        }
                                                                                    })
                                                                                    return
                                                                                }
                                                                            })
                                                                            return arr_temp
                                                                        })}
                                                                    </tr>)

                                                                    if (ii == get_list_stone_detail.length - 1) {
                                                                        arr.push(<tr style={{ "textAlign": "center" }} key={`tr_data_total_${item2.Weight}`}>
                                                                            {list_stone_by_color && list_stone_by_color.map((item, i) => {
                                                                                let Weight_Temp = 0
                                                                                arr_total_by_product.map((itemColor) => {
                                                                                    if (itemColor.Color == item.ColorCode && itemColor.IdProduct == item2.IdProduct) {
                                                                                        Weight_Temp = itemColor.Weightperqty
                                                                                    }
                                                                                })
                                                                                return (
                                                                                    ([<td key={`td_data_${ii}_${i}`} style={{ "fontWeight": "bold", "paddingLeft": "10px" }}>
                                                                                        {Weight_Temp && this.round(Weight_Temp, 4) || <span>&nbsp;</span>}
                                                                                        {Weight_Temp ? '/' + this.round(Weight_Temp / 0.0375, 1) : ''}                                                                                              </td>])
                                                                                )
                                                                            })}
                                                                        </tr>)
                                                                    }
                                                                    IdProduct_temp2 = item2.IdProduct
                                                                    return arr
                                                                })

                                                            }

                                                        </tbody>
                                                    </table>
                                                    {/* <span><strong>Stones:</strong> </span><br />
                                            {arr_stone.map((item, i) => {
                                                return ([<span key={`stone_${i}`}>{item} </span>, <br />])
                                            })} */}

                                                </td>
                                                : ''}
                                        </tr>
                                        <tr></tr>

                                        <tr>
                                            <td colSpan="3">
                                                <span><strong>Remark:</strong> </span><br />
                                                {/* <textarea cols="20" id="Remark" value={Remark} name="Remark" readOnly="readOnly" rows="2" style={{ "width": "320px" }}></textarea> */}
                                            </td>
                                        </tr>
                                        <tr>
                                            {/* <td colSpan="3"><strong>Process:</strong></td> */}
                                        </tr>
                                        <tr>
                                            <td colSpan="3" style={{ "textAlign": "center" }}>
                                                {/* <img src="/Content/Barcode/1815--025_036496.png" /> */}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            {/*  Bag processes */}
                            <td style={{ "border": "1px solid black", "verticalAlign": "top", "width": "270px", "fontSize": "10px" }}>
                                <table className="table head">
                                    <thead>
                                        <tr>
                                            <th className="normal-width">Description</th>
                                            <th className="small-width">Time</th>
                                            <th className="small-width">Worker ID</th>
                                            <th className="small-width">Weight IN</th>
                                            <th className="small-width">Date IN</th>
                                            <th className="small-width">Weight OUT</th>
                                            <th className="small-width">Date OUT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listKey.map((item, i) => {
                                            return (
                                                <tr key={`listKey_${i}`}>
                                                    <td>{item.key}</td>
                                                    <td>0</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </td>

                        </tr>
                    </tbody>
                </table>, <hr />

            )

        })





        return (
            <div className="container" style={{ "background": "white" }}>
                <section >
                    {/* <BrackcrumFromView /> */}
                    <div className="main__content bag_report" >
                        <fieldset>
                            <p style={{ "background": "white", "paddingLeft": "25px", "paddingTop": "25px" }} >
                                <a >
                                    <button onClick={browserHistory.goBack}>BACK</button>
                                </a>
                                <a style={{ "margin": "10px" }} >
                                    <button onClick={() => this._onDown()}>PRINT</button>
                                </a>
                            </p>
                            <div style={{ "background": "white", "paddingLeft": "25px", "paddingTop": "25px" }} id="bag_report">
                                {arr_data}
                            </div>

                            {/* <div  >
                                <div style={{ "background": "white", "paddingLeft": "25px", "paddingTop": "25px" }} id="bag_report2">
                                    {arr_data2}
                                </div>
                            </div> */}

                        </fieldset>
                    </div>
                </section>

            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    order,
    header,
    bag,
    bagDetail
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header,
        bag,
        bagDetail
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...bagDetailActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BagDetailFormView)
