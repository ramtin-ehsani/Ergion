import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import NiceInputPassword from "react-nice-input-password";
import LockIcon from "@material-ui/icons/Lock";
import InputLabel from "@material-ui/core/InputLabel";
import axios from 'axios';

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
    marginTop: theme.spacing(8),
    padding: '8px 8px 8px 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '3px 3px 4px 4px #ccc'
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

class SignUp extends Component {
  state = {
    formData: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    submitted: false,
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      const { formData } = this.state;
      if (value !== formData.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
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
    console.log(this.state)
  }

  render() {
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
    const { formData, submitted } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <ValidatorForm className={classes.form} ref="form"
            onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.name}
                  onChange={this.handleChange}
                  validators={['required', 'matchRegexp:^[^0-9]+$']}
                  errorMessages={['this field is required', 'name is not valid']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={this.handleChange}
                  validators={['required', 'matchRegexp:^[^0-9]+$']}
                  errorMessages={['this field is required', 'last name is not valid']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  label="Email"
                  onChange={this.handleChange}
                  name="email"
                  value={formData.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />
              </Grid>
              <Grid item xs={12}>
                <NiceInputPassword
                  label="Password"
                  name="password"
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
                  value={formData.password}
                  securityLevels={securityLevels}
                  onChange={this.handleChangePass}
                />
                <TextValidator
                  fullWidth
                  variant="outlined"
                  required
                  margin="normal"
                  label="Repeat password"
                  onChange={this.handleChange}
                  name="repeatPassword"
                  type="password"
                  validators={['isPasswordMatch', 'required']}
                  errorMessages={['password mismatch', 'this field is required']}
                  value={formData.repeatPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }

}
export default withStyles(styles)(SignUp)