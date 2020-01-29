export const dateStats = (statsHourly) => {
  let result = {};
  for (let elm of statsHourly) {
    if (result[elm.date]) {
      result[elm.date].impressions += elm.impressions
      result[elm.date].clicks += elm.impressions
      result[elm.date].revenue += parseFloat(elm.revenue)
    } else {
      result[elm.date] = {
        impressions: elm.impressions,
        clicks: elm.clicks,
        revenue: parseFloat(elm.revenue)
      }
    }
  }
  return result
}

export const hourStats = (statsHourly) => {
  let result = {};  
  for (let elm of statsHourly) {
    if (result[elm.hour]) {
      result[elm.hour].impressions += elm.impressions
      result[elm.hour].clicks += elm.impressions
      result[elm.hour].revenue += parseFloat(elm.revenue)
    } else {
      result[elm.hour] = {
        impressions: elm.impressions,
        clicks: elm.clicks,
        revenue: parseFloat(elm.revenue)
      }
    }
  }
  return result
}