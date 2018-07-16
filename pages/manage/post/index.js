import { Component } from 'react'
import update from 'immutability-helper'
import Link from 'next/link'
import Router from 'next/router'
import { InputNumber, Button, Table, Modal, Form, Input, Radio, notification, Icon } from 'antd'
import { getPostData } from "actions";
import axios from "axios";
import { cloneDeep } from "lodash";

import justatee from 'hocs/justatee'
import style from './index.scss'

const FormItem = Form.Item;
const openNotificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  });
};


const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Tạo mới bài viết"
          okText="Tạo"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Tên bài viết">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Ảnh">
              {getFieldDecorator('image')(
                <Input />
              )}
            </FormItem>
            <FormItem label="Nội dung">
              {getFieldDecorator('message')(<Input type="textarea" />)}
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
      const { visible, onCancel, onEdit, form, selectedItem } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Sửa thông tin bài viết"
          okText="Sửa"
          onCancel={onCancel}
          onOk={onEdit}
        >
          <Form layout="vertical">
            <FormItem label="Tên bài viết">
              {getFieldDecorator('title', {
                initialValue: selectedItem && selectedItem.title,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Ảnh">
              {getFieldDecorator('image',{
                initialValue: selectedItem && selectedItem.image,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Nội dung">
              {getFieldDecorator('message', {
                initialValue: selectedItem && selectedItem.message,
              })(<Input type="textarea" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class Post extends Component {
  static info = {
    title: "Quản lý bài viết",
    style
  }

  state = {
    showModalNewProduct: false,
    showModalEdit: false,
    selectedItem: null,
    selectedIds: [],
    selectedRowKeys: [],
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getPostData("all"));
  }

  showModalNewProduct = () => {
    this.setState({showModalNewProduct: true})
  }

  editModal = (id) => {
    const { posts } = this.props;
    const selectedItem = posts.data.find((p) => p.id == id)
    this.setState({selectedItem: selectedItem, showModalEdit: true})
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ showModalNewProduct: false, showModalEdit: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        form.resetFields();
        values.user_id = user_data && user_data.name
        let url = `http://localhost:8880/api/posts/create`;
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Tạo bài viết thành công', null)
            dispatch(getPostData("all"))
            this.setState({ showModalNewProduct: false });
          } else {
            console.log("lỗi lấy bài viết");
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
    const { selectedItem } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        let url = `http://localhost:8880/api/posts/edit`;
        values.id = selectedItem.id
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Sửa bài viết thành công', null)
            dispatch(getPostData("all"))
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
    let url = `http://localhost:8880/api/posts/delete`;
    axios.post(url, {listIds: ids},{ headers: { 'Content-Type': 'application/json' }})
    .then(({ data }) => {
      if (data.success) {
        openNotificationWithIcon('success', 'Xóa bài viết thành công', null)
        dispatch(getPostData("all"))
        this.setState({ selectedIds: [], selectedRowKeys: [] });
      } else {
        openNotificationWithIcon('error', 'Đã xảy ra lỗi, vui lòng thử lại sau', null)
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    const { posts } = this.props;
    const { selectedIds, selectedRowKeys } = this.state;
    let data = cloneDeep(posts.data)
    data.forEach((p,idx) => {
      data[idx].key = p.id;
      data[idx].title = data[idx].title && `${data[idx].title.substring(0, 25)} ...`;
      data[idx].message = data[idx].message && `${data[idx].message.substring(0, 60)} ...`
    })

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
      title: 'mã bài viết',
      dataIndex: 'id',
    }, {
      title: 'Tên bài viết',
      dataIndex: 'title',
    }, {
      title: 'Nội dung',
      dataIndex: 'message',
    }, {
      title: 'Tạo bởi',
      dataIndex: 'user_id',
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
          <span>Quản lý bài viết</span>
          <Button type="primary" icon="plus" style={{float: "right", marginTop: 10}} onClick={this.showModalNewProduct}>Thêm bài viết</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.showModalNewProduct}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

          <CollectionEditForm
            selectedItem={this.state.selectedItem}
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

export default justatee(Post)
