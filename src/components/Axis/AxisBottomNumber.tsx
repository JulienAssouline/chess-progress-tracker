import React from "react";
import { IAxisBottomProps } from "./axisInterface/axis.interface";

export const AxisBottomNumber: React.FC<IAxisBottomProps> = ({
  xScale,
  height,
  textColor
}) => {
  const axis = xScale.ticks(3).map((tickValue: number, i: number) => (
    <g className="tick" key={i} transform={`translate(${xScale(tickValue)},5)`}>
      <text
        style={{ textAnchor: "middle", fontSize: 12, fill: textColor }}
        dy=".71em"
        y={height + 3}
      >
        {tickValue}
      </text>
    </g>
  ));
  return <>{axis}</>;
};
