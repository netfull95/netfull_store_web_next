import { Component } from 'react'
import update from 'immutability-helper'
import Link from 'next/link'
import Router from 'next/router'
import { Button, Table, Modal, Form, Input, Radio, notification, Icon, Row, Col, Select, Card, InputNumber, Tooltip } from 'antd'
import { getOrderData } from "actions";
import axios from "axios";
import { debounce, cloneDeep, isEqual } from "lodash";

import justatee from 'hocs/justatee'
import style from './index.scss'
import XLSX from 'xlsx';
import FileSaver from 'file-saver';

const Search = Input.Search;
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

function renderPrintOrder(user_id, address, phone, note, discount, shipping_fee, items, all_total_price) {
  console.log('renderPrintOrder', user_id, address, phone, note, discount, shipping_fee, items, all_total_price);
  return `
    <div style="font-family: 'Times New Roman', Times, serif; font-size: 16px; color: black; width: 100%">
      <div style="display:flex; justify-content:space-between">
        <div>
          <div style="font-size: 16px; font-weight: bolder">Cửa hàng Điện máy Phong Tiệp</div>
          <div>SĐT: 098 898 1626</div>
          <div>Địa chỉ: Chợ Điệp Sơn, xã Yên Nam, Huyện Duy Tiên, Tỉnh Hà Nam</div>
        </div>
      </div>
      <div style="width: fit-content; margin: 30px auto; font-size: 18px; font-weight: bolder">HÓA ĐƠN BÁN HÀNG</div>
      <p>Khách hàng: <highlight>${user_id}</highlight></p>
      <p>SĐT: ${phone} / ...................................................</p>
      <p>Địa chỉ: ${address}</p>
      <p><highlight>Ghi chú:</highlight> ${note || ''}</p>
      <hr />
      <table class="warranty-items">
        <tr>
          <th>STT</th>
          <th>Mã SP</th>
          <th>Sản Phẩm</th>
          <th>SL</th>
          <th>Đơn Giá</th>
          <th>Thành tiền</th>
        </tr>
        ${items.map((item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price || 0}</td>
            <td style="text-align: right">${item.quantity * item.price}</td>
          </tr>
        `)}
        <tr>
          <td colspan="5" style="text-align: right">Phí vận chuyển</td>
          <td style="text-align: right"><highlight>${shipping_fee}</highlight></td>
        </tr>
        <tr>
          <td colspan="5" style="text-align: right">Chiết khấu</td>
          <td style="text-align: right"><highlight>${discount}</highlight></td>
        </tr>
        <tr>
          <td colspan="5" style="text-align: right">Tổng</td>
          <td style="text-align: right"><highlight>${all_total_price}</highlight></td>
        </tr>
      </table>
      <div style="margin-top: 20px; display: flex; justify-content: space-around">
        <highlight>Người bán hàng</highlight>
        <highlight>Khách hàng</highlight>
      </div>
      <style>
        table.warranty-items {
          border-collapse: collapse;
          width: 100%;
        }
        table.warranty-items, .warranty-items td, .warranty-items th {
          border: 1px solid black;
        }
        .warranty-items td, #warranty-items th {
          padding: 5px;
        }
        highlight {
          font-weight: bolder
        }
      </style>
    </div>
  `
}

function handlePrintOrder (user_id, address, phone, note, discount, shipping_fee, items, all_total_price) {
  var contents = renderPrintOrder(user_id, address, phone, note, discount, shipping_fee, items, all_total_price);
  var frame1 = document.createElement('iframe');
  frame1.name = "frame1";
  frame1.style.position = "absolute";
  frame1.style.top = "-1000000px";
  document.body.appendChild(frame1);
  var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
  frameDoc.document.open();
  frameDoc.document.write(`
    <!DOCTYPE html>
      <head>
        <title>Đơn hàng</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.7.5/css/froala_style.min.css" rel="stylesheet" type="text/css" />
        <style type='text/css'>
          @media print {
            @page {
              size: auto;
              margin: 0;
            }
          }
        </style>
      </head>
      <body>
        ${contents}
      </body>
    </html>
  `);
  frameDoc.document.close();
  setTimeout(function () {
    window.frames["frame1"].focus();
    window.frames["frame1"].print();
    document.body.removeChild(frame1);
  }, 500);
}

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    state = {
      data: [],
      value: '',
      items: [],
      shipping_fee: 0,
      discount: 0,
      user_id: null,
      address: null,
      phone: null,
      note: null,
    }

    getDefauthState = () => {
      this.setState({
        data: [],
        value: '',
        items: [],
        shipping_fee: 0,
        discount: 0,

      })
    }

    searchProduct = (value) => {
      this.setState({value: value})
      let url = `http://localhost:8880/api/products/search?value=${value}`;
        axios.get(url)
        .then(({ data }) => {
          if (data.success) {
            this.setState({data: data.data})
          } else {
            console.log("lỗi lấy product");
          }
        })
        .catch(err => console.log(err))
    }

    onChangeQuantity(id, value) {
      const { items } = this.state;
      let new_items = items
      const idx = new_items.findIndex(i => i.id  == id)
      if (idx != -1) {
        new_items[idx].quantity = value
      }
      this.setState({items: new_items})
    }

    deleteItem(id) {
      let new_items = this.state.items
      new_items = new_items.filter(i => i.id  !== id)
      this.setState({items: new_items})
    }

    renderOrderItems = () => {
      return(
        this.state.items.map(i =>
          <Card style={{width:"100%", height: 50, display: "inline-flex"}} className="card-item" key={i.id}>
            <div style={{width: "16em", marginTop: 4}}>{i.name}</div>
            <div style={{marginTop: 4}}>{i.price} x</div>
            <InputNumber min={1} max={99} size={50} defaultValue={i.quantity || 1} onChange={this.onChangeQuantity.bind(this, i.id)} />
            <div style={{marginTop: 4, width: 100}}>= { i.quantity * i.price } VND</div>
            <Icon className="btn-delete-item" type="delete" onClick={() => this.deleteItem(i.id)}/>
          </Card>
        )
      )
    }

    onSelectProduct = (id) => {
      const { data, items } = this.state;
      const selectedItem = data.find(d => d.id == id)
      selectedItem.quantity = 1
      let new_items = items
      const idx = new_items.findIndex(i => i.id == id)
      if (idx == -1) {
        new_items.push(selectedItem)
      } else {
        new_items[idx].quantity += 1
      }
      this.setState({items: new_items})
    }

    genTotal = () => {
      let total = 0
      this.state.items.map(i => {
        total += (i.quantity * i.price)
      })
      return total
    }

    hideModal = () => {
      this.props.onCancel()
      this.getDefauthState()
    }

    handleOke = (items) => {
      this.props.onCreate(items);
      // this.getDefauthState()
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      const { data, discount, shipping_fee, items, user_id, address, phone, note } = this.state;
      const options = data.map(d =>
        <Option key={d.id}>
          <div><span>({d.id})  {d.name}</span><span style={{float: "right"}}>{d.price}VND</span></div>
        </Option>
      );
      const all_total_price = this.genTotal() + parseInt(shipping_fee) - parseInt(discount)
      return (
        <Modal
          visible={visible}
          title="Tạo mới đơn hàng"
          okText="Tạo"
          width={800}
          onCancel={() => this.hideModal()}
          onOk={() => this.handleOke(items)}
        >
          <Row>
            <Form layout="vertical">
              <Col span={8}>
                <FormItem label="Tên khách hàng">
                  {getFieldDecorator('user_id', {
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                  })(
                    <Input onChange={(e) => this.setState({user_id: e.target.value || 0})}/>
                  )}
                </FormItem>
                <FormItem label="Số điện thoại">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                  })(
                    <Input onChange={(e) => this.setState({phone: e.target.value || 0})}/>
                  )}
                </FormItem>
                <FormItem label="địa chỉ">
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                  })(
                    <Input onChange={(e) => this.setState({address: e.target.value || 0})}/>
                  )}
                </FormItem>
                <FormItem label="phí ship">
                  {getFieldDecorator('shipping_fee', {
                    rules: [{ required: false, message: 'Please input the title of collection!' }],
                  })(
                    <Input type="number" addonAfter="VND" onChange={(e) => this.setState({shipping_fee: e.target.value || 0})}/>
                  )}
                </FormItem>
                <FormItem label="Chiết khấu">
                  {getFieldDecorator('discount')(
                    <Input type="number" addonAfter="VND" onChange={(e) => this.setState({discount: e.target.value || 0})}/>
                  )}
                </FormItem>
                <FormItem label="Ghi chú">
                  {getFieldDecorator('note')(<Input type="textarea" onChange={(e) => this.setState({note: e.target.value || 0})}/>)}
                </FormItem>
              </Col>
              <Col span={16}>
                <div style={{height: "30em", margin: "0px 10px 0px 20px"}}>
                  <Select
                    mode="combobox"
                    value={this.state.value}
                    placeholder={"Tìm kiếm sản phẩm"}
                    notFoundContent="Không tìm thấy sản phẩm"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={debounce(this.searchProduct, 300, { 'maxWait': 1000 })}
                    onSelect={this.onSelectProduct}
                  >
                    {options}
                  </Select>
                  <div style={{border: "1px solid #2222", borderRadius: 5, height: "calc(100% - 40px)", marginTop: 5}}>
                    {this.renderOrderItems()}
                  </div>
                </div>
                <div style={{height: "12em", padding: 20}}>
                  <div style={{fontSize: 15}}> Tổng tiền: <span>{this.genTotal()} VND</span></div>
                  <div style={{fontSize: 15}}> Phí ship: <span>{shipping_fee} VND</span></div>
                  <div style={{fontSize: 15}}> Chiết khấu: <span>{discount} VND</span></div>
                  <div style={{fontSize: 30}}>
                    Cần thu: <span>{all_total_price} VND</span>
                    <Tooltip placement="topLeft" title={"In hóa đơn"}>
                      <Button style={{float: "right"}} icon={"printer"} onClick={() => handlePrintOrder(user_id, address, phone, note, discount, shipping_fee, items, all_total_price)}></Button>
                    </Tooltip>
                  </div>
                </div>
              </Col>
            </Form>
          </Row>
        </Modal>
      );
    }
  }
);

