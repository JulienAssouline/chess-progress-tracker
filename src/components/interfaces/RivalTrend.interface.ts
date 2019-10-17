export interface RivalTrendProps {
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