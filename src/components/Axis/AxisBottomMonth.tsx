import React from "react";
import { IAxisBottomMonthsProps } from "./axisInterface/axis.interface";

export const AxisBottomMonth: React.FC<IAxisBottomMonthsProps> = ({
  xScale,
  height,
  tickFormat
}) => {
  const axis = xScale.ticks(6).map((tickValue: Date, i: number) => (
    <g className="tick" key={i} transform={`translate(${xScale(tickValue)},5)`}>
      <text
        style={{ textAnchor: "middle", fontSize: 12 }}
        dy=".71em"
        y={height + 3}
      >
        {`${tickFormat[tickValue.getMonth()]}`}
      </text>
    </g>
  ));

  return <>{axis}</>;
};
