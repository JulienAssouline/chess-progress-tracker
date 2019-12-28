import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import RatingTrend from "./RatingTrend";
import { DataContext } from "../../context";
import {
  IStats,
  IResult,
  ISummaryData
} from "./ratingInterface/rating.interfaces";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { nest } from "d3-collection";

const useStyles = makeStyles(() => ({
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
  },
  top_players: {
    padding: 10,
    height: "100%",
    width: 250,
    boxShadow: "none"
  }
}));

const textStyle = { color: "#9597ab", fontSize: 14 };

const Rating: React.FC = () => {
  const [stats, setStats] = useState<IStats | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const data = useContext(DataContext);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: IResult = await axios(
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
  if (error) return <div> Oh no there was an error :( </div>;

  const OpponentsCount = nest<ISummaryData, number>()
    .key(d =>
      d.black.username !== "JulienAssouline"
        ? d.black.username
        : (d.white.username as string)
    )
    .rollup(v => v.length)
    .entries(data as []);

  const Top5Opponents = OpponentsCount.sort(
    (a, b) => (b.value as number) - (a.value as number)
  ).slice(0, 5);

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
            <p style={textStyle}> Best Rating </p>
          </Paper>
        </div>
        <RatingTrend data={data as []} />
      </div>
      <div className="most-player-container">
        <Paper className={classes.top_players}>
          <h2> Most played players </h2>
          {Top5Opponents.map(d => (
            <div key={d.key} className="player-container">
              <h3 className="player-name">{d.key}:</h3>
              <p className="player-value">{d.value}</p>
            </div>
          ))}
        </Paper>
      </div>
    </div>
  );
};

export default Rating;
