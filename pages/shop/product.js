import { Component } from 'react'
import Link from 'next/link'
import { findIndex } from 'lodash'
import Router from 'next/router'

import Notification from 'components/Notification'
import bigdaddy from 'hocs/bigdaddy'

class Shop extends Component {
   static info = {
    title: 'Shop'
  }

  static async getInitialProps(ctx) {
    let query = ctx.query

    if (query && query.name && data[query.name]) return { product: data[query.name] }
    return { product: {} }
  }

  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  handleAddToCart = () => {
    let afterAdd

    let cart = localStorage.getItem("cart")
    console.log("cart in ls", cart);

    if (!cart) {
      console.log("not cart");
      let product = this.props.product
      product.quantity = 1
      afterAdd = [product]
      console.log("fta", afterAdd);
      localStorage.setItem("cart", JSON.stringify(afterAdd))
    } else {
      let cartObject = JSON.parse(cart)
      console.log("cart after parse", cartObject);

      let existed = findIndex(cartObject, ele => ele.name === this.props.product.name)
      console.log("is existed?", existed);

      if (existed >= 0) {
        console.log("cartObjectc ", cartObject);
        cartObject[existed].quantity = cartObject[existed].quantity + 1
        localStorage.setItem("cart", JSON.stringify(cartObject))
        Notification.success("Success!")
      } else {
        let product = this.props.product
        product.quantity = 1
        cartObject.push(product)
        localStorage.setItem("cart", JSON.stringify(cartObject))
        Notification.success("Success!")
      }

    }
    Router.push("/cart")
  }

