import Router from 'next/router'

const SectionProductListItem = () => (
  <section className="zg-product is-horizontal-res is-padding-20">
    <div className="zg-product--header is-flex">
      <span>Top sản phẩm</span>
    </div>

    <div className="zg-product--description is-flex">
      <span>Bán chạy nhất tháng 5</span>
    </div>

    <div className="zg-product--list">
      <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product?name=product1")}>
        {/*<span className="zg-product--item__sticky-ani">Buy</span>*/}
        <span className="zg-product--item__sticky">Sale</span>
        <div className="is-vertical-flex is-text-center is-padding-20">
          <h3>Tên sp</h3>
          <span>Loại sp</span>
        </div>
        <div className="zg-product--item__carousel">
          <img src="#" />
        </div>
        <div className="zg-product--item__price">
          Giá sp
        </div>
      </div>

      <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product?name=product2")}>
        {/*<span className="zg-product--item__sticky-ani">Buy</span>*/}
        <div className="is-vertical-flex is-text-center is-padding-20">
          {/*<h3>FLAMINGO CHAIR</h3>
          <span>Armchair</span>*/}
        </div>

        <div className="zg-product--item__carousel">
          <img src="#" />
        </div>
        <div className="zg-product--item__price">
          {/*$450.00*/}
        </div>
      </div>

      <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product?name=product3")}>
        {/*<span className="zg-product--item__sticky-ani">Buy</span>*/}
        <div className="is-vertical-flex is-text-center is-padding-20">
          {/*<h3>CUBA CHAIR</h3>
          <span>Chairs</span>
*/}        </div>

        <div className="zg-product--item__carousel">
          {/*<img src="/static/images/10-300x300.jpg" />*/}
        </div>
        <div className="zg-product--item__price">
          {/*$200.00*/}
        </div>
      </div>
    </div>

    <div className="zg-product--list">
      <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product?name=product4")}>
        <span className="zg-product--item__sticky-ani">Buy</span>
        <div className="is-vertical-flex is-text-center is-padding-20">
         {/* <h3>MODERN RED CHAIR</h3>
          <span>Decor</span>*/}
        </div>
        <div className="zg-product--item__carousel">
          {/*<img src="/static/images/4-300x300.jpg" />*/}
        </div>
        <div className="zg-product--item__price">
          {/*$300.00*/}
        </div>
      </div>

      <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product?name=product5")}>
        <span className="zg-product--item__sticky-ani">Buy</span>
        <div className="is-vertical-flex is-text-center is-padding-20">
          <h3>THE SIGNATURE CHAIR</h3>
          <span>Armchair</span>
        </div>

        <div className="zg-product--item__carousel">
          <img src="/static/images/fh429_walnut-oil_sif95_side-300x300.jpg" />
        </div>
        <div className="zg-product--item__price">
          $450.00
        </div>
      </div>

      <div className="zg-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign("/shop/product?name=product6")}>
        <span className="zg-product--item__sticky-ani">Buy</span>
        <span className="zg-product--item__sticky">Sale</span>

        <div className="is-vertical-flex is-text-center is-padding-20">
          <h3>EGG CHAIR</h3>
          <span>Armchair</span>
        </div>

        <div className="zg-product--item__carousel">
          <img src="/static/images/3-300x300.jpg" />
        </div>
        <div className="zg-product--item__price">
          $200.00
        </div>
      </div>
    </div>
  </section>
)

export default SectionProductListItem