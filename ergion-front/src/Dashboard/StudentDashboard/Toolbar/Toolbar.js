import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import "./Toolbar.scss";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        marginRight: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    }
}));


const Toolbars = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <div className="Main">
            <AppBar position="absolute"
                    className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={"toolbar"}>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={"title"}>
                        Dashboard
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx("menuButton", open && "menuButtonHidden")}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Toolbars;


