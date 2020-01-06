import React from "react";
import {
  w,
  h,
  width,
  height,
  margin,
  xtickFormat
} from "../../utils/chart_utils";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent } from "d3-array";
import { line, curveMonotoneX } from "d3-shape";
import { AxisBottomMonthYears } from "../Axis/AxisBottomMonthYears";
import { AxisLeft } from "../Axis/AxisLeft";
import {
  IRatingTrendProps,
  ILineType
} from "./ratingInterface/rating.interfaces";

const RatingTrend: React.FC<IRatingTrendProps> = ({ data }) => {
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

  const path = line<ILineType>()
    .x(d => xScale(d.date))
    .y(d =>
      d.black.username === "JulienAssouline"
        ? yScale(d.black.rating)
        : yScale(d.white.rating)
    )
    .curve(curveMonotoneX);

  return (
    <div className="trend-container">
      <h2 className="trend-title"> Chess.com rating over time </h2>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottomMonthYears
            xScale={xScale}
            height={height}
            tickFormat={xtickFormat}
          />
          <AxisLeft width={width} yScale={yScale} />
          <path
            d={path(data) as string}
            style={{ fill: "none", stroke: "#6b75c4", strokeWidth: 3 }}
          />
        </g>
      </svg>
    </div>
  );
};

export default RatingTrend;
