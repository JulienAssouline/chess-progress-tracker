import React from "react";

interface Props {
  height: number;
  tickFormat: string[];
  xScale: any;
}

export const AxisBottomMonth: React.FC<Props> = ({
  xScale,
  height,
  tickFormat
}) =>
  xScale.ticks(6).map((tickValue: Date, i: number) => {
    return (
      <g
        className="tick"
        key={i}
        transform={`translate(${xScale(tickValue)},5)`}
      >
        <text
          style={{ textAnchor: "middle", fontSize: 12 }}
          dy=".71em"
          y={height + 3}
        >
          {`${tickFormat[tickValue.getMonth()]}`}
        </text>
      </g>
    );
  });
