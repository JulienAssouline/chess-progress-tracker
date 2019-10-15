import React from "react";
import { w, h, width, height, margin, xtickFormat } from "../utils/chart_utils";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent, max } from "d3-array";
import { line, curveMonotoneX } from "d3-shape";
import { timeParse } from "d3-time-format";
import { AxisBottom } from "./Bottom";
import {AxisLeft} from "./AxisLeft"
import {Props, LineType} from "./interfaces/RatingTrend.interface"

const RatingTrend: React.FC<Props> = ({ data }) => {
  const parseTime = timeParse("%Y.%m.%d %H:%M:%S");

  data.forEach(d => {
    d.date = parseTime(
      `${d.pgn
        .split("\n")[2]
        .replace('[Date "', "")
        .replace('"]', "")} ${d.pgn
        .split("\n")[19]
        .replace('[EndTime "', "")
        .replace('"]', "")}`
    ) as Date;
  });

  const dateMax = max(data, d => d.date);
  const dateMin = new Date(2019, 0, 1);
  const [ratingMin, ratingMax] = extent(data, d =>
    d.black.username === "JulienAssouline" ? d.black.rating : d.white.rating
  );

  const xScale = scaleTime()
    .domain([dateMin as Date, dateMax as Date])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([ratingMin as number, ratingMax as number])
    .range([height, 0]);

    const dataFiltered = data.filter((d) => { return d.date >= dateMin})

  const path = line<LineType>()
    .x(d => xScale(d.date))
    .y(d =>
      d.black.username === "JulienAssouline"
        ? yScale(d.black.rating)
        : yScale(d.white.rating)
    )
    .curve(curveMonotoneX);

  return (
    <div className="trend-container">
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            height={height}
            tickFormat={xtickFormat}
          />
          <AxisLeft yScale = {yScale} />
          <path
            d={path(dataFiltered) as string}
            style={{ fill: "none", stroke: "#ffab00", strokeWidth: 3 }}
          />
        </g>
      </svg>
    </div>
  );
};

export default RatingTrend;
