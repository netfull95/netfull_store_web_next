import { Component } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'

import style from './main.scss'

class MainLayout extends Component {
  render() {
    return (
      <Layout className="layout">
        <Layout.Content>
          {this.props.children}
        </Layout.Content>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default MainLayout
