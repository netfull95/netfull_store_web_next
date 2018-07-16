import { Component } from 'react'
import update from 'immutability-helper'
import Link from 'next/link'
import Router from 'next/router'
import { InputNumber, Button, Table, Modal, Form, Input, Radio, notification, Icon } from 'antd'
import { getProductData, loadProductsSuccess } from "actions";
import axios from "axios";

import justatee from 'hocs/justatee'
import style from './index.scss'

const FormItem = Form.Item;
const Search = Input.Search;
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
          title="Tạo mới sản phẩm"
          okText="Tạo"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Tên sản phẩm">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Số lượng nhập">
              {getFieldDecorator('remain_quantity', {
                rules: [{ required: false, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="giá nhập">
              {getFieldDecorator('import_price', {
                rules: [{ required: false, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="giá bán">
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Ảnh">
              {getFieldDecorator('images')(
                <Input />
              )}
            </FormItem>
            <FormItem label="Miêu tả">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </FormItem>
            <FormItem label="Danh mục">
              {getFieldDecorator('category_id')(<Input/>)}
            </FormItem>
            <FormItem label="Nhà cung cấp">
              {getFieldDecorator('provider')(<Input/>)}
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
      const { visible, onCancel, onEdit, form, selectedProduct } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Sửa thông tin sản phẩm"
          okText="Sửa"
          onCancel={onCancel}
          onOk={onEdit}
        >
          <Form layout="vertical">
            <FormItem label="Tên sản phẩm">
              {getFieldDecorator('name', {
                initialValue: selectedProduct && selectedProduct.name,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Số lượng nhập">
              {getFieldDecorator('remain_quantity', {
                initialValue: selectedProduct && selectedProduct.remain_quantity,
                rules: [{ required: false, message: 'Please input the title of collection!' }],
              })(
                <Input/>
              )}
            </FormItem>
            <FormItem label="giá nhập">
              {getFieldDecorator('import_price', {
                initialValue: selectedProduct && selectedProduct.import_price,
                rules: [{ required: false, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="giá bán">
              {getFieldDecorator('price', {
                initialValue: selectedProduct && selectedProduct.price,
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Ảnh">
              {getFieldDecorator('images',{
                initialValue: selectedProduct && selectedProduct.images,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="Miêu tả">
              {getFieldDecorator('description', {
                initialValue: selectedProduct && selectedProduct.description,
              })(<Input type="textarea" />)}
            </FormItem>
            <FormItem label="Danh mục">
              {getFieldDecorator('category_id', {
                initialValue: selectedProduct && selectedProduct.category_id,
              })(<Input/>)}
            </FormItem>
            <FormItem label="Nhà cung cấp">
              {getFieldDecorator('provider', {
                initialValue: selectedProduct && selectedProduct.provider,
              })(<Input/>)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class Product extends Component {
  static info = {
    title: "Quản lý sản phẩm",
    style
  }

  state = {
    showModalNewProduct: false,
    showModalEdit: false,
    selectedProduct: null,
    selectedIds: [],
    selectedRowKeys: [],
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getProductData("all"));
  }

  showModalNewProduct = () => {
    this.setState({showModalNewProduct: true})
  }

  editModal = (id) => {
    const { products } = this.props;
    const selectedProduct = products.data.find((p) => p.id == id)
    this.setState({selectedProduct: selectedProduct, showModalEdit: true})
  }

  handleCancel = () => {
    const form = this.formRef.props.form;
    form.resetFields();
    this.setState({ showModalNewProduct: false, showModalEdit: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        form.resetFields();
        let url = `http://localhost:8880/api/products/create`;
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Tạo sản phẩm thành công', null)
            dispatch(getProductData("all"))
            this.setState({ showModalNewProduct: false });
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
    const { selectedProduct } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        let url = `http://localhost:8880/api/products/edit`;
        values.id = selectedProduct.id
        let data = JSON.stringify(values)
        axios.post(url, data,{ headers: { 'Content-Type': 'application/json' }})
        .then(({ data }) => {
          if (data.success) {
            openNotificationWithIcon('success', 'Sửa sản phẩm thành công', null)
            dispatch(getProductData("all"))
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
    let url = `http://localhost:8880/api/products/delete`;
    axios.post(url, {listIds: ids},{ headers: { 'Content-Type': 'application/json' }})
    .then(({ data }) => {
      if (data.success) {
        openNotificationWithIcon('success', 'Xóa sản phẩm thành công', null)
        dispatch(getProductData("all"))
        this.setState({ selectedIds: [], selectedRowKeys: [] });
      } else {
        openNotificationWithIcon('error', 'Đã xảy ra lỗi, vui lòng thử lại sau', null)
      }
    })
    .catch(err => console.log(err))
  }

  searchProduct(value) {
    const { dispatch } = this.props;
    if (value !== '') {
      let url = `http://localhost:8880/api/products/search?value=${value}`;
      axios.get(url)
      .then(({ data }) => {
        if (data.success) {
          dispatch(loadProductsSuccess(data.data))
        } else {
          console.log("lỗi lấy product");
        }
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    const { products } = this.props;
    const { selectedIds, selectedRowKeys } = this.state;
    let data = products.data
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
      title: 'mã sản phẩm',
      dataIndex: 'id',
    }, {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      // render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Số lượng',
      dataIndex: 'remain_quantity',
    }, {
      title: 'giá bán',
      dataIndex: 'price',
    }, {
      title: 'giá nhập',
      dataIndex: 'import_price',
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
          <span>Quản lý sản phẩm</span>
          <Button type="primary" icon="plus" style={{float: "right", marginTop: 10}} onClick={this.showModalNewProduct}>Thêm sản phẩm</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.showModalNewProduct}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

          <CollectionEditForm
            selectedProduct={this.state.selectedProduct}
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.showModalEdit}
            onCancel={this.handleCancel}
            onEdit={this.handleEdit}
          />
          <Button disabled={selectedIds.length == 0} type="danger" icon="delete" style={{float: "right", marginTop: 10, marginRight: 10}} onClick={() => this.deleteElement(selectedIds)}>Xóa</Button>
          <Search
            placeholder="Tìm kiếm sản phẩm"
            onSearch={value => this.searchProduct(value)}
            enterButton
            style={{ width: 200, float:"right", marginRight: 10, marginTop: -5 }}
          />
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} style={{backgroundColor: "#fff"}}/>
      </div>
    )
  }
}

export default justatee(Product)
