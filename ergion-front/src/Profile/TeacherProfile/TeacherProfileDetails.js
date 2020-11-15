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


const occupation = [
  {
    value: '4',
    label: ' انتخاب کنید'
  },
  {
    value: '1',
    label: 'معلم'
  },
  {
    value: '2',
    label: 'دانشجو'
  },
  {
    value: '3',
    label: ' مشاور کنکور'
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
      occupation: '',
      resume:'',
      universityEmail:'',
      aboutMe:'',
      institute:'',


    },
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      occupation: '',
      resume:'',
      universityEmail:'',
      aboutMe:'',
      institute:'',
    },
    textFieldChanged: false,
    loading:false,
    allowedToSave: true,
    snackBarOpen: false,
    errorMessage: '',
    teacherTypeError:true,
  }

  config = {
    headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
  }

  getValues = () => {
    axios.get('http://127.0.0.1:8000/api/teacher-profile/',this.config)
      .then((response) => {
        // handle success
        const formData = {
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          email: response.data.email,
          occupation: String(response.data.teacher_type),
          resume:String(response.data.work_experience),
          universityEmail: response.data.scholar_email,
          institute: response.data.academy_name,
          aboutMe: response.data.personal_description,

        }

        if(response.data.scholar_email==null){
          formData['universityEmail']='';
        }
        if(response.data.personal_description==null){
          formData['aboutMe']='';
        }
        if(response.data.academy_name==null){
          formData['institute']='';
        }

        if(response.data.teacher_type!==4){
          this.setState({
            teacherTypeError:false,
          })
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
    if(event.target.name==='occupation'){
      if(event.target.value!=='4'){
        this.setState({
          teacherTypeError: false
        })
      }else{
        this.setState({
          teacherTypeError: true
        })
      }
    }
    this.checkForTextFieldChange(this.state.oldData, formData)
  };

  checkForTextFieldChange = (oldData, newData) => {
    if (oldData.firstName === newData.firstName 
      && oldData.lastName === newData.lastName
      && oldData.email === newData.email
      && oldData.occupation === newData.occupation
      && oldData.resume === newData.resume
      && oldData.universityEmail === newData.universityEmail
      && oldData.aboutMe === newData.aboutMe 
      && oldData.institute === newData.institute) {

      this.setState({ textFieldChanged: false })
    } else {

      if(newData.occupation!=='4' ){

        this.setState({ textFieldChanged: true })

      }else{
        this.setState({ textFieldChanged: false })
      }
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
        data.append('teacher_type', formData.occupation)
        data.append('work_experience', formData.resume)
        data.append('scholar_email', formData.universityEmail)
        data.append('personal_description', formData.aboutMe)
        data.append('academy_name', formData.institute)


        axios.put('http://127.0.0.1:8000/api/teacher-profile/',
        data,this.config)
        .then(response => {
              oldData['firstName'] = formData.firstName
              oldData['lastName'] = formData.lastName
              oldData['occupation'] = formData.occupation
              oldData['institute'] = formData.institute
              oldData['aboutMe'] = formData.aboutMe
              oldData['universityEmail'] = formData.universityEmail
              oldData['resume'] = formData.resume


              if(formData.email!==response.data.email){

                this.setState({ snackBarOpen: true, errorMessage: "The email is in use by another user" })

              }else{
                oldData['email'] = formData.email

              }
              
              this.setState({
                  oldData,loading:false,allowedToSave: true,
                  formData:{...this.state.formData}
              })
              this.checkForTextFieldChange(oldData, formData)

              this.props.dispatchUser(formData.firstName, formData.lastName
                , this.props.user.profilePicture)

            

          }).catch((error) => {
            console.log(error)
            this.setState({loading:false,allowedToSave: true })
          });

        
        
      
    }

  }


  onSnackBarClose = ( reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackBarOpen: false })
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

          <Alert onClose={this.onSnackBarClose} severity="error" className={classes.alertStyle} >
            {this.state.errorMessage}

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
            >

              <Grid
                item
                md={6}
                xs={12}
              >
                <TextValidator
                  fullWidth
                  dir='rtl'
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
                <TextValidator
                  fullWidth
                  dir='rtl'
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
                <TextField
                  fullWidth
                  label="شغل"
                  name="occupation"
                  dir='rtl'
                  onChange={this.handleChange}
                  required
                  select
                  error={this.state.teacherTypeError}
                  SelectProps={{ native: true }}
                  value={this.state.formData.occupation}
                  variant="outlined"
                  
                >
                  {occupation.map((option) => (
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
                  onChange={this.handleChange}
                  required
                  value={this.state.formData.email}
                  variant="outlined"
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'فرمت ایمیل درست نمی باشد']}
                />

              </Grid>


              <Grid
                item
                md={6}
                xs={12}
              >

                <TextValidator
                  fullWidth
                  label="ایمیل دانشگاهی"
                  name="universityEmail"
                  onChange={this.handleChange}
                  value={this.state.formData.universityEmail}
                  variant="outlined"
                  validators={['isEmail']}
                  errorMessages={['فرمت ایمیل درست نمی باشد']}
                />

              </Grid>

              

              <Grid
                item
                md={6}
                xs={12}
              >

                <TextValidator
                  fullWidth
                  InputProps={{ inputProps: { min: 0, max: 70 } }}
                  label="سوابق کاری"
                  name="resume"
                  dir='rtl'
                  contentEditable={false}
                  type='number'
                  onChange={this.handleChange}
                  value={this.state.formData.resume}
                  variant="outlined"
                  validators={['matchRegexp:^(?:[0-9]|[1-6][0-9]|70)$']}
                  errorMessages={[ 'فقط اعداد بین 0 تا 70 مجاز است']}
                  
                />

              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >

                <TextValidator
                  fullWidth
                  label="نام موسسه یا دانشگاه"
                  name="institute"
                  dir='rtl'
                  onChange={this.handleChange}
                  value={this.state.formData.institute}
                  variant="outlined"
                />

              </Grid>
              

              <Grid
                item
                md={12}
                xs={12}
                
              >

                <TextValidator
                  fullWidth
                  dir='rtl'
                  label="درباره من"
                  name="aboutMe"
                  onChange={this.handleChange}
                  value={this.state.formData.aboutMe}
                  variant="outlined"
                  multiline={true}
                  rows={5}
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