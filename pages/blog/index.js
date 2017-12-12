import { Component } from 'react'
import bigdaddy from 'hocs/bigdaddy'
import Link from 'next/link'

import style from './index.scss'

class Blog extends Component {

  static info = {
    title: 'Blog',
    style
  }

  renderBlog = item => (
    <div className="blog-card">
      <div className="content-featured">
        <img width={870} height="auto" src={item.src} />
      </div>
      <div className="entry-content">
        <h3>{item.title}</h3>
        <p>{des}</p>
        <Link><a>read more <i className="fa fa-angle-right" /></a></Link>
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
              <a style={{ color: '#fff' }}><i className="fa fa-home" /> Home</a>
            </div>
          </div>
        </section>
        <div className="blog-container">
          <div className="blog-list">
            {blogs.map(item => this.renderBlog(item))}
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
                <li><a href="http://wp.nootheme.com/umbra/category/bag-trend-alert/">Bag Trend Alert</a> (3)</li>
                <li><a href="http://wp.nootheme.com/umbra/category/furniture-tips/">Furniture Tips</a> (3)</li>
                <li><a href="http://wp.nootheme.com/umbra/category/inspired-ideas/">Inspired Ideas</a> (3)</li>
                <li><a href="http://wp.nootheme.com/umbra/category/interior-trends/">Interior Trends</a> (3)</li>
              </ul>
            </div>
            <div className="item menu">
              <h4>recent posts</h4>
              <ul>
                <li>
                  <a href="http://wp.nootheme.com/umbra/2016/05/09/summer-is-calling-sophie-hulme-citrus-fruit-tote/">Summer is Calling: Sophie Hulme Citrus Fruit Tote</a>
                </li>
                <li>
                  <a href="http://wp.nootheme.com/umbra/2016/05/09/the-new-marc-jacobs-gotham-saddle-bag/">The New Marc Jacobs Gotham Saddle Bag Black</a>
                </li>
                <li>
                  <a href="http://wp.nootheme.com/umbra/2016/05/09/spring-color-bag-trends-summer-2016/">Spring Color Bag Trends Summer 2016</a>
                </li>
                <li>
                  <a href="http://wp.nootheme.com/umbra/2016/05/04/freshen-the-bed-in-a-beautiful-way/">Freshen The Bed in a Beautiful Way</a>
                </li>
                <li>
                  <a href="http://wp.nootheme.com/umbra/2016/05/04/create-gallery-walls-in-3-fun-steps/">Create Gallery Walls in 3 Fun Steps</a>
                </li>
              </ul>
            </div>
            <div className="item blog-tags">
              <h4>blog tag</h4>
              <div class="tagcloud">
                <a href="http://wp.nootheme.com/umbra/tag/accessories/" class="tag-link">accessories</a>
                <a href="http://wp.nootheme.com/umbra/tag/bags/" className="tag-link">bags</a>
                <a href="http://wp.nootheme.com/umbra/tag/bedroom/" className="tag-link">Bedroom</a>
                <a href="http://wp.nootheme.com/umbra/tag/crafts/" className="tag-link">crafts</a>
                <a href="http://wp.nootheme.com/umbra/tag/decorating/" className="tag-link">decorating</a>
                <a href="http://wp.nootheme.com/umbra/tag/furnishing/" className="tag-link">furnishing</a>
                <a href="http://wp.nootheme.com/umbra/tag/inspiring/" className="tag-link">inspiring</a>
                <a href="http://wp.nootheme.com/umbra/tag/insprired-ideas/" className="tag-link">insprired ideas</a>
                <a href="http://wp.nootheme.com/umbra/tag/interior-trends/" className="tag-link">Interior Trends</a>
                <a href="http://wp.nootheme.com/umbra/tag/living-room/" className="tag-link">living room</a>
                <a href="http://wp.nootheme.com/umbra/tag/tips/" className="tag-link">tips</a>
                <a href="http://wp.nootheme.com/umbra/tag/trends/" className="tag-link">trends</a>
              </div>
            </div>
            <div className="item ig-images" style={{ borderBottom: 0 }}>
              <h4>instagram photos</h4>
              <div className="image-list"><ul>
                {igImages.map(item => (
                  <li style={{ width: 75, height: 75 }}><a><img src={item} width={75} height={75} /></a></li>
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
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/0-1024x697.jpg'
  },
  {
    title: 'The New Marc Jacobs Gotham Saddle Bag Black',
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/DSC_9157.jpg'
  },
  {
    title: 'Spring Color Bag Trends Summer 2016',
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/Leather-messenger-bag.jpg'
  },
  {
    title: 'Freshen The Bed in a Beautiful Way',
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/anigram_blog-halfwidth1111-1024x717.jpg'
  },
  {
    title: 'Create Gallery Walls in 3 Fun Steps',
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/556d0928028879.5636e8272c43b1111111-1024x720.jpg'
  },
  {
    title: 'Add Color and Life with Accent Furnishings',
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/Buckle-Head-deco-111112222.jpg'
  },
  {
    title: 'Expert Tips for Decorating Your Holiday Table',
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/33e47c01-854a-4fdb-8d70-a9fee7ba307c1111111222.jpg'
  },
  {
    title: 'Using Fabric to Create Style',
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/7dea5527171089.56360ca2e7682r3332222.jpg'
  },
  {
    title: 'Spring into Summer: Part two',
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/home-design-hd-wallpaper-with-modern-home-interior-design-hd-wallpapers-widescreen-1920x1200-1024x720.jpg'
  },
  {
    title: 'Top 10 Beds for Vacation Homes',
    src: 'http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/1a39de28028879.5636e8270f4b211111-1024x720.jpg'
  },
]

export default bigdaddy(Blog)
