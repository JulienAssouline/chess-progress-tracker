export interface IMonthlyData {
    date: Date;
    black: {
      rating: number;
      username: string;
    };
    white: {
      rating: number;
      username: string;
    };
  }


export interface LineType {
    date: Date;
    black: {
      username: string;
      rating: number;
    };
    white: {
      rating: number;
    };
    whitElo: number;
    blackElo: number;
  };