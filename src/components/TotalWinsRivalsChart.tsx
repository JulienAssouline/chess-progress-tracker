import React from "react";
import { RivalTrendProps } from "./interfaces/RivalTrend.interface";


const TotalWinsRivalsChart: React.FC<RivalTrendProps> = ({data}) => {
    let w: number = 200,
  h: number = 200;

  interface Dir {
    right: number,
    left: number,
    top: number,
    bottom: number
  }

let margin = {
  right: 40,
  left: 40,
  top: 10,
  bottom: 40
} as Dir;

let width: number = w - margin.right - margin.left,
  height: number = h - margin.top - margin.bottom;

    console.log(data)

    return (
        <div className = "totals-win-rivals-container">
            <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
        </g>
      </svg>
        </div>
    )
}

export default TotalWinsRivalsChart