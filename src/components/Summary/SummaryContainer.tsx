import React, { useContext, useState } from "react";
import { DataContext } from "../../context";
import { nest } from "d3-collection";
import { xtickFormat, chartPadding } from "../../utils/chart_utils";
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
  const [year, setYear] = useState(1);

  if (data.length === 0) return <div>...loading</div>;

  const padding = chartPadding({});

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
    setYear(Number(event.target.value as string));
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
        <MonthlyCountBarChart data={gamesPlayedByMonth} padding={padding} />
        <GameResultTypeChart data={countGameResultType} padding={padding} />
      </div>
      <div className="result-charts">
        <OpponentRatingTrend data={selectedYearData as []} padding={padding} />
        <ResultChart
          gamesWon={gamesWon.length}
          gamesDrawn={gamesDrawn.length}
          gamesLost={gamesLost.length}
          padding={padding}
        />
      </div>
    </div>
  );
};

export default Summary;
