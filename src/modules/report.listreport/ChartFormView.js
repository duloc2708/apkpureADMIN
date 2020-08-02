import { Bar, Pie, Line, Doughnut, HorizontalBar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-doughnutlabel";
class ChartFormView extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  componentDidMount() {}
  _convertData(data, title) {
    let listColor = [],
      listValue = [],
      listLable = [];
    data.map(item => {
      let { lable, value } = item;
      listLable.push(lable);
      listColor.push(this.getRandomColor());
      listValue.push(value);
    });
    let dataConvert = {
      labels: listLable,
      datasets: [
        {
          label: title,
          data: listValue,
          backgroundColor: listColor,
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 4,
          hoverBorderColor: "black"
        }
      ]
    };
    return dataConvert;
  }
  _getDataByType(typeTemp, type, listDataSet, value) {
    let checkExists = listDataSet.filter(x => x.typeTemp === typeTemp);
    let colors = this.getRandomColor();
    if (checkExists.length === 0) {
      listDataSet.push({
        typeTemp: typeTemp,
        label:
          typeTemp.indexOf("line") > -1
            ? typeTemp.substr(6, typeTemp.length - 6)
            : typeTemp.substr(5, typeTemp.length - 5),
        type: type,
        data: [value],
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2,
        fill: false,
        textAlign: "end",
        offset: 8
      });
    } else {
      listDataSet.map(itemDetail => {
        if (itemDetail.typeTemp === typeTemp) {
          itemDetail.data.push(value);
        }
        return itemDetail;
      });
    }
    return listDataSet;
  }
  _initChartMix() {
    let { data, type, title } = this.props;
    const convertData = this._convertData(data, title);
    const dataRender = [];

    let listColor = [],
      listValue = [],
      listLable = [],
      listDataSet = [];

    data.map(item => {
      let { lable, value } = item;
      listLable.push(lable);
      // convert data type bar
      Object.keys(item).forEach(key => {
        for (let i = 1; i <= 10; i++) {
          if (key.indexOf(`bar${i}`) != -1) {
            listDataSet = this._getDataByType(
              key,
              "bar",
              listDataSet,
              item[key]
            );
          }
          if (key.indexOf(`line${i}`) != -1) {
            listDataSet = this._getDataByType(
              key,
              "line",
              listDataSet,
              item[key]
            );
          }
        }
      });
    });
    return (
      <Bar
        data={{
          datasets: listDataSet,
          labels: listLable
        }}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  callback: function(label, index, labels) {
                    return `${SportConfig.function._formatMoney(label)}`;
                  }
                }
              }
            ]
          },
          tooltips: false,
          plugins: {
            datalabels: {
              backgroundColor: function(context) {
                return context.active
                  ? context.dataset.backgroundColor
                  : "white";
              },
              borderColor: function(context) {
                return context.dataset.backgroundColor;
              },
              borderRadius: function(context) {
                return 24;
              },
              borderWidth: 1,
              color: function(context) {
                return context.active
                  ? "white"
                  : context.dataset.backgroundColor;
              },
              font: {
                weight: "bold"
              },
              formatter: function(value, context) {
                value = Math.round(value * 100) / 100;
                return context.active
                  ? context.dataset.label +
                      ":" +
                      SportConfig.function._formatMoney(value)
                  : SportConfig.function._formatMoney(value);
              },
              offset: 8,
              textAlign: "center"
            }
          }
        }}
      />
    );
  }
  _renderChart() {
    let { data, type, title } = this.props;
    const convertData = this._convertData(data, title);
    const dataRender = [];
    switch (type) {
      case "TYPE_CHART_05":
        dataRender.push(
          <Doughnut
            data={convertData}
            options={{
              plugins: {
                doughnutlabel: {
                  labels: [
                    {
                      text: "The title",
                      font: {
                        size: "60"
                      }
                    },
                    {
                      text: "Total:",
                      font: {
                        size: "50"
                      },
                      color: "grey"
                    },
                    {
                      text: "$100.000",
                      font: {
                        size: "30"
                      },
                      color: "red"
                    },
                    {
                      text: "95%",
                      font: {
                        size: "45"
                      },
                      color: "green"
                    }
                  ]
                },
                datalabels: {
                  textAlign: "bottom",
                  offset: 8,
                  align: "stretch",
                  formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                      sum += parseFloat(data);
                    });
                    let formatValue =
                      `${ctx.chart.data.labels[ctx.dataIndex] +
                        ": " +
                        SportConfig.function._formatMoney(value)} (` +
                      ((value * 100) / sum).toFixed(2) +
                      "%)";
                    return formatValue;
                  },
                  color: "white"
                }
              }
            }}
          />
        );
        break;
      case "TYPE_CHART_04":
        dataRender.push(this._initChartMix());
        break;
      case "TYPE_CHART_06":
        dataRender.push(
          <HorizontalBar
            data={convertData}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      callback: function(label, index, labels) {
                        return `${label}`;
                      }
                    }
                  }
                ]
              },
              plugins: {
                datalabels: {
                  textAlign: "center",
                  offset: 8,
                  align: "center",
                  formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                      sum += parseFloat(data);
                    });

                    let formatValue = `${SportConfig.function._formatMoney(
                      value
                    )}`;
                    return formatValue;
                  }
                }
              }
            }}
          />
        );
        break;
      case "TYPE_CHART_01":
        dataRender.push(
          <Bar
            data={convertData}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      callback: function(label, index, labels) {
                        return `${SportConfig.function._formatMoney(label)}`;
                      }
                    }
                  }
                ]
              },
              plugins: {
                datalabels: {
                  textAlign: "center",
                  offset: 8,
                  align: "end",
                  formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                      sum += parseFloat(data);
                    });

                    let formatValue = `${SportConfig.function._formatMoney(
                      value
                    )}`;
                    return formatValue;
                  }
                }
              }
            }}
          />
        );
        break;
      case "TYPE_CHART_02":
        dataRender.push(
          <Pie
            data={convertData}
            options={{
              rotation: 0,
              cutoutPercentage: 2,
              padding: 24,
              layout: {
                padding: 16
              },
              // tooltips: {
              //   callbacks: {
              //     label: function (tooltipItem, data) {
              //       var label = SportConfig.function._formatMoney(data.datasets[0].data[tooltipItem.datasetIndex])
              //       return label;
              //     }
              //   }
              // },
              // format lại giá trị
              plugins: {
                datalabels: {
                  textAlign: "bottom",
                  offset: 8,
                  align: "stretch",
                  formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                      sum += parseFloat(data);
                    });
                    let formatValue =
                      `${ctx.chart.data.labels[ctx.dataIndex] +
                        ": " +
                        SportConfig.function._formatMoney(value)} (` +
                      ((value * 100) / sum).toFixed(2) +
                      "%)";
                    return formatValue;
                  },
                  color: "white",
                  doughnutlabels: {
                    labels: [
                      {
                        text: "The Total",
                        font: {
                          size: "60"
                        }
                      }
                    ]
                  }
                }
              }
            }}
          />
        );
        break;
      case "TYPE_CHART_05":
        dataRender.push(
          <Doughnut
            data={convertData}
            options={{
              rotation: 0,
              layout: {
                padding: 32
              },
              // format lại giá trị
              plugins: {
                datalabels: {
                  textAlign: "center",
                  offset: 8,
                  align: "center",
                  formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                      sum += parseFloat(data);
                    });
                    let formatValue =
                      `${SportConfig.function._formatMoney(value)} (` +
                      ((value * 100) / sum).toFixed(2) +
                      "%)";
                    return formatValue;
                  },
                  color: "white"
                }
              }
            }}
          />
        );
        break;
      case "TYPE_CHART_03":
        //
        convertData.datasets[0].fill = false;
        convertData.datasets[0].backgroundColor = "rgba(75,192,192,0.4)";
        convertData.datasets[0].borderColor = "rgba(75,192,192,1)";
        //
        dataRender.push(
          <Line
            data={convertData}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      callback: function(label, index, labels) {
                        return `${SportConfig.function._formatMoney(label)}`;
                      }
                    }
                  }
                ]
              },
              // format lại giá trị
              plugins: {
                datalabels: {
                  textAlign: "center",
                  offset: 8,
                  align: "center",
                  formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                      sum += parseFloat(data);
                    });
                    let formatValue = `${SportConfig.function._formatMoney(
                      value
                    )}`;
                    return formatValue;
                  }
                }
              }
            }}
          />
        );
        break;
      default:
        break;
    }
    return dataRender;
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <section>{this._renderChart()}</section>
        </div>
      </div>
    );
  }
}
export default ChartFormView;
