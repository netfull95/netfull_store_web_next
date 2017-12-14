import { Component } from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import style from './index.scss'
import bigdaddy from 'hocs/bigdaddy'

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `750px`, background: '#f7f7f7', padding: 5, position: 'relative' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 21.0164772, lng: 105.8076687 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 21.0164772, lng: 105.8076687 }} onClick={props.onMarkerClick} />}
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
              <h3>Visit Our Location</h3>
              <div className="des">79 Orchard St, New York, United States.</div>
            </div>
          </div>
          <div className="item">
            <i className="fa fa-comments-o" />
            <div>
              <h3>Let's have a chat!</h3>
              <div className="des">
                <div><span className="des">T</span>1-847-555-5555</div>
                <div><span className="des">M</span>Contact@umbra.com</div>
              </div>
            </div>
          </div>
          <div className="item">
            <i className="fa fa-clock-o" />
            <div className="des">
              <h3>Working hours</h3>
              <div>Mon – Fri: 8AM – 10PM</div>
              <div>Sat: 9AM-8PM</div>
            </div>
          </div>
        </div>

        <div className="form">
          <h3 className="title">contact us</h3>
          <div className="des">Leave A Message</div>
          <div style={{ display: 'flex', width: '100%' }}>
            <input placeholder="Name" style={{ marginRight: 30 }} />
            <input placeholder="Email" />
          </div>
          <input placeholder="Subject" />
          <textarea style={{ height: 117 }} placeholder="Message" />
          <div className="send-btn">send message</div>
        </div>
      </div>
    )
  }
}

export default bigdaddy(Contact)
