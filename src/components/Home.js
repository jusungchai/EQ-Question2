import React from 'react'

export default function Home(props) {
  return (
    <React.Fragment>
      <button onClick={()=>props.history.push('/chart')}>Question 2A</button>
      <button onClick={()=>props.history.push('/table')}>Question 2B</button>
      <button onClick={()=>props.history.push('/map')}>Question 2C</button>
    </React.Fragment>    
  )
}
