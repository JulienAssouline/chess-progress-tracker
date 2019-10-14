import React from "react";

interface Props {
  height: number;
  tickFormat: string[];
  xScale: any;
}

export const AxisBottom: React.FC<Props> = ({ xScale, height, tickFormat }) =>
  xScale.ticks().map((tickValue: Date, i: number) => {
    return (
      <g
        className="tick"
        key={i}
        transform={`translate(${xScale(tickValue)},0)`}
      >
        <line y2={height} />
        <text style={{ textAnchor: "middle" }} dy=".71em" y={height + 3}>
          {`${tickFormat[tickValue.getMonth()]} ${tickValue.getDate()}`}
        </text>
      </g>
    );
  });
