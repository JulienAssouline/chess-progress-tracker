import React, { useContext } from "react";
import RatingTrend from "./RatingTrend";
import { DataContext } from "../context";
import { Game } from "./interfaces/Rating.interfaces";

const Rating: React.FC = () => {
  const data = useContext(DataContext);

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
      <h1> Current Rating: {currentRating}</h1>
      <RatingTrend data={data as []} />
    </div>
  );
};

export default Rating;
