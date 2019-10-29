import React, { useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

const drawerWidth = 100;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  listInfo: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    justifyContent: "space-evenly"
  },
  listItem: {
    backgroundColor: "#f6f8fc",
    borderLeftColor: "#6c75c1",
    borderLeft: 6,
    borderLeftStyle: "solid"
  }
}));

interface DetailProps extends RouteComponentProps<{ push: any }> {}

interface NavData {
  header: string;
  pathname: string;
}

const navText: NavData[] = [
  { header: "Home", pathname: "/" },
  { header: "vs Pazuzu", pathname: "/rival" },
  { header: "Monthly", pathname: "/monthly" },
  { header: "Summary", pathname: "/summary" }
];

const SideNav: React.FC<DetailProps> = props => {
  const classes = useStyles();

  // TODO: Find a better solution and clean up code!!

  function handleClick(e: any) {
    console.log(e.target.childNodes[0].childNodes[0]);

    if (e.target.childNodes[0].childNodes[0]) {
      if (e.target.childNodes[0].childNodes[0].innerHTML === "Home") {
        props.history.push("/");
      } else if (
        e.target.childNodes[0].childNodes[0].innerHTML === "vs Pazuzu"
      ) {
        props.history.push("/rival");
      } else if (e.target.childNodes[0].childNodes[0].innerHTML === "Monthly") {
        props.history.push("/monthly");
      } else if (e.target.childNodes[0].childNodes[0].innerHTML === "Summary") {
        props.history.push("/summary");
      }
    } else {
      if (e.target.innerHTML === "Home") {
        props.history.push("/");
      } else if (e.target.innerHTML === "vs Pazuzu") {
        props.history.push("/rival");
      } else if (e.target.innerHTML === "Monthly") {
        props.history.push("/monthly");
      } else if (e.target.innerHTML === "Summary") {
        props.history.push("/summary");
      }
    }
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <Divider />
      <List className={classes.listInfo}>
        {navText.map((d, index) => (
          <div key={d.header}>
            {d.pathname === props.location.pathname ? (
              <ListItem
                onClick={handleClick}
                className={classes.listItem}
                button
              >
                <ListItemText primary={d.header} />
              </ListItem>
            ) : (
              <ListItem onClick={handleClick} button key={d.header}>
                <ListItemText secondary={d.header} />
              </ListItem>
            )}
          </div>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default withRouter(SideNav);
