import moment from "moment";
import { IRivalContextData } from "../rivalInterface/rival.interfaces";

export function calcValues(data: IRivalContextData[]) {
  let winCounter: number = 1;
  let drawCounter: number = 0;
  let lossCounter: number = 0;

  data.forEach(d => {
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
}
