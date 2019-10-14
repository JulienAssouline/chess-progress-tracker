import React, {useEffect, useState} from "react";
import axios from "axios";
import RatingTrend from "./RatingTrend"

const Rating: React.FC = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://api.chess.com/pub/player/julienassouline/games/2019/10`
        );

        setData(result.data.games);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, [])

  if (data.length === 0) { return <div>...loading</div>}

  return (
    <div className="rating-container">
      <RatingTrend data = {data} />
    </div>
  );
};

export default Rating;
