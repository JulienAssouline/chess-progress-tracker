
export interface Props {
    data: {
      black: {
        rating: number;
        username: string;
      };
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
      whitElo: number;
      blackElo: number;
    }[];
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
  