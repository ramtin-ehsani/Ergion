import React, { Component } from 'react';
import moment from 'moment';
import axios,{AxiosError} from 'axios';
import purple from '@material-ui/core/colors/purple';
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const styles = (theme) => ({
  root: {
    height: 'auto',
  },
  avatar: {
    height: 100,
    width: 100
  },
  input: {
    display: "none"
  },
  editPhoto: {
    position: 'absolute',
    right: 70,
    bottom: -16,
    color: purple[900],
    margin: 4,
    width: 40,
    height: 40,
  },
  avatarContainer: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: 18,

  },
  typographyStyle: {
    fontSize: '2rem',
    marginTop: 2,
  },
  progressBar: {
    margin: theme.spacing(0, 1, 0),
    color: 'orange',
  },

});



const user = {
  country: 'ایران',
  timezone: 'GTM-7'
};



class Profile extends Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
      avatarImage: ''
    },
    selectedFile: null,
    hasImage: false,
    snackBarOpen: false,
    loading: false,
    allowedToUpload: true,
    anchorEl: null,
    allowedToRemove: false,
    userAlreadyHasPicture: false,
    progress: 0,
    errorMessage: '',


  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  getValues = () => {
    axios.get('https://reqres.in/api/users/2')
      .then((response) => {
        // handle success
        const formData = {
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name,
          avatarImage: response.data.data.avatar

        }

        if (response.data.data.avatar.length > 0) {
          this.setState({ userAlreadyHasPicture: true, allowedToRemove: true });
        }


        this.setState({
          formData
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


  onFileChange = event => {
    const { formData } = this.state;


    if (event.target.files && event.target.files[0]) {
      formData['avatarImage'] = URL.createObjectURL(event.target.files[0])
      this.setState({ formData, selectedFile: event.target.files[0], hasImage: true, allowedToRemove: true })

    }
    // Update the state 


  };


  config = {
    onUploadProgress: progressEvent => this.setState({ progress: Math.round((progressEvent.loaded * 100) / progressEvent.total) })
  }

  onFileUpload = () => {

    if (this.state.allowedToUpload) {

      this.setState({ allowedToUpload: false, loading: true })

      const reader = new FileReader();
      reader.readAsDataURL(this.state.selectedFile);
      reader.onloadend = () => {
        const base64data = reader.result;
        axios.post('https://reqres.in/api/users',
          {
            avatarImage: base64data,
          }, this.config)
          .then(response => {
            if (response.status === 201) {
              this.setState({ loading: false, hasImage: true, allowedToUpload: true, progress: 0 })

            }

          }).catch((error:AxiosError) => {
            console.log(error)
            this.setState({ snackBarOpen: true, errorMessage: error.message, loading: false, allowedToUpload: true, progress: 0 })
          });
      }
    }


  };

  deletePicture = () => {
    if (this.state.userAlreadyHasPicture) {
      axios.post('https://reqres.in/api/users',
        {
          avatarImage: "",
        }).then(response => {
          if (response.status === 201) {
            this.setState({ userAlreadyHasPicture: false, hasImage: false, formData: { ...this.state.formData, avatarImage: "" }, allowedToRemove: false })
            this.handleClose();

          }

        }).catch((error) => {
          console.log(error)
        });
    } else {
      this.setState({ hasImage: false, formData: { ...this.state.formData, avatarImage: "" }, allowedToRemove: false })
      this.handleClose();

    }



  }

  onSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackBarOpen: false })
  }


  render() {

    const { classes } = this.props;

    return (
      <Card
        className={classes.root}
      >
        <Snackbar open={this.state.snackBarOpen} autoHideDuration={2000} onClose={this.onSnackBarClose}>
          <Alert onClose={this.onSnackBarClose} severity="error" >
            {this.state.errorMessage}
          </Alert>
        </Snackbar>

        <CardContent>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >

            <div className={classes.avatarContainer}>
              <Avatar
                className={classes.avatar}
                src={this.state.formData.avatarImage}
              />
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={this.onFileChange}
              />
              <Fab
                component="span"
                aria-controls="customized-menu"
                aria-haspopup="true"
                className={classes.editPhoto}
                onClick={this.handleClick} >
                <EditIcon />

              </Fab>


              <StyledMenu
                id="customized-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <label htmlFor='contained-button-file'>
                  <StyledMenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <AddPhotoAlternateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Choose a picture" />
                  </StyledMenuItem>
                </label>

                <StyledMenuItem onClick={this.deletePicture} disabled={!this.state.allowedToRemove}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete the picture" />
                </StyledMenuItem>
              </StyledMenu>
            </div>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
              className={classes.typographyStyle}
            >
              {this.state.formData.firstName + ' ' + this.state.formData.lastName}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {/* {`${user.country} ${user.city}`} */}
              {`${user.country}`}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {`${moment().format('hh:mm A')} ${user.timezone}`}
            </Typography>
          </Box>
        </CardContent>
        <Divider />

        <Box p={2} >
          <CardActions >
            <Button
              color="primary"
              fullWidth
              variant="contained"
              component="label"
              onClick={this.onFileUpload}
              disabled={!this.state.hasImage}
            >
              آپلود عکس
            {this.state.loading && (
                <CircularProgress variant="static" value={this.state.progress} thickness={5} size={25} className={classes.progressBar} />

              )}

            </Button>
          </CardActions>
        </Box>

      </Card>
    );
  }
};


export default withStyles(styles)(Profile);