import React from 'react'

export default function MapVisual(props) {
  return (
    <React.Fragment>
      <h1>Client-Side Geo Visualizations</h1>
      <button onClick={()=>props.history.push('/')}>HOME</button>
    </React.Fragment>
  )
}
