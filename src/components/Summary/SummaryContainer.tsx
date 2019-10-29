import React, { useContext } from "react";
import { DataContext } from "../../context";
import { nest } from "d3-collection";
import { xtickFormat } from "../../utils/chart_utils";
import MonthlyCountBarChart from "./MonthlyCountBarChart";
import GameResultTypeChart from "./GameResultTypeChart";
import ResultChart from "./ResultChart";

interface SummaryData {
  date: Date;
  black: {
    rating: number;
    username: string;
    result: string;
  };
  white: {
    rating: number;
    username: string;
    result: string;
  };
}

const Summary: React.FC = () => {
  const data = useContext(DataContext) as SummaryData[];

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
    left: 110,
    top: 20,
    bottom: 40
  } as Dir;

  let width: number = w - margin.right - margin.left,
    height: number = h - margin.top - margin.bottom;

  const countGameResultType = nest<SummaryData, number>()
    .key(d =>
      d.black.username === "JulienAssouline" ? d.black.result : d.white.result
    )
    .rollup(v => v.length)
    .entries(data);

  const gamesPlayedByMonth = nest<SummaryData, number>()
    .key(d => xtickFormat[d.date.getMonth()] as string)
    .rollup(v => v.length)
    .entries(data);

  const gamesWon = data.filter(d =>
    d.black.username === "JulienAssouline"
      ? d.black.result === "win"
      : d.white.result === "win"
  );
  const gamesDrawn = data.filter(
    d => d.black.result !== "win" && d.white.result !== "win"
  );
  const gamesLost = data.filter(d =>
    d.black.username !== "JulienAssouline"
      ? d.black.result === "win"
      : d.white.result === "win"
  );

  return (
    <div className="summary-container">
      <div className="header-charts">
        <MonthlyCountBarChart
          data={gamesPlayedByMonth}
          width={width}
          height={height}
          margin={margin}
          w={w}
          h={h}
        />
        <GameResultTypeChart
          data={countGameResultType}
          width={width}
          height={height}
          margin={margin}
          w={400}
          h={300}
        />
      </div>
      <div className="result-charts">
        <ResultChart
          gamesWon={gamesWon.length}
          gamesDrawn={gamesDrawn.length}
          gamesLost={gamesLost.length}
          width={width}
          height={height}
          margin={margin}
          w={400}
          h={400}
        />
      </div>
    </div>
  );
};

export default Summary;
