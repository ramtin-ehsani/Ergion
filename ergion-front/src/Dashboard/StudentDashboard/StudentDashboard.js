import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbars from "./Toolbar/Toolbar"
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import "./StudentDashboard.scss";
import CourseFileLayouts from './CourseFileLayouts/CourseFileLayouts';
import Paper from "@material-ui/core/Paper";
import { Route, Switch } from "react-router-dom";
import Template from './Template'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const Dashboard = () => {

    const classes = useStyles();

    return (
        <div className={"dashboard"}>
            <CssBaseline/>
            <Toolbars/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Switch>
                    <Route path='/dashboard' exact component={Template} />
                    <Route path='/dashboard/added_courses' exact component={CourseFileLayouts}/>
                </Switch>
                
            </main>
        </div>
    );
}
export default Dashboard;