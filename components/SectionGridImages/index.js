import { Component } from 'react'

class SectionGridImages extends Component {

  componentDidMount() {
    const Shuffle = require('shufflejs')

    var myShuffle = new Shuffle(document.querySelector('.zg-grid'), {
      itemSelector: '.zg-grid--item',
      sizer: '.zg-grid__sizer',
      buffer: 1,
    });
  }
  render() {
    return (
      <div className="zg-grid">
        <div className="zg-grid--item zg-grid__sizer" style={{ float: "left" }}>
          <img src="http://wp.nootheme.com/umbra/wp-content/uploads/2016/04/shortcode_banner1.jpg" />
        </div>
        <div className="zg-grid--item zg-grid__sizer">
          <img src="http://wp.nootheme.com/umbra/wp-content/uploads/2016/04/shortcode_banner2.jpg" />
        </div>
        <div className="zg-grid--item zg-grid__half">
          <img src="http://wp.nootheme.com/umbra/wp-content/uploads/2016/04/shortcode_banner3.jpg" />
        </div>
        <div className="zg-grid--item zg-grid__half">
          <img src="http://wp.nootheme.com/umbra/wp-content/uploads/2016/04/shortcode_banner4.jpg" />
        </div>
        <div className="zg-grid--item zg-grid__sizer" style={{ float: "right" }}>
          <img src="http://wp.nootheme.com/umbra/wp-content/uploads/2016/05/shortcode_banner6.jpg" />
        </div>
      </div>
    )
  }
}

export default SectionGridImages