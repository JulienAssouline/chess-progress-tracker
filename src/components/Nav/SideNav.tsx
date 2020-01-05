import React, { MouseEvent } from "react";
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

interface DetailProps extends RouteComponentProps {}

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

  function handleClick(e: MouseEvent): void {
    const target = e.target as HTMLInputElement;
    const childNodes = target.childNodes[0].childNodes[0] as HTMLElement;
    if (childNodes) {
      if (childNodes.innerHTML === "Home") {
        props.history.push("/");
      } else if (childNodes.innerHTML === "vs Pazuzu") {
        props.history.push("/rival");
      } else if (childNodes.innerHTML === "Monthly") {
        props.history.push("/monthly");
      } else if (childNodes.innerHTML === "Summary") {
        props.history.push("/summary");
      }
    } else {
      if (target.innerHTML === "Home") {
        props.history.push("/");
      } else if (target.innerHTML === "vs Pazuzu") {
        props.history.push("/rival");
      } else if (target.innerHTML === "Monthly") {
        props.history.push("/monthly");
      } else if (target.innerHTML === "Summary") {
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
        {navText.map(d => (
          <div key={d.header}>
            {d.pathname === props.location.pathname ? (
              <ListItem
                onClick={(e: MouseEvent) => handleClick(e)}
                className={classes.listItem}
                button
              >
                <ListItemText primary={d.header} />
              </ListItem>
            ) : (
              <ListItem
                onClick={(e: MouseEvent) => handleClick(e)}
                button
                key={d.header}
              >
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
