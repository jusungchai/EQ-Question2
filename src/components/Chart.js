import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import { generateDailyChartsData } from '../helpers/createChartData'
import { eventStyle, impressionStyle, clickStyle, revenueStyle } from '../styles/styles'

export default function Chart(props) {

  const [state, setState] = useState({
    chart1Option: false,
    chart2Option: false,
    chart3Option: false,
    chart4Option: false,
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
      dailyEvents,
      dailyStats,
      poi
    ]).then((all) => {
      const dailyEventsData = generateDailyChartsData(all[0].data, all[2].data, "events")
      const dailyImpressionsData = generateDailyChartsData(all[1].data, all[2].data, "impressions")
      const dailyClicksData = generateDailyChartsData(all[1].data, all[2].data, "clicks")
      const dailyRevenueData = generateDailyChartsData(all[1].data, all[2].data, "revenue")

      setState({
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

  return state.loading ? null : (
    <React.Fragment>
      <h1>Client-Side General Chart Visualizations</h1>

      <h3>Select To View Data Chart for First Week of January 2017</h3>

      <div>
        <div>
          <button onClick={() => setState({ ...state, chart1Option: !state.chart1Option })}>Toggle Daily Events Chart</button>
          <div>
          {state.chart1Option ? <Bar
            data={state.dailyEvents}
            options={eventStyle.options}
          /> : null}
          </div>
        </div>

        <div>
          <button onClick={() => setState({ ...state, chart2Option: !state.chart2Option })}>Toggle Daily Impressions Chart</button>
          {state.chart2Option ? <Bar
            data={state.dailyImpressions}
            options={impressionStyle.options}
          /> : null}
        </div>

        <div>
          <button onClick={() => setState({ ...state, chart3Option: !state.chart3Option })}>Toggle Daily Clicks Chart</button>
          {state.chart3Option ? <Bar
            data={state.dailyClicks}
            options={clickStyle.options}
          /> : null}
        </div>

        <div>
          <button onClick={() => setState({ ...state, chart4Option: !state.chart4Option })}>Toggle Daily Revenue Chart</button>
          {state.chart4Option ? <Bar
            data={state.dailyRevenue}
            options={revenueStyle.options}
          /> : null}
        </div>
      </div>

      <button onClick={() => props.history.push('/')}>HOME</button>
    </React.Fragment>
  )
}