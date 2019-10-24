import React, { useContext } from "react";
import { DataContext } from "../context";
import { nest } from "d3-collection";
import { xtickFormat } from "../utils/chart_utils";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent } from "d3-array";
import { line, curveMonotoneX } from "d3-shape";
import { MonthlyBottomAxis } from "./MonthlyBottomAxis";
import { AxisLeft } from "./AxisLeft";
import { LineType } from "./interfaces/RatingTrend.interface";

interface MonthlyData {
  date: Date;
  black: {
    rating: number;
    username: string;
  };
  white: {
    rating: number;
    username: string;
  };
}

const Monthly: React.FC = () => {
  const data = useContext(DataContext) as MonthlyData[];

  let w: number = 400,
    h: number = 200;

  interface Dir {
    right: number;
    left: number;
    top: number;
    bottom: number;
  }

  let margin = {
    right: 40,
    left: 40,
    top: 20,
    bottom: 40
  } as Dir;

  let width: number = w - margin.right - margin.left,
    height: number = h - margin.top - margin.bottom;

  let nestedData = nest()
    .key((d: any) => xtickFormat[d.date.getMonth()])
    .entries(data);

  nestedData = nestedData.slice(2);

  const [dateMin, dateMax] = extent(data, d => d.date);
  const [ratingMin, ratingMax] = extent(data, d =>
    d.black.username === "JulienAssouline" ? d.black.rating : d.white.rating
  );

  const xScale = scaleTime()
    .domain([dateMin as Date, dateMax as Date])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([ratingMin as number, ratingMax as number])
    .range([height, 0]);

  const path = line<LineType>()
    .x(d => {
      return xScale(d.date);
    })
    .y(d =>
      d.black.username === "JulienAssouline"
        ? yScale(d.black.rating)
        : yScale(d.white.rating)
    )
    .curve(curveMonotoneX);

  const monthsPaths = nestedData.map((months, index) => (
    <svg key={index} width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <text x={width / 2}> {months.key} </text>
        <MonthlyBottomAxis
          xScale={xScale}
          height={height}
          tickFormat={xtickFormat}
        />
        <AxisLeft width={width} yScale={yScale} />
        <path
          d={path(months.values) as string}
          style={{ fill: "none", stroke: "#6b75c4", strokeWidth: 3 }}
        />
      </g>
    </svg>
  ));

  return <div className="rival-container">{monthsPaths}</div>;
};

export default Monthly;
