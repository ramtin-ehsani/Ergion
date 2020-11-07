import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbars from "./Toolbar/Toolbar"
import "./StudentDashboard.scss";
import StudentProfile from '../../Profile/StudentProfile';
import { Route, Switch } from 'react-router-dom';
import Template from './Template'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100%',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },

}));


const Dashboard = () => {

    const classes = useStyles();

    return (
        <div className={"dashboard"}>
            <CssBaseline />
            <Toolbars />
            <main className={classes.content} >
                <div className={classes.appBarSpacer} />
                <Switch >
                    <Route path='/dashboard' exact component={Template} />
                    <Route path='/dashboard/profile' exact component={StudentProfile} />
                </Switch>

            </main>
        </div>
    );
}
export default Dashboard;