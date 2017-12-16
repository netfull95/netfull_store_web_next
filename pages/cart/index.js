import { Component } from 'react'
import update from 'immutability-helper'
import Link from 'next/link'
import Router from 'next/router'
import { reduce, findIndex } from 'lodash'
import { InputNumber } from 'antd'
import Notification from 'components/Notification'

import bigdaddy from 'hocs/bigdaddy'
import style from './index.scss'

class Cart extends Component {
  static info = {
    title: "Cart"
  }

  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      cartUpdate: []
    }
  }

  componentDidMount() {
    let cart = localStorage.getItem("cart")
    cart = cart ? JSON.parse(cart) : []

    this.setState({ cart })
  }

  getTotal = () => {
    if (this.state.cart && this.state.cart.length === 0) return

    let ret = reduce(this.state.cart, (acc, ele) => {
      let value = parseInt(ele.priceNumber) * parseInt(ele.quantity)
      return acc + value
    }, 0)

    console.log("ret", ret);
    return ret ? ret : 0
  }

  handleDelete = product => {
    let idx = findIndex(this.state.cart, ele => ele.name === product.name)
    let newState = update(this.state, { cart: { $splice: [[idx, 1]] } })
    localStorage.setItem("cart", JSON.stringify(newState.cart))

    this.setState({ cart: newState.cart })
  }

  changeQuantity = product => e => {
    console.log(e);
    let idx = findIndex(this.state.cart, ele => ele.name === product.name)
    let stateUpdate = update(this.state, { cart: { [idx]: { quantity: { $set: e } } } })
    this.setState({ cartUpdate: stateUpdate.cart })
  }

  updateCart = () => {
    if (this.state.cartUpdate && this.state.cartUpdate.length > 0) {
      this.setState({ cart: this.state.cartUpdate })
      localStorage.setItem("cart", JSON.stringify(this.state.cartUpdate))
      Notification.success("Update cart successfully!")
    }
    return
  }

  renderListItem = () => {
    const cart = this.state.cart

    if (!cart || cart.length === 0) return
      console.log(cart);

    return cart.map(ele => {
      return (
        <li key={ele.name} className="zg-cart-list--item is-flex" style={{ height: 180 }}>
          <span style={{ width: "20%", padding: 25, height: "inherit" }}>
            <img style={{ maxWidth: "100%", maxHeight: "100%" }} src={ele.mainImage} />
          </span>
          <span style={{ width: "30%" }}><Link href={ele.link}><a> {ele.name}</a></Link></span>
          <span style={{ width: "15%" }}> {ele.price}</span>
          <span style={{ width: "20%" }}> <InputNumber defaultValue={ele.quantity} min={0} max={100} step={1} onChange={this.changeQuantity(ele)} /></span>
          <span style={{ width: "15%" }}>$ {parseInt(ele.priceNumber) * parseInt(ele.quantity)}</span>
          <span style={{ position: "absolute", right: 0 }}
            className="is-clickable"
            onClick={() => this.handleDelete(ele)}
            ><i className="fa fa-times-circle-o" aria-hidden="true"></i></span>
        </li>
      )
    })
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <section className="blog-head">
            <div className="blog-head-container">
              <div className="blog-head-content">
                <h1 className="title">Your Cart</h1>
                <p style={{ marginBottom: 18 }}>It is a long established fact that a reader will be distracted</p>
                <Link href="/"><a style={{ color: '#fff' }}><i className="fa fa-home" /> Home</a></Link>
              </div>
            </div>
          </section>

        <section className="zg-cart-list is-flex is-horizontal-res">
          {
            this.state.cart && this.state.cart.length > 0
              ?  <div className="zg-cart-list__inner" style={{ width: "100%" }}>
                   <ul style={{ width: "100%" }}>
                      <li className="zg-cart-list--header">
                        <span style={{ width: "20%" }}>PRODUCT</span>
                        <span style={{ width: "30%" }}>NAME</span>
                        <span style={{ width: "15%" }}>PRICE</span>
                        <span style={{ width: "20%" }}>QUANTITY</span>
                        <span style={{ width: "15%" }}>TOTAL</span>
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
                            >Clear cart</span>
                          <span
                            onClick={this.updateCart}
                            className="cart-hover is-clickable"
                            style={{ cursor: "pointer", padding: "8px 20px", borderRadius: "25px", border: "1px solid #eeeeee", textAlign: "center", marginLeft: 15 }}
                          >Update cart</span>
                        </span>
                        <span
                          className="is-clickable"
                          style={{ color: "#fff",cursor: "pointer", padding: "8px 20px", borderRadius: "25px", border: "1px solid #eeeeee", textAlign: "center", backgroundColor: "#4666a3" }}
                          >Continue Shopping</span>
                      </li>
                    </ul>
                 </div>
            : <div style={{ backgroundColor: "#f8f8f8", height: 300, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ marginBottom: 20 }}>Oops! There is nothing here :(</span>
                <span
                  onClick={() => Router.push("/shop")}
                  style={{ cursor: "pointer", padding: "5px 10px", borderRadius: "5px", border: "3px solid #eeeeee", textAlign: "center" }}>Return to shop</span>
              </div>
          }
        </section>

        {
          this.state.cart && this.state.cart.length > 0 &&
          <section className="zg-cart-final is-flex is-horizontal-res">
            <div className="zg-cart--discount">
              <label for="coupon_code">Discount code</label>
              <span>Enter your code if you have one</span>
              <input
                className="cart-input"
                type="text" name="noo_coupon_code" id="noo_coupon_code" value="" placeholder="Coupon code" />
              <span
                className="is-clickable"
                style={{ width: 170, fontSize: 16, color: "#fff",cursor: "pointer", padding: "8px 20px", borderRadius: "25px", border: "1px solid #eeeeee", textAlign: "center", backgroundColor: "#4666a3" }}
              >APPLY COUPON</span>
            </div>
            <div className="zg-cart--cart-total">
              <label for="coupon_code">Cart Total</label>
              <div className="is-flex is-flex__space-between">
                <span>Sub total</span>
                <span>$ {this.getTotal()}</span>
              </div>
              <div className="is-flex is-flex__space-between">
                <span>Total</span>
                <span style={{ color: "#d2a637", fontSize: 28, fontWeight: 700 }}>$ {this.getTotal()}</span>
              </div>
              <div className="is-flex" style={{ justifyContent: "flex-end" }}>
                <span
                  onClick={() => Notification.success("Order Sent!", "We will call you soon")}
                  className="is-clickable"
                  style={{ fontSize: 16, color: "#fff",cursor: "pointer", padding: "8px 20px", borderRadius: "25px", border: "1px solid #eeeeee", textAlign: "center", backgroundColor: "#4666a3" }}
                >PROCEED TO CHECKOUT</span>
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