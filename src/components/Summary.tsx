import React, { useContext } from "react";
import { DataContext } from "../context";
import { nest } from "d3-collection";
import { scaleLinear, scaleTime, scaleBand } from "d3-scale";
import { extent, max } from "d3-array";
import { w, h, width, height, margin, xtickFormat } from "../utils/chart_utils";
import { MonthCountBottomAxis } from "./MonthCountBottomAxis";
interface SummaryData {
  date: Date;
  black: {
    rating: number;
    username: string;
    result: string;
  };
  white: {
    rating: number;
    username: string;
    result: string;
  };
}

const Summary: React.FC = () => {
  const data = useContext(DataContext) as SummaryData[];

  const countGameResultType = nest<SummaryData, number>()
    .key(d =>
      d.black.username === "JulienAssouline" ? d.black.result : d.white.result
    )
    .rollup(v => v.length)
    .entries(data);

  const gamesPlayedByMonth = nest<SummaryData, number>()
    .key(d => xtickFormat[d.date.getMonth()] as string)
    .rollup(v => v.length)
    .entries(data);

  console.log(gamesPlayedByMonth);

  const monthsCountMax = max(gamesPlayedByMonth, d => d.value);

  const xScale = scaleBand()
    .domain(xtickFormat)
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([0, monthsCountMax as number])
    .range([height, 0]);

  const monthsRects = gamesPlayedByMonth.map((d, i) => (
    <rect
      key={"rect" + i}
      x={xScale(d.key)}
      y={yScale(d.value as number)}
      height={height - yScale(d.value as number)}
      width={xScale.bandwidth() - 3}
      style={{ fill: "#6b75c4", stroke: "#6b75c4" }}
    />
  ));

  const MonthCountLabels = gamesPlayedByMonth.map((d, i) => (
    <text
      key={"text" + i}
      x={(xScale(d.key) as number) + (xScale.bandwidth() - 3) / 2}
      y={yScale(d.value as number) + 20}
      style={{ fill: "white" }}
      textAnchor="middle"
    >
      {" "}
      {d.value}{" "}
    </text>
  ));

  return (
    <div className="summary-container">
      <h1> Summary </h1>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <MonthCountBottomAxis xScale={xScale} height={height} />
          {monthsRects}
          {MonthCountLabels}
        </g>
      </svg>
    </div>
  );
};

export default Summary;
