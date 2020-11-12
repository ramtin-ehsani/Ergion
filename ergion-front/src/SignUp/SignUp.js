import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, ThemeProvider, createMuiTheme, StylesProvider, jssPreset } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import NiceInputPassword from "react-nice-input-password";
import LockIcon from "@material-ui/icons/Lock";
import InputLabel from "@material-ui/core/InputLabel";
import axios from 'axios';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import rtl from "jss-rtl";
import { create } from 'jss';
import IranSans from './irsans.ttf';
import './SignUp.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const iranSans = {
  fontFamily: 'IranSans',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('IranSans'),
    url(${IranSans}) format('truetype')
  `,
};

const levelBarCss = (level) => ({
  height: "8px",
  width: level > 0 ? `${(100 / 4) * level}%` : "100%",
  marginTop: 16,
  transition: "width 0.5s ease",
  backgroundColor: ["#EFEFEF", "red", "orange", "yellow", "green"][level],
  borderRadius: 0
});

const CustomLevelBar = (levels) => <div style={levelBarCss(levels)} />;

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

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: '8px 10px 8px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '3px 3px 4px 4px #ccc',
    borderRadius: '20px 20px 20px 20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    padding: '8px 10px 8px 10px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

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

class SignUp extends Component {
  state = {
    formData: {
      firstname: '',
      lastname: '',
      email: '',
      password1: '',
      password2: '',
      role: "S",
      username: ''
    },
    submitted: false,
    std_selected: true,
    teach_selected: false,
    dialogOpen: false,
    dialogContent: "ایمیل در سیستم وجود دارد",
    dialogTitle: "خطا",
    emailExists: false,
    existingEmail: '',
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      const { formData } = this.state;
      if (value !== formData.password1) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('emailExists', (value) => {
      const { formData } = this.state;
      if (this.state.emailExists && (this.state.existingEmail === formData.email)) {
        return false;
      }
      else {
        return true;
      }
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isPasswordMatch');
    ValidatorForm.removeValidationRule('emailExists');
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    if (event.target.name === 'email') {
      formData['username'] = event.target.value;
    }
    this.setState({ formData });
  }

  handleChangeRole = (event, newRole) => {
    const { formData } = this.state;
    if (newRole !== null) {
      formData['role'] = newRole;
      console.log(formData)
      this.setState({ formData });
      if (newRole === 'S') {
        this.setState({
          std_selected: true,
          teach_selected: false
        })
      }
      if (newRole === 'T') {
        this.setState({
          std_selected: false,
          teach_selected: true
        })
      }
    }
  }

  handleChangePass = (data) => {
    const { formData } = this.state;
    formData[data.name] = data.value;
    this.setState({ formData });
  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
    const submitted = this.state.submitted;
    if (submitted) {
      const formData = this.state.formData;
      axios.post('http://127.0.0.1:8000/api/users/rest-auth/registration/', {
        username: formData.email,
        password1: formData.password1,
        password2: formData.password2,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        role: formData.role
      })
        .then(res => {
          console.log(res);
          console.log(res.data);
          if (res.status === 201) {
            window.location = "/login" //This line of code will redirect you once the submission is succeed
          }
        }).catch(() => {
          this.setState({ dialogOpen: true })
          this.setState({ emailExists: true })
          this.setState({ existingEmail: this.state.formData.email })
        
        });
    }
    console.log(this.state)
  }

  render() {
    const theme = createMuiTheme({
      direction: 'rtl',
      typography: {
        fontFamily: [
          'IranSans',
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
        fontWeight: '300'
      },
      overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': [iranSans],
          },
        },
      },
    });
    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

    const securityLevels = [
      {
        descriptionLabel: <Typography>1 number</Typography>,
        validator: /.*[0-9].*/
      },
      {
        descriptionLabel: <Typography>1 lowercase letter</Typography>,
        validator: /.*[a-z].*/
      },
      {
        descriptionLabel: <Typography>1 uppercase letter</Typography>,
        validator: /.*[A-Z].*/
      },
      {
        descriptionLabel: <Typography>6 of length</Typography>,
        validator: /^.{6,}$/
      }
    ];
    const { classes } = this.props;
    const { formData } = this.state;
    const textFieldStyle = { minHeight: "5rem" };

    return (
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs" dir="rtl">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                عضویت
          </Typography>
              <ErrorDialog
                title={this.state.dialogTitle}
                open={this.state.dialogOpen}
                setOpen={(flag) => { this.setState({ dialogOpen: flag }) }}
              >
                {this.state.dialogContent}

              </ErrorDialog>
              <ValidatorForm className={classes.form} ref="form"
                onSubmit={this.handleSubmit}>
                <Grid item xs={12}>
                  <ToggleButtonGroup exclusive value={formData.role} onChange={this.handleChangeRole} >
                    <ToggleButton value="S" style={this.state.std_selected ? { backgroundColor: "#3f51b5", color: "white" } : { backgroundColor: "transparent", color: "grey" }}>
                      دانش آموز هستم
                </ToggleButton>
                    <ToggleButton value="T" style={this.state.teach_selected ? { backgroundColor: "#3f51b5", color: "white" } : { backgroundColor: "transparent", color: "grey" }}>
                      مدرس هستم
                </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                {/* <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" >نقش</FormLabel>
                  <RadioGroup aria-label="role" name="role" row value={formData.role} onChange={this.handleChange}>
                    <FormControlLabel value="teacher" control={<Radio color="primary" />} label="مدرس" />
                    <FormControlLabel value="student" control={<Radio color="primary" />} label="دانش آموز" />
                  </RadioGroup>
                </FormControl>
            </Grid> */}
                <Box mt={3} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      style={textFieldStyle}
                      autoComplete="fname"
                      name="firstname"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="نام"
                      autoFocus
                      value={formData.firstname}
                      onChange={this.handleChange}
                      validators={['required', 'matchRegexp:^[^0-9]+$']}
                      errorMessages={['this field is required', 'فرمت اشتباه است']}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      style={textFieldStyle}
                      variant="outlined"
                      required
                      fullWidth
                      id="lastname"
                      label="نام خانوادگی"
                      name="lastname"
                      value={formData.lastname}
                      onChange={this.handleChange}
                      validators={['required', 'matchRegexp:^[^0-9]+$']}
                      errorMessages={['this field is required', 'فرمت اشتباه است']}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      style={textFieldStyle}
                      variant="outlined"
                      required
                      fullWidth
                      label="ایمیل"
                      onChange={this.handleChange}
                      name="email"
                      value={formData.email}
                      validators={['required', 'isEmail', 'emailExists']}
                      errorMessages={['this field is required', 'ایمیل درست نمی باشد', 'ایمیل در سیستم وجود دارد']}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <NiceInputPassword
                      className="label-pass"
                      label="رمز عبور *"
                      name="password1"
                      style={{ width: '100%' }}
                      LabelComponent={InputLabel}
                      InputComponent={TextField}
                      InputComponentProps={{
                        variant: "outlined",
                        InputProps: {
                          endAdornment: <LockIcon />
                        }
                      }}
                      showSecurityLevelBar
                      renderLevelBarComponent={CustomLevelBar}
                      value={formData.password1}
                      securityLevels={securityLevels}
                      onChange={this.handleChangePass}
                    />
                    <TextValidator
                      style={textFieldStyle}
                      fullWidth
                      variant="outlined"
                      required
                      margin="normal"
                      label="تکرار رمز عبور"
                      onChange={this.handleChange}
                      name="password2"
                      type="password"
                      validators={['isPasswordMatch', 'required']}
                      errorMessages={['رمز اشتباه است', 'this field is required']}
                      value={formData.password2}
                    />
                  </Grid>

                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  // disabled={submitted?false:true}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  عضویت
            </Button>
                <Grid container justify="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      ورود
                </Link>
                  </Grid>
                </Grid>
              </ValidatorForm>
              <Box mt={2}>
                <Copyright />
              </Box>
            </div>
          </Container>
        </ThemeProvider>
      </StylesProvider>
    );
  }

}
export default withStyles(styles)(SignUp)
