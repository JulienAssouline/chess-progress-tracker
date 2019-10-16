import React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText
} from "@material-ui/core";

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

const SideNav: React.FC = () => {
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
        {["Home", "vs Pazuzu", "Monthly", "Summary"].map((text, index) => (
          <div key={text}>
            {text === "Home" ? (
              <ListItem className={classes.listItem} button>
                <ListItemText primary={text} />
              </ListItem>
            ) : (
              <ListItem button key={text}>
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

export default SideNav;
