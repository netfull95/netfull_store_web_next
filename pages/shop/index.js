import { Component } from 'react'
import Link from 'next/link'
import Router from "next/router"

import bigdaddy from 'hocs/bigdaddy'

class Shop extends Component {
   static info = {
    title: 'Shop'
  }

  render() {
    return(
      <div className="container" style={{ marginBottom: 50 }}>
        <section className="shop-head">
          <div className="shop-head-container">
            <div className="shop-head-content">
              <h1 className="title">Shop</h1>
              <p style={{ marginBottom: 15 }}>Shop through our latest selection of Armchair and Sofa Umbra design.</p>
              <Link href="/"><a style={{ color: '#fff' }}><i className="fa fa-home" />Home</a></Link>
            </div>
          </div>
        </section>

        <section className="shop-container is-flex is-flex__space-between is-horizontal-res">
          <section className="zg-product is-horizontal-res is-padding-20" style={{ marginRight: 15 }}>
            <div className="zg-product--list">
              <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product")}>
                <span className="zg-product--item__sticky">Sale</span>
                <div className="is-vertical-flex is-text-center is-padding-20">
                  <h3>HANSEN RO CHAIR</h3>
                  <span>Armchair</span>
                </div>
                <div className="zg-product--item__carousel">
                  <img width="300" height="300" src="/static/images/17-300x300.jpg" />
                </div>
                <div className="zg-product--item__price">
                  $300.00
                </div>
              </div>

              <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product")}>
                <div className="is-vertical-flex is-text-center is-padding-20">
                  <h3>FLAMINGO CHAIR</h3>
                  <span>Armchair</span>
                </div>

                <div className="zg-product--item__carousel">
                  <img width="300" height="300" src="/static/images/6-300x300.jpg" />
                </div>
                <div className="zg-product--item__price">
                  $450.00
                </div>
              </div>

              <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product")}>
                <div className="is-vertical-flex is-text-center is-padding-20">
                  <h3>CUBA CHAIR</h3>
                  <span>Chairs</span>
                </div>

                <div className="zg-product--item__carousel">
                  <img width="300" height="300" src="/static/images/10-300x300.jpg" />
                </div>
                <div className="zg-product--item__price">
                  $200.00
                </div>
              </div>
            </div>

            <div className="zg-product--list">
              <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product")}>
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

              <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product")}>
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

              <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product")}>
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

          <aside style={{ width: 300, marginTop: 120, backgroundColor: '#fff' }}>
            <div className="shop-navigation">
              <div className="item" style={{ paddingTop: 0 }}>
                <h4>search</h4>
                <div className="form">
                  <input placeholder="Enter keyword to search..." />
                  <i className="fa fa-search" />
                </div>
              </div>
              <div className="item menu categories">
                <h4>shop categories</h4>
                <ul>
                  <li><a href="#">Bag Trend Alert</a> (3)</li>
                  <li><a href="#">Furniture Tips</a> (3)</li>
                  <li><a href="#">Inspired Ideas</a> (3)</li>
                  <li><a href="#">Interior Trends</a> (3)</li>
                </ul>
              </div>
              <div className="item menu">
                <h4>recent posts</h4>
                <ul>
                  <li>
                    <a href="#">Summer is Calling: Sophie Hulme Citrus Fruit Tote</a>
                  </li>
                  <li>
                    <a href="#">The New Marc Jacobs Gotham Saddle Bag Black</a>
                  </li>
                  <li>
                    <a href="#">Spring Color Bag Trends Summer 2016</a>
                  </li>
                  <li>
                    <a href="#">Freshen The Bed in a Beautiful Way</a>
                  </li>
                  <li>
                    <a href="#">Create Gallery Walls in 3 Fun Steps</a>
                  </li>
                </ul>
              </div>
              <div className="item shop-tags">
                <h4>shop tag</h4>
                <div>
                  <a href="#" className="tag-link">accessories</a>
                  <a href="#" className="tag-link">bags</a>
                  <a href="#" className="tag-link">Bedroom</a>
                  <a href="#" className="tag-link">crafts</a>
                  <a href="#" className="tag-link">decorating</a>
                  <a href="#" className="tag-link">furnishing</a>
                  <a href="#" className="tag-link">inspiring</a>
                  <a href="#" className="tag-link">insprired ideas</a>
                  <a href="#" className="tag-link">Interior Trends</a>
                  <a href="#" className="tag-link">living room</a>
                  <a href="#" className="tag-link">tips</a>
                  <a href="#" className="tag-link">trends</a>
                </div>
              </div>
              <div className="item ig-images" style={{ borderBottom: 0 }}>
                <h4>instagram photos</h4>
                <div className="image-list"><ul>
                  {igImages.map(item => (
                    <li key={item} style={{ width: 75, height: 75 }}><a><img src={item} width={75} height={75} /></a></li>
                  ))}
                </ul></div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    )
  }
}

const igImages = [
 "https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13257049_886478884831013_249118535_n.jpg",
 "https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13129933_280118965656340_2033838901_n.jpg",
 "https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13129121_1256124827748565_158663066_n.jpg",
 "https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13102328_1731108780505827_1843871631_n.jpg",
 "https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13126643_258134164540180_1041166948_n.jpg",
 "https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13269326_235439696833039_949850806_n.jpg",
 "https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13150898_486521964871587_225578953_n.jpg",
 "https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13116729_700539396751527_1765922109_n.jpg"
]

export default bigdaddy(Shop)
