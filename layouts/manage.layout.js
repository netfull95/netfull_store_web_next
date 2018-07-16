import { Component } from 'react'
import { Layout, Button, Modal, Form, Icon, Input, Checkbox, Tabs, Select, AutoComplete, Tooltip, Row, Col, Menu, Dropdown } from 'antd'
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
      userData: {},
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
    let user = localStorage.getItem("user_data")
    user = user ? JSON.parse(user) : {}
    if (user && user.permission == "admin"){
      this.setState({userData: user})
    } else {
      Router.push("/")
    }
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

  handleLogout = (e) => {
    localStorage.removeItem("user_data")
    this.setState({
      userData: {},
    });
    Router.push("/")
  }

  handleClick = (e) => {
    Router.push(e.key)
  }


  render() {
    const { userData } = this.state;
    let pathname
    if (typeof window !== "undefined") pathname = window.location.pathname

    const menu = (
      <Menu onClick={this.handleLogout}>
        <Menu.Item key="logout">Đăng xuất</Menu.Item>
      </Menu>
    )
    return (
      <div className="layout-manage">
        <div className="header-manage" id="header">
          <img src="/static/images/phong tiep.png" height="50px" width="140px" style={{marginLeft: 0}}/>
          <div className="header-tools">
            <Dropdown overlay={menu} placement="bottomLeft">
                <span>{userData && userData.name}</span>
              </Dropdown>
          </div>
        </div>
        <div style={{height: 883}}>
          <Row type="flex" style={{height: "100%"}}>
            <Col span={20} order={2} style={{backgroundColor: "#eee"}}>
              {this.props.children}
            </Col>
            <Col span={4} order={1} style={{backgroundColor: "#404040", paddingTop: 20}}>
              <Menu
                selectedKeys={pathname}
                onClick={this.handleClick}
                mode="inline"
                theme="dark"
              >
                <Menu.Item key="/manage/order">
                  <Icon type="copy" /><span>Đơn hàng</span>
                </Menu.Item>
                <Menu.Item key="/manage/user">
                  <Icon type="user" /><span>Tài khoản</span>
                  </Menu.Item>
                <Menu.Item key="/manage/product">
                  <Icon type="tablet" /><span>Sản phẩm</span>
                </Menu.Item>
                <Menu.Item key="/manage/post">
                  <Icon type="desktop" /><span>Bài viết</span>
                </Menu.Item>
                <Menu.Item key="/manage/category">
                  <Icon type="database" /><span>Danh mục</span>
                </Menu.Item>
                <Menu.Item key="/manage/statistic">
                  <Icon type="pie-chart" /><span>Thống kê - báo cáo</span>
                </Menu.Item>
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
