import { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'

import style from './index.scss'
import bigdaddy from 'hocs/bigdaddy'
import { getPostData } from "actions";

class Blog extends Component {

  static info = {
    title: 'Bài viết',
    style
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getPostData("all"))
  }

  blogClick = item => () => Router.push(`/blog/detail?title=${item.title}&src=${item.src}`)

  renderBlog = (item, index) => (
    <div className="blog-card" key={index}>
      <div className="content-featured" onClick={this.blogClick(item)}>
        <img width={870} height="auto" src={item.image} />
      </div>
      <div className="entry-content">
        <h3>{item.title}</h3>
        <p>{item.message.substring(0, 100)}</p>
        <a onClick={this.blogClick(item)}>Xem thêm <i className="fa fa-angle-right" /></a>
      </div>
    </div>
  )

  render() {
    const { posts } = this.props;
    return (
      <div>
        <section className="blog-head">
          <div className="blog-head-container">
            <div className="blog-head-content">
              <h1 className="title">Bài viết</h1>
              <p>Cung cấp khách hàng những thông tin hữu ích</p>
              <Link href="/"><a style={{ color: '#fff' }}><i className="fa fa-home" /> Trang chủ</a></Link>
            </div>
          </div>
        </section>
        <div className="blog-container">
          <div className="blog-list">
            {posts.map((item, index) => this.renderBlog(item, index))}
            <div className="pagination">
              <span className="page-numbers current">1</span>
              <a className="page-numbers">2</a>
              <a className="next page-numbers">
                <i className="fa fa-long-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="shop-navigation">
              <div className="item" style={{ paddingTop: 0 }}>
                <h4>Tìm kiếm</h4>
                <div className="form">
                  <input placeholder="Nhập để tìm kiếm..." />
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
        </div>
      </div>
    )
  }
}

export default bigdaddy(Blog)
