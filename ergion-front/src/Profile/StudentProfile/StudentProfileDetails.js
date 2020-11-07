import React, { Component } from 'react';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
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

const states = [
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
  }


  getValues = () => {
    axios.get('https://reqres.in/api/users/2')
      .then((response) => {
        // handle success
        const formData = {
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name,
          email: response.data.data.email,
          grade: '5'

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
      this.setState({loading:true,allowedToSave: false })
      axios.post('https://reqres.in/api/users',
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          grade: formData.grade
        })
        .then(response => {
          if (response.status === 201) {
            console.log(response.data)
            oldData['firstName'] = formData.firstName
            oldData['lastName'] = formData.lastName
            oldData['email'] = formData.email
            oldData['grade'] = formData.grade
            this.setState({
              oldData:
                oldData,loading:false,allowedToSave: true
            })
            this.checkForTextFieldChange(oldData, formData)

          }

        }).catch((error) => {
          console.log(error)
          this.setState({loading:false,allowedToSave: true })
        });
    }

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
                  label="مقطع تحصیلی"
                  name="grade"
                  dir='rtl'
                  onChange={this.handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={this.state.formData.grade}
                  variant="outlined"
                >
                  {states.map((option) => (
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
          <CircularProgress  thickness={5} color="secondary" size={25} className={classes.progressBar}/>
          
          )}
          </Button>
          </Box>
        </ValidatorForm>
      </Card>
      // {/* // </form> */}
    );
  }
};


export default withStyles(styles)(ProfileDetails);