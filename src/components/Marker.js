import React from 'react'
import "./Marker.css"

export default function Marker(props) {
  return (
    <div className={"pin"}>
      {props.name}
    </div>
  )
}
