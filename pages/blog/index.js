import { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'

import style from './index.scss'
import bigdaddy from 'hocs/bigdaddy'

class Blog extends Component {

  static info = {
    title: 'Blog',
    style
  }

  blogClick = item => () => Router.push(`/blog/detail?title=${item.title}&src=${item.src}`)

  renderBlog = (item, index) => (
    <div className="blog-card" key={index}>
      <div className="content-featured" onClick={this.blogClick(item)}>
        <img width={870} height="auto" src={item.src} />
      </div>
      <div className="entry-content">
        <h3>{item.title}</h3>
        <p>{des}</p>
        <a onClick={this.blogClick(item)}>read more <i className="fa fa-angle-right" /></a>
      </div>
    </div>
  )

  render() {
    return (
      <div>
        <section className="blog-head">
          <div className="blog-head-container">
            <div className="blog-head-content">
              <h1 className="title">Blog</h1>
              <p>Each week, we bring you something a little bit different from the last news</p>
              <Link href="/"><a style={{ color: '#fff' }}><i className="fa fa-home" /> Home</a></Link>
            </div>
          </div>
        </section>
        <div className="blog-container">
          <div className="blog-list">
            {blogs.map((item, index) => this.renderBlog(item, index))}
            <div className="pagination">
              <span className="page-numbers current">1</span>
              <a className="page-numbers">2</a>
              <a className="next page-numbers">
                <i className="fa fa-long-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="blog-navigation">
            <div className="item" style={{ paddingTop: 0 }}>
              <h4>search</h4>
              <div className="form">
                <input placeholder="Enter keyword to search..." />
                <i className="fa fa-search" />
              </div>
            </div>
            <div className="item menu categories">
              <h4>blog categories</h4>
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
            <div className="item blog-tags">
              <h4>blog tag</h4>
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
        </div>
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

const des = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada malesuada feugiat. Aenean magna enim, scelerisque quis augue vulputate, accumsan pharetra diam. Sed vehicula nibh qui…'

const blogs = [
  {
    title: 'Summer is Calling: Sophie Hulme Citrus Fruit Tote',
    src: '/static/images/0-1024x697.jpg'
  },
  {
    title: 'The New Marc Jacobs Gotham Saddle Bag Black',
    src: '/static/images/DSC_9157.jpg'
  },
  {
    title: 'Spring Color Bag Trends Summer 2016',
    src: '/static/images/Leather-messenger-bag.jpg'
  },
  {
    title: 'Freshen The Bed in a Beautiful Way',
    src: '/static/images/anigram_blog-halfwidth1111-1024x717.jpg'
  },
  {
    title: 'Create Gallery Walls in 3 Fun Steps',
    src: '/static/images/556d0928028879.5636e8272c43b1111111-1024x720.jpg'
  },
  {
    title: 'Add Color and Life with Accent Furnishings',
    src: '/static/images/Buckle-Head-deco-111112222.jpg'
  },
  {
    title: 'Expert Tips for Decorating Your Holiday Table',
    src: '/static/images/33e47c01-854a-4fdb-8d70-a9fee7ba307c1111111222.jpg'
  },
  {
    title: 'Using Fabric to Create Style',
    src: '/static/images/7dea5527171089.56360ca2e7682r3332222.jpg'
  },
  {
    title: 'Spring into Summer: Part two',
    src: '/static/images/home-design-hd-wallpaper-with-modern-home-interior-design-hd-wallpapers-widescreen-1920x1200-1024x720.jpg'
  },
  {
    title: 'Top 10 Beds for Vacation Homes',
    src: '/static/images/1a39de28028879.5636e8270f4b211111-1024x720.jpg'
  },
]

export default bigdaddy(Blog)
