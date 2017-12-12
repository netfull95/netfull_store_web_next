import { Component } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import Link from 'next/link'

import style from './main.scss'

class MainLayout extends Component {
  render() {
    return (
      <div className="layout">
        <div className="header">
          <img src="/static/images/zeit.png" height="45px" width="auto" />
          <div className="header-menu">
            <Link>
              <a className="menu-item">home</a>
            </Link>
            <Link>
              <a className="menu-item">blog</a>
            </Link>
            <Link>
              <a className="menu-item">shop</a>
            </Link>
            <Link>
              <a className="menu-item">pages</a>
            </Link>
            <Link>
              <a className="menu-item">contact</a>
            </Link>
          </div>
          <div className="header-tools">
            <i className="fa fa-search" />
            <i className="fa fa-heart-o" />
            <i className="fa fa-shopping-bag" />
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
        <div className="footer-container">
          <div className="footer">
            <div className="footer-item">
              <h4 className="title">UMBRA FURNITURE</h4>
              <div className="detail">
                <p style={{ marginBottom: 20 }}>We are a global housewares product design company. We bring thought and creativity to everyday items through original design.</p>
                <span><span className="first-char">A</span> 001 Milacian Crest Street, Paris France</span>
                <span><span className="first-char">T</span> +(084) 888 - 6789</span>
                <span><span className="first-char">M</span>  Contact@Umbra.com</span>
              </div>
            </div>

            <div className="footer-item">
              <h4 className="title">OPENING TIME</h4>
              <div className="detail">
                <span className="duration">Mon - Fri: 8AM - 10PM</span>
                <span className="duration">Sat: 9AM-8PM</span>
                <span className="duration">Sun: Closed</span>
                <span className="duration">We Work All The Holidays</span>
              </div>
            </div>

            <div className="footer-item">
              <h4 className="title">ABOUT</h4>
              <div className="detail">
                <a>About Us</a>
                <a>Shopping Guide</a>
                <a>Delivery Information</a>
                <a>Privacy Policy</a>
                <a>Our store</a>
              </div>
            </div>

            <div className="footer-item">
              <h4 className="title">ACCOUNT</h4>
              <div className="detail">
                <a>My Account</a>
                <a>Wishlist</a>
                <a>Order Tracking</a>
                <a>Shipping Info</a>
                <a>Return Policy</a>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img src="/static/images/payment_logo.png" />
            <div style={{ fontSize: 14, color: '#888888', margin: '20px 0 50px 0' }}>@ 2017. Designed by Zeiget</div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default MainLayout
