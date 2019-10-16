import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import RatingTrend from "./RatingTrend";
import { DataContext } from "../context";
import { Stats, Result } from "./interfaces/Rating.interfaces";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  rating: {
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

const textStyle = { color: "#9597ab", fontSize: 14 };

const Rating: React.FC = () => {
  const [stats, setStats] = useState<Stats | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const data = useContext(DataContext);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Result = await axios(
          "https://api.chess.com/pub/player/julienassouline/stats"
        );

        setStats(result.data);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (data.length === 0 || !stats) return <div>...loading</div>;

  return (
    <div className="rating-container">
      <div className="data-container">
        <div className="numbers-containers">
          <Paper className={classes.root}>
            <h2> {data.length} </h2>
            <p style={textStyle}> Total Games played </p>
          </Paper>
          <Paper className={classes.rating}>
            <h1>{stats.chess_blitz.last.rating}</h1>
            <p> Current Rating </p>
          </Paper>
          <Paper className={classes.root}>
            <h2>{`${Math.round(
              (stats.chess_blitz.record.win / data.length) * 100
            )}%`}</h2>
            <p style={textStyle}> Win Percentage </p>
          </Paper>
          <Paper className={classes.root}>
            <h2>{stats.chess_blitz.best.rating}</h2>
            <p style={textStyle}> Best Win </p>
          </Paper>
        </div>
        <RatingTrend data={data as []} />
      </div>
    </div>
  );
};

export default Rating;
