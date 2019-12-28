import React, { useContext, useState } from "react";
import { DataContext } from "../../context";
import { nest } from "d3-collection";
import { xtickFormat } from "../../utils/chart_utils";
import MonthlyCountBarChart from "./MonthlyCountBarChart";
import GameResultTypeChart from "./GameResultTypeChart";
import ResultChart from "./ResultChart";
import OpponentRatingTrend from "./OpponentRatingTrend";
import { ISummaryData } from "./summaryInterfaces/summary.interfaces";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

const Summary: React.FC = () => {
  const data = useContext(DataContext) as ISummaryData[];
  const classes = useStyles();
  const [year, setYear] = useState(0);

  if (data.length === 0) return <div>...loading</div>;

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

  const years = [
    ...((new Set(data.map(d => d.date.getFullYear())) as unknown) as [number])
  ];

  const selectedYearData = data.filter(
    d => d.date.getFullYear() === years[Number(year)]
  );

  const countGameResultType = nest<ISummaryData, number>()
    .key(d =>
      d.black.username === "JulienAssouline" ? d.black.result : d.white.result
    )
    .rollup(v => v.length)
    .entries(selectedYearData);

  const gamesPlayedByMonth = nest<ISummaryData, number>()
    .key(d => xtickFormat[d.date.getMonth()] as string)
    .rollup(v => v.length)
    .entries(selectedYearData);

  const gamesWon = selectedYearData.filter(d =>
    d.black.username === "JulienAssouline"
      ? d.black.result === "win"
      : d.white.result === "win"
  );
  const gamesDrawn = selectedYearData.filter(
    d => d.black.result !== "win" && d.white.result !== "win"
  );
  const gamesLost = selectedYearData.filter(d =>
    d.black.username !== "JulienAssouline"
      ? d.black.result === "win"
      : d.white.result === "win"
  );

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYear(Number(event.target.value as string) as any);
  };

  return (
    <div className="summary-container">
      <div className="summary-years-dd-container">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            id="demo-simple-select"
            value={year}
            onChange={handleYearChange}
          >
            {years.map((d, i) => (
              <MenuItem key={i} value={i}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
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
        />
        <OpponentRatingTrend data={selectedYearData as []} />
      </div>
    </div>
  );
};

export default Summary;
