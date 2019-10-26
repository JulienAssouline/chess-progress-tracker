import React from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";
import { xtickFormat } from "../utils/chart_utils";
import { MonthCountBottomAxis } from "./MonthCountBottomAxis";
interface Props {
    data: {
        key: string,
        value: number | undefined
    }[],
    height: number,
    width: number,
    margin: {
        left: number,
        right: number,
        top: number,
        bottom: number
    },
    w: number,
    h: number
}

const MonthlyCountBarChart: React.FC<Props>= ({data, width, height, margin, w, h}) => {

  const monthsCountMax = max(data, d => d.value);

  const xScale = scaleBand()
    .domain(xtickFormat)
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, monthsCountMax as number])
    .range([height, 0]);

  const rects = data.map((d, i) => (
    <rect
      key={"rect" + i}
      x={xScale(d.key)}
      y={yScale(d.value as number)}
      height={height - yScale(d.value as number)}
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
    <div className="cummary-chart-container">
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <MonthCountBottomAxis xScale={xScale} height={height} />
          {rects}
          {MonthCountLabels}
        </g>
      </svg>
    </div>
  );
};

export default MonthlyCountBarChart;
