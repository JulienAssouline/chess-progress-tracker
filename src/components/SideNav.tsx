import React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom"

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

  interface DetailProps extends RouteComponentProps<{push: any}> {

  }

const navText: string[] = ["Home", "vs Pazuzu", "Monthly", "Summary"]

const SideNav: React.FC<DetailProps> = (props) => {
  const classes = useStyles();
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
              <ListItem onClick = {() => props.history.push("/")} className={classes.listItem} button>
                <ListItemText primary={text} />
              </ListItem>
            ) : (
              <ListItem onClick = {() => props.history.push("/rival")} button key={text}>
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
