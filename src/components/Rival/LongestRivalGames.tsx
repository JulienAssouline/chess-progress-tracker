import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { nest } from "d3-collection";
import { IRivalTrendProps } from "./rivalInterface/rival.interfaces";

const useStyles = makeStyles(() => ({
  root: {
    padding: 10,
    height: "100%",
    width: 250,
    boxShadow: "none"
  }
}));

const LongestRivalGames: React.FC<IRivalTrendProps> = ({ data }) => {
  const classes = useStyles();

  const summaryLongestGames = nest<{ timeDifference: string }, number>()
    .key(
      d =>
        (Math.round(
          (d.timeDifference as unknown) as number
        ) as unknown) as string
    )
    .rollup(v => v.length)
    .entries(data as []);

  const summaryLongestGamesPosVal = summaryLongestGames.filter(
    d => Number(d.key) > 0
  );

  summaryLongestGamesPosVal.sort((a, b) => Number(b.key) - Number(a.key));

  return (
    <Paper className={classes.root}>
      <h2> Longest Games </h2>
      {summaryLongestGamesPosVal.map(d => (
        <div key={d.key} className="player-container">
          <h3 className="player-name">{d.key} Minutes:</h3>
          <p className="player-value">{d.value}</p>
        </div>
      ))}
    </Paper>
  );
};

export default LongestRivalGames;
