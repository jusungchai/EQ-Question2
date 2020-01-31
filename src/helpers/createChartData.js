const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const generateDailyChartsData = (data, poiData, metrics) => {
  let days = []
  let datasets = []
  let defaultDataArray = []

  for (let elm of data) {
    if (!days.includes(elm.date)) {
      days.push(elm.date)
      defaultDataArray.push(0)
    }
  }

  for (let elm of poiData) {
    if (!datasets.includes(elm.name)) {
      const data = { label: elm.name, backgroundColor: getRandomColor(), data: [...defaultDataArray] }
      datasets.push(data)
    }
  }

  for (let elm of data) {
    for (let set of datasets) {
      if (set.label === elm.name) {
        set.data[days.indexOf(elm.date)] = parseFloat(elm[metrics])
      }
    }
  }

  return {
    labels: days,
    datasets: datasets
  }
}