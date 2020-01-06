import React from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import { AxisLeftString } from "../Axis/AxisLeftString";
import { AxisBottomNumber } from "../Axis/AxisBottomNumber";
import { IResultChartProps } from "./summaryInterfaces/summary.interfaces";
import { chartPadding } from "../../utils/chart_utils";

const ResultChart: React.FC<IResultChartProps> = ({
  gamesWon,
  gamesDrawn,
  gamesLost,
  padding
}) => {
  padding = chartPadding({
    w: 400
  });
  const { w, h, margin, width, height } = padding;

  const xScale = scaleLinear()
    .domain([0, gamesWon])
    .range([0, width]);

  const yScale = scaleBand()
    .domain(["Draw", "Loss", "Win"])
    .range([height, 0]);

  return (
    <div className="totals-win-rivals-container">
      <p style={{ fontWeight: "bold" }}> Results </p>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisLeftString width={width} yScale={yScale} textColor={"black"} />
          <AxisBottomNumber
            xScale={xScale}
            height={height}
            textColor={"black"}
          />
          <rect
            x={0}
            y={yScale("Win")}
            height={yScale.bandwidth() - 1}
            width={xScale(gamesWon)}
            style={{ fill: "#6b75c4" }}
          />
          <rect
            x={0}
            y={yScale("Loss")}
            height={yScale.bandwidth() - 1}
            width={xScale(gamesLost)}
            style={{ fill: "#6b75c4" }}
          />
          <rect
            x={0}
            y={yScale("Draw")}
            height={yScale.bandwidth() - 1}
            width={xScale(gamesDrawn)}
            style={{ fill: "#6b75c4" }}
          />
        </g>
      </svg>
    </div>
  );
};

export default ResultChart;
