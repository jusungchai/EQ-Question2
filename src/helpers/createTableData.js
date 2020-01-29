export const eventsHourly = (data) => {
  const columns = [
    { title: 'Date', field: 'date' },
    { title: 'Hour', field: 'hour' },
    { title: 'Events', field: 'events' }
  ]    
  return { columns, data }
}

export const eventsDaily = (data) => {
  const columns = [
    { title: 'Date', field: 'date' },      
    { title: 'Events', field: 'events' }
  ]    
  return { columns, data }
}

export const statsHourly = (data) => {
  const columns = [
    { title: 'Date', field: 'date' },
    { title: 'Hour', field: 'hour' },
    { title: 'Impressions', field: 'impressions' },
    { title: 'Clicks', field: 'clicks' },
    { title: 'Revenue', field: 'revenue' }
  ]    
  return { columns, data }
}

export const statsDaily = (data) => {
  const columns = [
    { title: 'Date', field: 'date' },      
    { title: 'Impressions', field: 'impressions' },
    { title: 'Clicks', field: 'clicks' },
    { title: 'Revenue', field: 'revenue' }
  ]
  return { columns, data }
}

export const poiData = (data) => {
  const columns = [
    { title: 'ID', field: 'poi_id' },      
    { title: 'Name', field: 'name' },
    { title: 'Latitude', field: 'lat' },
    { title: 'Longitude', field: 'lon' }
  ]
  return { columns, data }
}