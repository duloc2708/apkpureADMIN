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
        let numGen = Helper.generateUUIDV4()
        let list_bag_temp = []
        list_bag.map((item) => {
            if (item)
                list_bag_temp.push(item)
        })
        if (list_bag_temp.length > 0) {
            this.props.insertListIdBagTemp(numGen, list_bag_temp).then(() => {
                this.props.getItemBagDetailByListId(numGen, list_bag_temp).then(() => {
                    this.props.deleteListBagId(numGen)
                })
            })
        }
        // list_bag.map(item => {
        //     if (item)
        //         this.props.getItemBagDetail(item)
        // })
    }


    _onDown(type) {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var id = url.searchParams.get("idbag");
        id = id.substring(id, id.length - 1)

        // var list_bag = id.split(',')
        this.props.checkCodeExistsPrintBag(id).then(res => {
            let { data } = res
            if (data && data.data.length > 0) {
                let str_bag = ''
                data.data.map((item) => {
                    str_bag = str_bag + item.Id + ','
                })
                str_bag = str_bag.substring(str_bag, str_bag.length - 1)

                //var txt;
                //var r = confirm(`Bag (${str_bag}) đã được in, bạn có muốn tiếp tục in?`);
                // if (r == true) {
                //     this._output(type)
                // }
                this._output(type)
            } else {
                this._output(type)
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
        top_left_margin = 0;
        // PDF_Width = HTML_Width + (top_left_margin * 2);
        // PDF_Height = (PDF_Width * 1.2) + (top_left_margin * 2);
        // canvas_image_width = HTML_Width;
        // canvas_image_height = HTML_Height;
    }

    generatePDF(type_print) {
        var pdf, page_section, HTML_Width, HTML_Height, top_left_margin, PDF_Width, PDF_Height, canvas_image_width, canvas_image_height;
        var width, img, height;

        var currentURL = document.URL;
        var url = new URL(currentURL);

        html2canvas($(".print-wrap:eq(0)")[0], {
            //   dpi: 96, // Set to 300 DPI
            // scale: 1.7, // Adjusts your resolution
            onrendered: function (canvas) {
                page_section = $(".print-wrap").eq(0);
                // HTML_Width = 220;
                // HTML_Height = 160
                top_left_margin = 2;
                // PDF_Width = 200
                // PDF_Height = (PDF_Width * 1.2) + (top_left_margin * 2);
                // canvas_image_width = HTML_Width;
                // canvas_image_height = HTML_Height;
                canvas.style.width = canvas.style.width || canvas.width + 'px';
                canvas.style.height = canvas.style.height || canvas.height + 'px';

                // var imgData = canvas.toDataURL("image/png", 1.0);
                if (type_print == 'a4') {
                    pdf = new jsPDF("p", "mm", "a4");

                } else {
                    pdf = new jsPDF("l", "mm", "a5");
                }
                width = pdf.internal.pageSize.width;
                height = pdf.internal.pageSize.height;
                img = canvas.toDataURL("image/png");

                pdf.addImage(canvas, 'png', 0, 0);

                //     pdf.addImage(imgData, 'jpg', 5,5, HTML_Width, HTML_Height);
                //   pdf.addImage(imgData, 'jpg', 3, 3);
            }
        });
        $('.print-wrap').each(function (i, obj) {
            if (i > 0) {
                html2canvas($(obj), {

                    //  dpi: 96, // Set to 300 DPI
                    //    scale:  1.7, // Adjusts your resolution
                    onrendered: function (canvas) {
                        console.log('canvas', obj);

                        page_section = $(obj)
                        // HTML_Width = page_section.width();
                        // HTML_Height = 500
                        // top_left_margin = 15;
                        // PDF_Width = HTML_Width + (top_left_margin * 2);

                        // HTML_Width = 200;
                        // HTML_Height = 160
                        top_left_margin = 1;
                        // PDF_Width = 200
                        // PDF_Height = (PDF_Width * 1.2) + (top_left_margin * 2);
                        // canvas_image_width = HTML_Width;
                        // canvas_image_height = HTML_Height;

                        //  canvas.style.width = canvas.style.width || canvas.width + 'px';
                        //  canvas.style.height = canvas.style.height || canvas.height + 'px';

                        // // Resize canvas and scale future draws.                     



                        canvas.style.width = canvas.style.width || canvas.width + 'px';
                        canvas.style.height = canvas.style.height || canvas.height + 'px';

                        if (type_print == 'a4') {
                            pdf.addPage('a4', "p");

                        } else {
                            pdf.addPage('a5', "l");
                        }

                        pdf.addImage(canvas, 'png', 0, 0);
                    }
                });
            }
        });

        setTimeout(() => {
            window.open(pdf.output('bloburl'), '_blank');
        }, 700)


    };
    _renderPdf() {

    }
    _output(type) {
        // this._renderPdf()
        this._onPhantom(type)
    }
    _onPhantom(type) {

        let { list_report_bag, imgCheck, imgUnCheck,imgBlank } = this.props.bagDetail
        let arr_data = [];
        let arr_data2 = [];
        let arr_data_pdf = [];
        let filename ;
        let checkSplit = 0;//Có tách đá không
        list_report_bag && list_report_bag.map((item, i) => {
            let { listKey } = this.props.bagDetail
            let { Id, IdProduct, QtyCreated, IdOrder, Size, Type, Casting, Stone,
                TypeGold, Gamma, Custom, Image, Remark, DateCreated, nameMX, nameLH, nameLV, IdOdd, type_bag, CountOfStone,Stamp,SaleMan } = item.itemDetail
            let arr_Casting = [], arr_stone = [], arrayQtyPerColor = [],arrTotalweight=[]
            let flTotalweight=0
            filename=Id + '-' +  IdOrder + '.pdf'
            if (i>0)
            {
                filename= IdOrder + '.pdf'
            }
            
            if (Casting) {
                arr_Casting = Casting.split(',')
            }
            if (Stone) {
                arr_stone = Stone.split(',')
            }
            // console.log('Stamp'+Stamp)
            var IdProduct_temp = ''
            var IdProduct_temp2 = ''
            var ii = 0
            var total2 = 0
            let arr_total_by_product = []
            let url_image = item.url_image
            let list_stone_by_color = item.list_stone_by_color
            let list_stone_temp = ''
            let list_body = []
            // console.log('item.get_list_stone_detail',item.get_list_stone_detail)
            let get_list_stone_detail = this._parseListStone(item.get_list_stone_detail, list_stone_by_color)
            let list_name_stone = []
            list_name_stone.push([''])

            let list_value_color = []
            let list_value_color_header = []
            list_stone_by_color && list_stone_by_color.map((item, i) => {
                list_value_color.push(item.ColorName)
                list_value_color_header.push(['*'])
                let indexofPlash = item.ColorName.indexOf("/")
                arrayQtyPerColor[i] = parseInt(item.ColorName.substring(0, indexofPlash) || 1)
                arrTotalweight[i]=0
            })

            // console.log('get_list_stone_detail1',get_list_stone_detail )

            get_list_stone_detail.map((item, i) => {
                let findNextProduct = get_list_stone_detail[i]
                if (findNextProduct) {
                    if (IdProduct_temp && IdProduct_temp != findNextProduct.IdProduct) {
                        list_name_stone.push([''])
                    }
                }
                if (IdProduct_temp != item.IdProduct) {
                    if (i>1 && list_value_color_header !=null && list_value_color_header.length > 4)
                    {
                        list_name_stone.push(['\n'])                        
                    }
                    list_name_stone.push(['*****    ' + item.IdProduct + '    *****'])
                }
                if (item.Total != '') {
                    list_name_stone.push([item.Total])
                    checkSplit = checkSplit + parseInt(item.Total.indexOf("("));
                }
                if (i == get_list_stone_detail.length - 1) {
                    list_name_stone.push([''])                    
                }
                IdProduct_temp = item.IdProduct
            })


            // console.log('get_list_stone_detail',get_list_stone_detail)
            
            let list_value_stone = []
            get_list_stone_detail.map((item2, ii) => {
                let arr = []
                let findNextProduct = get_list_stone_detail[ii]

                if (findNextProduct) {
                    if (IdProduct_temp2 && IdProduct_temp2 != findNextProduct.IdProduct) {
                        let arr_td_value = [],arr_td_value_CHI = []
                        arr.push(<tr style={{ "textAlign": "center" }} key={`tr_data_total_${item2.Weight}`}>
                            {list_stone_by_color && list_stone_by_color.map((item, i) => {
                                let Weight_Temp = 0                                
                                arr_total_by_product.map((itemColor) => {
                                    if (itemColor.Color == item.ColorCode) {
                                        Weight_Temp = itemColor.Weightperqty   
                                                                 
                                    }
                                })
                                if (Weight_Temp && item.ColorCode != '001') {
                                    arrTotalweight[i]=parseFloat(arrTotalweight[i] || 0) + parseFloat(Weight_Temp) 
                                   // console.log('>>>>>>>>>> truongnn', item.ColorName + ':' + Weight_Temp  + ':' + arrTotalweight[i] + '-' + i);                                     
                                   if (list_value_color_header !=null && list_value_color_header.length < 5)
                                    {
                                        arr_td_value.push('(' + this.round(Weight_Temp, 4) + ')' + this.round(Weight_Temp / (arrayQtyPerColor[i] * 0.0375), 1))
                                    }
                                    else
                                    {
                                        arr_td_value.push('(' + this.round(Weight_Temp, 4) + ')')
                                        arr_td_value_CHI.push('<' + this.round(Weight_Temp / (arrayQtyPerColor[i] * 0.0375), 1)+ '>')
                                    }
                                } else if (Weight_Temp && item.ColorCode == '001') {
                                    //flTotalweight=flTotalweight+Weight_Temp
                                    arrTotalweight[i]=parseFloat(arrTotalweight[i] || 0)+parseFloat(Weight_Temp)
                                    // console.log('>>>>>>>>>> 1truongnn', item.ColorName + ':' + Weight_Temp  + ':' + arrTotalweight[i] + '-' + i);                                                               
                                    arr_td_value.push('(' + this.round(Weight_Temp, 4) + ')')
                                    arr_td_value_CHI.push(['\n'])
                                }
                                else {
                                    arr_td_value.push(['\n'])
                                    arr_td_value_CHI.push(['\n'])
                                }
                            })}
                        </tr>)
                        list_value_stone.push(arr_td_value)
                        if (list_value_color_header !=null && list_value_color_header.length >= 5)
                        {
                            list_value_stone.push(arr_td_value_CHI)
                        }
                    }
                }
                if (IdProduct_temp2 != item2.IdProduct) {
                    let arr_td_value4 = []
                    list_value_color_header.map((item) => {
                        arr_td_value4.push([])
                    })
                    list_value_stone.push(arr_td_value4)
                }
                let arr_td_value2 = []
                
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
                                arr_td_value2.push(Weight_Temp && this.round(Weight_Temp, 4) || '')
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
                list_value_stone.push(arr_td_value2)
                if (ii == get_list_stone_detail.length - 1) {
                    let arr_td_value_3 = [],arr_td_value_3_CHI = []
                    let arr_td_value5 = []
                    arr.push(<tr style={{ "textAlign": "center" }} key={`tr_data_total_${item2.Weight}`}>
                        {list_stone_by_color && list_stone_by_color.map((item, i) => {
                            let Weight_Temp = 0
                            arr_total_by_product.map((itemColor) => {
                                if (itemColor.Color == item.ColorCode && itemColor.IdProduct == item2.IdProduct) {
                                    Weight_Temp = itemColor.Weightperqty                                    
                                }
                                
                            })
                            //Neu mau mac dinh thi khong in tong trong luong
                            if (Weight_Temp && item.ColorCode != '001') {
                                if (list_value_color_header.length < 5)
                                {
                                    arr_td_value_3.push('(' + this.round(Weight_Temp, 4) + ')' + this.round(Weight_Temp / (arrayQtyPerColor[i] * 0.0375), 1))
                                }
                                else
                                {
                                    arr_td_value_3.push('(' + this.round(Weight_Temp, 4) + ')')
                                    arr_td_value_3_CHI.push( '<' + this.round(Weight_Temp / (arrayQtyPerColor[i] * 0.0375), 1)+ '>')
                                }
                                arrTotalweight[i]=arrTotalweight[i]+parseFloat(Weight_Temp)
                              //  console.log('>>>>>>>>>> 1truongnn', item.ColorName + ':' + Weight_Temp  + ':' + arrTotalweight[i] + '-' + i);                                                               
                                arr_td_value5.push('[' + this.round(arrTotalweight[i], 4) + ']' + this.round(arrTotalweight[i] / (arrayQtyPerColor[i] * 0.0375), 1))
                            } else if (Weight_Temp && item.ColorCode == '001') {
                                arrTotalweight[i]=arrTotalweight[i]+parseFloat(Weight_Temp)
                                console.log('>>>>>>>>>> 1truongnn', item.ColorName + ':' + Weight_Temp  + ':' + arrTotalweight[i] + '-' + i);                                                               
                                arr_td_value_3.push('(' + this.round(Weight_Temp, 4) + ')')     
                                arr_td_value_3_CHI.push(['\n'])   

                                arr_td_value5.push('[' + this.round(arrTotalweight[i], 4) + ']')
                            } else {
                                arr_td_value_3.push(['\n'])
                                arr_td_value_3_CHI.push(['\n'])
                                arr_td_value5.push(['\n'])
                            }

                        })}
                    </tr>)
                    list_value_stone.push(arr_td_value_3)
                    if (list_value_color_header.length >= 5)
                    {
                        list_value_stone.push(arr_td_value_3_CHI)
                    }
                   // type_bag == 'STATUS_BAG_PRODUCT_02'? list_value_stone.push(arr_td_value5):''
                    
                   
                    

                }
                IdProduct_temp2 = item2.IdProduct
                return arr
            })
            list_body.push(list_value_color)
            list_value_stone.map((item) => {
                list_body.push(item)
            })
            let arr_right = []
            arr_right.push(['Khâu', '', 'Vàng+đá-Chưa đá rớt(Gr)', 'Tổng TL đá rớt(Gr)', 'TL Vàng trừ đá(Gr)'])

            listKey.map((item) => {
                let name = 'Đi'
                let objKhau = {}
                if (item.pos == 1) {
                    name = 'Đến \n '
                    objKhau = {
                        text: item.name, fontSize: 7.5, textAlign: 'center'
                    }
                } else {
                    objKhau = {
                        text: item.name,
                        rowSpan: 2, fontSize: 7.5, textAlign: 'center'
                    }
                }
                arr_right.push([objKhau, name, '', '', ''])
            })
            //Them khoang trang giua 2 bag
            parseInt(CountOfStone) < 18 ? arr_data_pdf.push(['\n']) : arr_data_pdf.push([''])

            // arr_data_pdf.push([''])

            // console.log('>>>>>>>>>> truongnn', checkSplit);

            //-------------------PRINT A4------------------------
            if (type == 'A4') {
                arr_data_pdf.push({
                    columns: [
                        {
                            width: list_value_color_header.length > 4 ? '65%' : '65%',
                            table: {
                                headerRows: 1,
                                widths: checkSplit > 0 ? [117, 160, 80] : list_value_color_header.length < 4 
                                                ?[115, 155, 85]:[105, 165, 85],
                                body: [
                                    [
                                       {
                                            text: 'Bag No: ' + (Id || '')
                                            ,height: 20
                                            ,fontSize: parseInt(CountOfStone) < 17 ? (Casting || '').length>130?9:10 : 10
                                        },
                                       {
                                            text: 'Item: ' + (IdProduct || '') + ' - Qty: ' + (QtyCreated || '')
                                            ,height: 20
                                            ,fontSize: parseInt(CountOfStone) < 17 ? (Casting || '').length>130?8:9 : 8.5} ,                                                                           
                                       {
                                            image: `data:image/jpg;base64,${url_image}`,
                                            width: list_value_color_header.length > 4 ? 85 : 85,
                                            height: 75,
                                            rowSpan: 4,
                                            margin: [0, 0, 0, 0]
                                        },
                                        
                                    ],
                                    [{
                                        layout: 'noBorders',
                                        table: {
                                            alignment: 'center',
                                            headerRows: 1,
                                            widths: ["*", "*", "*", "*"],
                                            //height: 210,
                                            body: [
                                                [
                                                    "Lẻ",
                                                    {
                                                        image: type_bag == 'STATUS_BAG_PRODUCT_01' ? imgCheck : imgUnCheck,
                                                        width: 9,
                                                        height: 10,
                                                        margin: [0, 0, 0, 0]
                                                    },
                                                    "Bộ",
                                                    {
                                                        image: type_bag == 'STATUS_BAG_PRODUCT_02' ? imgCheck : imgUnCheck,
                                                        width: 9,
                                                        height: 10,
                                                        margin: [0, 0, 0, 0]
                                                    }
                                                ]
                                            ]
                                        }
                                    }, 
                                        {
                                            text: 'Order: ' + (IdOrder || '' ) + ' # ' + SaleMan + '\n' + 'Hội: ' + (nameLH + ' / Xi: ' + nameMX || '') + ' / Gold: ' + (nameLV || '')
                                            ,height: 20
                                            ,fontSize: parseInt(CountOfStone) < 17 ? (Casting || '').length>130?8:9 : 8.5
                                        },
                                        // { ["a","b"]
                                        // image: IdOdd == 'Lẻ' ? imgUnCheck : imgCheck,
                                        // width: 12,
                                        // height: 12,
                                        // margin: [1, 1, 1, 1]
                                        // }
                                    ],
                                    [
                                        {
                                            text:'KHÁCH YÊU CẦU: ' + (Size || '')
                                            ,colSpan: 2
                                            ,height: 20
                                            ,bold: true
                                            ,fontSize: parseInt(CountOfStone) < 17 ? 9 : 8.5
                                        },
                                        // {
                                        //     text:'Order: ' + (IdOrder || '' ) + '\n' + Stamp
                                        //     ,height: 20
                                        //     ,fontSize: parseInt(CountOfStone) < 17 ? 9 : 8.5
                                        // }
                                        {
                                                        image: Stamp!=''?Stamp:imgBlank,
                                                        width: 30,
                                                        height: 14,
                                                        margin: [0, 0, 0, 0]
                                        },
                                    ],
                                    [{
                                        text: 'Casting ' + (Casting || ''),
                                        colSpan: 2, //decoration: 'underline',
                                        fontSize: parseInt(CountOfStone) < 17 ? (Casting || '').length>130?8:10 : 7.5
                                    }, ''
                                    ],
                                    // [{
                                    //     text: 'Stones: ',
                                    //     colSpan: 3,
                                    // }],
                                    [
                                        {
                                            table: {
                                                alignment: 'left',
                                                widths: ['*'],
                                                body: list_name_stone
                                            },
                                            fontSize: list_value_color_header.length > 4 ? 7.5 : 8,
                                            layout: 'noBorders',
                                        }
                                        ,
                                        {
                                            table: {
                                                alignment: 'left',
                                                widths: list_value_color_header,
                                                body: list_body
                                            },
                                            colSpan: 2,
                                            fontSize: list_value_color_header.length > 4 ? 7.3 : 8,
                                            layout: 'noBorders',
                                        },

                                    ],
                                    [{
                                        text: 'Ghi chú: ' + Remark,
                                        colSpan: 3
                                    }],

                                    // [{ text: 'Bold value', bold: false }, '', '', '', '']
                                ]
                            },
                            bold: true,
                            // layout: 'noBorders',
                            fontSize: 7.5,
                            // pageBreak: 'after'

                        },
                        {
                            width: '35%',
                            table: {
                                alignment: 'center',
                                headerRows: 1,
                                widths: [35, 16, 36, 36, 34],
                                body: arr_right
                            },
                            bold: true,
                            pageBreak: i == list_report_bag.length - 1 ? '' : 'after',
                            fontSize: list_value_color_header.length > 3 ? 7.5 : 8,
                        }
                    ],
                    columnGap: 1
                })
            }
            //-------------------PRINT A5------------------------
            else {
                arr_data_pdf.push({
                    columns: [
                        {
                            width: list_value_color_header.length > 4 ? '65%' : '65%',
                            table: {
                                headerRows: 1,
                                widths: checkSplit > 0 ? [120, 155, 80] : list_value_color_header.length < 4 
                                                ?[115, 155, 85]:[110, 160, 85],
                                body: [
                                    [
                                       {
                                            text: 'Bag No: ' + (Id || '')
                                            ,height: 20
                                            ,fontSize: parseInt(CountOfStone) < 17 ? (Casting || '').length>130?9:11 : 11
                                        },
                                       {
                                            text: 'Item: ' + (IdProduct || '') + ' - Qty: ' + (QtyCreated || '')
                                            ,height: 20
                                            ,fontSize: parseInt(CountOfStone) < 17 ? (Casting || '').length>130?9:10 : 8.5} ,                                                                           
                                       {
                                            image: `data:image/jpg;base64,${url_image}`,
                                            width: list_value_color_header.length > 4 ? 85 : 85,
                                            height: 75,
                                            rowSpan: 4,
                                            margin: [0, 0, 0, 0]
                                        },
                                        
                                    ],
                                    [{
                                        layout: 'noBorders',
                                        table: {
                                            alignment: 'center',
                                            headerRows: 1,
                                            widths: ["*", "*", "*", "*"],
                                            //height: 210,
                                            body: [
                                                [
                                                    "Lẻ",
                                                    {
                                                        image: type_bag == 'STATUS_BAG_PRODUCT_01' ? imgCheck : imgUnCheck,
                                                        width: 9,
                                                        height: 10,
                                                        margin: [0, 0, 0, 0]
                                                    },
                                                    "Bộ",
                                                    {
                                                        image: type_bag == 'STATUS_BAG_PRODUCT_02' ? imgCheck : imgUnCheck,
                                                        width: 9,
                                                        height: 10,
                                                        margin: [0, 0, 0, 0]
                                                    }
                                                ]
                                            ]
                                        }
                                    }, 
                                        {
                                            text: 'Order: ' + (IdOrder || '')  + ' # ' + SaleMan + '\n' + 'Hội: ' + (nameLH + ' /Xi: ' + nameMX || '') + ' /Gold: ' + (nameLV || '')
                                            ,height: 20
                                            ,fontSize: parseInt(CountOfStone) < 17 ? (Casting || '').length>130?8:9 : 8.5
                                        },
                                        // { ["a","b"]
                                        // image: IdOdd == 'Lẻ' ? imgUnCheck : imgCheck,
                                        // width: 12,
                                        // height: 12,
                                        // margin: [1, 1, 1, 1]
                                        // }
                                    ],
                                    [
                                        {
                                            text:'KHÁCH YÊU CẦU: ' + (Size || '')
                                            ,colSpan: 2
                                            ,height: 20
                                            ,bold: true
                                            ,height: 20
                                            ,fontSize: parseInt(CountOfStone) < 17 ? 9 : 8.5
                                        },
                                        // {
                                        //     text:'Order: ' + (IdOrder || '') + '\n' + Stamp
                                        //     ,height: 20
                                        //     ,fontSize: parseInt(CountOfStone) < 17 ? 9 : 8.5
                                        // },
                                        {
                                                        image: Stamp!=''?Stamp:imgBlank,
                                                        width: 30,
                                                        height: 14,
                                                        margin: [0, 0, 0, 0]
                                        },
                                    ],
                                    [{
                                        text: 'Casting ' + (Casting || ''),
                                        colSpan: 2, //decoration: 'underline',
                                        fontSize: parseInt(CountOfStone) < 17 ? (Casting || '').length>130?8:10 : 7.5
                                    }, ''
                                    ],
                                    // [{
                                    //     text: 'Stones: ',
                                    //     colSpan: 3,
                                    // }],
                                    [
                                        {
                                            table: {
                                                alignment: 'left',
                                                widths: ['*'],
                                                body: list_name_stone
                                            },
                                            fontSize: list_value_color_header.length > 4 ? 7.5 : 8,
                                            layout: 'noBorders',
                                        }
                                        ,
                                        {
                                            table: {
                                                alignment: 'left',
                                                widths: list_value_color_header,
                                                body: list_body
                                            },
                                            colSpan: 2,
                                            fontSize: list_value_color_header.length > 4 ? 7.3 : 8,
                                            layout: 'noBorders',
                                        },

                                    ],
                                    [{
                                        text: 'Ghi chú: '  + Remark,
                                        colSpan: 3
                                    }],

                                    // [{ text: 'Bold value', bold: false }, '', '', '', '']
                                ]
                            },
                            bold: true,
                            // layout: 'noBorders',
                            fontSize: 7.5,
                            // pageBreak: 'after'

                        },
                        {
                            width: '35%',
                            table: {
                                alignment: 'center',
                                headerRows: 1,
                                widths: [35, 16, 36, 36, 34],
                                body: arr_right
                            },
                            bold: true,                            
                            pageBreak: i % 2 == 0 ? parseInt(CountOfStone) < 18 ? '' : 'after' : 'after',
                            fontSize: list_value_color_header.length > 3 ? 7.5 : 7.9,
                        }
                    ],
                    columnGap: 1
                })
            }
            checkSplit = 0;

        })
        var docDefinition = {
            pageSize: 'A4',
            pageOrientation: type == 'A4' ? 'portrait' : 'portrait',
            content: arr_data_pdf,
            pageMargins: [5, 1, 2, 1]            
        };
       
        // window.pdfMake.createPdf(docDefinition).open();
        window.pdfMake.createPdf(docDefinition).download(filename);

        // this.props.printBagPhamtom()
    }
    _parseListStone(get_list_stone_detail, list_stone_by_color) {
        let arr_temp = []
        get_list_stone_detail.map((item) => {
            if (item.Total_Compare) {
                let listStoneSame = get_list_stone_detail.filter(x => x.Total_Compare == item.Total_Compare && x.IdProduct == item.IdProduct)
                // console.log('listStoneSame',listStoneSame)
                if (arr_temp.filter(x => x.Total_Compare == item.Total_Compare && x.IdProduct == item.IdProduct).length == 0) {
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
                    // console.log('item_temp',item_temp)                    
                    arr_temp.push(item_temp)
                    // console.log('arr_temp',arr_temp)
                }
            }
        })
        arr_temp.map((item) => {
            let check = get_list_stone_detail.filter(x => x.Total_Compare == item.Total_Compare && x.issplit == 1)
            if (check.length > 0) {
                item.issplit = 1
            }
            return item
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
    _onChangeValue() {

    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        this.props.updateTypeBag(value)
    }
    render() {
        let { list_report_bag, type_bag } = this.props.bagDetail
        let arr_data = [];
        let arr_data2 = [];

        list_report_bag && list_report_bag.map((item, i) => {
            let { listKey } = this.props.bagDetail
            let { Id, IdProduct, QtyCreated, IdOrder, Size, Type, Casting, Stone,
                TypeGold, Gamma, Custom, Image, Remark, DateCreated, nameMX, nameLH, nameLV, IdOdd,Stamp,SaleMan } = item.itemDetail
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
            var total2 = 0
            let arr_total_by_product = []
            let url_image = item.url_image
            let list_stone_by_color = item.list_stone_by_color
            
            let get_list_stone_detail = this._parseListStone(item.get_list_stone_detail, list_stone_by_color)

            let checkSplitStone = get_list_stone_detail.filter(x => x.issplit == 1)

            arr_data.push(
                <table className="print-wrap" key={Id} style={{ "background": "white", "fontSize": "13px", "fontWeight": "bold" }}  >
                    <tbody>
                        <tr>

                            {/*  Bag common info */}

                            <td style={{ "border": "0px solid black", "verticalAlign": "top", "width": `${checkSplitStone.length > 0 ? '600px' : "500px"}` }}>
                                <table style={{ "margin": "3px" }}>
                                    <tbody>
                                        <tr style={{ "fontSize": "14px" }}>
                                            <td >Bag No:<strong></strong> <div style={{ "border": "2px solid black", "display": "inline-block", "padding": "2px 5px" }}><strong>{Id}</strong></div></td>
                                            <td >
                                                Item:<strong> {IdProduct} <div style={{ "border": "2px solid black", "display": "inline-block", "padding": "2px 5px" }}><strong>{IdOdd}</strong></div></strong> &nbsp;
                                                Qty:<strong> {QtyCreated}</strong>
                                            </td>
                                            <td rowSpan="4" style={{ "textAlign": "right", "paddingLeft": "5px" }}>
                                                <div style={{ "border": "2px solid black", "display": "inline-block", "padding": "10px 10px", "textAlign": "right" }}>
                                                    <img src={`data:image/jpeg;base64,${url_image}`} width="90" height="95" />
                                                </div>
                                                {/* <img src={Image ? Config.API_URL_IMAGE + Image : "images/image-not-found.jpg"} width="120" height="120" />
                                           */}
                                            </td>
                                            {/* <td><strong>Finish WK:</strong>0</td> */}
                                        </tr>

                                        <tr>
                                            <td>
                                                Màu xi:<strong> {nameMX}</strong>
                                            </td>
                                            <td> Gold:<strong> {nameLV}</strong> </td>

                                            <td> </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Loại hội: <strong> {nameLH}</strong>
                                            </td>
                                            <td>Order:<strong> <div style={{ "border": "2px solid black", "display": "inline-block", "padding": "2px 5px" }}><strong>{IdOrder}</strong></div></strong> </td>


                                        </tr>
                                        <tr>
                                            <td ><strong> KHÁCH YÊU CẦU:
                                            
                                                    {Size}
                                                </strong>
                                            </td>
                                            <td >Custom: <strong>{Custom} </strong></td>


                                        </tr>
                                        <tr>
                                            <td><strong>Casting No:</strong></td>
                                            <td>Ngày tạo: <strong>{moment.utc(DateCreated).format('DD/MM/YYYY')}</strong></td>

                                        </tr>

                                        {/*  dynamically data as: components, moulds, stones */}
                                        <tr>
                                            <td colSpan="3">
                                                {arr_Casting.map((item, i) => {
                                                    return ([<span key={`casting_${i}`}>{item} </span>, <br />])
                                                })}
                                            </td>
                                        </tr>
                                        <tr style={{ "fontSize": `${list_stone_by_color.length >= 4 ? '12px' : "14px"}` }}>
                                            <td colSpan="1" style={{ "width": `${checkSplitStone.length >= 1 ? '300px' : "200px"}` }}>
                                                <span><strong></strong> </span>
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
                                                            arr.push([<span key={`stone_${i}`}>{`${item.Total}${`${item.issplit == 1 ? '(Mặc định)' : ''}`}`} </span>, <br />])
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
                                                <td colSpan="2" style={{ "fontSize": `${list_stone_by_color.length >= 4 ? '12px' : "14px"}` }} >
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
                                                                                        ([<td key={`td_data_${ii}_${i}`} style={{ "fontWeight": "bold", "paddingLeft": "3   px" }}>
                                                                                            {Weight_Temp && this.round(Weight_Temp, 4) || <span>&nbsp;</span>}
                                                                                            {Weight_Temp ? '|' + this.round(Weight_Temp / 0.0375, 1) : ''}
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
                                                                                    ([<td key={`td_data_${ii}_${i}`} style={{ "fontWeight": "bold", "paddingLeft": "3px" }}>
                                                                                        {Weight_Temp && this.round(Weight_Temp, 4) || <span>&nbsp;</span>}
                                                                                        {Weight_Temp ? '|' + this.round(Weight_Temp / 0.0375, 1) : ''}                                                                                              </td>])
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

                                        <tr>
                                            <td colSpan="3">
                                                <span><strong>Ghi chú:</strong> </span>
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
                            <td style={{ "border": "0px solid black", "verticalAlign": "top", "fontWeight": "normal", "width": `${list_stone_by_color.length >= 4 ? '290px' : "301px"}`, "fontSize": `${list_stone_by_color.length >= 4 ? '13px' : "13px"}` }}>
                                <table className="table head" >
                                    <thead >
                                        <tr >

                                            <th className="normal-width" style={{ "border": "1.5px solid black", "padding": "10px 10px" }}><strong>Khâu</strong></th>
                                            <th className="small-width" style={{ "border": "1.5px solid black" }}> </th>
                                            <th className="small-width" style={{ "border": "1.5px solid black", "padding": "10px 10px" }}><strong>Vàng + Đá (Gram)</strong> </th>
                                            <th className="small-width" style={{ "border": "1.5px solid black", "padding": "10px 10px" }}><strong>Tổng TL đá rớt (Gram)</strong></th>
                                            <th className="small-width" style={{ "border": "1.5px solid black", "padding": "10px 10px" }}><strong>TL Vàng (Gram)</strong></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listKey.map((item, i) => {
                                            if (item.pos == 0) {
                                                return (
                                                    <tr key={`listKey_${i}`} >
                                                        <td rowSpan="2" style={{ "border": "1.5px solid black", "verticalAlign": "middle" }}><strong>{item.name}</strong></td>
                                                        <td style={{ "border": "1.5px solid black", "padding": "10px 10px" }}><strong>Đi</strong></td>
                                                        <td style={{ "border": "1.5px solid black", "padding": "10px 10px" }}></td>
                                                        <td style={{ "border": "1.5px solid black", "padding": "10px 10px" }}></td>
                                                        <td style={{ "border": "1.5px solid black", "padding": "10px 10px" }}></td>
                                                    </tr>
                                                )
                                            } else {
                                                return (
                                                    <tr key={`listKey_${i}`} >
                                                        <td style={{ "border": "1.5px solid black", "padding": "10px 10px" }}><strong>Đến</strong></td>
                                                        <td style={{ "border": "1.5px solid black", "padding": "10px 10px" }}></td>
                                                        <td style={{ "border": "1.5px solid black", "padding": "10px 10px" }}></td>
                                                        <td style={{ "border": "1.5px solid black", "padding": "10px 10px" }}></td>
                                                    </tr>
                                                )
                                            }


                                        })}

                                    </tbody>
                                </table>
                            </td>

                        </tr>
                    </tbody>
                </table>

            )

        })
        return (
            <div className="container">
                <section >
                    <div className="main__content">
                        <div className="form__personnal">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group ">
                                        <div style={{ "paddingTop": "10px" }}>
                                            <a >
                                                <button onClick={browserHistory.goBack}>BACK</button>
                                            </a>
                                            <a style={{ "margin": "2px" }} >
                                                <button onClick={() => this._onDown('A4')}>PRINT (A4)</button>
                                            </a>
                                            <a style={{ "margin": "2px" }} >
                                                <button onClick={() => this._onDown('A5')}>PRINT (A5)</button>
                                            </a>


                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div >
                                        {arr_data}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
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
