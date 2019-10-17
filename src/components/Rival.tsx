import React, { useContext } from "react";
import { DataContext } from "../context";
import RivalTrend from "./RivalTrend";

const Rival: React.FC = () => {
  const data = useContext(DataContext);

  const dataFiltered: object[] = data.filter(
    (d: any) =>
      (d.black.username === "JulienAssouline" &&
        d.white.username === "pazuzu4") ||
      (d.white.username === "JulienAssouline" && d.black.username === "pazuzu4")
  );

  let winCounter: number = 1;
  let drawCounter: number = 0;
  let lossCounter: number = 0;

  dataFiltered.forEach((d: any, i) => {
    d.JulienWins = winCounter;
    d.JulienDraws = drawCounter;
    d.JulienLoss = lossCounter;
    d.Total = d.JulienWins + d.JulienDraws + d.JulienLoss
    d.winPercentage =  (d.JulienWins / d.Total) * 100
    d.lossPercentage =  (d.JulienLoss / d.Total) * 100
    d.drawsPercentage =  (d.JulienDraws / d.Total) * 100


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

  return (
    <div className="rival-container">
      <h1> Rival </h1>
      <RivalTrend data={dataFiltered as []} />
    </div>
  );
};

export default Rival;
