export interface IRivalTotals {
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
  };
}

export interface IRivalTrendProps {
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

export interface IRivalContextData {
  black: {
    rating: number;
    username: string;
    result: string;
  };
  JulienWins: number;
  JulienDraws: number;
  JulienLoss: number;
  winPercentage: number;
  lossPercentage: number;
  drawsPercentage: number;
  Total: number;
  pgn: string;
  end_time: number;
  fen: string;
  time_control: string;
  time_class: string;
  white: {
    rating: number;
    username: string;
    result: string;
  };
  date: Date;
}
