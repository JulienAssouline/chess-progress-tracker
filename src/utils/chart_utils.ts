import { number } from "prop-types";

export let w: number = 800,
  h: number = 400;

interface Dir {
  right: number;
  left: number;
  top: number;
  bottom: number;
}

export let margin = {
  right: 40,
  left: 40,
  top: 10,
  bottom: 40
} as Dir;

export let width: number = w - margin.right - margin.left,
  height: number = h - margin.top - margin.bottom;

export const xtickFormat: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

interface Margin {
  right: number;
  left: number;
  top: number;
  bottom: number;
}

interface Padding {
  w: number;
  h: number;
  margin: Margin;
}

export const chartPadding = ({
  w = 600,
  h = 200,
  margin = { right: 40, left: 40, top: 40, bottom: 40 }
}) => {
  let width: number = w - margin.right - margin.left,
    height: number = h - margin.top - margin.bottom;

  return {
    w,
    h,
    margin,
    width,
    height
  };
};
