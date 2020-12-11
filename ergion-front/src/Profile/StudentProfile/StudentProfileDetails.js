import React, { Component } from 'react';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as actionTypes from '../../store/actions'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';


const grades = [
  {
    value: '1',
    label: ' اول دبستان'
  },
  {
    value: '2',
    label: 'دوم دبستان'
  },
  {
    value: '3',
    label: 'سوم دبستان'
  },
  {
    value: '4',
    label: 'چهارم دبستان'
  },
  {
    value: '5',
    label: 'پنجم دبستان'
  },
  {
    value: '6',
    label: 'ششم دبستان'
  },
  {
    value: '7',
    label: 'هفتم'
  },
  {
    value: '8',
    label: 'هشتم'
  },
  {
    value: '9',
    label: 'نهم'
  },
  {
    value: '10',
    label: 'دهم'
  },
  {
    value: '11',
    label: 'یازدهم'
  },
  {
    value: '12',
    label: 'دوازدهم'
  },
];



const styles = (theme) => ({
  root: {
    height:'auto',
  },
  progressBar:{
    margin: theme.spacing(0, 1, 0),
    color: 'orange',
    
  },
  alertStyle:{
    display:'flex',
    font:'20'
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUser: (firstName, lastName, profilePicture) =>
      dispatch({ type: actionTypes.LOGIN, firstName: firstName, lastName: lastName, profilePicture: profilePicture })

  };
};

const mapStateToProps = state => ({
  user: state.loggedInUser,

});



class ProfileDetails extends Component {


  state = {
    oldData: {
      firstName: '',
      lastName: '',
      email: '',
      grade: ''

    },
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      grade: ''
    },
    textFieldChanged: false,
    loading:false,
    allowedToSave: true,
    snackBarOpen: false,
    doneSnackBarOpen:false,
    errorMessage: '',
  }

  config = {
    headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
  }

  getValues = () => {
    axios.get('http://127.0.0.1:8000/api/student/profile/',this.config)
      .then((response) => {
        // handle success
        const formData = {
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          email: response.data.email,
          grade: String(response.data.grade)

        }

        if(response.data.grade===null){
          formData['grade']=1;
        }


        this.setState({
          oldData: { ...formData }, formData: formData
        })


      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  

  componentDidMount() {
    this.getValues()
    
  }

  
  
  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value
    this.setState({
      formData: formData
    })
    this.checkForTextFieldChange(this.state.oldData, formData)
  };

  checkForTextFieldChange = (oldData, newData) => {
    if (oldData.firstName === newData.firstName && oldData.lastName === newData.lastName
      && oldData.email === newData.email && oldData.grade === newData.grade) {
      this.setState({ textFieldChanged: false })
    } else {
      this.setState({ textFieldChanged: true })
    }
  }


  handleSaveButton = () => {
    if (this.state.allowedToSave) {
      const { oldData } = this.state
      const { formData } = this.state
      this.setState({ loading:true, allowedToSave: false })

      const data = new FormData()
      data.append('firstname', formData.firstName)
      data.append('lastname', formData.lastName)
      data.append('email', formData.email)
      data.append('grade', formData.grade)

        axios.put('http://127.0.0.1:8000/api/student/profile/',
        data,this.config)
        .then(response => {
              oldData['firstName'] = formData.firstName
              oldData['lastName'] = formData.lastName
              oldData['grade'] = formData.grade

              console.log(response.data)

              if(formData.email!==response.data.email){

                this.setState({ snackBarOpen: true, errorMessage: "این ایمیل از قبل وجود دارد" })

              }else{
                oldData['email'] = formData.email
                this.setState({doneSnackBarOpen:true})

              }
              
              this.setState({
                  oldData,loading:false,allowedToSave: true,
                  formData:{...this.state.formData}
              })
              this.checkForTextFieldChange(oldData, formData)

              this.props.dispatchUser(formData.firstName, formData.lastName
                ,  this.props.user.profilePicture)

            

          }).catch((error) => {
            console.log(error)
            this.setState({loading:false,allowedToSave: true })
          });

        
      
    }

  }


  onSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackBarOpen: false })
  }

  onDoneSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ doneSnackBarOpen: false })
  }

  render() {

    const { classes } = this.props;

    return (
      // <form
      //   autoComplete="off"
      //   noValidate
      // >
      <Card className={classes.root}>
        <ValidatorForm form="form" onSubmit={this.handleSaveButton} >
        <Snackbar
          open={this.state.snackBarOpen}
          autoHideDuration={1500}
          onClose={this.onSnackBarClose}
          dir='rtl'
        >

          <Alert onClose={this.onSnackBarClose} severity="error" className={classes.alertStyle}>
            {this.state.errorMessage}

          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.doneSnackBarOpen}
          autoHideDuration={1000}
          onClose={this.onDoneSnackBarClose}
          dir='rtl'
        >

          <Alert onClose={this.onDoneSnackBarClose} severity="success" className={classes.alertStyle} >
            انجام شد

          </Alert>
        </Snackbar>

          <CardHeader
            subheader="اطلاعات خود را میتوانید ویرایش کنید"
            title="پروفایل"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={4}
              dir="rtl"
            >

<Grid
                item
                md={6}
                xs={12}
              >
                <TextValidator
                  fullWidth
                  label="نام"
                  name="firstName"
                  onChange={this.handleChange}
                  required
                  value={this.state.formData.firstName}
                  variant="outlined"
                  validators={['required', 'matchRegexp:^[^0-9]+$']}
                  errorMessages={['this field is required', 'فرمت اشتباه است']}
                />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextValidator
                  fullWidth
                  label="نام خانوادگی"
                  name="lastName"
                  onChange={this.handleChange}
                  required
                  value={this.state.formData.lastName}
                  variant="outlined"
                  validators={['required', 'matchRegexp:^[^0-9]+$']}
                  errorMessages={['this field is required', 'فرمت اشتباه است']}
                />
              </Grid>
              

              <Grid
                item
                md={6}
                xs={12}


              >
                <TextField
                  fullWidth
                  label="مقطع تحصیلی"
                  name="grade"
                  onChange={this.handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={this.state.formData.grade}
                  variant="outlined"
                >
                  {grades.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >

                <TextValidator
                  fullWidth
                  label="ایمیل"
                  name="email"
                  dir='lrt'
                  onChange={this.handleChange}
                  required
                  value={this.state.formData.email}
                  variant="outlined"
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'فرمت ایمیل درست نمی باشد']}
                />

              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={!this.state.textFieldChanged}
            >
              ذخیره شود
              
              {this.state.loading && (
                  <CircularProgress  thickness={5}  size={25} className={classes.progressBar}/>
          
          )}
          </Button>
          </Box>
        </ValidatorForm>
      </Card>
      // {/* // </form> */}
    );
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProfileDetails));