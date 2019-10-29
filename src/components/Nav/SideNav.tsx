import React from "react";
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

const navText: string[] = ["Home", "vs Pazuzu", "Monthly", "Summary"];

const SideNav: React.FC<DetailProps> = props => {
  const classes = useStyles();

  function handleClick(e: any) {
    if (e.target.childNodes[0].childNodes[0]) {
      if (e.target.childNodes[0].childNodes[0].innerHTML === "vs Pazuzu") {
        props.history.push("/rival");
      } else if (e.target.childNodes[0].childNodes[0].innerHTML === "Monthly") {
        props.history.push("/monthly");
      } else if (e.target.childNodes[0].childNodes[0].innerHTML === "Summary") {
        props.history.push("/summary");
      }
    } else {
      if (e.target.innerHTML === "vs Pazuzu") {
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
        {navText.map((text: string, index) => (
          <div key={text}>
            {text === "Home" ? (
              <ListItem
                onClick={() => props.history.push("/")}
                className={classes.listItem}
                button
              >
                <ListItemText primary={text} />
              </ListItem>
            ) : (
              <ListItem onClick={handleClick} button key={text}>
                <ListItemText secondary={text} />
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
