import react, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getSingleCourse } from "../actions/course";
import React, { Fragment } from "react";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import * as actionTypes from '../store/actions'

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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CardMedia from '@material-ui/core/CardMedia';
import Information from './information';
import Generalinformation from './generalinformation';
import Coursemedia from './coursemedia';
import Subjects from './subjects';
import Axios from "axios";
import { RefreshSharp } from "@material-ui/icons";


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

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif'
  },
  direction: 'rtl'
});

function Alert(props) {

  return (
    <StylesProvider jss={jss} >
      <ThemeProvider theme={theme} >
        <MuiAlert elevation={6} variant="filled" {...props} />
      </ThemeProvider>
    </StylesProvider>);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  padding:theme.spacing(0),
    backgroundColor: theme.palette.background.default,


  },

  title: {
    flexGrow: 1,
  },

  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.dark,
  },
  paper: {
    padding: theme.spacing(2),


    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

  fixedHeight: {
    height: 270,
  },
  fixedHeight1: {


  },
  fixedHeight2: {
    height: 180,
    alignItems: 'right',
    justifyItems: 'end',
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),

    padding: 0,

  },
  cover: {
    width: '100%',
    height: '100%',
    //objectFit:'fill',
    padding: 0,

  },
  rootc: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 'auto',

  },

}));



const SingleCourse = ({ match }) => {
  //const course = useSelector(state => state.course);
  const [course, setcourse] = React.useState({});
  const usedispatch = useDispatch()

  const onSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    usedispatch({ type: actionTypes.SNACKBAR, snackBarOpenOrClose: false })
  }

  const snackBar = useSelector(state => state.snackBar)

  // useEffect(() => {
  //     dispatch(getSingleCourse(match.params.id));
  //     console.log(match);
  //     console.log(course);
  // }, []);
  const getcourse=()=>
  {
    const promise
    = Axios.get(`http://127.0.0.1:8000/api/course/${match.params.id}`)
  promise.then(
    response => {

      setcourse(response.data)
      


    }
  )

  }
  React.useEffect(() => {
   
    const promise
    = Axios.get(`http://127.0.0.1:8000/api/course/${match.params.id}`)
  promise.then(
    response => {

      setcourse(response.data)
      


    }
    
  )

     



  }
    
  , []);
    
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper1 = clsx(classes.paper, classes.fixedHeight1);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);

  return (

    <div  className={classes.root}>
    {/*  <Container maxWidth="lg" className={classes.container}> */}

      <Snackbar
        open={snackBar}
        autoHideDuration={1500}
        onClose={onSnackBarClose}
        dir='rtl'
      >

        <Alert onClose={onSnackBarClose} severity="success" className={classes.alertStyle} >
          انجام شد

          </Alert>
      </Snackbar>
      <Grid container spacing={2}>

        <Grid item xs={12} >

          <Paper className={fixedHeightPaper2} elevation={3}>
          <div className={classes.rootc}>
      <CardMedia
        className={classes.cover}
        height="100%"
        component='img'
        image={course.course_cover}
        title={course.name}
      />
    
  </div>  
          </Paper>


        </Grid>

        <Grid item xs={12} >
          <Paper className={fixedHeightPaper1} elevation={3}>
            <Information course={course} getupdate={getcourse} />
          </Paper>
        </Grid>


        <Grid item xs={12}>
          <Paper  elevation={3}>
            <Subjects course={course} />

          </Paper>
        </Grid>
      </Grid>
    {/*  </Container> */}
    </div>


  );
};
export default SingleCourse;
