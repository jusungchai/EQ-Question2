export const dateEvents = (eventsHourly) => {
  let result = {};
  for (let elm of eventsHourly) {
    if (result[elm.date]) {
      result[elm.date] += parseInt(elm.events)
    } else {
      result[elm.date] = parseInt(elm.events)
    }
  }
  return result
}

export const hourEvents = (eventsHourly) => {
  let result = {};
  for (let elm of eventsHourly) {
    if (result[elm.hour]) {
      result[elm.hour] += parseInt(elm.events)
    } else {
      result[elm.hour] = parseInt(elm.events)
    }
  }
  return result
}