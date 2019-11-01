import React from "react";
import {IAxisLeftProps} from "./axisInterface/axis.interface"

export const AxisLeftString: React.FC<IAxisLeftProps> = ({ yScale, textColor }) =>
  yScale.domain().map((tickValue: string) => (
    <g key = {tickValue} className="tick">
      <text
        key={tickValue}
        style={{ textAnchor: 'end', fill: textColor, fontSize: 12 }}
        x={-5}
        dy=".32em"
        y={yScale(tickValue) + yScale.bandwidth() / 2}
      >
        {tickValue}
      </text>
    </g>
  ));


