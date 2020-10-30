import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {mainListItems, MobileListItems} from "../ListItems/ListItems";
import clsx from "clsx";
import './Toolbar.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 'fixed',
            flexShrink: 0,
        },
    },
    drawers: {
        [theme.breakpoints.up('md')]: {
            width: 'fixed',
            flexShrink: 0,
        },
    },
    appBar: {
        flex: 1, /*khodam*/
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100%)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginLeft: theme.spacing(-1),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
        height: "fixed",
    },
}));

function ResponsiveDrawer(props) {
    const {window} = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className="Main">
            <div>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            className="{classes.menuButton}"
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>

            </div>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'ltr' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <Divider/>
                        <div>
                            <Divider/>
                            {MobileListItems}
                        </div>
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="js">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor={"right"}
                        variant="permanent"
                        open
                    >
                        <Divider/>
                        {mainListItems}
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