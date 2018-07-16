import React from 'react'
import { Button, Icon, Carousel } from 'antd'
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
import { getProductData } from "actions";

class Index extends React.Component {

  static info = {
    title: 'Trang chủ',
    style
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getProductData("dashboard"));
  }
  // componentDidMount() {
  //   $(document).ready(function(){

  //     // if (typeof $(".owl-carousel").owlCarousel === "undefined") return

  //     $(".owl-carousel").owlCarousel({
  //       animateOut: 'fadeOut',
  //       nav:true,
  //       loop:true,
  //       items: 1,
  //       smartSpeed:450,
  //       navText: [
  //          "<span class='is-carousel is-carousel-prev'><</i></span>",
  //          "<span class='is-carousel is-carousel-next'>></span>"
  //       ]
  //     });
  //   });

  // }

  render() {
    const { products } = this.props;
    console.log('products', products);
    return (
      <div>
        <Carousel
        autoplay
        >
          <div><img className='carousel-items' src="/static/images/1600X800-1.jpg" /></div>
          <div><img className='carousel-items' src="/static/images/Banner-Web-1600x800-W7.jpg" /></div>
          <div><img className='carousel-items' src="/static/images/1600x800_maygiatso1.png" /></div>
          <div><img className='carousel-items' src="/static/images/1600x800.jpg" /></div>
          <div><img className='carousel-items' src="/static/images/1600X800-spring-1.jpg" /></div>
          <div><img className='carousel-items' src="/static/images/Horizontal-1600-x-800.jpg" /></div>
          <div><img className='carousel-items' src="/static/images/LINEAR-Banner-Web1600x800-1.jpg" /></div>
          <div><img className='carousel-items' src="/static/images/Banner-Web-1600x800-1.jpg" /></div>
          <div><img className='carousel-items' src="/static/images/door-in-door-1600x800-desktop.jpg" /></div>
        </Carousel>

        <SectionBanners />
        {/*<SectionGridImages />*/}
        {products ? <SectionProductListItem products={products} /> : null }
        {/*<SectionSale />*/}
        {/*<SectionGridPost />*/}
        {/*<SectionListImages />*/}
        {/*<SectionSubscribeAndFeedback />*/}
        {/*<style dangerouslySetInnerHtml={{ __html: style }} />*/}
      </div>
    )
  }
}

export default bigdaddy(Index)
