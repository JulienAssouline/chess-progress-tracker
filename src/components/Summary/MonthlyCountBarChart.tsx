import React from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { xtickFormat } from "../../utils/chart_utils";
import { AxisBottomString } from "../Axis/AxisBottomString";
import { IMonthCountProps } from "./summaryInterfaces/summary.interfaces";

const MonthlyCountBarChart: React.FC<IMonthCountProps> = ({
  data,
  padding
}) => {
  const monthsCountMax = max(data, d => d.value);

  const xScale = scaleBand()
    .domain(xtickFormat)
    .range([0, padding.width]);

  const yScale = scaleLinear()
    .domain([0, monthsCountMax as number])
    .range([padding.height, 0]);

  const rects = data.map((d, i) => (
    <rect
      key={"rect" + i}
      x={xScale(d.key)}
      y={yScale(d.value as number)}
      height={padding.height - yScale(d.value as number)}
      width={xScale.bandwidth() - 3}
      style={{ fill: "#6b75c4", stroke: "#6b75c4" }}
    />
  ));

  const MonthCountLabels = data.map((d, i) => (
    <text
      key={"text" + i}
      x={(xScale(d.key) as number) + (xScale.bandwidth() - 3) / 2}
      y={yScale(d.value as number) + 20}
      style={{ fill: "white" }}
      textAnchor="middle"
    >
      {d.value}
    </text>
  ));

  return (
    <div className="summary-chart-container">
      <p style={{ fontWeight: "bold" }}> Games by Month </p>
      <svg width={padding.w} height={padding.h}>
        <g
          transform={`translate(${padding.margin.left},${padding.margin.top})`}
        >
          <AxisBottomString xScale={xScale} height={padding.height} />
          {rects}
          {MonthCountLabels}
        </g>
      </svg>
    </div>
  );
};

export default MonthlyCountBarChart;
