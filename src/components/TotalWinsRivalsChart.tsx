import React from "react";
import { RivalTotals } from "./interfaces/RivalTrend.interface";
import { scaleLinear, scaleBand } from "d3-scale";
import { RivalAxisLeftTotal } from "./RivalAxisLeftTotal";
import {RivalAxisBottomTotals} from "./RivalAxisBottomTotals"

const TotalWinsRivalsChart: React.FC<RivalTotals> = ({ data }) => {
  let w: number = 200,
    h: number = 100;

  interface Dir {
    right: number;
    left: number;
    top: number;
    bottom: number;
  }

  let margin = {
    right: 40,
    left: 40,
    top: 0,
    bottom: 20
  } as Dir;

  let width: number = w - margin.right - margin.left,
    height: number = h - margin.top - margin.bottom;

  console.log(data);

  const xScale = scaleLinear()
    .domain([0, data.JulienWins])
    .range([0, width]);

  const yScale = scaleBand()
    .domain(["Draw", "Loss", "Win"])
    .range([height, 0]);

  return (
    <div className="totals-win-rivals-container">
      <p style={{ fontWeight: "bold" }}> vs Pasusu4 Totals</p>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <RivalAxisLeftTotal width={width} yScale={yScale} />
        <RivalAxisBottomTotals 
            xScale={xScale}
            height={height}/>
          <rect
            x={0}
            y={yScale("Win")}
            height={yScale.bandwidth() - 1}
            width={xScale(data.JulienWins)}
            style={{ fill: "white" }}
          />
          <rect
            x={0}
            y={yScale("Loss")}
            height={yScale.bandwidth() - 1}
            width={xScale(data.JulienLoss)}
            style={{ fill: "white" }}
          />
          <rect
            x={0}
            y={yScale("Draw")}
            height={yScale.bandwidth() - 1}
            width={xScale(data.JulienDraws)}
            style={{ fill: "white" }}
          />


        </g>
      </svg>
    </div>
  );
};

export default TotalWinsRivalsChart;
