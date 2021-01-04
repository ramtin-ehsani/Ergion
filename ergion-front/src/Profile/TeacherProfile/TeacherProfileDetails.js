import React, { Component } from "react";
import axios from "axios";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Menu from "@material-ui/core/Menu";
import Fab from "@material-ui/core/Fab";
import purple from "@material-ui/core/colors/purple";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MuiAlert from "@material-ui/lab/Alert";
import * as actionTypes from "../../store/actions";
import {
  Box,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";

const occupation = [
  {
    value: "4",
    label: " انتخاب کنید",
  },
  {
    value: "1",
    label: "معلم",
  },
  {
    value: "2",
    label: "دانشجو",
  },
  {
    value: "3",
    label: " مشاور کنکور",
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
      occupation: "",
      resume: "",
      universityEmail: "",
      aboutMe: "",
      institute: "",
      avatarImage: this.props.user.profilePicture,
    },
    formData: {
      firstName: "",
      lastName: "",
      email: "",
      occupation: "",
      resume: "",
      universityEmail: "",
      aboutMe: "",
      institute: "",
      avatarImage: this.props.user.profilePicture,
    },
    selectedFile: "firstTime",
    textFieldChanged: false,
    loading: false,
    allowedToSave: true,
    anchorEl: null,
    hasImage: false,
    allowedToRemove: false,
    snackBarOpen: false,
    errorMessage: "",
    teacherTypeError: true,
    doneSnackBarOpen: false,
  };

  config = {
    headers: { Authorization: `Token ${localStorage.getItem("api_key")}` },
  };

  getValues = () => {
    axios
      .get("http://130.185.78.113:8000/api/teacher/profile/", this.config)
      .then((response) => {
        // handle success
        const formData = {
          avatarImage: response.data.profile_picture,
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          email: response.data.email,
          occupation: String(response.data.teacher_type),
          resume: String(response.data.work_experience),
          universityEmail: response.data.scholar_email,
          institute: response.data.academy_name,
          aboutMe: response.data.personal_description,
        };

        if (response.data.scholar_email == null) {
          formData["universityEmail"] = "";
        }
        if (response.data.personal_description == null) {
          formData["aboutMe"] = "";
        }
        if (response.data.academy_name == null) {
          formData["institute"] = "";
        }
        if (response.data.profile_picture !== null) {
          this.setState({ allowedToRemove: true });
        }

        if (response.data.teacher_type !== 4) {
          this.setState({
            teacherTypeError: false,
          });
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
    if (event.target.name === "occupation") {
      if (event.target.value !== "4") {
        this.setState({
          teacherTypeError: false,
        });
      } else {
        this.setState({
          teacherTypeError: true,
        });
      }
    }
    this.checkForTextFieldChange(this.state.oldData, formData);
  };

  checkForTextFieldChange = (oldData, newData) => {
    if (
      oldData.firstName === newData.firstName &&
      oldData.lastName === newData.lastName &&
      oldData.email === newData.email &&
      oldData.occupation === newData.occupation &&
      oldData.resume === newData.resume &&
      oldData.universityEmail === newData.universityEmail &&
      oldData.aboutMe === newData.aboutMe &&
      oldData.avatarImage === newData.avatarImage &&
      oldData.institute === newData.institute
    ) {
      this.setState({ textFieldChanged: false });
    } else {
      if (newData.occupation !== "4") {
        this.setState({ textFieldChanged: true });
      } else {
        this.setState({ textFieldChanged: false });
      }
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
      data.append("teacher_type", formData.occupation);
      data.append("work_experience", formData.resume);
      data.append("scholar_email", formData.universityEmail);
      data.append("personal_description", formData.aboutMe);
      data.append("academy_name", formData.institute);
      if (
        this.state.selectedFile !== null &&
        this.state.selectedFile !== "firstTime"
      ) {
        data.append("profile_picture", this.state.selectedFile);
      } else if (this.state.selectedFile === null) {
        data.append("profile_picture", "");
      }

      axios
        .put("http://130.185.78.113:8000/api/teacher/profile/", data, this.config)
        .then((response) => {
          oldData["firstName"] = formData.firstName;
          oldData["lastName"] = formData.lastName;
          oldData["occupation"] = formData.occupation;
          oldData["institute"] = formData.institute;
          oldData["aboutMe"] = formData.aboutMe;
          oldData["universityEmail"] = formData.universityEmail;
          oldData["resume"] = formData.resume;
          oldData["avatarImage"] = formData.avatarImage;

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

  onSnackBarClose = (reason) => {
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
                  label="شغل"
                  name="occupation"
                  onChange={this.handleChange}
                  required
                  select
                  error={this.state.teacherTypeError}
                  SelectProps={{ native: true }}
                  value={this.state.formData.occupation}
                  variant="outlined"
                >
                  {occupation.map((option) => (
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
                  dir="ltr"
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

              <Grid item md={6} xs={12}>
                <TextValidator
                  fullWidth
                  label="ایمیل دانشگاهی"
                  dir="ltr"
                  name="universityEmail"
                  onChange={this.handleChange}
                  value={this.state.formData.universityEmail}
                  variant="outlined"
                  validators={["isEmail"]}
                  errorMessages={["فرمت ایمیل درست نمی باشد"]}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextValidator
                  fullWidth
                  InputProps={{ inputProps: { min: 0, max: 70 } }}
                  label="سوابق کاری"
                  name="resume"
                  contentEditable={false}
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.formData.resume}
                  variant="outlined"
                  validators={["matchRegexp:^(?:[0-9]|[1-6][0-9]|70)$"]}
                  errorMessages={["فقط اعداد بین 0 تا 70 مجاز است"]}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextValidator
                  fullWidth
                  label="نام موسسه یا دانشگاه"
                  name="institute"
                  onChange={this.handleChange}
                  value={this.state.formData.institute}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextValidator
                  fullWidth
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
