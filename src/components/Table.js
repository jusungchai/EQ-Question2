import React, { forwardRef, useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { Clear, FirstPage, LastPage, ChevronRight, ChevronLeft, Search } from "@material-ui/icons"
import axios from 'axios'
import Select from 'react-select'
import { eventsHourly, eventsDaily, statsHourly, statsDaily, poiData } from '../helpers/createTableData'

const tableIcons = {
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)
};

export default function Table(props) {

  const options = [
    { value: 'Events Hourly', label: 'Events Hourly' },
    { value: 'Events Daily', label: 'Events Daily' },
    { value: 'Stats Hourly', label: 'Stats Hourly' },
    { value: 'Stats Daily', label: 'Stats Daily' },
    { value: 'POI Data', label: 'POI Data' }
  ]

  const [state, setState] = useState({
    eventsHourly: null,
    eventsDaily: null,
    statsHourly: null,
    statsDaily: null,
    rowStyles: null,
    tableName: null,
    loading: true
  });

  useEffect(() => {
    const hourlyEvents = axios.get('/events/hourly')
    const dailyEvents = axios.get('/events/daily')
    const hourlyStats = axios.get('/stats/hourly')
    const dailyStats = axios.get('/stats/daily')
    const pois = axios.get('/poi')
    Promise.all([
      Promise.resolve(hourlyEvents), //0
      Promise.resolve(dailyEvents), //1
      Promise.resolve(hourlyStats), //2
      Promise.resolve(dailyStats), //3
      Promise.resolve(pois) //4
    ]).then((all) => {
      setState({
        eventsHourly: eventsHourly(all[0].data),
        eventsDaily: eventsDaily(all[1].data),
        statsHourly: statsHourly(all[2].data),
        statsDaily: statsDaily(all[3].data),
        poiData: poiData(all[4].data),
        rowStyles: {
          backgroundColor: 'white'
        },
        tableName: null,
        loading: false
      })
    })
  }, [])

  const renderTable = () => {
    switch (state.tableName) {
      case "Events Hourly":
        return (
          <MaterialTable
            style={{ marginTop: 200 }}
            icons={tableIcons}
            title="Events Hourly"
            columns={state.eventsHourly.columns}
            data={state.eventsHourly.data}
            options={{ sorting: false, draggable: false, rowStyle: state.rowStyles }}
            onSearchChange={(event) => event ? setState({
              ...state,
              rowStyles: {
                backgroundColor: 'yellow'
              }
            }) : setState({
              ...state,
              rowStyles: {
                backgroundColor: 'white'
              }
            })}
          />
        )
      case "Events Daily":
        return (
          <MaterialTable
            style={{ marginTop: 200 }}
            icons={tableIcons}
            title="Events Daily"
            columns={state.eventsDaily.columns}
            data={state.eventsDaily.data}
            options={{ sorting: false, draggable: false, rowStyle: state.rowStyles }}
            onSearchChange={(event) => event ? setState({
              ...state,
              rowStyles: {
                backgroundColor: 'yellow'
              }
            }) : setState({
              ...state,
              rowStyles: {
                backgroundColor: 'white'
              }
            })}
          />
        )
      case "Stats Hourly":
        return (
          <MaterialTable
            style={{ marginTop: 200 }}
            icons={tableIcons}
            title="Stats Hourly"
            columns={state.statsHourly.columns}
            data={state.statsHourly.data}
            options={{ sorting: false, draggable: false, rowStyle: state.rowStyles }}
            onSearchChange={(event) => event ? setState({
              ...state,
              rowStyles: {
                backgroundColor: 'yellow'
              }
            }) : setState({
              ...state,
              rowStyles: {
                backgroundColor: 'white'
              }
            })}
          />
        )
      case "Stats Daily":
        return (
          <MaterialTable
            style={{ marginTop: 200 }}
            icons={tableIcons}
            title="Stats Daily"
            columns={state.statsDaily.columns}
            data={state.statsDaily.data}
            options={{ sorting: false, draggable: false, rowStyle: state.rowStyles }}
            onSearchChange={(event) => event ? setState({
              ...state,
              rowStyles: {
                backgroundColor: 'yellow'
              }
            }) : setState({
              ...state,
              rowStyles: {
                backgroundColor: 'white'
              }
            })}
          />
        )
      case "POI Data":
        return (
          <MaterialTable
            style={{ marginTop: 200 }}
            icons={tableIcons}
            title="POI Data"
            columns={state.poiData.columns}
            data={state.poiData.data}
            options={{ sorting: false, draggable: false, rowStyle: state.rowStyles }}
            onSearchChange={(event) => event ? setState({
              ...state,
              rowStyles: {
                backgroundColor: 'yellow'
              }
            }) : setState({
              ...state,
              rowStyles: {
                backgroundColor: 'white'
              }
            })}
          />
        )
      default:
        return
    }
  }

  return state.loading ? null : (
    <React.Fragment>
      <h1>Client-Side Data Table</h1>
      <h3>Select To View Data Table From List Below</h3>
      <Select
        onChange={(event) => setState({ ...state, tableName: event.value })}
        options={options}
      />
      {renderTable()}

      <button onClick={() => props.history.push('/')}>HOME</button>
    </React.Fragment>
  )
}