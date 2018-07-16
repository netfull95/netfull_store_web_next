import { Component } from 'react'
import Link from 'next/link'
import Router from "next/router"
import bigdaddy from 'hocs/bigdaddy'
import { getProductData, loadProductsSuccess } from "actions";
import axios from "axios";

class Shop extends Component {
   static info = {
    title: 'Cửa hàng'
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getProductData("all"));
  }

  searchProduct(event) {
    const { dispatch } = this.props;
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        const message = event.target.value;
        if (message !== '') {
          let url = `http://localhost:8880/api/products/search?value=${message}`;
          axios.get(url)
          .then(({ data }) => {
            if (data.success) {
              dispatch(loadProductsSuccess(data.data))
            } else {
              console.log("lỗi lấy product");
            }
          })
          .catch(err => console.log(err))
        }
      }
    }
  }

  render() {
    const { products } = this.props;
    return(
      <div className="container" style={{ marginBottom: 50 }}>
        <section className="shop-head">
          <div className="shop-head-container">
            <div className="shop-head-content">
              <h1 className="title">Cửa hàng</h1>
              <p style={{ marginBottom: 15 }}>Điện máy Phong Tiệp cam kết đem đến cho khách hàng sản phẩm tốt nhất, với mức giá cực ưu đãi</p>
              <Link href="/"><a style={{ color: '#fff' }}><i className="fa fa-home" />Trang chủ</a></Link>
            </div>
          </div>
        </section>

        <section className="shop-container is-flex is-flex__space-between is-horizontal-res">
          <section className="net-product is-horizontal-res is-padding-20" style={{ marginRight: 15 }}>
            {products && products.length > 0 ?
              products.map(p => {
                return(
                  <div className="net-product--item is-clickable" onClick={() => typeof window !== "undefined" && window.location.assign(`/shop/product?id=${p.id}`)}>
                    <div className="is-vertical-flex is-text-center is-padding-20">
                      <h3>{p.name}</h3>
                    </div>
                    <div className="net-product--item__carousel">
                      <img src={p.images} />
                    </div>
                    <div className="net-product--item__price">
                      {p && p.price}VND
                    </div>
                  </div>
                )
              })
            : null}
          </section>

          <aside style={{ width: 300, marginTop: 120, backgroundColor: '#fff' }}>
            <div className="shop-navigation">
              <div className="item" style={{ paddingTop: 0 }}>
                <h4>Tìm kiếm</h4>
                <div className="form">
                  <input onKeyPress={(e) => this.searchProduct(e)} placeholder="Nhập để tìm kiếm..." />
                  <i className="fa fa-search" />
                </div>
              </div>
              <div className="item menu categories">
                <h4>Danh mục sản phẩm</h4>
                <ul>
                  <li><a href="#">Tất cả</a> .</li>
                  <li><a href="#">Tivi</a> .</li>
                  <li><a href="#">Điều hòa</a> .</li>
                  <li><a href="#">Máy giặt</a> .</li>
                  <li><a href="#">Tủ lạnh</a> .</li>
                  <li><a href="#">Máy lọc nước</a> .</li>
                </ul>
              </div>
              <div className="item menu">
                <h4>Bài viết gần đây</h4>
                <ul>
                  <li>
                    <a href="#">Cách bảo quản thực phẩm an toàn, dài lâu</a>
                  </li>
                  <li>
                    <a href="#">Điều kiện bảo hành sản phẩm</a>
                  </li>
                  <li>
                    <a href="#">Cách dùng điều hòa tiết kiệm, bền bỉ</a>
                  </li>
                  <li>
                    <a href="#">Đặt tủ lạnh ở đâu cho phù hợp</a>
                  </li>
                  <li>
                    <a href="#">Cơ hội vàng mùa World Cup</a>
                  </li>
                </ul>
              </div>
              <div className="item shop-tags">
                <h4>shop tag</h4>
                <div>
                  <a href="#" className="tag-link">Bán chạy</a>
                  <a href="#" className="tag-link">Mùa hè</a>
                  <a href="#" className="tag-link">World Cup</a>
                  <a href="#" className="tag-link">Yêu thích</a>
                  <a href="#" className="tag-link">An toàn</a>
                  <a href="#" className="tag-link">Được ưa chượng</a>
                  <a href="#" className="tag-link">Thú vị</a>
                  <a href="#" className="tag-link">Công nghệ mới</a>
                  <a href="#" className="tag-link">Giảm giá sock</a>
                  <a href="#" className="tag-link">thân thiện môi trường</a>
                  <a href="#" className="tag-link">tips</a>
                  <a href="#" className="tag-link">trends</a>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    )
  }
}

export default bigdaddy(Shop)
