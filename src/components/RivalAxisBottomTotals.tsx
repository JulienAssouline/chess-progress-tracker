import React from "react";

interface Props {
  height: number;
  xScale: any;
}

export const RivalAxisBottomTotals: React.FC<Props> = ({ xScale, height}) =>
  xScale.ticks(3).map((tickValue: number, i: number) => {
    return (
      <g
        className="tick"
        key={i}
        transform={`translate(${xScale(tickValue)},5)`}
      >
        <text style={{ textAnchor: "middle", fontSize: 12, fill: "white" }} dy=".71em" y={height + 3}>
          {tickValue}
        </text>
      </g>
    );
  });
