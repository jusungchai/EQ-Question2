import React from 'react'

export default function Table(props) {
  return (
    <React.Fragment>
      <h1>Client-Side Data Table</h1>
      <button onClick={()=>props.history.push('/')}>HOME</button>
    </React.Fragment>
  )
}
