import React from "react";
import { IRivalTotals } from "./rivalInterface/rival.interfaces";
import { scaleLinear, scaleBand } from "d3-scale";
import { AxisLeftString } from "../Axis/AxisLeftString";
import { AxisBottomNumber } from "../Axis/AxisBottomNumber";

const TotalWinsRivalsChart: React.FC<IRivalTotals> = ({ data }) => {
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
          <AxisLeftString width={width} yScale={yScale} textColor={"white"} />
          <AxisBottomNumber
            xScale={xScale}
            height={height}
            textColor={"white"}
          />
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
