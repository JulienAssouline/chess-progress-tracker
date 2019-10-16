import React from "react";

interface Props {
  yScale: any;
  width: number
}

export const AxisLeft: React.FC<Props> = ({ yScale, width }) =>
  yScale.ticks(5).map((tickValue: number) => (
    <g key={tickValue} className="tick">
      <line style = {{stroke: "#e4e5eb"}} y1 = {yScale(tickValue)} y2 = {yScale(tickValue)} x2={width} />
      <text
        style={{ textAnchor: "end", fontSize: 12 }}
        x={-3}
        dy=".32em"
        y={yScale(tickValue)}
      >
        {tickValue}
      </text>
    </g>
  ));
