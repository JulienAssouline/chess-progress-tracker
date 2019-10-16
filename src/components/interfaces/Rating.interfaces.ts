export interface Stats {
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

export interface Result {
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
