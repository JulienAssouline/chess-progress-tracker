export let w: number = 800,
  h: number = 400;

  interface Dir {
    right: number,
    left: number,
    top: number,
    bottom: number
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