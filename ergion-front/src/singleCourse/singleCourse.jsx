import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCourse } from "../actions/course";
import React, { Fragment } from "react";

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import information from './information';
import generalinformation from './generalinformation';
import subjects from './subjects';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  title: {
    flexGrow: 1,
  },

  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

const SingleCourse = ({ match }) => {
    const course = useSelector(state => state.course);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleCourse(match.params.id));
        console.log(match);
    }, []);

    const classes = useStyles();
  
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return(
        <main className={classes.content}>
        
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
           
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <information course={course}/>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <generalinformation  course={course}/>
              </Paper>
            </Grid>
           
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <subjects course={course}/>
                
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
  
    
    );
    };
export default SingleCourse;