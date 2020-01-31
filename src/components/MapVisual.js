import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import axios from 'axios'
import Select from 'react-select'

export default function MapVisual(props) {

  const options = [
    { value: 'events', label: 'Intensity by Total Events' },
    { value: 'impressions', label: 'Intensity by Total Impressions' },
    { value: 'clicks', label: 'Intensity by Total Clicks' },
    { value: 'revenue', label: 'Intensity by Total Revenue' },
    { value: null, label: 'No Intensity' }
  ]

  const [state, setState] = useState({
    metricOption: null,
    poi: null,
    loading: true
  })

  useEffect(() => {
    const pois = axios.get('/totalMetrics')
    const statsHourly = axios.get('/stats/hourly1')
    const eventsHourly = axios.get('/events/hourly1')
    Promise.all([
      pois,
      statsHourly,
      eventsHourly
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
    let intensities;
    let minIntensity;
    let maxIntensity;
    switch (state.metricOption) {
      case "events":
        intensities = state.poi.map((elm) => parseFloat(elm.events))
        minIntensity = Math.min(...intensities) 
        maxIntensity = Math.max(...intensities)
        return state.poi.map((elm) => {
          key++
          return <Marker
            key={key}
            lat={elm.lat}
            lng={elm.lon}
            name={elm.name}
            intensity={parseFloat(elm.events)}
            minIntensity={minIntensity}
            maxIntensity={maxIntensity}
          />
        })
      case "impressions":
        intensities = state.poi.map((elm) => parseFloat(elm.impressions))
        minIntensity = Math.min(...intensities) 
        maxIntensity = Math.max(...intensities)
        return state.poi.map((elm) => {
          key++
          return <Marker
            key={key}
            lat={elm.lat}
            lng={elm.lon}
            name={elm.name}
            intensity={parseFloat(elm.impressions)}
            minIntensity={minIntensity}
            maxIntensity={maxIntensity}
          />
        })
      case "clicks":
        intensities = state.poi.map((elm) => parseFloat(elm.clicks))
        minIntensity = Math.min(...intensities) 
        maxIntensity = Math.max(...intensities)
        return state.poi.map((elm) => {
          key++
          return <Marker
            key={key}
            lat={elm.lat}
            lng={elm.lon}
            name={elm.name}
            intensity={parseFloat(elm.clicks)}
            minIntensity={minIntensity}
            maxIntensity={maxIntensity}
          />
        })
      case "revenue":
        intensities = state.poi.map((elm) => parseFloat(elm.revenue))
        minIntensity = Math.min(...intensities) 
        maxIntensity = Math.max(...intensities)
        return state.poi.map((elm) => {
          key++
          return <Marker
            key={key}
            lat={elm.lat}
            lng={elm.lon}
            name={elm.name}
            intensity={parseFloat(elm.revenue)}
            minIntensity={minIntensity}
            maxIntensity={maxIntensity}
          />
        })
      default:
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
  }

  return state.loading ? null : (
    <React.Fragment>
      <h1>Client-Side Geo Visualizations</h1>

      <Select
        onChange={(event) => setState({ ...state, metricOption: event.value })}
        options={options}
      />
      <br />
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
