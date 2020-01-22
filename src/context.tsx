import React, { useState, createContext, useEffect } from "react";
import axios, { AxiosResponse, AxiosStatic } from "axios";
import { timeParse } from "d3-time-format";

export const DataContext = createContext([{}]);

interface IData {
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

interface IFlattenData {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  fen: string;
  time_class: string;
  rules: string;
  white: {
    rating: number;
    result: string;
    username: string;
  };
  black: {
    rating: number;
    result: string;
    username: string;
  };
  date: Date;
}

interface IPromiseData {
  data: { games: [] };
  status: number;
  statusText: string;
}

export const DataProvider = (props: { children: React.ReactNode }) => {
  const [data, setData] = useState<IData[] | undefined>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://api.chess.com/pub/player/julienassouline/games/archives";
        const result = await axios(url);

        if (result.data.archives.length !== 0) {
          let promises: IPromiseData[] = [];

          result.data.archives.forEach((d: string) => {
            promises.push((((axios.get(
              d
            ) as unknown) as AxiosStatic) as unknown) as AxiosResponse);
          });

          const allData = await Promise.all(promises);

          let results = allData.map(
            (d: { data: { games: [] } }) => d.data.games
          );

          let resultsFlatten: IFlattenData[] = results.flat();

          const parseTime = timeParse("%Y.%m.%d %H:%M:%S");

          resultsFlatten.forEach(d => {
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

          setData(resultsFlatten as []);
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
