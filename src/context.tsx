import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { timeParse } from "d3-time-format";

export const DataContext = createContext([{}]);

interface Data {
  data: {
    black: {
      rating: number;
      username: string;
    };
    JulienWins: number;
    JulienDraws: number;
    JulienLoss: number;
    winPercentage: number;
    lossPercentage: number;
    drawsPercentage: number;
    pgn: string;
    end_time: number;
    fen: string;
    time_control: string;
    time_class: string;
    white: {
      rating: number;
      username: string;
    };
    date: Date;
  }[];
}

export const DataProvider = (props: any) => {
  const [data, setData] = useState<Data[] | undefined>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          "https://api.chess.com/pub/player/julienassouline/games/archives"
        );

        if (result.data.archives.length !== 0) {
          let promises: any[] = [];

          result.data.archives.forEach((d: string) => {
            promises.push(axios.get(d));
          });

          const allData = await Promise.all(promises);

          let results = allData.map(
            (d: { data: { games: [] } }) => d.data.games
          );

          let resultsFlatten = results.flat();

          const parseTime = timeParse("%Y.%m.%d %H:%M:%S");

          resultsFlatten.forEach((d: any) => {
            d.date = parseTime(
              `${d.pgn
                .split("\n")[2]
                .replace('[Date "', "")
                .replace('"]', "")} ${d.pgn
                .split("\n")[19]
                .replace('[EndTime "', "")
                .replace('"]', "")}`
            ) as Date;


          });

          const dateMinFilter = new Date(2019, 0, 1);

          resultsFlatten = resultsFlatten.filter((d: { date: Date }) => {
            return d.date >= dateMinFilter;
          });

          setData(resultsFlatten);
        }
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (error) return <div>Sorry there was an error :(</div>;
  if (data === undefined) return <div>...loading</div>;

  return (
    <DataContext.Provider value={data}>{props.children}</DataContext.Provider>
  );
};
