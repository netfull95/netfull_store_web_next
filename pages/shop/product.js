import { Component } from 'react'
import Link from 'next/link'
import { findIndex } from 'lodash'
import Router from 'next/router'

import Notification from 'components/Notification'
import bigdaddy from 'hocs/bigdaddy'
import {getProductData} from "actions";

class Product extends Component {
   static info = {
    title: 'Shop - sản phẩm'
  }
  state = {
    selected_id: null
  }

  componentWillMount() {
    const { dispatch, url } = this.props;
    dispatch(getProductData("all"));
    const id = url.query && url.query.id;
    this.setState({ selected_id: id})
  }

  // componentDidMount() {
  //   const { url, propducts } = this.props;
  //   console.log('this.', this.props);
  //   const id = url.query && url.query.id;
  //   // console.log("this.props.query", this.props.query.url);
  // }

  handleAddToCart = (selectedProduct) => {
    let afterAdd

    let cart = localStorage.getItem("cart")
    let product = selectedProduct

    if (!cart) {
      product.quantity = 1
      afterAdd = [product]
      // console.log("fta", afterAdd);
      localStorage.setItem("cart", JSON.stringify(afterAdd))
      Notification.success("Success!")
    } else {
      let cartObject = JSON.parse(cart)
      // console.log("cart after parse", cartObject);

      let existed = findIndex(cartObject, ele => ele.name === product.name)
      // console.log("is existed?", existed);

      if (existed >= 0) {
        // console.log("cartObject ", cartObject);
        cartObject[existed].quantity = cartObject[existed].quantity + 1
        localStorage.setItem("cart", JSON.stringify(cartObject))
        Notification.success("Success!")
      } else {
        product.quantity = 1
        cartObject.push(product)
        localStorage.setItem("cart", JSON.stringify(cartObject))
        Notification.success("Success!")
      }

    }
  }

  render() {
    const { selected_id } = this.state;
    const { products } = this.props;
    let selectedProduct = {}
    if (selected_id && products) {
      selectedProduct = products.find(p => p.id == selected_id)
    }

    return(
      <div className="container" style={{ marginBottom: 50 }}>
        <section className="shop-head">
          <div className="shop-head-container">
            <div className="shop-head-content">
              <h1 className="title">{selectedProduct && selectedProduct.name}</h1>
              <p style={{ marginBottom: 15 }}>Điện máy Phong Tiệp cam kết đem đến cho khách hàng sản phẩm tốt nhất, với mức giá cực ưu đãi</p>
              <Link href="/"><a style={{ color: '#fff' }}><i className="fa fa-home" />Trang chủ</a></Link>
            </div>
          </div>
        </section>

        <section className="zg-pdetail is-flex is-flex__space-between is-padding-25" style={{ height: '580px', backgroundColor: '#fff' }}>
          <div className="zg-pdetail--images" style={{ width: '55%', padding: '25px', display: 'flex' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <img width="inherit" height="auto" src={`http://localhost:8090/${selectedProduct && selectedProduct.images}`} />
            </div>
          </div>

          <div className="zg-pdetail--detail" style={{ width: '45%', padding: "20px 40px 20px 0" }}>
            <div className="zg-pdetail--title">
              <h2>{selectedProduct && selectedProduct.name}</h2>
              <div style={{ color: "#d2a637", fontSize: 14, marginTop: 15 }}> <strong style={{ fontSize: 18 }}>{selectedProduct && selectedProduct.price} VND</strong></div>
              <div style={{ padding: "20px 0 30px", borderTop: "1px solid #eeeeee", borderBottom: "1px solid #eeeeee", marginTop: 20, fontSize: 12 }}>
                {selectedProduct && selectedProduct.description}
              </div>
              <div style={{ padding: "20px 0", borderBottom: "1px solid #eeeeee" }}>
                <div style={{ fontColor: "#77a464", fontSize: 12, marginBottom: 15 }}>Còn hàng</div>
                <div>
                  <span
                    onClick={() => this.handleAddToCart(selectedProduct)}
                    className="is-clickable"
                    style={{ padding: "6px 10px", borderRadius: "25px", backgroundColor: "#4666a3", color: "#fff", fontSize: 13 }}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> Thêm vào giở hàng
                  </span>
                  <span style={{ borderRadius: "50%", marginLeft: 10, padding: "6px 8px", backgroundColor: "#f2f2f2" }}><i className="fa fa-heart-o" aria-hidden="true"></i></span>
                </div>
              </div>

              <div style={{ padding: "20px 0", borderBottom: "1px solid #eeeeee", fontSize: 12 }}>
                <div>Danh mục: Sản phẩm</div>

              </div>

              <div style={{ padding: "35px 0", borderBottom: "1px solid #eeeeee", fontSize: 12 }}>
                <div>
                  <span style={{ marginRight: 20 }}>SHARE: </span>

                  <span style={{ padding: "7px 11px", borderRadius: "50%", backgroundColor: "#4666a3", color: "#fff", marginRight: 10 }}>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </span>

                  <span style={{ padding: "7px 9px", borderRadius: "50%", backgroundColor: "#4666a3", color: "#fff", marginRight: 10 }}>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </span>

                  <span style={{ padding: "7px 9px", borderRadius: "50%", backgroundColor: "#4666a3", color: "#fff", marginRight: 10 }}>
                    <i className="fa fa-google" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default bigdaddy(Product)
