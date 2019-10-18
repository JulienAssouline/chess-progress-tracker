import React from "react";
import { w, h, width, height, margin, xtickFormat } from "../utils/chart_utils";
import { scaleLinear, scaleTime, scaleOrdinal } from "d3-scale";
import { extent, max, min } from "d3-array";
import { stack, area } from "d3-shape";
import { AxisBottom } from "./Bottom";
import { RivalAxisLeft } from "./RivalAxisLeft";
import { RivalProps } from "./interfaces/RivalTrend.interface";

const RivalTrend: React.FC<RivalProps> = ({ data }) => {
  if (data.length === 0) return <div> ...loading</div>;

  const keys: string[] = ["winPercentage", "lossPercentage", "drawsPercentage"];

  const stacks = stack().keys(keys);

  const dateMinFilter = new Date(2019, 0, 1);

  const dataFiltered = data.filter((d: { date: Date }) => {
    return d.date >= dateMinFilter;
  });

  const [dateMin, dateMax] = extent(dataFiltered, d => d.date);

  const series = stacks(dataFiltered as []);

  const minValue = min(series, series => min(series, d => d[0]));
  const maxPercent = max(series, series => max(series, d => d[1]));

  const xScale = scaleTime()
    .domain([dateMin as Date, dateMax as Date])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([minValue as number, maxPercent as number])
    .range([height, 0]);

  const areas = area()
    .x((d: any) => xScale(d.data.date))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]));

  const colors = scaleOrdinal(["#6b75c4", "#dfe0e9", "grey"]);
  colors.domain(keys);

  const paths = series.map((d: any, i: number) => (
    <path key={i} d={areas(d) as string} style={{ fill: colors(d.key) }} />
  ));

  return (
    <div className="rival-trend-container">
      <h2 className="trend-title"> Win Percentage vs Pazuzu4 </h2>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            height={height}
            tickFormat={xtickFormat}
          />
          <RivalAxisLeft width={width} yScale={yScale} />
          {paths}
        </g>
      </svg>
    </div>
  );
};

export default RivalTrend;
