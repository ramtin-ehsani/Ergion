import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
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
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'
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
  alertStyle: {
    display: 'flex',
    font: '20'
  }

});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUser: (firstName, lastName, profilePicture) =>
      dispatch({ type: actionTypes.LOGIN,  firstName: firstName, lastName: lastName, profilePicture: profilePicture })

  };
};

const mapStateToProps = state => ({
  user: state.loggedInUser,

});



const user = {
  country: 'ایران',
  timezone: 'GTM-7'
};



class Profile extends Component {



  state = {
    avatarImage: this.props.user.profilePicture,
    selectedFile: null,
    hasImage: false,
    snackBarOpen: false,
    loading: false,
    allowedToUpload: true,
    anchorEl: null,
    allowedToRemove: false,
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
    axios.get('http://127.0.0.1:8000/api/teacher-profile/', this.config)
      .then((response) => {
        // handle success
        const avatarImage = response.data.profile_picture

        if (avatarImage !== null) {
          this.setState({ allowedToRemove: true });
        }


        this.setState({
          avatarImage
        })



      })
      .catch((error) => {
        // handle error
        if (error.isAxiosError) {
          this.setState({ snackBarOpen: true, errorMessage: error.message, loading: false, allowedToUpload: true, progress: 0 })
        }
        console.log(error);
      })
  }


  componentDidMount() {
    this.getValues()

  }



  onFileChange = event => {


    if (event.target.files && event.target.files[0]) {
      const avatarImage = URL.createObjectURL(event.target.files[0])
      this.setState({ avatarImage, selectedFile: event.target.files[0], hasImage: true, allowedToRemove: true })

    }
    // Update the state 


  };


  uploadConfig = {
    onUploadProgress: progressEvent => this.setState({ progress: Math.round((progressEvent.loaded * 100) / progressEvent.total) }),
    headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
  }

  onFileUpload = () => {

    if (this.state.allowedToUpload) {

      this.setState({ allowedToUpload: false, loading: true })

      const data = new FormData()
      data.append('profile_picture', this.state.selectedFile)


      axios.put('http://127.0.0.1:8000/api/teacher-profile/',
        data, this.uploadConfig)
        .then(() => {
          this.props.dispatchUser(this.props.user.firstName, this.props.user.lastName
            , this.state.avatarImage)
          this.setState({ loading: false, hasImage: false, allowedToUpload: true, progress: 0 })


        }).catch((error) => {
          if (error.isAxiosError) {
            this.setState({ snackBarOpen: true, errorMessage: error.message, loading: false, allowedToUpload: true, progress: 0 })
          }
          console.log(error);
        });
    }


  };


  config = {
    headers: { Authorization: `Token ${localStorage.getItem('api_key')}` },
  }


  deletePicture = () => {

    // const data = new FormData()
    // data.append('profile_picture', null)

    const data={profile_picture:null}
    axios.put('http://127.0.0.1:8000/api/teacher-profile/', data,
      this.config).then(response => {
        if (response.status === 200) {
          this.props.dispatchUser(this.props.user.firstName, this.props.user.lastName
            , '')
          this.setState({ hasImage: false, avatarImage: "", allowedToRemove: false })
          this.handleClose();

        }

      }).catch((error) => {
        if (error.isAxiosError) {
          this.handleClose();
          this.setState({ snackBarOpen: true, errorMessage: error.message, loading: false, allowedToUpload: true, progress: 0 })
        }
        console.log(error);
      });



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
      <Card
        className={classes.root}
      >
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

        <CardContent>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
          >

            <div className={classes.avatarContainer}>
              <Avatar
                className={classes.avatar}
                src={this.state.avatarImage}
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
                  <StyledMenuItem onClick={this.handleClose} >
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
              style={{ minHeight: '2rem' }}
            >
              {this.props.user.firstName + ' ' + this.props.user.lastName}
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


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));