const CollectionEditForm = Form.create()(
  class extends React.Component {
    state = {
      data: [],
      value: '',
      items: [],
      shipping_fee: 0,
      discount: 0,
      user_id: null,
      address: null,
      phone: null,
      note: null,
    }

    componentWillReceiveProps(nextProps) {
      const { selectedOrder } = this.props;
      if (!isEqual(selectedOrder, nextProps.selectedOrder)) {
        this.setState({
          items: nextProps.selectedOrder && nextProps.selectedOrder.items || [],
          shipping_fee: nextProps.selectedOrder && nextProps.selectedOrder.shipping_fee,
          discount: nextProps.selectedOrder && nextProps.selectedOrder.discount,
          user_id: nextProps.selectedOrder && nextProps.selectedOrder.user_id,
          address: nextProps.selectedOrder && nextProps.selectedOrder.address,
          phone: nextProps.selectedOrder && nextProps.selectedOrder.phone,
          note: nextProps.selectedOrder && nextProps.selectedOrder.note,
        })
      }
    }

    getDefauthState = () => {
      this.setState({
        data: [],
        value: '',
        items: [],
        shipping_fee: 0,
        discount: 0,
        user_id: null,
        address: null,
        phone: null,
        note: null,
      })
    }

    searchProduct = (value) => {
      this.setState({value: value})
      let url = `http://localhost:8880/api/products/search?value=${value}`;
        axios.get(url)
        .then(({ data }) => {
          if (data.success) {
            this.setState({data: data.data})
          } else {
            console.log("lỗi lấy product");
          }
        })
        .catch(err => console.log(err))
    }

    onChangeQuantity(id, value) {
      const { items } = this.state;
      let new_items = items
      const idx = new_items.findIndex(i => i.id  == id)
      if (idx != -1) {
        new_items[idx].quantity = value
      }
      this.setState({items: new_items})
    }

    deleteItem(id) {
      let new_items = this.state.items
      new_items = new_items.filter(i => i.id  !== id)
      this.setState({items: new_items})
    }

    renderOrderItems = () => {
      return(
        this.state.items.map(i =>
          <Card style={{width:"100%", height: 50, display: "inline-flex"}} className="card-item" key={i.id}>
            <div style={{width: "16em", marginTop: 4}}>{i.name}</div>
            <div style={{marginTop: 4}}>{i.price} x</div>
            <InputNumber min={1} max={99} size={50} defaultValue={i.quantity || 1} onChange={this.onChangeQuantity.bind(this, i.id)} />
            <div style={{marginTop: 4, width: 100}}>= { i.quantity * i.price } VND</div>
            <Icon className="btn-delete-item" type="delete" onClick={() => this.deleteItem(i.id)}/>
          </Card>
        )
      )
    }

    onSelectProduct = (id) => {
      const { data, items } = this.state;
      const selectedItem = data.find(d => d.id == id)
      selectedItem.quantity = 1
      let new_items = items
      const idx = new_items.findIndex(i => i.id == id)
      if (idx == -1) {
        new_items.push(selectedItem)
      } else {
        new_items[idx].quantity += 1
      }
      this.setState({items: new_items})
    }

    genTotal = () => {
      let total = 0
      this.state.items.map(i => {
        total += (i.quantity * i.price)
      })
      return total
    }

    hideModal = () => {
      this.props.onCancel()
      this.getDefauthState()
    }

    handleOke = (items) => {
      this.props.onEdit(items)
    }

    render() {
      const { visible, onCancel, onEdit, form, selectedOrder } = this.props;
      const { getFieldDecorator } = form;
      console.log('selectedOrder', selectedOrder);

      const { data, discount, shipping_fee, items, user_id, phone, address, note } = this.state;
      const options = data.map(d =>
        <Option key={d.id}>
          <div><span>({d.id})  {d.name}</span><span style={{float: "right"}}>{d.price}VND</span></div>
        </Option>
      );
      const all_total_price = this.genTotal() + parseInt(shipping_fee) - parseInt(discount)
      return (
        <Modal
          visible={visible}
          title="Sửa thông tin đơn hàng"
          width={800}
          okText="Sửa"
          onCancel={() => this.hideModal()}
          onOk={() => this.handleOke(items)}
        >
          <Row>
            <Form layout="vertical">
              <Col span={8}>
                <FormItem label="Tên khách hàng">
                  {getFieldDecorator('user_id', {
                    initialValue: selectedOrder && selectedOrder.user_id,
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                  })(
                    <Input onChange={(e) => this.setState({user_id: e.target.value})}/>
                  )}
                </FormItem>
                <FormItem label="Số điện thoại">
                  {getFieldDecorator('phone', {
                    initialValue: selectedOrder && selectedOrder.phone || selectedOrder && selectedOrder.phone_number,
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                  })(
                    <Input onChange={(e) => this.setState({phone: e.target.value})}/>
                  )}
                </FormItem>
                <FormItem label="địa chỉ">
                  {getFieldDecorator('address', {
                    initialValue: selectedOrder && selectedOrder.address,
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                  })(
                    <Input onChange={(e) => this.setState({address: e.target.value})}/>
                  )}
                </FormItem>
                <FormItem label="phí ship">
                  {getFieldDecorator('shipping_fee', {
                    initialValue: selectedOrder && selectedOrder.shipping_fee,
                    rules: [{ required: false, message: 'Please input the title of collection!' }],
                  })(
                    <Input type="number" addonAfter="VND" onChange={(e) => this.setState({shipping_fee: e.target.value || 0})}/>
                  )}
                </FormItem>
                <FormItem label="Chiết khấu">
                  {getFieldDecorator('discount', {
                    initialValue: selectedOrder && selectedOrder.discount,
                  })(
                    <Input type="number" addonAfter="VND" onChange={(e) => this.setState({discount: e.target.value || 0})}/>
                  )}
                </FormItem>
                <FormItem label="Ghi chú">
                  {getFieldDecorator('note', {
                    initialValue: selectedOrder && selectedOrder.note,
                  })(<Input type="textarea" onChange={(e) => this.setState({note: e.target.value})}/>)}
                </FormItem>
              </Col>
              <Col span={16}>
                <div style={{height: "30em", margin: "0px 10px 0px 20px"}}>
                  <Select
                    mode="combobox"
                    value={this.state.value}
                    placeholder={"Tìm kiếm sản phẩm"}
                    notFoundContent="Không tìm thấy sản phẩm"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={debounce(this.searchProduct, 300, { 'maxWait': 1000 })}
                    onSelect={this.onSelectProduct}
                  >
                    {options}
                  </Select>
                  <div style={{border: "1px solid #2222", borderRadius: 5, height: "calc(100% - 40px)", marginTop: 5}}>
                    {this.renderOrderItems()}
                  </div>
                </div>
                <div style={{height: "12em", padding: 20}}>
                  <div style={{fontSize: 15}}> Tổng tiền: <span>{this.genTotal()} VND</span></div>
                  <div style={{fontSize: 15}}> Phí ship: <span>{shipping_fee} VND</span></div>
                  <div style={{fontSize: 15}}> Chiết khấu: <span>{discount} VND</span></div>
                  <div style={{fontSize: 30}}>
                    Cần thu: <span>{all_total_price} VND</span>
                    <Tooltip placement="topLeft" title={"In hóa đơn"}>
                      <Button style={{float: "right"}} icon={"printer"} onClick={() => handlePrintOrder(user_id, address, phone, note, discount, shipping_fee, items, all_total_price)}></Button>
                    </Tooltip>
                  </div>
                </div>
              </Col>
            </Form>
          </Row>
        </Modal>
      );
    }
  }
);

