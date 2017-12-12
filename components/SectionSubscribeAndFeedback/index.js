import { Component } from 'react'

class SectionSubscribeAndFeedback extends Component {
  render() {
    return (
      <div className="zg-subfee is-flex">
        <div className="zg-subfee--subscribe is-flex is-flex-1">
          <div className="zg-subfee--subscribe-image zg-subfee__inner">
            <div className="zg-subfee--center-block">
              <div className="zg-subfee--title">
                <h1>SUBSCRIBE EMAIL</h1>
                <h3>Get latest news & update from Umbra</h3>
              </div>

              <div className="zg-subfee--form">
                <i className="fa fa-envelope"></i>
                <input className="zg-component--input" placeholder="Your email address" />
              </div>
            </div>
          </div>
        </div>
        <div className="zg-subfee--feedback is-flex is-flex-1">
          <div className="zg-subfee--feedback-image zg-subfee__inner zg-subfee--wrapper">
            <i className="fa fa-quote-left icon-quote-left"></i>
            <div className="zg-subfee--detail is-vertical-flex">
              <img src="http://wp.nootheme.com/umbra/wp-content/uploads/2016/04/team7-100x100.jpg"  />

              <span style={{ textAlign: 'center', margin: "25px auto", maxWidth: 400 }}>
                <span className="testimonial-author">
                  <strong style={{ textTransform: 'uppercase', marginRight: 10 }}>Johnny Williams</strong> Chief Marketing Officer
                </span>
                <p style={{ marginTop: 25 }}>“Umbra&nbsp;is my favorite furniture store. Wonderful, friendly customer services, brand name furniture – my house is full of furniture from Umbra. ”</p>
              </span>

              {/*<div className="zg-subfee--scroll">
                <div className="owl-prev">prev</div>
                <div className="owl-next">next</div>
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SectionSubscribeAndFeedback