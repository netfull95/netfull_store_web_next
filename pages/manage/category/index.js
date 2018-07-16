import { Component } from 'react'
import update from 'immutability-helper'
import Link from 'next/link'
import Router from 'next/router'
import { InputNumber, Button, Table, Modal, Form, Input, Radio, notification, Icon } from 'antd'
import { getCategoryData } from "actions";
import axios from "axios";

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
          title="Tạo mới danh mục"
          okText="Tạo"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Tên danh mục">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Miêu tả">
              {getFieldDecorator('description', {
                rules: [{ required: false, message: 'Please input the title of collection!' }],
              })(
                <Input />
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
      const { visible, onCancel, onEdit, form, selectedCategory } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Sửa thông tin danh mục"
          okText="Sửa"
          onCancel={onCancel}
          onOk={onEdit}
        >
          <Form layout="vertical">
            <FormItem label="Tên danh mục">
              {getFieldDecorator('name', {
                initialValue: selectedCategory && selectedCategory.name,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Miêu tả">
              {getFieldDecorator('description', {
                initialValue: selectedCategory && selectedCategory.description,
                rules: [{ required: false, message: 'Please input the title of collection!' }],
              })(
                <Input/>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class Category extends Component {
  static info = {
    title: "Quản lý danh mục",
    style
  }

  state = {
    showModalNewCategory: false,
    showModalEdit: false,
    selectedCategory: null,
    selectedIds: [],
    selectedRowKeys: [],
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getCategoryData("all"));
  }

  showModalNewCategory = () => {
    this.setState({showModalNewCategory: true})
  }

  editModal = (id) => {
    const { categories } = this.props;
    const selectedCategory = categories.data.find((p) => p.id == id)
    this.setState({selectedCategory: selectedCategory, showModalEdit: true})
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ showModalNewCategory: false, showModalEdit: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        form.resetFields();
        let url = `http://localhost:8880/api/categories/create`;
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Tạo danh mục thành công', null)
            dispatch(getCategoryData("all"))
            this.setState({ showModalNewCategory: false });
          } else {
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
    const { selectedCategory } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        let url = `http://localhost:8880/api/categories/edit`;
        values.id = selectedCategory.id
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Sửa danh mục thành công', null)
            dispatch(getCategoryData("all"))
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
    let url = `http://localhost:8880/api/categories/delete`;
    axios.post(url, {listIds: ids},{ headers: { 'Content-Type': 'application/json' }})
    .then(({ data }) => {
      if (data.success) {
        openNotificationWithIcon('success', 'Xóa danh mục thành công', null)
        dispatch(getCategoryData("all"))
        this.setState({ selectedIds: [], selectedRowKeys: [] });
      } else {
        openNotificationWithIcon('error', 'Đã xảy ra lỗi, vui lòng thử lại sau', null)
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    const { categories } = this.props;
    const { selectedIds, selectedRowKeys } = this.state;
    let data = categories.data
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
      title: 'mã danh mục',
      dataIndex: 'id',
    }, {
      title: 'Tên danh mục',
      dataIndex: 'name',
    }, {
      title: 'Miêu tả',
      dataIndex: 'description',
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
          <span>Quản lý danh mục</span>
          <Button type="primary" icon="plus" style={{float: "right", marginTop: 10}} onClick={this.showModalNewCategory}>Thêm danh mục</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.showModalNewCategory}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

          <CollectionEditForm
            selectedCategory={this.state.selectedCategory}
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

export default justatee(Category)
