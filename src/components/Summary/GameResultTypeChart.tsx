import React from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { AxisLeftString } from "../Axis/AxisLeftString";
import { AxisBottomNumber } from "../Axis/AxisBottomNumber";
import { IResultTypeProps } from "./summaryInterfaces/summary.interfaces";

const GameResultTypeChart: React.FC<IResultTypeProps> = ({
  data,
  w,
  h,
  margin,
  height,
  width
}) => {
  data.sort((a, b) => (a.value as number) - (b.value as number));

  const monthsCountMax = max(data, d => d.value);

  const resultTypes = data.map(d => d.key);

  const xScale = scaleLinear()
    .domain([0, monthsCountMax as number])
    .range([0, width]);

  const yScale = scaleBand()
    .domain(resultTypes)
    .range([height, 0]);

  const rects = data.map((d, i) => (
    <rect
      key={"rect" + i}
      x={0}
      y={yScale(d.key)}
      height={yScale.bandwidth() - 3}
      width={xScale(d.value as number)}
      style={{ fill: "#6b75c4", stroke: "#6b75c4" }}
    />
  ));

  return (
    <div className="summary-chart-container">
      <p style={{ fontWeight: "bold" }}> Result Type </p>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisLeftString yScale={yScale} width={width} textColor={"black"} />
          <AxisBottomNumber
            xScale={xScale}
            height={height}
            textColor={"black"}
          />
          {rects}
        </g>
      </svg>
    </div>
  );
};

export default GameResultTypeChart;
