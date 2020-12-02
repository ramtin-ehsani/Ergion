import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import LoadingOverlay from 'react-loading-overlay';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as actionTypes from '../store/actions'
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Ergion
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}



const jss = create({ plugins: [...jssPreset().plugins, rtl()] });



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',

  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100vh',
    flexWrap: 'wrap'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif'
  },
  direction: 'rtl'
});

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

function Login(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(".ایمیل یا پسورد اشتباه است");
  const [dialogTitle, setDialogTitle] = useState("خطا");


  const ErrorDialog = (props) => {
    const { title, children, open, setOpen } = props;
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="error-dialog"
      >
        <DialogTitle id="error-dialog" dir='rtl'>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="secondary"
          >
            باشه
        </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const usedispatch = useDispatch()



  const handleLogin = () => {
    setEmailError(false)
    setPasswordError(false)
    if (email.value === '') {
      setEmailError(true)
      if (password.value === '') {
        setPasswordError(true)
      }
    } else if (password.value === '') {
      setPasswordError(true)
      if (email.value === '') {
        setEmailError(true)
      }

    } else {
      setLoading(true);
      axios.post('http://127.0.0.1:8000/api/rest-auth/login/', { email: email.value, password: password.value }).then(response => {
        if (response.status === 200) {

          const config = {
            headers: { Authorization: `Token ${response.data.key}` }
          }

          const promise = axios.get('http://127.0.0.1:8000/api/rest-auth/user/', config
          )
          promise.then(
            result => {
              setUserSession(response.data.key, result.data);
              if (result.data['role'] === 'S') {
                axios.get('http://127.0.0.1:8000/api/student-profile/', config)
                  .then((res) => {
                    // handle success
                    console.log(res)
                    const avatarImage = res.data.profile_picture
                    const firstName = res.data.firstname
                    const lastName = res.data.lastname
                    usedispatch({ type: actionTypes.LOGIN, firstName: firstName, lastName: lastName, profilePicture: avatarImage })

                    localStorage.setItem('api_key', response.data.key)
                    //setUserSession(response.data.key, response.data.user);
                    const promise1 = axios.get('http://127.0.0.1:8000/api/student-courses/',
                      config)
                    promise1.then(
                      resultt => {
                        console.log(resultt)
                        resultt.data.map((course) => {
                          const c = { id: course.id, name: course.name, image: course.course_cover, link: course.course_url, teacher: `${course.instructor_firstname} ${course.instructor_lastname}` }
                          props.onAddCourse(c);
                          return null
                        })
                        setLoading(false);
                        window.location = '/student_dashboard'
                      }
                    )

                  })
                  .catch((error) => {
                    // handle error
                    console.log(error);
                  })

              } else {

                axios.get('http://127.0.0.1:8000/api/teacher-profile/', config)
                  .then((res) => {
                    // handle success
                    console.log(res.data)
                    const avatarImage = res.data.avatar
                    const firstName = res.data.firstname
                    const lastName = res.data.lastname
                    usedispatch({ type: actionTypes.LOGIN, firstName: firstName, lastName: lastName, profilePicture: avatarImage })

                    localStorage.setItem('api_key', response.data.key)
                    //setUserSession(response.data.key, response.data.user);
                    const promise1 = axios.get('http://127.0.0.1:8000/api/teacher-courses/',
                      config)
                    promise1.then(
                      resultt => {
                        console.log(resultt)
                        resultt.data.map((course) => {
                          const c = { id: course.id, name: course.name, image: course.course_cover, link: course.course_url, capacity: course.capacity }
                          props.onAddCourse(c);
                          return null
                        })
                        setLoading(false);
                        window.location = '/teacher_dashboard'
                      }
                    )

                  })
                  .catch((error) => {
                    // handle error
                    console.log(error);
                  })


              }
            }
          )
        }

      }).catch(() => {
        setLoading(false);
        setDialogContent(".ایمیل یا پسورد اشتباه است")
        setDialogTitle("خطا")
        setDialogOpen(true)


      });

    }

  }

  const forgotPasswordFunction = () => {
    setDialogContent(":))هنوز در مرحله ی دمو هستیم")
    setDialogTitle("توجه")
    setDialogOpen(true)
  }

  return (
    <StylesProvider jss={jss} >

      <ThemeProvider theme={theme} >

        <LoadingOverlay
          active={loading}
          spinner
          text='... در حال پردازش'
          className={classes.box}

        >

          <Container component="main" maxWidth='xs' >
            <CssBaseline />
            <Box boxShadow={5} borderRadius={15} m={2} p={3} >

              <div className={classes.paper} >

                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  ورود
                </Typography>

                <ErrorDialog
                  title={dialogTitle}
                  open={dialogOpen}
                  setOpen={setDialogOpen}
                >
                  {dialogContent}

                </ErrorDialog>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={emailError}
                    id="email"
                    label="ایمیل"
                    name="email"
                    autoComplete="email"
                    {...email}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={passwordError}
                    name="password"
                    label="رمز ورود"
                    type="password"
                    id="password"
                    {...password}
                    autoComplete="current-password"
                  />

                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="من را به خاطر بسپار"
                    mt={2}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={loading}
                    onClick={
                      handleLogin
                    }
                  >
                    ورود
                  </Button>
                  <Grid container direction='row-reverse' spacing={2}>
                    <Grid item >
                      <Link href="/signup" variant="body2" >
                        {".بدون حساب کاربری؟ ثبت نام کنید"}
                      </Link>
                    </Grid>
                    <Grid item >
                      <Link href="#" variant="body2" onClick={forgotPasswordFunction}>
                        رمز را فراموش کردید؟
                      </Link>

                    </Grid>

                  </Grid>
                </form>


                <Box mt={4}>
                  <Copyright />
                </Box>
              </div>

            </Box>
          </Container>


        </LoadingOverlay>
      </ThemeProvider>

    </StylesProvider>

  );


}

const mapStateToProps = state => {
  return {
    user: state.loggedInUser,
    courses: state.addedCourses
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUserLoggedIn: (firstName, lastName, email) => dispatch({ type: actionTypes.LOGIN, firstName: firstName, lastName: lastName, email: email }),
    onAddCourse: (course) => dispatch({ type: actionTypes.ADD_COURSE, payload: course })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