  render() {
    const { name, price, retail, mainImage, image1, image2 } = this.props.product
    console.log("hi");
    return(
      <div className="container" style={{ marginBottom: 50 }}>
        <section className="shop-head">
          <div className="shop-head-container">
            <div className="shop-head-content">
              <h1 className="title">{name}</h1>
              <p style={{ marginBottom: 15 }}>Shop through our latest selection of Armchair and Sofa Umbra design.</p>
              <Link href="/"><a style={{ color: '#fff' }}><i className="fa fa-home" />Home</a></Link>
            </div>
          </div>
        </section>

        <section className="zg-pdetail is-flex is-flex__space-between is-padding-25" style={{ height: '580px', backgroundColor: '#fff' }}>
          <div className="zg-pdetail--images" style={{ width: '55%', padding: '25px', display: 'flex' }}>
            <div style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <img width="inherit" height="auto" src={mainImage} />
            </div>

            <div className="zg-pdetail--variant" style={{ display: 'flex', flexDirection: 'column', width: '20%', justifyContent: 'center' }}>
              <img style={{ width: 'inherit' }} src={image1} />
              <img width="100%" src={image2} />
            </div>
          </div>

          <div className="zg-pdetail--detail" style={{ width: '45%', padding: "20px 40px 20px 0" }}>
            <div className="zg-pdetail--title">
              <h2>{name}</h2>
              <div style={{ color: "#d2a637", fontSize: 14, marginTop: 15 }}>{retail} <strong style={{ fontSize: 18 }}>{price}</strong></div>
              <div style={{ padding: "20px 0 30px", borderTop: "1px solid #eeeeee", borderBottom: "1px solid #eeeeee", marginTop: 20, fontSize: 12 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae tortor urna. Mauris non tincidunt ipsum, vel dignissim ipsum. Morbi erat sapien, hendrerit ut convallis eu, pretium eleifend sapien
              </div>
              <div style={{ padding: "20px 0", borderBottom: "1px solid #eeeeee" }}>
                <div style={{ fontColor: "#77a464", fontSize: 12, marginBottom: 15 }}>In Stock</div>
                <div>
                  <span
                    onClick={this.handleAddToCart}
                    className="is-clickable"
                    style={{ padding: "6px 10px", borderRadius: "25px", backgroundColor: "#4666a3", color: "#fff", fontSize: 13 }}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to cart
                  </span>
                  <span style={{ borderRadius: "50%", marginLeft: 10, padding: "6px 8px", backgroundColor: "#f2f2f2" }}><i className="fa fa-heart-o" aria-hidden="true"></i></span>
                </div>
              </div>

              <div style={{ padding: "20px 0", borderBottom: "1px solid #eeeeee", fontSize: 12 }}>
                <div>CATEGORIES: Armchair, Decor</div>
                <div>TAG: Armchair</div>
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

        <section className="is-flex is-horizontal-res" style={{ backgroundColor: "#fff", margin: "30px auto", padding: 30 }}>
          <div style={{ width: "20%", padding: 15 }}>
            <span style={{ color: "#d2a637" }}>Description</span>
          </div>

          <div style={{ width: "80%", padding: 15 }}>
            <p style={{ fontSize: 12 }}>Despite looking like a long lost classic from Saarinen’sgreat studio, Foersom & Hiort-Lorenzen’s Flamingo was in fact launched at The Furniture Fair in Copenhagen in 2003. It has proven to be a very popular chair in a very short time for business and homes alike. The chair is a curved shell balanced on a slim wire foot. With its delicate outlines it is an example of the very best that modern upholstering technique has to offer. The shells are inordinately slender and sharply outlined. The development of moulded self supporting units has made it possible to fasten the elements to a light frame and create a strong chair with an elegant appearance. Flamingo has a subtle references to the wing span of a bird.</p>
          </div>
        </section>

        <section style={{ marginTop: 60 }}>
          <div className="zg-product--header is-flex">
            <span>Related Products</span>
          </div>

          <div className="zg-product--description is-flex">
            <span>The best of 2016</span>
          </div>

          <section className="shop-container is-flex is-flex__space-between">
            <section className="zg-product is-horizontal-res is-padding-20" style={{ marginTop: 10 }}>
              <div className="zg-product--list is-flex is-flex__center">
                <div className="zg-product--item">
                  <div className="is-vertical-flex is-text-center is-padding-20">
                    <h3>MODERN RED CHAIR</h3>
                    <span>Decor</span>
                  </div>
                  <div className="zg-product--item__carousel">
                    <img width="300" height="300" src="/static/images/4-300x300.jpg" />
                  </div>
                  <div className="zg-product--item__price">
                    $300.00
                  </div>
                </div>

                <div className="zg-product--item">
                  <div className="is-vertical-flex is-text-center is-padding-20">
                    <h3>THE SIGNATURE CHAIR</h3>
                    <span>Armchair</span>
                  </div>

                  <div className="zg-product--item__carousel">
                    <img width="300" height="300" src="/static/images/fh429_walnut-oil_sif95_side-300x300.jpg" />
                  </div>
                  <div className="zg-product--item__price">
                    $450.00
                  </div>
                </div>

                <div className="zg-product--item">
                  <span className="zg-product--item__sticky">Sale</span>

                  <div className="is-vertical-flex is-text-center is-padding-20">
                    <h3>EGG CHAIR</h3>
                    <span>Armchair</span>
                  </div>

                  <div className="zg-product--item__carousel">
                    <img width="300" height="300" src="/static/images/3-300x300.jpg" />
                  </div>
                  <div className="zg-product--item__price">
                    $200.00
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      </div>
    )
  }
}

const data = {
  product1: {
    name: "FLAMINGO CHAIR",
    link: "/shop/product?name=product1",
    price: "$199.00",
    priceNumber: 199,
    retail: "$211.00",
    mainImage: "/static/images/3-300x300.jpg",
    image1: "/static/images/4-300x300.jpg",
    image2: "/static/images/6-300x300.jpg"
  },
  product2: {
    name: "HANSEN RO CHAIR",
    link: "/shop/product?name=product2",
    price: "$199.00",
    retail: "$211.00",
    priceNumber: 199,
    mainImage: "/static/images/17-300x300.jpg",
    image1: "/static/images/4-300x300.jpg",
    image2: "/static/images/6-300x300.jpg"
  },
  product3: {
    name: "CUBA CHAIR",
    price: "$150.00",
    priceNumber: 150,
    link: "/shop/product?name=product3",
    retail: "$200.00",
    mainImage: "/static/images/10-300x300.jpg",
    image1: "/static/images/4-300x300.jpg",
    image2: "/static/images/6-300x300.jpg"
  },
  product4: {
    name: "MODERN RED CHAIR",
    link: "/shop/product?name=product4",
    price: "$219.00",
    retail: "$300.00",
    priceNumber: 219,
    mainImage: "/static/images/4-300x300.jpg",
    image1: "/static/images/4-300x300.jpg",
    image2: "/static/images/6-300x300.jpg"
  },
  product5: {
    name: "THE SIGNATURE CHAIR",
    priceNumber: 199,
    price: "$199.00",
    retail: "$211.00",
    mainImage: "/static/images/fh429_walnut-oil_sif95_side-300x300.jpg",
    image1: "/static/images/4-300x300.jpg",
    link: "/shop/product?name=product5",
    image2: "/static/images/6-300x300.jpg"
  },
  product6: {
    name: "EGG CHAIR",
    priceNumber: 199,
    price: "$199.00",
    retail: "$211.00",
    mainImage: "/static/images/3-300x300.jpg",
    image1: "/static/images/4-300x300.jpg",
    link: "/shop/product?name=product6",
    image2: "/static/images/6-300x300.jpg"
  }
}

export default bigdaddy(Shop)