class Order extends Component {
  static info = {
    title: "Quản lý đơn hàng",
    style
  }

  state = {
    showModalNewOrder: false,
    showModalEdit: false,
    selectedOrder: null,
    selectedIds: [],
    selectedRowKeys: [],
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getOrderData("all"));
  }

  showModalNewOrder = () => {
    this.setState({showModalNewOrder: true})
  }

  editModal = (id) => {
    const { orders } = this.props;
    const selectedOrder = orders.data.find((p) => p.id == id)
    this.setState({selectedOrder: selectedOrder, showModalEdit: true})
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ showModalNewOrder: false, showModalEdit: false });
  }

  handleCreate = (items) => {
    const form = this.formRef.props.form;
    console.log('ssssss');
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        form.resetFields();
        let url = `http://localhost:8880/api/orders/create`;
        values.items = items
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Tạo đơn hàng thành công', null)
            dispatch(getOrderData("all"))
            this.setState({ showModalNewOrder: false });
          } else {
            console.log("lỗi lấy product");
          }
        })
        .catch(err => console.log(err))
      } else {
        return;
      }
    });
  }

  handleEdit = (items) => {
    const form = this.formRef.props.form;
    const { dispatch } = this.props;
    const { selectedOrder } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        let url = `http://localhost:8880/api/orders/edit`;
        values.id = selectedOrder.id
        values.items = items
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Sửa đơn hàng thành công', null)
            dispatch(getOrderData("all"))
            this.setState({ showModalEdit: false });
            form.resetFields();
          } else {
            openNotificationWithIcon('error', 'Đã xảy ra lỗi, vui lòng thử lại sau', null)
          }
        })
        .catch(err => console.log(err))
      } else {
        return;
      }
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  deleteElement = (ids) => {
    const { dispatch } = this.props;
    let url = `http://localhost:8880/api/orders/delete`;
    axios.post(url, {listIds: ids},{ headers: { 'Content-Type': 'application/json' }})
    .then(({ data }) => {
      if (data.success) {
        openNotificationWithIcon('success', 'Xóa đơn hàng thành công', null)
        dispatch(getOrderData("all"))
        this.setState({ selectedIds: [], selectedRowKeys: [] });
      } else {
        openNotificationWithIcon('error', 'Đã xảy ra lỗi, vui lòng thử lại sau', null)
      }
    })
    .catch(err => console.log(err))
  }

  exportOrder = (data) => {
    let wb = { SheetNames: [], Sheets: {} };
    let initialDataOrders = [];
    if (data.length > 0) {
      data.map((d, index) => {
        const newObj = {
          "Mã đơn": d && d.id,
          "Tên khách hàng": d.name,
          "Địa chỉ": d.address,
          "số đt": d.phone,
          "Phí vận chuyển": d.shipping_fee,
          "Chiết khấu": d.discount,
          "Tổng tiền": d.total_price,
          "sản phẩm": JSON.stringify(d.items)
        }
        initialDataOrders.push(newObj)
      })

      let ws = XLSX.utils.json_to_sheet(initialDataOrders);
      let ws_name = "Đơn hàng";
      XLSX.utils.book_append_sheet(wb, ws, ws_name);

      let wbout  = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

      FileSaver.saveAs(new Blob([s2ab(wbout)], { type: "" }), `Danh sách đơn hàng.xlsx`);
    } else {
      openNotificationWithIcon('error', 'Đã xảy ra lỗi, vui lòng thử lại sau', null)
    }
  }

  render() {
    const { orders } = this.props;
    const { selectedIds, selectedRowKeys } = this.state;
    let data = cloneDeep(orders.data)
    data.forEach((p,idx) => {
      let total_price = 0
      p.items && p.items.forEach(i => {
        total_price += parseInt(i.price) * parseInt(i.quantity)
      })
      data[idx].key = p.id;
      data[idx].total_price = total_price + parseInt(p.shipping_fee) - parseInt(p.discount);
    })

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const selectedIds = selectedRows.map(r => r.id)
        this.setState({ selectedIds, selectedRowKeys })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const columns = [{
      title: 'mã đơn hàng',
      dataIndex: 'id',
      width: 100
    }, {
      title: 'Tên khách hàng',
      dataIndex: 'user_id',
      width: 250
    }, {
      title: 'Địa chỉ',
      dataIndex: 'address',
    }, {
      title: 'sdt',
      dataIndex: 'phone',
      width: 200
    }, {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      width: 200
    },{
      dataIndex: 'action',
      width: 48,
      title: '',
      key: 'x',
      render: (text, record) => {
        return (
          <div style={{display: 'inline-flex'}}>
            <Icon className="btn-edit-qr" type="edit" onClick={() => this.editModal(record.id)}/>
          </div>
        )
      }
    }];

    return(
      <div style={{padding: 15}}>
        <div className="title-manage">
          <span>Quản lý đơn hàng</span>
          <Button type="primary" icon="plus" style={{float: "right", marginTop: 10}} onClick={this.showModalNewOrder}>Thêm đơn hàng</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.showModalNewOrder}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

          <CollectionEditForm
            selectedOrder={this.state.selectedOrder}
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.showModalEdit}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
          />
          <Button disabled={selectedIds.length == 0} type="danger" icon="delete" style={{float: "right", marginTop: 10, marginRight: 10}} onClick={() => this.deleteElement(selectedIds)}>Xóa</Button>
          <Button icon="file-excel" style={{float: "right", marginTop: 10, marginRight: 10}} onClick={() => this.exportOrder(data)}>Tải xuống đơn hàng</Button>
        </div>
        <Table rowSelection={rowSelection} indentSize={15} columns={columns} dataSource={data} style={{backgroundColor: "#fff"}}/>
      </div>
    )
  }
}

export default justatee(Order)
