import React from "react";
import {IAxisLeftProps} from "./axisInterface/axis.interface"

export const AxisLeftPercent: React.FC<IAxisLeftProps> = ({ yScale, width }) =>
  yScale.ticks(5).map((tickValue: number) => (
    <g key={tickValue} className="tick">
      <line
        style={{ stroke: "#e4e5eb" }}
        y1={yScale(tickValue)}
        y2={yScale(tickValue)}
        x2={width}
      />
      <text
        style={{ textAnchor: "end", fontSize: 12 }}
        x={-10}
        dy=".32em"
        y={yScale(tickValue)}
      >
        {tickValue === 100 ? `${tickValue}%` : tickValue}
      </text>
    </g>
  ));
