import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";

import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import SingleCourse from "./singleCourse";
import Suggestedcourse from "./../Dashboard/StudentDashboard/Dashboard/suggest";
import Suggestedteachers from "./../Dashboard/StudentDashboard/Dashboard/teacher_sug/suggest_ins";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    marginRight: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    marginTop: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
const SingleCoursecontainer = ({ match }) => {
  const classes = useStyles();

  return (
    <div className={"dashboard"} style={{margin:'20px'}}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="1300" className={classes.container}>
          <Grid container spacing={2} lg={10} item={true} dir="rtl">
            <Grid item lg={8} md={9} xs={12} dir="ltr">
              <Route path="/dashboard/course/:id" component={SingleCourse} />
              <Route
                path="/student_dashboard/added_courses/:id"
                exact
                component={SingleCourse}
              />
              <Route
                path="/teacher_dashboard/added_courses/:id"
                exact
                component={SingleCourse}
              />
              <Route path="/course/:id" exact component={SingleCourse} />
            </Grid>
            <Grid item lg={4} md={3} xs={false}>
              <Hidden only={['sm', 'xs']}>
                <Suggestedteachers />
                <Suggestedcourse />
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default SingleCoursecontainer;
