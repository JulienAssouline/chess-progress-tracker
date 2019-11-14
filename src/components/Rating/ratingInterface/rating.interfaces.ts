export interface IStats {
    chess_blitz: {
      last: {
        rating: number;
      };
      record: {
        win: number;
        loss: number;
        draw: number;
      };
      best: {
        rating: number;
      };
    };
  }
  
  export interface IResult {
    data: {
      chess_blitz: {
        last: {
          rating: number;
        };
        record: {
          win: number;
          loss: number;
          draw: number;
        };
        best: {
          rating: number;
        };
      };
    };
  }


export interface IRatingTrendProps {
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

  export interface ILineType {
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

  export interface ISummaryData {
    date: Date;
    black: {
      rating: number;
      username: string;
      result: string;
    };
    white: {
      rating: number;
      username: string;
      result: string;
    };
  }
  