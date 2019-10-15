import React, { useContext } from "react";
import RatingTrend from "./RatingTrend";
import { DataContext } from "../context";
import { Game } from "./interfaces/Rating.interfaces";
import { Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 15,
    width: 200,
  },
  rating: {
    padding: 15,
    width: 200,
    backgroundColor: "#6a75ca",
    color: "white"
  }
}));

const Rating: React.FC = () => {
  const data = useContext(DataContext);
  const classes = useStyles();

  if (data.length === 0) return <div>...loading</div>;

  const latestGame: Game = data[data.length - 1] as Game;

  let currentRating: undefined | number;

  if (latestGame) {
    currentRating =
      latestGame.black.username === "JulienAssouline"
        ? latestGame.black.rating
        : latestGame.white.rating;
  }

  return (
    <div className="rating-container">
      <div className = "numbers-containers">
      <Paper className={classes.root}>
        <h3> Total Games played: </h3>
        <h1> {data.length} </h1>
      </Paper>
      <Paper className={classes.rating}>
      <h3> Current Rating </h3>
        <h1>{currentRating}</h1>
      </Paper>
      <Paper className={classes.root}>
        <h3> Monthly % Change </h3>
      </Paper>
      </div>
      <RatingTrend data={data as []} />
    </div>
  );
};

export default Rating;
