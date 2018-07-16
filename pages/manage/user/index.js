import { Component } from 'react'
import update from 'immutability-helper'
import Link from 'next/link'
import Router from 'next/router'
import { InputNumber, Button, Table, Modal, Form, Input, Radio, notification, Icon, Select } from 'antd'
import { getUserData } from "actions";
import axios from "axios";

import justatee from 'hocs/justatee'
import style from './index.scss'

const Option = Select.Option;
const FormItem = Form.Item;
const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};


const CollectionCreateForm = Form.create()(
  class extends React.Component {
    state = {
      selectedPermission: "user"
    }

    handleChange = (value) => {
      this.setState({selectedPermission: value})
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { selectedPermission } = this.state;
      return (
        <Modal
          visible={visible}
          title="Tạo mới tài khoản"
          okText="Tạo"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Tên tài khoản">
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Mật khẩu">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input type="password"/>
              )}
            </FormItem>
            <FormItem label="Tên người dùng">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="địa chỉ">
              {getFieldDecorator('địa chỉ', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Số đt">
              {getFieldDecorator('phone_number', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="Quyền">
              {getFieldDecorator('permission', {
                initialValue: selectedPermission,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Select style={{ width: 120 }} onChange={this.handleChange}>
                  <Option value="user">Khách hàng</Option>
                  <Option value="admin">Quản trị viên</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

const CollectionEditForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onEdit, form, selectedUser } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Sửa thông tin tài khoản"
          okText="Sửa"
          onCancel={onCancel}
          onOk={onEdit}
        >
          <Form layout="vertical">
            <FormItem label="Tên tài khoản">
              {getFieldDecorator('userName', {
                initialValue: selectedUser && selectedUser.username,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Mật khẩu">
              {getFieldDecorator('password', {
                initialValue: selectedUser && selectedUser.password,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input type="password"/>
              )}
            </FormItem>
            <FormItem label="Tên người dùng">
              {getFieldDecorator('name', {
                initialValue: selectedUser && selectedUser.name,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Email">
              {getFieldDecorator('email', {
                initialValue: selectedUser && selectedUser.email,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="địa chỉ">
              {getFieldDecorator('address', {
                initialValue: selectedUser && selectedUser.address,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Số đt">
              {getFieldDecorator('phone', {
                initialValue: selectedUser && selectedUser.phone_number,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="Quyền">
              {getFieldDecorator('permission', {
                initialValue: selectedUser && selectedUser.permission,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Select style={{ width: 120 }} >
                  <Option value="user">Khách hàng</Option>
                  <Option value="admin">Quản trị viên</Option>
                </Select>
              )}
            </FormItem>

          </Form>
        </Modal>
      );
    }
  }
);

class User extends Component {
  static info = {
    title: "Quản lý tài khoản",
    style
  }

  state = {
    showModalNewUser: false,
    showModalEdit: false,
    selectedUser: null,
    selectedIds: [],
    selectedRowKeys: [],
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getUserData("all"));
  }

  showModalNewUser = () => {
    this.setState({showModalNewUser: true})
  }

  editModal = (id) => {
    const { users } = this.props;
    const selectedUser = users.data.find((p) => p.id == id)
    this.setState({selectedUser: selectedUser, showModalEdit: true})
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ showModalNewUser: false, showModalEdit: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let url = `http://localhost:8880/api/users/register`;
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            form.resetFields();
            openNotificationWithIcon('success', 'Tạo tài khoản thành công', null)
            dispatch(getUserData("all"))
            this.setState({ showModalNewUser: false });
          } else {
            openNotificationWithIcon('error', 'Tạo tài khoản lỗi', data.message)
            console.log("lỗi lấy product");
          }
        })
        .catch(err => console.log(err))
      } else {
        return;
      }
    });
  }

  handleEdit = () => {
    const form = this.formRef.props.form;
    const { dispatch } = this.props;
    const { selectedUser } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        let url = `http://localhost:8880/api/users/edit`;
        values.id = selectedUser.id
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Sửa tài khoản thành công', null)
            dispatch(getUserData("all"))
            this.setState({ showModalEdit: false });
            form.resetFields();
          } else {
            openNotificationWithIcon('error', 'Đã xảy ra lỗi, vui lòng thử lại sau', null)
          }
        })
        .catch(err => console.log(err))
      } else {
        return;
      }
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  deleteElement = (ids) => {
    const { dispatch } = this.props;
    let url = `http://localhost:8880/api/users/delete`;
    axios.post(url, {listIds: ids},{ headers: { 'Content-Type': 'application/json' }})
    .then(({ data }) => {
      if (data.success) {
        openNotificationWithIcon('success', 'Xóa tài khoản thành công', null)
        dispatch(getUserData("all"))
        this.setState({ selectedIds: [], selectedRowKeys: [] });
      } else {
        openNotificationWithIcon('error', 'Đã xảy ra lỗi, vui lòng thử lại sau', null)
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    const { users } = this.props;
    const { selectedIds, selectedRowKeys } = this.state;
    let data = users.data
    data.forEach((p,idx) => data[idx].key = p.id)

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const selectedIds = selectedRows.map(r => r.id)
        this.setState({ selectedIds, selectedRowKeys })

      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const columns = [{
      title: 'mã tài khoản',
      dataIndex: 'id',
    }, {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      // render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Tên người dùng',
      dataIndex: 'name',
    }, {
      title: 'Quyền',
      dataIndex: 'permission',
    }, {
      title: 'Số đt',
      dataIndex: 'phone_number',
    },{
      title: 'Địa chỉ',
      dataIndex: 'address',
    },{
      title: 'Email',
      dataIndex: 'email',
    },{
      dataIndex: 'action',
      width: 48,
      title: '',
      key: 'x',
      render: (text, record) => {
        return (
          <div style={{display: 'inline-flex'}}>
            <Icon className="btn-edit-qr" type="edit" onClick={() => this.editModal(record.id)}/>
          </div>
        )
      }
    }];

    return(
      <div style={{padding: 15}}>
        <div className="title-manage">
          <span>Quản lý tài khoản</span>
          <Button type="primary" icon="plus" style={{float: "right", marginTop: 10}} onClick={this.showModalNewUser}>Thêm tài khoản</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.showModalNewUser}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

          <CollectionEditForm
            selectedUser={this.state.selectedUser}
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.showModalEdit}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
          />
          <Button disabled={selectedIds.length == 0} type="danger" icon="delete" style={{float: "right", marginTop: 10, marginRight: 10}} onClick={() => this.deleteElement(selectedIds)}>Xóa</Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} style={{backgroundColor: "#fff"}}/>
      </div>
    )
  }
}

export default justatee(User)
