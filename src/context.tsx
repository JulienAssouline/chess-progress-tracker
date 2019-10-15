import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext([{}]);

export const DataProvider = (props: any) => {
  const [data, setData] = useState<object[] | undefined>([]);
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

          results = results.flat();

          setData(results);
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
