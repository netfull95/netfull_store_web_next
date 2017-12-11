import React from 'react'
import { Button } from 'antd'

import Notification from 'components/Notification'
import bigdaddy from 'hocs/bigdaddy'
import style from './index.scss'

class Index extends React.Component {

  static info = {
    title: 'Home',
    style
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default bigdaddy(Index)
