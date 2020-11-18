
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Paper from "@material-ui/core/Paper";

import {Route, Switch, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import SingleCourse from './singleCourse';
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
        marginTop:theme.spacing(1),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        paddingTop:theme.spacing(1),
        marginTop:theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));
const  SingleCoursecontainer = ({match}) => {

    const classes = useStyles();

    return (
        <div className={"dashboard"}>
            
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={10}>
                            <Paper >
                           <Route path="/dashboard/course/:id" component={SingleCourse}/>
                           <Route path='/student_dashboard/added_courses/:id' exact component={SingleCourse} />
                           <Route path='/teacher_dashboard/added_courses/:id' exact component={SingleCourse} />
                           <Route path='/course/:id' exact component={SingleCourse} />
                            </Paper>
                             
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default SingleCoursecontainer;