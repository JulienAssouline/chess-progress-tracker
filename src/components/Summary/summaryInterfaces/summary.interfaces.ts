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


  export interface IResultChartProps {
    gamesWon: number;
    gamesDrawn: number;
    gamesLost: number;
  }

  export interface IMonthCountProps {
    data: {
      key: string;
      value: number | undefined;
    }[];
    height: number;
    width: number;
    margin: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    w: number;
    h: number;
  }

  export interface IResultTypeProps {
    data: {
      key: string;
      value: number | undefined;
    }[];
    height: number;
    width: number;
    margin: {
      left: number;
      right: number;
      top: number;
      bottom: number;
    };
    w: number;
    h: number;
  }

  export interface IOpponentRatingProps {
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
      dateParsed: string;
    }[];
  }


export interface IGroupedDate {
  black: {
    rating: number;
    username: string;
  };
  dateParsed: string;
  white: {
    rating: number;
    username: string;
  };
}

export interface LineType {
  key: string | Date;
  value: number;
}