import React, { Component } from "react";
import axios from "axios";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import * as actionTypes from "../../store/actions";
import Menu from "@material-ui/core/Menu";
import Fab from "@material-ui/core/Fab";
import purple from "@material-ui/core/colors/purple";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Box,
  Button,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";

const grades = [
  {
    value: "1",
    label: " اول دبستان",
  },
  {
    value: "2",
    label: "دوم دبستان",
  },
  {
    value: "3",
    label: "سوم دبستان",
  },
  {
    value: "4",
    label: "چهارم دبستان",
  },
  {
    value: "5",
    label: "پنجم دبستان",
  },
  {
    value: "6",
    label: "ششم دبستان",
  },
  {
    value: "7",
    label: "هفتم",
  },
  {
    value: "8",
    label: "هشتم",
  },
  {
    value: "9",
    label: "نهم",
  },
  {
    value: "10",
    label: "دهم",
  },
  {
    value: "11",
    label: "یازدهم",
  },
  {
    value: "12",
    label: "دوازدهم",
  },
];

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const styles = (theme) => ({
  root: {
    height: "auto",
  },
  progressBar: {
    margin: theme.spacing(0, 1, 0),
    color: "orange",
  },
  alertStyle: {
    display: "flex",
    font: "20",
  },
  editPhoto: {
    position: "absolute",
    right: 70,
    bottom: -16,
    color: purple[900],
    margin: 4,
    width: 40,
    height: 40,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  input: {
    display: "none",
  },
  avatarContainer: {
    position: "relative",
    display: "inline-block",
    marginBottom: 18,
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUser: (firstName, lastName, profilePicture) =>
      dispatch({
        type: actionTypes.LOGIN,
        firstName: firstName,
        lastName: lastName,
        profilePicture: profilePicture,
      }),
  };
};

const mapStateToProps = (state) => ({
  user: state.loggedInUser,
});

class ProfileDetails extends Component {
  state = {
    oldData: {
      firstName: "",
      lastName: "",
      email: "",
      grade: "",
      avatarImage: this.props.user.profilePicture,
    },
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      grade: "",
      avatarImage: this.props.user.profilePicture,
    },
    selectedFile: "firstTime",
    textFieldChanged: false,
    loading: false,
    allowedToSave: true,
    snackBarOpen: false,
    doneSnackBarOpen: false,
    errorMessage: "",
    anchorEl: null,
    hasImage: false,
    allowedToRemove: false,
  };

  config = {
    headers: { Authorization: `Token ${localStorage.getItem("api_key")}` },
  };

  getValues = () => {
    axios
      .get("http://127.0.0.1:8000/api/student/profile/", this.config)
      .then((response) => {
        // handle success
        const formData = {
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          email: response.data.email,
          grade: String(response.data.grade),
          avatarImage: response.data.profile_picture,
        };

        if (response.data.profile_picture !== null) {
          this.setState({ allowedToRemove: true });
        }
        if (response.data.grade === null) {
          formData["grade"] = 1;
        }

        this.setState({
          oldData: { ...formData },
          formData: formData,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  componentDidMount() {
    this.getValues();
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({
      formData: formData,
    });
    this.checkForTextFieldChange(this.state.oldData, formData);
  };

  checkForTextFieldChange = (oldData, newData) => {
    if (
      oldData.firstName === newData.firstName &&
      oldData.lastName === newData.lastName &&
      oldData.email === newData.email &&
      oldData.avatarImage === newData.avatarImage &&
      oldData.grade === newData.grade
    ) {
      this.setState({ textFieldChanged: false });
    } else {
      this.setState({ textFieldChanged: true });
    }
  };

  handleSaveButton = () => {
    if (this.state.allowedToSave) {
      const { oldData } = this.state;
      const { formData } = this.state;
      this.setState({ loading: true, allowedToSave: false });

      const data = new FormData();
      data.append("firstname", formData.firstName);
      data.append("lastname", formData.lastName);
      data.append("email", formData.email);
      data.append("grade", formData.grade);
      if (
        this.state.selectedFile !== null &&
        this.state.selectedFile !== "firstTime"
      ) {
        data.append("profile_picture", this.state.selectedFile);
      } else if (this.state.selectedFile === null) {
        data.append("profile_picture", "");
      }

      axios
        .put("http://127.0.0.1:8000/api/student/profile/", data, this.config)
        .then((response) => {
          oldData["firstName"] = formData.firstName;
          oldData["lastName"] = formData.lastName;
          oldData["grade"] = formData.grade;
          oldData["avatarImage"] = formData.avatarImage;

          console.log(response.data);

          if (formData.email !== response.data.email) {
            this.setState({
              snackBarOpen: true,
              errorMessage: "این ایمیل از قبل وجود دارد",
            });
          } else {
            oldData["email"] = formData.email;
            this.setState({ doneSnackBarOpen: true });
          }

          this.setState({
            oldData,
            loading: false,
            allowedToSave: true,
            formData: { ...this.state.formData },
          });
          this.checkForTextFieldChange(oldData, formData);

          this.props.dispatchUser(
            formData.firstName,
            formData.lastName,
            formData.avatarImage
          );
        })
        .catch((error) => {
          console.log(error);
          this.setState({ loading: false, allowedToSave: true });
        });
    }
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const { formData } = this.state;

      const avatarImage = URL.createObjectURL(event.target.files[0]);
      formData["avatarImage"] = avatarImage;
      this.setState({
        formData,
        selectedFile: event.target.files[0],
        hasImage: true,
        allowedToRemove: true,
      });
      this.checkForTextFieldChange(this.state.oldData, formData);
    }
    // Update the state
  };

  deletePicture = () => {
    const { formData } = this.state;

    formData["avatarImage"] = "";

    this.setState({
      selectedFile: null,
      anchorEl: null,
      hasImage: false,
      formData,
      allowedToRemove: false,
    });

    this.checkForTextFieldChange(this.state.oldData, formData);
  };

  onSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

  onDoneSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ doneSnackBarOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      // <form
      //   autoComplete="off"
      //   noValidate
      // >
      <Card className={classes.root}>
        <ValidatorForm form="form" onSubmit={this.handleSaveButton}>
          <Snackbar
            open={this.state.snackBarOpen}
            autoHideDuration={1500}
            onClose={this.onSnackBarClose}
            dir="rtl"
          >
            <Alert
              onClose={this.onSnackBarClose}
              severity="error"
              className={classes.alertStyle}
            >
              {this.state.errorMessage}
            </Alert>
          </Snackbar>

          <Snackbar
            open={this.state.doneSnackBarOpen}
            autoHideDuration={1000}
            onClose={this.onDoneSnackBarClose}
            dir="rtl"
          >
            <Alert
              onClose={this.onDoneSnackBarClose}
              severity="success"
              className={classes.alertStyle}
            >
              انجام شد
            </Alert>
          </Snackbar>

          <CardHeader
            subheader="اطلاعات خود را میتوانید ویرایش کنید"
            title="پروفایل"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={4} dir="rtl">
              <Grid item md={12} style={{ alignSelf: "center" }} xs={12}>
                <div className={classes.avatarContainer}>
                  <Avatar
                    className={classes.avatar}
                    src={this.state.formData.avatarImage}
                  />
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={this.onFileChange}
                  />
                  <Fab
                    component="span"
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    className={classes.editPhoto}
                    onClick={this.handleClick}
                  >
                    <EditIcon />
                  </Fab>

                  <StyledMenu
                    id="customized-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                    <label htmlFor="contained-button-file">
                      <StyledMenuItem onClick={this.handleClose}>
                        <ListItemIcon>
                          <AddPhotoAlternateIcon />
                        </ListItemIcon>
                        <ListItemText primary="انتخاب عکس" />
                      </StyledMenuItem>
                    </label>

                    <StyledMenuItem
                      onClick={this.deletePicture}
                      disabled={!this.state.allowedToRemove}
                    >
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary="حذف کردن عکس" />
                    </StyledMenuItem>
                  </StyledMenu>
                </div>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextValidator
                  fullWidth
                  label="نام"
                  name="firstName"
                  onChange={this.handleChange}
                  required
                  value={this.state.formData.firstName}
                  variant="outlined"
                  validators={["required", "matchRegexp:^[^0-9]+$"]}
                  errorMessages={["this field is required", "فرمت اشتباه است"]}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextValidator
                  fullWidth
                  label="نام خانوادگی"
                  name="lastName"
                  onChange={this.handleChange}
                  required
                  value={this.state.formData.lastName}
                  variant="outlined"
                  validators={["required", "matchRegexp:^[^0-9]+$"]}
                  errorMessages={["this field is required", "فرمت اشتباه است"]}
                />
              </Grid>

              <Grid item md={6} xs={12}>
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
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextValidator
                  fullWidth
                  label="ایمیل"
                  name="email"
                  dir="lrt"
                  onChange={this.handleChange}
                  required
                  value={this.state.formData.email}
                  variant="outlined"
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "فرمت ایمیل درست نمی باشد",
                  ]}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={!this.state.textFieldChanged}
            >
              ذخیره شود
              {this.state.loading && (
                <CircularProgress
                  thickness={5}
                  size={25}
                  className={classes.progressBar}
                />
              )}
            </Button>
          </Box>
        </ValidatorForm>
      </Card>
      // {/* // </form> */}
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProfileDetails));
