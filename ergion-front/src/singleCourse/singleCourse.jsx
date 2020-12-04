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

import Information from './information';
import Generalinformation from './generalinformation';
import Coursemedia from './coursemedia';
import Subjects from './subjects';
import Axios from "axios";


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
    margin: theme.spacing(2),

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

  }

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
  useEffect(() => {
    console.log(match.params.id);
    const promise
      = Axios.get(`http://127.0.0.1:8000/api/course/${match.params.id}`)
    promise.then(
      response => {

        setcourse(response.data)
        console.log(response.data)


      }
    )



  }
    , [])
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper1 = clsx(classes.paper, classes.fixedHeight1);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);

  return (
    
        <main className={classes.content} >
          <Container maxWidth="lg" className={classes.container}>

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
            <Grid container spacing={1}>

              <Grid item xs={12} >

                <Paper className={fixedHeightPaper2}>
                  <Coursemedia course={course} />
                </Paper>


              </Grid>

              <Grid item xs={12} >
                <Paper className={fixedHeightPaper1}>
                  <Information course={course} />
                </Paper>
              </Grid>

              {/* <Grid item xs={12} md={4} lg={3}>

            
            
 
                       <Paper className={fixedHeightPaper}>
                <Generalinformation  course={course}/>
              </Paper>
            </Grid> */}


              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Subjects course={course} />

                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
            </Box>
          </Container>
        </main>


  );
};
export default SingleCourse;
