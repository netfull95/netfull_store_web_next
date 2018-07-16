import { Component } from 'react'
import update from 'immutability-helper'
import Link from 'next/link'
import Router from 'next/router'
import { reduce, findIndex, isEqual } from 'lodash'
import { InputNumber, Radio, Modal, Button, Input, Table, notification } from 'antd'
import Notification from 'components/Notification'
import axios from "axios"

import bigdaddy from 'hocs/bigdaddy'
import style from './index.scss'
const RadioGroup = Radio.Group;

const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

class Cart extends Component {
  static info = {
    title: "Cart"
  }

  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      cartUpdate: [],
      visible: false,
      user: {},
    }
  }

  componentDidMount() {
    let cart = localStorage.getItem("cart")
    cart = cart ? JSON.parse(cart) : []

    let user = localStorage && localStorage.getItem("user_data") || {}
    user = user && user.name ? JSON.parse(user) : {}

    this.setState({ cart, user })
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.auth, nextProps.auth)) {
      this.setState({user: nextProps.user})
    }
  }

  getTotal = () => {
    if (this.state.cart && this.state.cart.length === 0) return

    let ret = reduce(this.state.cart, (acc, ele) => {
      let value = parseInt(ele.price) * parseInt(ele.quantity)
      return acc + value
    }, 0)

    return ret ? ret : 0
  }

  handleDelete = product => {
    let idx = findIndex(this.state.cart, ele => ele.name === product.name)
    let newState = update(this.state, { cart: { $splice: [[idx, 1]] } })
    localStorage.setItem("cart", JSON.stringify(newState.cart))

    this.setState({ cart: newState.cart })
  }

  changeQuantity = product => e => {
    let idx = findIndex(this.state.cart, ele => ele.id === product.id)
    let stateUpdate = update(this.state, { cart: { [idx]: { quantity: { $set: e } } } })
    this.setState({ cartUpdate: stateUpdate.cart, cart: stateUpdate.cart })
  }

  updateCart = () => {
    if (this.state.cartUpdate && this.state.cartUpdate.length > 0) {
      this.setState({ cart: this.state.cartUpdate })
      localStorage.setItem("cart", JSON.stringify(this.state.cartUpdate))
      Notification.success("Cập nhật giỏ hàng thành công!")
    }
    return
  }

  renderListItem = () => {
    const cart = this.state.cart

    if (!cart || cart.length === 0) return

    return cart.map(ele => {
      return (
        <li key={ele.name} className="zg-cart-list--item is-flex" style={{ height: 180 }}>
          <span style={{ width: "20%", padding: 25, height: "inherit" }}>
            <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={`http://localhost:8090/${ele.images}`} />
          </span>
          <span style={{ width: "30%" }}><Link href={ele.link}><a> {ele.name}</a></Link></span>
          <span style={{ width: "15%" }}> {ele.price}</span>
          <span style={{ width: "20%" }}> <InputNumber defaultValue={ele.quantity} min={0} max={100} step={1} onChange={this.changeQuantity(ele)} /></span>
          <span style={{ width: "15%" }}> {parseInt(ele.price) * parseInt(ele.quantity)} VND</span>
          <span style={{ position: "absolute", right: 0 }}
            className="is-clickable"
            onClick={() => this.handleDelete(ele)}
            ><i className="fa fa-times-circle-o" aria-hidden="true"></i></span>
        </li>
      )
    })
  }

  handleOk = () => {
    const { auth } = this.props;
    const { cart } = this.state;
    let new_order = auth
    new_order.items = cart
    new_order.user_id = auth.name
    new_order.phone = auth.phone_number || auth.phone

    console.log('new_order', new_order);

    let url = `http://localhost:8880/api/orders/create`;
    let data = JSON.stringify(new_order)
    axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
    .then(({ data }) => {
      if (data.success) {
        openNotificationWithIcon('success', 'Tạo đơn hàng thành công', "Chúng tôi sẽ liên hệ và xác nhận đơn hàng của bạn trong thời gian sớm nhất!")
        this.setState({ visible: false, cart: [] });
        localStorage.setItem("cart", [])
        Router.push("/")
      } else {
        console.log("lỗi lấy product");
      }
    })
    .catch(err => console.log(err))
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  renderModal() {
    const { visible, cart } = this.state;
    const { auth } = this.props;

    const columns = [{
      title: 'Tên SP',
      dataIndex: 'name',
    }, {
      title: 'Đơn giá',
      dataIndex: 'price',
    }, {
      title: 'Số lượng',
      dataIndex: 'quantity',
    }, {
      title: 'Thành tiền',
      dataIndex: 'total_price',
    }];
    let sum_total_price = 0
    cart.forEach((i, idx) => {
      cart[idx].total_price = i.quantity * i.price;
      sum_total_price += (i.quantity * i.price)
    })
    const data = cart;
    return (
      <Modal
        visible={visible}
        title="Chi tiết đơn hàng"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={800}
        footer={[
          <Button key="back" size="large" onClick={this.handleCancel}>Hủy</Button>,
          <Button key="submit" type="primary" size="large" onClick={this.handleOk}>
            Xác nhận
          </Button>,
        ]}
      >
        <div style={{fontSize: 15}}>
          <div style={{height: 25}}>Tên khách hàng: <span style={{fontWeight: "bold"}}>{auth.name}</span></div>
          <div style={{height: 25}}>Địa chỉ: <span style={{fontWeight: "bold"}}>{auth.address}</span></div>
          <div style={{height: 25}}>Số điện thoại: <span style={{fontWeight: "bold"}}>{auth.phone || auth.phone_number}</span></div>
          <div style={{height: 25}}>Email: <span style={{fontWeight: "bold"}}>{auth.email}</span></div>
          <div style={{height: 30}}>Địa chỉ nhận khác (nếu có): <Input style={{width: "48em"}}/></div>
          <div style={{marginBottom: 5, height: 25}}>Hình thức thanh toán: <span style={{fontWeight: "bold"}}>COD (Thu tiền khi nhận hàng)</span></div>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            pagination={false}
            footer={() =>
              <div style={{fontSize: 15, height: 40, marginLeft: "38em"}}>
                <div>Giảm giá : 0 VND</div>
                <div>Tổng: {sum_total_price} VND</div>
              </div>
            }
          />
        </div>
      </Modal>
    )
  }

  render() {
    return (
      <div>
        <section className="blog-head">
            <div className="blog-head-container">
              <div className="blog-head-content">
                <h1 className="title">Giỏ Hàng</h1>
                <p style={{ marginBottom: 18 }}>Vui lòng kiểm tra chi tiết thông tin đơn hàng</p>
                <Link href="/"><a style={{ color: '#fff' }}><i className="fa fa-home" /> Trang chủ</a></Link>
              </div>
            </div>
          </section>

        <section className="zg-cart-list is-flex is-horizontal-res">
          {
            this.state.cart && this.state.cart.length > 0
              ?  <div className="zg-cart-list__inner" style={{ width: "100%" }}>
                   <ul style={{ width: "100%" }}>
                      <li className="zg-cart-list--header">
                        <span style={{ width: "20%" }}>Sản phẩm</span>
                        <span style={{ width: "30%" }}>Tên</span>
                        <span style={{ width: "15%" }}>Giá bán</span>
                        <span style={{ width: "20%" }}>Số lượng</span>
                        <span style={{ width: "15%" }}>Tổng tiền</span>
                      </li>
                      {this.renderListItem()}
                      <li style={{ display: "flex", justifyContent: "space-between", padding: "40px 20px" }}>
                        <span style={{ marginLeft: 20 }}>
                          <span
                            className="cart-hover is-clickable"
                            onClick={() => {
                              this.setState({ cart: [] })
                              localStorage.setItem("cart", [])
                              Notification.success("Your cart is empty now")
                            }}
                            style={{ cursor: "pointer", padding: "8px 20px", borderRadius: "25px", border: "1px solid #eeeeee", textAlign: "center" }}
                            >Xóa giỏ hàng</span>
                          <span
                            onClick={this.updateCart}
                            className="cart-hover is-clickable"
                            style={{ cursor: "pointer", padding: "8px 20px", borderRadius: "25px", border: "1px solid #eeeeee", textAlign: "center", marginLeft: 15 }}
                          >Cập nhật giỏ hàng</span>
                        </span>
                        <span
                          onClick={() => Router.push("/shop")}
                          className="is-clickable"
                          style={{ color: "#fff",cursor: "pointer", padding: "8px 20px", borderRadius: "25px", border: "1px solid #eeeeee", textAlign: "center", backgroundColor: "#4666a3" }}
                          >Tiếp tục mua sắm</span>
                      </li>
                    </ul>
                 </div>
            : <div style={{ backgroundColor: "#f8f8f8", height: 300, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ marginBottom: 20 }}>Oops! Có lỗi xảy ra rồi :(</span>
                <span
                  onClick={() => Router.push("/shop")}
                  style={{ cursor: "pointer", padding: "5px 10px", borderRadius: "5px", border: "3px solid #eeeeee", textAlign: "center" }}>Trở về cửa hàng</span>
              </div>
          }
        </section>

        {
          this.state.cart && this.state.cart.length > 0 &&
          <section className="zg-cart-final is-flex is-horizontal-res">
            <div className="zg-cart--discount">
              <label for="coupon_code">PHƯƠNG THỨC THANH TOÁN</label>
                <RadioGroup value={1} style={{height: 155, lineHeight: 1.7}}>
                  <Radio value={1} style={{lineHeight: 1.3}}>
                    <div>COD</div>
                    <span>Thu tiền khi nhận hàng</span>
                  </Radio>
                  <Radio disabled value={2} style={{lineHeight: 1.3}}>
                    <div>Thanh toán Online</div>
                    <span>Chức năng đang được cập nhật</span>
                  </Radio>
                </RadioGroup>
            </div>
            <div className="zg-cart--cart-total">
              <label for="coupon_code">TỔNG TIỀN</label>
              <div className="is-flex is-flex__space-between">
                <span>Giảm giá</span>
                <span>0 VND</span>
              </div>
              <div className="is-flex is-flex__space-between">
                <span>Tổng tiền</span>
                <span style={{ color: "#d2a637", fontSize: 28, fontWeight: 700 }}>{this.getTotal()} VND</span>
              </div>
              <div className="is-flex" style={{ justifyContent: "flex-end" }}>
                {this.props.auth && this.props.auth.name ?
                  <div>
                    <span
                      onClick={() => this.setState({visible: true}) }
                      className="is-clickable"
                      style={{ fontSize: 16, color: "#fff",cursor: "pointer", padding: "8px 20px", borderRadius: "25px", border: "1px solid #eeeeee", textAlign: "center", backgroundColor: "#4666a3" }}
                    >Thanh toán</span>
                    {this.renderModal()}
                  </div>
                  : <span style={{marginTop: 7, marginRight: 20}}>Vui lòng đăng nhập để tiến hành thanh toán</span>}
              </div>
            </div>
          </section>
        }

        <style dangerouslySetInnerHTML={{ __html: style }} />
      </div>
    )
  }
}

export default bigdaddy(Cart)