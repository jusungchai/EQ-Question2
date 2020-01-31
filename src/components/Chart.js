import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import Select from 'react-select'
import { generateDailyChartsData } from '../helpers/createChartData'
import { eventStyle, impressionStyle, clickStyle, revenueStyle } from '../styles/styles'

export default function Chart(props) {

  const options = [
    { value: 'dailyEvents', label: 'Daily Events' }, 
    { value: 'dailyImpressions', label: 'Daily Impressions' },
    { value: 'dailyClicks', label: 'Daily Clicks' },
    { value: 'dailyRevenue', label: 'Daily Revenue' } 
  ]

  const [state, setState] = useState({
    chartOption: null,
    dailyEvents: null,
    dailyImpressions: null,
    dailyClicks: null,
    dailyRevenue: null,
    loading: true
  })
  
  useEffect(() => {
    const dailyEvents = axios.get('/events/daily1')
    const dailyStats = axios.get('/stats/daily1')
    const poi = axios.get('/poi')

    Promise.all([
      Promise.resolve(dailyEvents),
      Promise.resolve(dailyStats),
      Promise.resolve(poi)
    ]).then((all) => {      
      const dailyEventsData = generateDailyChartsData(all[0].data, all[2].data, "events")
      const dailyImpressionsData = generateDailyChartsData(all[1].data, all[2].data, "impressions")
      const dailyClicksData = generateDailyChartsData(all[1].data, all[2].data, "clicks")
      const dailyRevenueData = generateDailyChartsData(all[1].data, all[2].data, "revenue")

      setState({
        chartOption: null,
        dailyEvents: {
          labels: dailyEventsData.labels,
          datasets: dailyEventsData.datasets
        },
        dailyImpressions: {
          labels: dailyImpressionsData.labels,
          datasets: dailyImpressionsData.datasets
        },
        dailyClicks: {
          labels: dailyClicksData.labels,
          datasets: dailyClicksData.datasets
        },
        dailyRevenue: {
          labels: dailyRevenueData.labels,
          datasets: dailyRevenueData.datasets
        },
        loading: false
      })
    })
  }, [])

  const renderChart = () => {
    switch (state.chartOption) {
      case "dailyEvents":
        return (<Bar
          data={state.dailyEvents}
          options={eventStyle.options}
        />)      
      case "dailyImpressions":
        return (<Bar
          data={state.dailyImpressions}
          options={impressionStyle.options}
        />)
      case "dailyClicks":
        return (<Bar
          data={state.dailyClicks}
          options={clickStyle.options}
        />)
      case "dailyRevenue":
        return (<Bar
          data={state.dailyRevenue}
          options={revenueStyle.options}
        />)
      default:
        return
    }
  }

  return state.loading ? null : (
    <React.Fragment>
      <h1>Client-Side General Chart Visualizations</h1>
      <h3>Select To View Data Chart for First Week of January 2017</h3>
      <Select
        onChange={(event) => setState({ ...state, chartOption: event.value })}
        options={options}
      />
      {renderChart()}
      <button onClick={() => props.history.push('/')}>HOME</button>
    </React.Fragment>
  )
}