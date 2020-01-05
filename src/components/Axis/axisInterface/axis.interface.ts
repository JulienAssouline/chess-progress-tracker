import { ScaleTime, ScaleLinear, ScaleBand } from "d3-scale";

export interface IAxisBottomMonthsProps {
  height: number;
  tickFormat: string[];
  xScale: ScaleTime<number, number>;
}

export interface IAxisBottomProps {
  height: number;
  xScale: ScaleLinear<number, number>;
  textColor: string;
}

export interface IAxisBottomStringProps {
  height: number;
  xScale: ScaleBand<string>;
}

export interface IAxisLeftNumber {
  yScale: ScaleLinear<number, number>;
  width: number;
  textColor?: string;
}

export interface IAxisLeftString {
  yScale: ScaleBand<string>;
  width: number;
  textColor: string;
}
