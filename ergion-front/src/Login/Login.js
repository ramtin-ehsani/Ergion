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


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',


  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '30'
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
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
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

export default function Login(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const email = useFormInput('');
  const password = useFormInput('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);


  const handleLogin = () => {
    setEmailError(false)
    setPasswordError(false)
    if (email.value == '') {
      setEmailError(true)
      if (password.value == '') {
        setPasswordError(true)
      }
    } else if (password.value == '') {
      setPasswordError(true)
      if (email.value == '') {
        setEmailError(true)
      }

    } else {
      setLoading(true);
      axios.post('https://reqres.in/api/login', { email: email.value, password: password.value }).then(response => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        console.log(response.data.token)
        props.history.push('/dashboard');
      }).catch(error => {
        setLoading(false);
        alert(error)

      });

    }

  }

  const forgotPasswordFunction = () => {
    alert("This is just a demo app")
  }

  return (
    <StylesProvider jss={jss}>

      <ThemeProvider theme={theme} >
        <LoadingOverlay
          active={loading}
          spinner
          text='... در حال پردازش'
          dir='rtl'
        >

          <Container component="main" maxWidth='sm'>
            <CssBaseline />
            <Box boxShadow={5} padding="40px" >

              <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  ورود
                </Typography>
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
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2" onClick={forgotPasswordFunction}>
                        رمز را فراموش کردید؟
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"حساب کاربری ندارید؟ ثبت نام کنید."}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>

              <Box mt={8}>
                <Copyright />
              </Box>
            </Box>
          </Container>


        </LoadingOverlay>
      </ThemeProvider>

    </StylesProvider>

  );


}
