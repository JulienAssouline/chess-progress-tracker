import React from "react";
import { xtickFormat } from "../../utils/chart_utils";
import { nest } from "d3-collection";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent, mean } from "d3-array";
import { line, curveMonotoneX } from "d3-shape";
import { AxisBottomMonthYears } from "../Axis/AxisBottomMonthYears";
import { AxisLeft } from "../Axis/AxisLeft";
import { timeFormat, timeParse } from "d3-time-format";
import {
  IOpponentRatingProps,
  IGroupedDate,
  LineType
} from "./summaryInterfaces/summary.interfaces";

const OpponentRatingTrend: React.FC<IOpponentRatingProps> = ({
  data,
  padding
}) => {
  const { w, h, margin, width, height } = padding;

  const formatTime = timeFormat("%b %d %Y");
  const parseTime = timeParse("%b %d %Y");

  data.forEach(d => {
    d.dateParsed = formatTime(d.date);
  });

  const AverageOpponentRatingByDay = nest<
    IGroupedDate,
    string | number | undefined
  >()
    .key(d => d.dateParsed as string)
    .rollup(v => {
      return mean(v, d =>
        d.black.username !== "JulienAssouline" ? d.black.rating : d.white.rating
      );
    })
    .entries(data as []);

  const [dateMin, dateMax] = extent(AverageOpponentRatingByDay, d =>
    parseTime(d.key)
  );
  const [ratingMin, ratingMax] = extent(data, d =>
    d.black.username !== "JulienAssouline" ? d.black.rating : d.white.rating
  );

  const xScale = scaleTime()
    .domain([dateMin as Date, dateMax as Date])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([ratingMin as number, ratingMax as number])
    .range([height, 0]);

  const path = line<LineType>()
    .x(d => xScale(parseTime(d.key as string) as Date))
    .y(d => yScale(d.value))
    .curve(curveMonotoneX);

  return (
    <div className="trend-container">
      <p style={{ fontWeight: "bold" }}> Opponents Rating </p>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottomMonthYears
            xScale={xScale}
            height={height}
            tickFormat={xtickFormat}
          />
          <AxisLeft width={width} yScale={yScale} />
          <path
            d={path(AverageOpponentRatingByDay as []) as string}
            style={{ fill: "none", stroke: "#6b75c4", strokeWidth: 3 }}
          />
        </g>
      </svg>
    </div>
  );
};

export default OpponentRatingTrend;
