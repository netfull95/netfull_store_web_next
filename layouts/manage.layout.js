import { Component } from 'react'
import { Layout, Button, Modal, Form, Icon, Input, Checkbox, Tabs, Select, AutoComplete, Tooltip, Row, Col, Menu } from 'antd'
import { connect } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'

import style from './main.scss'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const SubMenu = Menu.SubMenu;

class ManageLayout extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      visible: false,
    }
  }

  handleScroll = () => {
    const header = document.getElementById('header')
    const mark = document.getElementById('header-mark')
    if (header.getBoundingClientRect().top <= -100) {
      header.className = 'header header-fixed'
      mark.style.display = 'block'
    }

    if (mark.getBoundingClientRect().top == 0) {
      header.className = 'header'
      mark.style.display = 'none'
      header.style.top = '-85px'
    }

    if (mark.getBoundingClientRect().top < -120) {
      header.style.top = '0px';
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log( e.target);
  }

  componentDidMount() {
    // $(window).scroll(this.handleScroll)

    let cart = localStorage.getItem("cart")
    cart = cart ? JSON.parse(cart) : []

    if (cart && cart.length > 0) this.setState({ cart })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    let pathname
    if (typeof window !== "undefined") pathname = window.location.pathname
    return (
      <div className="layout-manage">
        <div className="header-manage" id="header">
          <img src="/static/images/phong tiep.png" height="50px" width="140px" style={{marginLeft: 0}}/>
          <div className="header-tools">
            <div>
              Username
            </div>
          </div>
        </div>
        <div style={{height: 883}}>
          <Row type="flex" style={{height: "100%"}}>
            <Col span={20} order={2} style={{backgroundColor: "#eee"}}>
              {this.props.children}
            </Col>
            <Col span={4} order={1} style={{backgroundColor: "#404040"}}>
              <Menu
                theme={'dark'}
                onClick={this.handleClick}
                // style={{ width: 300 }}
                defaultOpenKeys={['sub1']}
                selectedKeys={[this.state.current]}
                mode="inline"
              >
                <Menu.Item key="1"><Icon type="copy" /><span>Đơn hàng</span></Menu.Item>
                <Menu.Item key="2"><Icon type="user" /><span>Người dùng</span></Menu.Item>
                <Menu.Item key="3"><Icon type="tablet" /><span>Sản phẩm</span></Menu.Item>
                <Menu.Item key="4"><Icon type="desktop" /><span>Bài viết</span></Menu.Item>
                <Menu.Item key="5"><Icon type="database" /><span>Danh mục</span></Menu.Item>
                <Menu.Item key="6"><Icon type="pie-chart" /><span>Thống kê - báo cáo</span></Menu.Item>
              </Menu>
            </Col>
          </Row>
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

export default ManageLayout
