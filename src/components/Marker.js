import React from 'react'
import "./Marker.css"

export default function Marker(props) {
  const intensityMidPoint = (props.minIntensity + props.maxIntensity)/2 
  const lowerRatio = props.intensity/props.minIntensity
  const midRatio = props.intensity/intensityMidPoint
  const upperRatio = props.intensity/props.maxIntensity
  const intensityColor = () => {
    if (upperRatio === 0){
      return
    }
    if (upperRatio === 1){
      return "#ff0000"
    }
    if (midRatio === 1){
      return "#ffa200"
    }
    if (lowerRatio === 1){
      return "#ffe600"
    }
    if (upperRatio > 0.9){
      return "#ff4800"
    }
    if (upperRatio > 0.75){
      return "#ff8000"
    }
    if (upperRatio < 0.5){
      return "#f7ff66"
    }
  }
  const color = props.intensity ? intensityColor() : null
  return (
    <div className={"pin"} style={{backgroundColor: color}}>
      {props.name}
    </div>
  )
}