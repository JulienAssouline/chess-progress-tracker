import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        margin: "auto"
      },
      margin: "auto",
      height: "100vh",
      alignItems: "center"
    }
  })
);

const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
