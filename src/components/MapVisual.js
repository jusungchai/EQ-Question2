import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import axios from 'axios'

export default function MapVisual(props) {
  const [state, setState] = useState({
    poi: null,
    loading: true
  })

  useEffect(() => {
    const pois = axios.get('/poi')
    Promise.all([
      pois
    ]).then((all) => {
      setState({
        poi: all[0].data,
        loading: false
      })
    })
  }, [])

  const generateMarkers = () => {
    console.log(state.poi)
    let key = 0;
    return state.poi.map((elm) => {
      key++
      return <Marker
        key={key}
        lat={elm.lat}
        lng={elm.lon}
        name={elm.name}
      />
    })
  }

  return state.loading ? null : (
    <React.Fragment>
      <h1>Client-Side Geo Visualizations</h1>

      <div style={{ height: '500px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBQ1NimXDA1tP00n1hqmk3RDjM7vINTM78' }}
          defaultCenter={{ lat: 43.6708, lng: -79.3899 }}
          defaultZoom={13}
        >
          {generateMarkers()}
        </GoogleMapReact>
      </div>

      <button onClick={() => props.history.push('/')}>HOME</button>
    </React.Fragment>
  )
}
