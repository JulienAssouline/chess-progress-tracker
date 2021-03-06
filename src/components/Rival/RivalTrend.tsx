import React from "react";
import {
  w,
  h,
  width,
  height,
  margin,
  xtickFormat
} from "../../utils/chart_utils";
import { scaleLinear, scaleTime, scaleOrdinal } from "d3-scale";
import { extent, max, min } from "d3-array";
import { stack, area, Series } from "d3-shape";
import { AxisBottomMonthYears } from "../Axis/AxisBottomMonthYears";
import { AxisLeftPercent } from "../Axis/AxisLeftPercent";
import {
  IRivalTrendProps,
  IAreaDatum
} from "./rivalInterface/rival.interfaces";

type PathSeries = Series<
  {
    [key: string]: number;
  },
  string
>;

const RivalTrend: React.FC<IRivalTrendProps> = ({ data }) => {
  if (data.length === 0) return <div> ...loading</div>;

  const keys: string[] = ["winPercentage", "lossPercentage", "drawsPercentage"];

  const stacks = stack().keys(keys);

  const [dateMin, dateMax] = extent(data, d => d.date);

  const series: Series<
    {
      [key: string]: number;
    },
    string
  >[] = stacks(data as []);

  const minValue = min(series, series => min(series, d => d[0]));
  const maxPercent = max(series, series => max(series, d => d[1]));

  const xScale = scaleTime()
    .domain([dateMin as Date, dateMax as Date])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([minValue as number, maxPercent as number])
    .range([height, 0]);

  const areas = area<IAreaDatum>()
    .x(d => xScale(d.data.date))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]));

  const colors = scaleOrdinal(["#6b75c4", "#dfe0e9", "grey"]);

  const paths: object[] = series.map((d: PathSeries, i: number) => (
    <path
      key={i}
      d={areas((d as unknown) as []) as string}
      style={{ fill: colors(d.key as string) }}
    />
  ));

  return (
    <div className="rival-trend-container">
      <h2 className="trend-title"> Win Percentage vs Pazuzu4 </h2>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottomMonthYears
            xScale={xScale}
            height={height}
            tickFormat={xtickFormat}
          />
          <AxisLeftPercent width={width} yScale={yScale} />
          {paths}
        </g>
      </svg>
    </div>
  );
};

export default RivalTrend;
