import React from "react";

interface Props {
  height: number;
  xScale: any;
}

export const AxisBottomString: React.FC<Props> = ({
  xScale,
  height,
}) =>
  xScale.domain().map((tickValue: string, i: number) => {
    return (
      <g
        className="tick"
        key={i}
        transform={`translate(${xScale(tickValue)},0)`}
      >
        <text
          style={{ textAnchor: "middle", fontSize: 12 }}
          dy=".71em"
          y={height + 10}
          dx = {xScale.bandwidth() / 2}
        >
          {tickValue}
        </text>
      </g>
    );
  });