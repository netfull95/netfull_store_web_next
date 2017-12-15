import { Component } from 'react'
import Link from 'next/link'
import { Icon } from 'antd'

import style from './index.scss'
import bigdaddy from 'hocs/bigdaddy'

class Detail extends Component {

  static getInitialProps(ctx) {
    return { title: ctx.query.title, src: ctx.query.src }
  }

  static info = {
    title: 'Blog Detail',
    style
  }

  render() {
    return(
      <div>
        <section className="blog-head">
          <div className="blog-head-container">
            <div className="blog-head-content">
              <h1 className="title">SUMMER IS CALLING: SOPHIE HULME CITRUS FRUIT TOTE</h1>
              <p style={{ marginBottom: 10 }}>Each week, we bring you something a little bit different from the last news</p>
              <Link href="/">
                <a style={{ color: '#fff' }}><i className="fa fa-home" /> Home</a>
              </Link>
              <Icon type="arrow-right" style={{ margin: '0 10px' }} /> <Link href="/blog"><a style={{ color: '#fff' }}>Blog</a></Link>
              <Icon type="arrow-right" style={{ margin: '0 10px' }} /> {this.props.title}
            </div>
          </div>
        </section>
        <div className="blog-container">
          <div className="blog-detail">
            <div className="blog-card">
              <h1 className="title">{this.props.title}</h1>
              <div className="content-featured">
                <img width={870} height="auto" src={this.props.src} />
              </div>
              <div className="entry-content">
                <p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada malesuada feugiat. Aenean magna enim, scelerisque quis augue vulputate, accumsan pharetra diam. Sed vehicula nibh quis mi venenatis scelerisque. Nullam ante risus, lacinia ac ligula vitae, suscipit ultrices risus. Suspendisse nunc velit, maximus eget elit et, consectetur gravida justo. Sed vel nibh et ante consectetur pharetra ut id lorem. Suspendisse in tortor sagittis, tempor enim quis, gravida massa. Sed venenatis tempor vestibulum. Cras porttitor, urna vel sagittis pharetra, lectus urna lacinia est, quis faucibus erat elit id magna. Quisque pharetra at arcu a commodo. Sed rhoncus dui id arcu sodales fringilla. Phasellus nec dui quis mauris eleifend porta. Maecenas non cursus nibh. Suspendisse potenti.\n\n Nam efficitur est eros, vitae fermentum sapien sodales vitae. Suspendisse sagittis varius tortor a accumsan. Donec vehicula finibus lacus, id consequat nunc molestie nec. Integer eget sapien tortor. Nam purus lorem, sodales nec facilisis eget, volutpat sit amet leo. Nulla sed posuere risus. Proin nec malesuada mauris, quis auctor leo. Vivamus viverra laoreet ante vel placerat. Integer aliquet auctor efficitur. Vivamus urna nunc, feugiat sit amet condimentum id, egestas et nibh. Integer ultrices tristique congue. Maecenas rhoncus et sapien non posuere. Vestibulum nibh libero, venenatis eu ex ac, sodales ultrices ipsum. Maecenas fermentum faucibus risus vitae tempus.\n\n Quisque sodales nibh mi, a convallis mauris elementum consectetur. Mauris venenatis tincidunt ex eu semper. Sed sit amet malesuada elit. Proin nec volutpat purus. Nunc dignissim aliquet diam at auctor. Integer vel lacus gravida, mattis mi tincidunt, molestie urna. Duis aliquam elementum metus, et tristique odio gravida ut. Vestibulum luctus iaculis risus sed fringilla. Aenean malesuada orci nec ligula ullamcorper, vel mattis leo bibendum. Sed id tortor eleifend, scelerisque urna vitae, euismod magna. \n\n Suspendisse nunc dolor, dignissim non augue non, rutrum faucibus felis. Phasellus eu ultricies mi. Donec eu erat ut massa pulvinar pharetra nec a dolor. Cras bibendum dictum odio sit amet ullamcorper. Donec ac lobortis augue, in pulvinar purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur sit amet ante in elit auctor vulputate a at arcu. Vestibulum eleifend lacus non massa luctus tempor. Suspendisse mauris eros, varius rhoncus blandit vitae, venenatis non libero. Fusce placerat vestibulum lectus.\n\n Nullam laoreet lectus augue, id condimentum leo placerat vel. In eleifend sodales eros, a vestibulum lorem sollicitudin et. Curabitur rutrum a ipsum commodo luctus. Maecenas in orci semper mauris consectetur pharetra. Suspendisse est risus, varius sed metus nec, suscipit lacinia nunc. Aenean scelerisque sapien ut nisl iaculis, a cursus arcu semper. Integer vulputate risus ac mi cursus egestas sed et sem. Aenean et condimentum tortor. Nam ullamcorper neque tempor leo lacinia imperdiet. Nulla a lobortis nisl, et elementum tellus. Praesent maximus porta tempor. Quisque congue tellus quis risus posuere fringilla. Vestibulum scelerisque elit neque, non mollis orci vehicula et. Pellentesque vehicula orci odio, a interdum eros volutpat vel".split("\n").map((item, index) => <span key={index}>{item}<br/></span>)}</p>
              </div>
            </div>

            <div className="comments">
              <h2>comments</h2>
              <div style={{ borderBottom: '1px solid #e9e9e9', marginBottom: 40 }}>
                <div className="comment">
                  <img src="http://2.gravatar.com/avatar/5245e9fb2edda436c8435a91848c3b4e?s=70&d=mm&r=g" />
                  <div className="content">
                    <span className="user-name">Viet Thang</span>
                    <span className="date">2 days ago</span>
                    <div className="reply"><i className="fa fa-reply" /> REPLY</div>
                    <p className="detail">Nullam laoreet lectus augue, id condimentum leo placerat vel. In eleifend sodales eros, a vestibulum lorem sollicitudin et. Curabitur rutrum a ipsum commodo luctus. Maecenas in orci semper mauris consectetur pharetra.</p>
                  </div>
                </div>
                <div className="comment" style={{ marginTop: 20, marginLeft: 90, width: 700 }}>
                  <img src="http://2.gravatar.com/avatar/5245e9fb2edda436c8435a91848c3b4e?s=70&d=mm&r=g" />
                  <div className="content" style={{ borderBottom: 0 }}>
                    <span className="user-name">Viet Thang</span>
                    <span className="date">2 days ago</span>
                    <div className="reply"><i className="fa fa-reply" /> REPLY</div>
                    <p className="detail">Nullam laoreet lectus augue, id condimentum leo placerat vel. In eleifend sodales eros, a vestibulum lorem sollicitudin et. Curabitur rutrum a ipsum commodo luctus. Maecenas in orci semper mauris consectetur pharetra.</p>
                  </div>
                </div>
              </div>

              <h2>LEAVE YOUR THOUGHT</h2>
              <div style={{ display: 'flex' }}>
                <input placeholder="Your name *" style={{ marginRight: 30 }} />
                <input placeholder="Your email *" />
              </div>
              <input placeholder="Website" />
              <textarea style={{ height: 200, padding: 20 }} placeholder="Your comment *" />
              <div className="post-cmt">post comment</div>
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

export default bigdaddy(Detail)
