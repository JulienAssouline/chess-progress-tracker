import React from "react";
import {IAxisBottomMonthsProps} from "./axisInterface/axis.interface" 

export const AxisBottomMonthYears: React.FC<IAxisBottomMonthsProps> = ({ xScale, height, tickFormat }) =>
  xScale.ticks().map((tickValue: Date, i: number) => {
    return (
      <g
        className="tick"
        key={i}
        transform={`translate(${xScale(tickValue)},5)`}
      >
        <text style={{ textAnchor: "middle", fontSize: 12 }} dy=".71em" y={height + 3}>
          {`${tickFormat[tickValue.getMonth()]} '${tickValue.getFullYear() - 2000}`}
        </text>
      </g>
    );
  });
