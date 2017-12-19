import React from 'react'
import { Button, Icon } from 'antd'
// import $ from 'jquery'

import SectionListImages from 'components/SectionListImages'
import SectionSale from 'components/SectionSale'
import SectionGridPost from 'components/SectionGridPost'
import SectionSubscribeAndFeedback from 'components/SectionSubscribeAndFeedback'
import SectionGridImages from 'components/SectionGridImages'
import SectionBanners from 'components/SectionBanners'
import SectionProductListItem from 'components/SectionProductListItem'
import Notification from 'components/Notification'
import bigdaddy from 'hocs/bigdaddy'
import style from './index.scss'

class Index extends React.Component {

  static info = {
    title: 'Home',
    style
  }

  componentDidMount() {
    $(document).ready(function(){

      // if (typeof $(".owl-carousel").owlCarousel === "undefined") return

      $(".owl-carousel").owlCarousel({
        animateOut: 'fadeOut',
        nav:true,
        loop:true,
        items: 1,
        smartSpeed:450,
        navText: [
           "<span class='is-carousel is-carousel-prev'><</i></span>",
           "<span class='is-carousel is-carousel-next'>></span>"
        ]
      });
    });

  }

  render() {
    return (
      <div>
        <div className="owl-carousel">
          <div>
            <div className="textoverlay textoverlay-1">
              <div className="textoverlay--inner-1">
                <h1>Zeiget Design</h1>
                <span>We come to make your life better</span>
              </div>
            </div>
            <img src="/static/images/homeslider1.jpg" />
          </div>
          <div>
            <div className="textoverlay textoverlay-2">
              <div className="textoverlay--inner-2">
                <h1>Decorating Rule<br />Live with what you love</h1>
                <span>Home is where the story begin</span>
              </div>
            </div>
            <img src="/static/images/Home-V1-_-Slide-2.jpg" />
          </div>
          <div>
            <div className="textoverlay textoverlay-3">
              <div className="textoverlay--inner-3">
                <h1>You Home<br /> Should Tell The Story</h1>
                <span>How is your life?</span>
              </div>
            </div>
            <img src="/static/images/Home-V1-Slide-3.jpg" />
          </div>
        </div>

        <SectionBanners />
        <SectionGridImages />
        <SectionProductListItem />
        <SectionSale />
        <SectionGridPost />
        <SectionListImages />
        <SectionSubscribeAndFeedback />
        <style dangerouslySetInnerHtml={{ __html: style }} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default bigdaddy(Index)
