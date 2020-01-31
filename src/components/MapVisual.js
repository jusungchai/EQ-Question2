import React from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapVisual(props) {
  return (
    <React.Fragment>
      <h1>Client-Side Geo Visualizations</h1>
      <div style={{ height: '500px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBQ1NimXDA1tP00n1hqmk3RDjM7vINTM78' }}
          defaultCenter={{lat: 59.95, lng: 30.33}}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
      <button onClick={() => props.history.push('/')}>HOME</button>
    </React.Fragment>
  )
}
