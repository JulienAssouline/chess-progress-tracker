import React from "react";

interface Props {
  yScale: any;
}

export const AxisLeft: React.FC<Props> = ({ yScale }) =>
  yScale.ticks(5).map((tickValue: number) => (
    <g className="tick">
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-3}
        dy=".32em"
        y={yScale(tickValue)}
      >
        {tickValue}
      </text>
    </g>
  ));
