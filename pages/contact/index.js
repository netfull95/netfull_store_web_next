import { Component } from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import style from './index.scss'
import bigdaddy from 'hocs/bigdaddy'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBsOOTyYI8pLWxAYrHGNJ3TTUm0YGHeFEs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `750px`, background: '#f7f7f7', padding: 5, position: 'relative' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 20.603818, lng: 105.978933 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 20.603818, lng: 105.978933 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class Contact extends Component {
   static info = {
    title: 'Contact',
    style
  }

  render() {
    return(
      <div>
        <MyMapComponent isMarkerShown />

        <div className="address">
          <div className="item">
            <i className="fa fa-map-marker" />
            <div>
              <h3>Địa chỉ cửa hàng</h3>
              <div className="des">Chợ Điệp Sơn, Xã Yên Nam, Duy Tiên, Hà Nam</div>
            </div>
          </div>
          <div className="item">
            <i className="fa fa-comments-o" />
            <div>
              <h3>Liên hệ ngay</h3>
              <div className="des">
                <div><span className="des"></span>098-898-1626</div>
                <div><span className="des"></span>phongtiepds@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="item">
            <i className="fa fa-clock-o" />
            <div className="des">
              <h3>Giờ làm việc</h3>
              <div>Thứ 2 – Thứ 6: 7AM – 7PM</div>
              <div>Thứ 7 - Chủ Nhật: 7:30AM - 7:30PM</div>
            </div>
          </div>
        </div>

        <div className="form">
          <h3 className="title">Liên hệ trực tiếp</h3>
          <div className="des">Vui lòng để lại lời nhắn</div>
          <div style={{ display: 'flex', width: '100%' }}>
            <input placeholder="Tên" style={{ marginRight: 30 }} />
            <input placeholder="Email" />
          </div>
          <input placeholder="Tiêu đề" />
          <textarea style={{ height: 117 }} placeholder="Nội dung" />
          <div className="send-btn">Gửi tin nhắn</div>
        </div>
      </div>
    )
  }
}

export default bigdaddy(Contact)
