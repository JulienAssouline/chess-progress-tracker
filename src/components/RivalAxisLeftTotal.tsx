import React from "react";

interface Props {
  yScale: any;
  width: number
}

export const RivalAxisLeftTotal: React.FC<Props> = ({ yScale }) =>
  yScale.domain().map((tickValue: string) => (
    <g key = {tickValue} className="tick">
      <text
        key={tickValue}
        style={{ textAnchor: 'end', fill: "white", fontSize: 12 }}
        x={-5}
        dy=".32em"
        y={yScale(tickValue) + yScale.bandwidth() / 2}
      >
        {tickValue}
      </text>
    </g>
  ));


