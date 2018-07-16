import Router from 'next/router'
import React from 'react'
import {isEqual} from "lodash";

class SectionProductListItem extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <section className="zg-product is-horizontal-res is-padding-20">
        <div className="zg-product--header is-flex">
          <span>Top sản phẩm</span>
        </div>

        <div className="zg-product--description is-flex">
          <span>Bán chạy nhất tháng 6</span>
        </div>

        <div className="zg-product--list">
          <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign(`/shop/product?id=${products[0] && products[0].id}`)}>
            {/*<span className="zg-product--item__sticky-ani">Buy</span>*/}
            <span className="zg-product--item__sticky">Hot</span>
            <div className="is-vertical-flex is-text-center is-padding-20">
              <h3>{products[0] && products[0].name}</h3>
            </div>
            <div className="zg-product--item__carousel">
              <img src={products[0] && products[0].images} />
            </div>
            <div className="zg-product--item__price">
              {products[0] && products[0].price}VND
            </div>
          </div>

          <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign(`/shop/product?id=${products[1].id}`)}>
            <div className="is-vertical-flex is-text-center is-padding-20">
              <h3>{products[1] && products[1].name}</h3>
            </div>
            <div className="zg-product--item__carousel">
              <img src={products[1] && products[1].images} />
            </div>
            <div className="zg-product--item__price">
              {products[1] && products[1].price}VND
            </div>
          </div>

          <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign(`/shop/product?id=${products[2].id}`)}>
            {/*<span className="zg-product--item__sticky-ani">Buy</span>*/}
            <div className="is-vertical-flex is-text-center is-padding-20">
              <h3>{products[2] && products[2].name}</h3>
            </div>

            <div className="zg-product--item__carousel">
              <img src={products[2] && products[2].images} />
            </div>
            <div className="zg-product--item__price">
              {products[2] && products[2].price}VND
            </div>
          </div>
        </div>

        <div className="zg-product--list">
          <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign(`/shop/product?id=${products[3].id}`)}>
            <span className="zg-product--item__sticky-ani">Buy</span>
            <div className="is-vertical-flex is-text-center is-padding-20">
              <h3>{products[3] && products[3].name}</h3>
            </div>
            <div className="zg-product--item__carousel">
              <img src={products[3] && products[3].images} />
            </div>
            <div className="zg-product--item__price">
              {products[3] && products[3].price}VND
            </div>
          </div>

          <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign(`/shop/product?id=${products[4].id}`)}>
            <span className="zg-product--item__sticky-ani">Buy</span>
            <div className="is-vertical-flex is-text-center is-padding-20">
              <h3>{products[4] && products[4].name}</h3>
            </div>

            <div className="zg-product--item__carousel">
              <img src={products[4] && products[4].images} />
            </div>
            <div className="zg-product--item__price">
              {products[4] && products[4].price}VND
            </div>
          </div>

          <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign(`/shop/product?id=${products[5].id}`)}>
            <span className="zg-product--item__sticky-ani">Buy</span>
            <span className="zg-product--item__sticky">Sale</span>

            <div className="is-vertical-flex is-text-center is-padding-20">
              <h3>{products[5] && products[5].name}</h3>
            </div>

            <div className="zg-product--item__carousel">
              <img src={products[5] && products[5].images} />
            </div>
            <div className="zg-product--item__price">
              {products[5] && products[5].price}VND
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default SectionProductListItem