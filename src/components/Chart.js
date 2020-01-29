import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar, Line } from 'react-chartjs-2'
import Select from 'react-select'
import { dateEvents, hourEvents } from '../helpers/createEvents'
import { dateStats, hourStats } from '../helpers/createStats'
import { style } from '../styles/styles'

export default function Chart(props) {
  const eventsOptions = [
    { value: 'simple', label: 'Events Per Day (Simple)' },
    { value: 'spread', label: 'Events Per Day (Spread)' },
    { value: 'hour', label: 'Events Per Hour' }
  ]

  const statsOptions = [
    { value: 'simple', label: 'Stats Per Day (Simple)' },
    { value: 'spread', label: 'Stats Per Day (Spread)' },
    { value: 'hour', label: 'Stats Per Hour' }
  ]

  const [state, setState] = useState({
    eventDataSpread: null,
    eventDataSimple: null,
    eventDataHour: null,
    statsDataSpread: null,
    statsDataSimple: null,
    statsDataHour: null,
    eventsOption: null,
    statsOption: null,
    loading: true
  })

  useEffect(() => {
    const hourlyEvents = axios.get('/events/hourly')
    const dailyEvents = axios.get('/events/daily')
    const hourlyStats = axios.get('/stats/hourly')
    const dailyStats = axios.get('/stats/daily')
    Promise.all([
      Promise.resolve(hourlyEvents),
      Promise.resolve(dailyEvents),
      Promise.resolve(hourlyStats),
      Promise.resolve(dailyStats)
    ]).then((all) => {
      const eventDateData = dateEvents(all[0].data)
      const eventHourData = hourEvents(all[0].data)
      const statDateData = dateStats(all[2].data)
      const statHourData = hourStats(all[2].data)

      setState({
        eventDataSimple: {
          labels: all[1].data.map(data => data.date),
          datasets: [
            {
              label: "Events Per Day (Simple)",
              backgroundColor: "red",
              data: all[1].data.map(data => data.events)
            }
          ]
        },
        eventDataSpread: {
          labels: Object.keys(eventDateData),
          datasets: [
            {
              label: "Events Per Day (Spread)",
              backgroundColor: "orange",
              data: Object.values(eventDateData)
            }
          ]
        },
        eventDataHour: {
          labels: Object.keys(eventHourData),
          datasets: [
            {
              label: "Events Per Hour",
              backgroundColor: "yellow",
              data: Object.values(eventHourData)
            }
          ]
        },
        statsDataSimple: {
          labels: all[3].data.map(data => data.date),
          datasets: [
            {
              label: "Impressions",              
              data: all[3].data.map(data => data.impressions),
              fill: false,
              borderColor: "green"
            },
            {
              label: "Clicks",              
              data: all[3].data.map(data => data.clicks),
              fill: false,
              borderColor: "blue"
            },
            {
              label: "Revenue",              
              data: all[3].data.map(data => data.revenue),
              fill: false,
              borderColor: "purple"
            }
          ]
        },
        statsDataSpread: {
          labels: Object.keys(statDateData),
          datasets: [
            {
              label: "Impressions",
              data: Object.values(statDateData).map(data => data.impressions),
              fill: false,
              borderColor: "red"
            },
            {
              label: "Clicks",
              data: Object.values(statDateData).map(data => data.clicks),
              fill: false,
              borderColor: "blue"
            },
            {
              label: "Revenue",
              data: Object.values(statDateData).map(data => data.revenue),
              fill: false,
              borderColor: "orange"
            }
          ]
        },
        statsDataHour: {
          labels: Object.keys(statHourData),
          datasets: [
            {
              label: "Impressions",
              data: Object.values(statHourData).map(data => data.impressions),
              fill: false,
              borderColor: "red"
            },
            {
              label: "Clicks",
              data: Object.values(statHourData).map(data => data.clicks),
              fill: false,
              borderColor: "blue"
            },
            {
              label: "Revenue",
              data: Object.values(statHourData).map(data => data.revenue),
              fill: false,
              borderColor: "orange"
            }
          ]
        },
        loading: false
      })
    })
  }, [])

  const renderEvents = () => {
    if (state.eventsOption === "spread") {
      return (<Bar
        data={state.eventDataSpread}
      />)
    }
    if (state.eventsOption === "hour") {
      return (<Bar
        data={state.eventDataHour}
      />)
    }
    if (state.eventsOption === "simple") {
      return (<Bar
        data={state.eventDataSimple}
      />)
    }
  }

  const renderStats = () => {
    if (state.statsOption === "spread") {
      return (<Line
        data={state.statsDataSpread}
        options={style.options}
      />)
    }
    if (state.statsOption === "hour") {
      return (<Line
        data={state.statsDataHour}
        options={style.options}
      />)
    }
    if (state.statsOption === "simple") {
      return (<Line
        data={state.statsDataSimple}
        options={style.options}
      />)
    }
  }

  return state.loading ? null : (
    <React.Fragment>
      <h1>Client-Side General Chart Visualizations</h1>
      <h3>Select To View Events From List Below</h3>
      <Select
        onChange={(event) => setState({ ...state, eventsOption: event.value })}
        options={eventsOptions}
      />
      {renderEvents()}

      <h3>Select To View Stats From List Below</h3>
      <Select
        onChange={(event) => setState({ ...state, statsOption: event.value })}
        options={statsOptions}
      />
      {renderStats()}

      <button onClick={() => props.history.push('/')}>HOME</button>
    </React.Fragment>
  )
}
