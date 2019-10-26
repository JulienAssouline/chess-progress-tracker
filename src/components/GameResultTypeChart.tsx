import React from "react";
import { scaleLinear, scaleTime, scaleBand } from "d3-scale";
import { extent, max } from "d3-array";
import { MonthCountBottomAxis } from "./MonthCountBottomAxis";
import {RivalAxisLeftTotal} from "./RivalAxisLeftTotal"
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

const GameResultTypeChart: React.FC<Props>= ({data, w,h,margin, height, width}) => {

    console.log(data)

    data.sort((a,b) => (a.value as number) - (b.value as number))

    const monthsCountMax = max(data, d => d.value);

    const resultTypes = data.map(d => d.key)

    const xScale = scaleLinear()
    .domain([0, monthsCountMax as number])
    .range([0, width]);

    const yScale = scaleBand()
        .domain(resultTypes)
        .range([height, 0])

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
    <div className="cummary-chart-container">
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
            <RivalAxisLeftTotal yScale = {yScale} width = {width} textColor = {"black"} />
            {rects}
        </g>
      </svg>
    </div>
  );
};

export default GameResultTypeChart;
