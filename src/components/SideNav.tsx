import React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText
} from "@material-ui/core";
const drawerWidth = 120;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listInfo: {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    justifyContent: "space-evenly"
  },
  listItem: {
    // paddingTop: 20,
    // paddingBottom: 20
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
          <ListItem className={classes.listItem} button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideNav;
