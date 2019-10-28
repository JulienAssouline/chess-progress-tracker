import React from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import { RivalAxisLeftTotal } from "./RivalAxisLeftTotal";
import { RivalAxisBottomTotals } from "./RivalAxisBottomTotals";

interface Props {
  gamesWon: number;
  gamesDrawn: number;
  gamesLost: number;
  width: number;
  height: number;
  w: number;
  h: number;
  margin: {
    left: number;
    right: number;
    bottom: number;
    top: number;
  };
}

const ResultChart: React.FC<Props> = ({ gamesWon, gamesDrawn, gamesLost }) => {
  let w: number = 600,
    h: number = 200;

  interface Dir {
    right: number;
    left: number;
    top: number;
    bottom: number;
  }

  let margin = {
    right: 40,
    left: 40,
    top: 40,
    bottom: 40
  } as Dir;

  let width: number = w - margin.right - margin.left,
    height: number = h - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, gamesWon])
    .range([0, width]);

  const yScale = scaleBand()
    .domain(["Draw", "Loss", "Win"])
    .range([height, 0]);

  return (
    <div className="totals-win-rivals-container">
      <p style={{ fontWeight: "bold" }}> Results </p>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <RivalAxisLeftTotal
            width={width}
            yScale={yScale}
            textColor={"black"}
          />
          <RivalAxisBottomTotals xScale={xScale} height={height} />
          <rect
            x={0}
            y={yScale("Win")}
            height={yScale.bandwidth() - 1}
            width={xScale(gamesWon)}
            style={{ fill: "#6b75c4" }}
          />
          <rect
            x={0}
            y={yScale("Loss")}
            height={yScale.bandwidth() - 1}
            width={xScale(gamesLost)}
            style={{ fill: "#6b75c4" }}
          />
          <rect
            x={0}
            y={yScale("Draw")}
            height={yScale.bandwidth() - 1}
            width={xScale(gamesDrawn)}
            style={{ fill: "#6b75c4" }}
          />
        </g>
      </svg>
    </div>
  );
};

export default ResultChart;
