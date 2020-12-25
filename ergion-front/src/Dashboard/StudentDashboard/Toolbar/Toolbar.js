import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { MainListItems, MobileListItems } from "../ListItems/ListItems";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./Toolbar.scss";
import Notification from "../Notification/Notification";

const drawerWidth = 247;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: "fixed",
      flexShrink: 0,
    },
  },
  drawers: {
    [theme.breakpoints.up("md")]: {
      width: "fixed",
      flexShrink: 0,
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up("md")]: {
      width: `calc(100%)`,
      height: "fixed",
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    // marginLeft: theme.spacing(-7),
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },
  Main: {
    // [theme.breakpoints.up("md")]: { /*sm -> lg*/
    //     marginLeft: 500,
    // },
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.Main}>
      {/*<div className="Main">*/}
      <div>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
              
            <Notification />

            <Typography variant="h6" noWrap className={classes.title}>
              Ergion
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden lgUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "ltr" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onClick={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Divider />
            <MobileListItems />
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor={"right"}
            variant="permanent"
            open
          >
            <Divider />
            <MainListItems />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
