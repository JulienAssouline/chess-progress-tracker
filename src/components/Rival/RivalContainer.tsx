import React, { useContext } from "react";
import { DataContext } from "../../context";
import RivalTrend from "./RivalTrend";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TotalWinsRivalsChart from "./TotalWinsRivalsChart";
import { IRivalContextData } from "./rivalInterface/rival.interfaces";
import moment from "moment";
import LongestRivalGames from "./LongestRivalGames";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 15,
    width: 150,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    textAlign: "left",
    boxShadow: "none"
  },
  chart: {
    padding: 15,
    width: 200,
    backgroundColor: "#6a75ca",
    color: "white",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    textAlign: "left",
    boxShadow: "none"
  }
}));

const Rival: React.FC = () => {
  const data = useContext(DataContext) as IRivalContextData[];
  const classes = useStyles();

  if (data.length === 0) return <div>...loading</div>;

  const dataFiltered = data.filter(
    d =>
      (d.black.username === "JulienAssouline" &&
        d.white.username === "pazuzu4") ||
      (d.white.username === "JulienAssouline" && d.black.username === "pazuzu4")
  );

  let winCounter: number = 1;
  let drawCounter: number = 0;
  let lossCounter: number = 0;

  dataFiltered.forEach(d => {
    d.JulienWins = winCounter;
    d.JulienDraws = drawCounter;
    d.JulienLoss = lossCounter;
    d.Total = d.JulienWins + d.JulienDraws + d.JulienLoss;
    d.winPercentage = (d.JulienWins / d.Total) * 100;
    d.lossPercentage = (d.JulienLoss / d.Total) * 100;
    d.drawsPercentage = (d.JulienDraws / d.Total) * 100;
    d.startTime = moment(
      d.pgn
        .split("\n")[17]
        .replace('[StartTime "', "")
        .replace('"]', ""),
      "HH:mm:ss"
    );
    d.endTime = moment(
      d.pgn
        .split("\n")[19]
        .replace('[EndTime "', "")
        .replace('"]', ""),
      "HH:mm:ss"
    );
    d.timeDifference = moment.duration(d.endTime.diff(d.startTime)).asMinutes();

    if (
      (d.black.username === "JulienAssouline" && d.black.result === "win") ||
      (d.white.username === "JulienAssouline" && d.white.result === "win")
    ) {
      d.JulienWins = winCounter++;
    } else if (d.black.result !== "win" && d.white.result !== "win") {
      d.JulienDraws = drawCounter++;
    } else {
      d.JulienLoss = lossCounter++;
    }
  });

  const textStyle = { color: "#9597ab", fontSize: 14 };

  const winPercentage: number =
    dataFiltered[dataFiltered.length - 1].winPercentage;

  const totalWins: number = dataFiltered[dataFiltered.length - 1].JulienWins;
  return (
    <>
      <div className="rival-container">
        <div className="numbers-containers">
          <Paper className={classes.chart}>
            <TotalWinsRivalsChart
              data={dataFiltered[dataFiltered.length - 1]}
            />
          </Paper>
          <Paper className={classes.root}>
            <h2> {dataFiltered.length} </h2>
            <p style={textStyle}> Games vs Pazuzu4 </p>
          </Paper>
          <Paper className={classes.root}>
            <h2> {`${Math.round(winPercentage)}%`} </h2>
            <p style={textStyle}> Win Percentage </p>
          </Paper>
          <Paper className={classes.root}>
            <h2> {totalWins} </h2>
            <p style={textStyle}> Total Wins </p>
          </Paper>
        </div>

        <div className="rival-trend-container">
          <RivalTrend data={dataFiltered as []} />
        </div>
      </div>
      <div className="longest-games-rival-container">
        <LongestRivalGames data={dataFiltered as []} />
      </div>
    </>
  );
};

export default Rival;
