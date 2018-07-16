import { Component } from 'react'
import update from 'immutability-helper'
import Link from 'next/link'
import Router from 'next/router'
import { InputNumber, Button, Table, Modal, Form, Input, Radio, notification, Icon } from 'antd'
import { getProductData } from "actions";
import axios from "axios";
import ReactHighcharts from 'react-highcharts';

import justatee from 'hocs/justatee'
import style from './index.scss'
import XLSX from 'xlsx';
import FileSaver from 'file-saver';

const FormItem = Form.Item;
const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i)
    view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

export const configLineChart = (title, yTitle) => ({
  title: {
    text: title
  },

  yAxis: {
    title: {
      text: yTitle
    }
  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
    }
  },

  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
})

class Product extends Component {
  static info = {
    title: "Thống kê báo cáo",
    style
  }

  exportStatistic() {
    let wb = { SheetNames: [], Sheets: {} };
    let initialDataOrders = [
      {
        "doanh thu": 22000000,
        "số đơn": 220,
        "tháng": 1
      }, {
        "doanh thu": 30000000,
        "số đơn": 250,
        "tháng": 2
      }, {
        "doanh thu": 40500000,
        "số đơn": 320,
        "tháng": 3
      }, {
        "doanh thu": 45000000,
        "số đơn": 370,
        "tháng": 4
      }, {
        "doanh thu": 53200000,
        "số đơn": 420,
        "tháng": 5
      },{
        "doanh thu": 56200000,
        "số đơn": 450,
        "tháng": 6
      },{
        "doanh thu": 62200000,
        "số đơn": 490,
        "tháng": 7
      },
    ];

    if (initialDataOrders.length > 0) {
      let ws = XLSX.utils.json_to_sheet(initialDataOrders);
      let ws_name = "Đơn hàng";
      XLSX.utils.book_append_sheet(wb, ws, ws_name);

      let wbout  = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

      FileSaver.saveAs(new Blob([s2ab(wbout)], { type: "" }), `Thống kê báo cáo.xlsx`);
    } else {
      openNotificationWithIcon('error', 'Đã xảy ra lỗi, vui lòng thử lại sau', null)
    }
  }

  render() {
    return(
      <div style={{padding: 15}}>
        <div className="title-manage">
          <span>Thống kê báo cáo</span>
          <Button icon="file-excel" style={{float: "right", marginTop: 10, marginRight: 10}} onClick={() => this.exportStatistic()}>Tải xuống thống kê</Button>
        </div>
        <ReactHighcharts
          config={{
          chart: {
            height: 400
          },
          series: [{
            name: "doanh thu",
            data:[3000000, 4000000, 3500000, 4300000, 5000000, 7000000, 9340000]
          }],
          xAxis: {
            categories: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
          },
          ...configLineChart('Biểu đồ doanh thu theo tháng', 'Số tiền')}}
        />
        <ReactHighcharts
          config={{
          chart: {
            height: 400
          },
          series: [{
            name: "số đơn",
            data:[120, 150, 140, 160, 200, 215, 252]
          }],
          xAxis: {
            categories: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
          },
          ...configLineChart('Biểu đồ lượng đơn theo tháng', 'đơn')}}
        />


      </div>
    )
  }
}

export default justatee(Product)
