import React, { useContext, useState } from "react";
import { DataContext } from "../../context";
import { nest } from "d3-collection";
import { xtickFormat } from "../../utils/chart_utils";
import { scaleLinear, scaleTime } from "d3-scale";
import { extent } from "d3-array";
import { line, curveMonotoneX } from "d3-shape";
import { AxisBottomMonth } from "../Axis/AxisBottomMonth";
import { AxisLeft } from "../Axis/AxisLeft";
import { IMonthlyData, LineType } from "./monthlyInterface/monthly.interfaces";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

const Monthly: React.FC = () => {
  const data = useContext(DataContext) as IMonthlyData[];
  const classes = useStyles();
  const [year, setYear] = useState(0);

  if (data.length === 0) return <div>...loading</div>;

  let w: number = 400,
    h: number = 200;

  interface Dir {
    right: number;
    left: number;
    top: number;
    bottom: number;
  }

  let margin = {
    right: 40,
    left: 40,
    top: 20,
    bottom: 40
  } as Dir;

  let width: number = w - margin.right - margin.left,
    height: number = h - margin.top - margin.bottom;

  const years = [
    ...((new Set(data.map(d => d.date.getFullYear())) as unknown) as [number])
  ];

  const selectedYearData = data.filter(
    d => d.date.getFullYear() === years[Number(year)]
  );

  let nestedData = nest<IMonthlyData, number>()
    .key(d => xtickFormat[d.date.getMonth()])
    .entries(selectedYearData);

  const [dateMin, dateMax] = extent(data, d => d.date);
  const [ratingMin, ratingMax] = extent(data, d =>
    d.black.username === "JulienAssouline" ? d.black.rating : d.white.rating
  );

  const xScale = scaleTime()
    .domain([dateMin as Date, dateMax as Date])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain([ratingMin as number, ratingMax as number])
    .range([height, 0]);

  const path = line<LineType>()
    .x(d => {
      return xScale(d.date);
    })
    .y(d =>
      d.black.username === "JulienAssouline"
        ? yScale(d.black.rating)
        : yScale(d.white.rating)
    )
    .curve(curveMonotoneX);

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYear(Number(event.target.value as string) as any);
  };

  const monthsPaths = nestedData.map((months, index) => (
    <svg key={index} width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <text x={width / 2}> {months.key} </text>
        <AxisBottomMonth
          xScale={xScale}
          height={height}
          tickFormat={xtickFormat}
        />
        <AxisLeft width={width} yScale={yScale} />
        <path
          d={path(months.values) as string}
          style={{ fill: "none", stroke: "#6b75c4", strokeWidth: 3 }}
        />
      </g>
    </svg>
  ));

  return (
    <div className="rival-container">
      <div className="monthly-years-dd-container">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            id="demo-simple-select"
            value={year}
            onChange={handleYearChange}
          >
            {years.map((d, i) => (
              <MenuItem key={i} value={i}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>{monthsPaths}</div>
    </div>
  );
};

export default Monthly;
