import { Component, PropTypes } from 'react'
import { Button, Modal, Form, Icon, Input, Checkbox, Tabs, Select, AutoComplete, Tooltip, Row, Col, notification, Dropdown, Menu } from 'antd'
import { connect } from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import { loginUserSuccess, logoutUser } from 'actions';
import { isEqual } from "lodash";

import style from './main.scss'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmitRegister = (e) => {
    const {dispatch, handleRegisterSuccess} = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let url = `http://localhost:8880/api/users/register`;
        let data = JSON.stringify({ userName: values.nickname, password: values.password, name: values.name, email: values.email, phone: `${values.prefix}${values.phone}`, address: values.address })
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Đăng ký thành công', null)
            localStorage.setItem("user_data", JSON.stringify(data.data));
            dispatch(loginUserSuccess(data.data))
            handleRegisterSuccess(data.data)
          } else {
            openNotificationWithIcon('error', 'Đăng ký thất bại', data.message);
          }
        })
        .catch(err => console.log(err))
      } else {
        openNotificationWithIcon('error', 'Kiểm tra lại thông tin đăng ký', null);
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '84',
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmitRegister}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Tài khoản&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Mật khẩu"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Xác nhận mật khẩu"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Họ tên&nbsp;
              <Tooltip title="What do your name?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Số điện thoại"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Địa chỉ&nbsp;
            </span>
          )}
        >
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please input your address!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class NormalLoginForm extends React.Component {

  handleSubmit = (e) => {
    const {dispatch, handleloginSuccess} = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let url = `http://localhost:8880/api/users/login`;
        let data = JSON.stringify({ userName: values.userName, password: values.password })
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Đăng nhập thành công', null)
            localStorage.setItem("user_data", JSON.stringify(data.data));
            dispatch(loginUserSuccess(data.data))
            handleloginSuccess(data.data)
          } else {
            openNotificationWithIcon('error', 'Đăng nhập thất bại', data.message);
          }
        })
        .catch(err => console.log(err))
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft: "7em"}}>
            Đăng nhập
          </Button>
          <div style={{textAlign: "center"}}>
            <a className="login-form-forgot" href="">Quên mật khẩu </a>
            Hoặc <a href="">Đăng ký ngay</a>
          </div>
        </FormItem>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

class MainLayout extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      visible: false,
      username: null,
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
    //
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem("user_data"));
    if (localData) {
      this.setState({ username: localData && localData.name })
    }

    let cart = localStorage.getItem("cart")
    cart = cart ? JSON.parse(cart) : []
    if (cart && cart.length > 0) this.setState({ cart })
  }

  handleloginSuccess = (data) => {
    if (data.permission == "admin") {
      Router.push("/manage/order")
    } else {
      this.handleCancel()
      this.setState({username: data.name})
    }
  }

  renderLogin() {
    return(
      <Modal
        visible={this.state.visible}
        footer={null}
        onCancel={this.handleCancel}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Đăng nhập" key="1">
            <div style={{textAlign: "center", marginBottom: 10}}><img src="/static/images/phong tiep.png" height="55px" width="auto"/></div>
            <WrappedNormalLoginForm
              dispatch = {this.props.dispatch}
              handleloginSuccess={this.handleloginSuccess}
            />
          </TabPane>
          <TabPane tab="Đăng ký" key="2">
            <div style={{textAlign: "center", marginBottom: 10}}><img src="/static/images/phong tiep.png" height="55px" width="auto"/></div>
            <WrappedRegistrationForm
              dispatch = {this.props.dispatch}
              handleRegisterSuccess={this.handleloginSuccess}
            />
          </TabPane>
        </Tabs>
      </Modal>
    )
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
    const { dispatch } = this.props;
    dispatch(logoutUser())
    localStorage.removeItem("user_data")
    this.setState({
      username: null,
    });
  }

  render() {
    const {username} = this.state;
    let pathname
    if (typeof window !== "undefined") pathname = window.location.pathname
    const menu = (
      <Menu onClick={this.handleLogout}>
        <Menu.Item key="logout">Đăng xuất</Menu.Item>
      </Menu>
    )
    return (
      <div className="layout">
        <div className="header" id="header">
          <img src="/static/images/phong tiep.png" height="45px" width="auto" style={{marginLeft: 40}}/>
          <div className="header-menu">
            <Link href="/">
              <a className={`menu-item ${pathname === "/" ? "menu-item-active" : ""}`}>Trang chủ</a>
            </Link>
            <Link href="/shop">
              <a className={`menu-item ${pathname === "/shop" ? "menu-item-active" : ""}`}>Cửa hàng</a>
            </Link>
            <Link href="/blog">
              <a className={`menu-item ${pathname === "/blog" ? "menu-item-active" : ""}`}>Blog</a>
            </Link>
            <Link href='/contact'>
              <a className={`menu-item ${pathname === "/contact" ? "menu-item-active" : ""}`}>Liên hệ</a>
            </Link>
          </div>
          <div className="header-tools">
            {username ?
              <Dropdown overlay={menu} placement="bottomLeft">
                <span>{username}</span>
              </Dropdown>
            :
              <div>
                <Button type="primary" style={{marginLeft: 10}} onClick={this.showModal}>Đăng nhập</Button>
                {this.renderLogin()}
              </div>
            }
            <i
              onClick={() => Router.push("/cart")}
              className="fa fa-shopping-bag" />
            {<span onClick={() => Router.push("/cart")} className="mention">{this.state.cart.length}</span>}
          </div>
        </div>
        <div>
          <div id="header-mark" style={{ height: 85, display: 'none' }} />
          {this.props.children}
        </div>
        <div className="footer-container">
          <div className="footer">
            <div className="footer-item">
              <h4 className="title">Điện Máy Phong Tiệp</h4>
              <div className="detail">
                <span><span className="first-char">Địa Chỉ:</span> Chợ Điệp Sơn, Yên Nam, Duy Tiên, Hà Nam</span>
                <span><span className="first-char">Điện thoại:</span> +(084) 98 898 1626</span>
                <span><span className="first-char">Email:</span>  phongtiepds@gmail.com</span>
              </div>
            </div>

            <div className="footer-item" style={{marginLeft: 150}}>
              <h4 className="title">Giờ mở cửa</h4>
              <div className="detail">
                <span className="duration">Thứ 2 - Thứ 6: 7:00 - 19:00</span>
                <span className="duration">Thứ 7 - CN: 7:30 - 18:30 </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {/*<img src="/static/images/payment_logo.png" />*/}
            <div style={{ fontSize: 14, color: '#888888', margin: '20px 0 50px 0' }}>@ 2018. Designed by Phan Dinh 65DCHT22979</div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </div>
    )
  }
}

function mapStateToProps (state){
  return {
    auth: state.auth
  }
}

export default MainLayout