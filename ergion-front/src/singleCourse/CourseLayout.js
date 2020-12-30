import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Paper from "@material-ui/core/Paper";

import "./CourseLayout.scss";
import { Link, useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import { Box, ButtonGroup } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import purple from "@material-ui/core/colors/purple";
import Fab from "@material-ui/core/Fab";
import rtl from "jss-rtl";
import { create } from "jss";
import { TextField } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    // paddingBottom: theme.spacing(3),
    // marginLeft: 10,
    // marginRight: theme.spacing(50),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    height: 180,
    width: "100%",
    objectFit: "cover",
  },
  toggleButtonPaper: {
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  cardActions: {
    padding: theme.spacing(0),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  gridTitle: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },

  newCourseRoot: {
    root: {
      height: "auto",
    },
  },
  newCourseCardMedia: {
    height: 120,
    width: "100%",
    objectFit: "cover",
    paddingLeft: 17,
    paddingRight: 17,
    borderBlockStyle: "doted",
  },
  newCourseAddImageContainer: {
    position: "relative",
    marginBottom: 4,
    marginTop: 4,
  },
  newCourseTitle: {
    backgroundColor: "#3f50b5",
    color: "#fff",
    textAlign: "center",
  },
  newCourseAddImage: {
    position: "absolute",
    right: 25,
    bottom: 10,
    margin: 4,
    color: purple[900],
    width: 40,
    height: 40,
  },
  input: {
    display: "none",
  },
  newCourseButtonWidth: {
    width: 120,
    height: 40,
    fontSize: "1rem",
    margin: 8,
  },
  newCourseButtonContent: {
    // justifyContent:'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 8,
    paddingTop: 8,
  },
  typoStyle: {
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: 300,
    margin: 8,
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function CourseLayout(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [coverImage, setCoverImage] = React.useState("");
  const [accessType, setaccessType] = React.useState("public");
  const newCourseName = React.useRef("");
  const newCourseSubject = React.useRef("");
  const newCourseGrade = React.useRef("1");
  const newCourseCapacity = React.useRef(10);
  const newCourseDescription = React.useRef("");

  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      localStorage.setItem("course_name", newCourseName.current.value);
      localStorage.setItem("course_subject", newCourseSubject.current.value);
      localStorage.setItem("course_grade", newCourseGrade.current.value);
      localStorage.setItem("course_capacity", newCourseCapacity.current.value);
      localStorage.setItem(
        "course_description",
        newCourseDescription.current.value
      );

      setSelectedFile(event.target.files[0]);
      setCoverImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleAccessChange = (event, newAccess) => {
    localStorage.setItem("course_name", newCourseName.current.value);
    localStorage.setItem("course_subject", newCourseSubject.current.value);
    localStorage.setItem("course_grade", newCourseGrade.current.value);
    localStorage.setItem("course_capacity", newCourseCapacity.current.value);
    localStorage.setItem(
      "course_description",
      newCourseDescription.current.value
    );
    setaccessType(newAccess);
  };

  const theme = createMuiTheme({
    typography: {
      fontFamily: '"Vazir", sans-serif',
    },
    direction: "rtl",
  });
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

  

  const addCourseButton = () => {
    const data = new FormData();
    data.append("name", newCourseName.current.value);
    data.append("subject", newCourseSubject.current.value);
    data.append("grade", newCourseGrade.current.value);
    data.append("capacity", newCourseCapacity.current.value);
    data.append("about_course", newCourseDescription.current.value);
    if (selectedFile !== null) {
      data.append("course_cover", selectedFile);
    }

    if(accessType==='public'){
      data.append("is_public", 1);
    }else{
      data.append("is_public", 0);
    }
    axios
      .put(`http://127.0.0.1:8000/api/course/${props.course.id}`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("api_key")}`,
        },
      })
      .then((response) => {
        // console.log(response)
        setDialogOpen(false);
        props.getupdate();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newCourseButton = () => {
    setSelectedFile(null);
    setCoverImage(props.course.course_cover);

    if (props.course.is_public) {
      setaccessType("public");
    } else {
      setaccessType("private");
    }
    setDialogOpen(true);
  };
  const NewCourseDialog = (props) => {
    const { open, setOpen } = props;
    return (
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="error-dialog"
            className={classes.newCourseRoot}
          >
            <ValidatorForm form="form" onSubmit={addCourseButton}>
              <DialogTitle
                id="error-dialog"
                dir="rtl"
                className={classes.newCourseTitle}
              >
                ویرایش کلاس{" "}
              </DialogTitle>

              <Divider />
              <Divider />

              <DialogContent>
                <div className={classes.newCourseAddImageContainer}>
                  <Typography className={classes.typoStyle}>کاور</Typography>
                  {coverImage === "" ? (
                    <CardMedia
                      className={classes.newCourseCardMedia}
                      component="img"
                      image={props.course.course_cover}
                    />
                  ) : (
                    <CardMedia
                      className={classes.newCourseCardMedia}
                      component="img"
                      image={coverImage}
                    />
                  )}

                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={onFileChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Fab component="span" className={classes.newCourseAddImage}>
                      <AddPhotoAlternateIcon />
                    </Fab>
                  </label>
                </div>

                <CardContent>
                  <Grid container spacing={1} dir="rtl">
                    <Grid item md={12} xs={12} style={{ marginBottom: "4px" }}>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item md={12} xs={12}>
                          <Paper
                            className={classes.toggleButtonPaper}
                            style={{ alignSelf: "center" }}
                          >
                            <StyledToggleButtonGroup
                              size="small"
                              value={accessType}
                              exclusive
                              onChange={handleAccessChange}
                              aria-label="text alignment"
                            >
                              <ToggleButton
                                value="public"
                                aria-label="right aligned"
                                style={
                                  accessType === "public"
                                    ? {
                                        backgroundColor: "#3f51b5",
                                        color: "white",
                                      }
                                    : {
                                        backgroundColor: "transparent",
                                        color: "grey",
                                      }
                                }
                              >
                                <div style={{ display: "flex" }}>
                                  <Typography>
                                    <Box>عمومی</Box>
                                  </Typography>
                                  <LockOpenIcon />
                                </div>
                              </ToggleButton>
                              <ToggleButton
                                value="private"
                                aria-label="left aligned"
                                style={
                                  accessType === "private"
                                    ? {
                                        backgroundColor: "#3f51b5",
                                        color: "white",
                                      }
                                    : {
                                        backgroundColor: "transparent",
                                        color: "grey",
                                      }
                                }
                              >
                                <div style={{ display: "flex" }}>
                                  <Typography>
                                    <Box>خصوصی</Box>
                                  </Typography>
                                  <LockIcon />
                                </div>
                              </ToggleButton>
                            </StyledToggleButtonGroup>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextValidator
                        fullWidth
                        label="نام"
                        name="name"
                        defaultValue={props.course.name}
                        inputRef={newCourseName}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextValidator
                        fullWidth
                        label="موضوع"
                        name="subject"
                        inputRef={newCourseSubject}
                        required
                        defaultValue={props.course.subject}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="مقطع"
                        name="grade"
                        required
                        inputRef={newCourseGrade}
                        defaultValue={props.course.grade}
                        select
                        SelectProps={{ native: true }}
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
                      <TextField
                        fullWidth
                        InputProps={{ inputProps: { min: 1 } }}
                        label="ظرفیت"
                        name="capacity"
                        inputRef={newCourseCapacity}
                        defaultValue={props.course.capacity}
                        contentEditable={false}
                        type="number"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        dir="rtl"
                        label="توضیحات"
                        name="description"
                        inputRef={newCourseDescription}
                        defaultValue={props.course.about_course}
                        variant="outlined"
                        multiline={true}
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </DialogContent>

              <Divider />
              <Divider />

              <DialogActions className={classes.newCourseButtonContent}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                  className={classes.newCourseButtonWidth}
                >
                  لغو
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={addCourseButton}
                  type="submit"
                  className={classes.newCourseButtonWidth}
                >
                  تایید
                </Button>
              </DialogActions>
            </ValidatorForm>
          </Dialog>
        </ThemeProvider>
      </StylesProvider>
    );
  };

  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [isEmpty, setEmpty] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const handleCourse = (val) => {
    const newList = list.concat({ val });
    setList(newList);
  };

  React.useEffect(() => {
    if (props.course.is_public) {
      setaccessType("public");
    } else {
      setaccessType("private");
    }
  }, [props.course]);

  return (
    <div>
      <Button
        size="medium"
        className="addButton"
        variant="outlined"
        color="primary"
        onClick={newCourseButton}
      >
        ویرایش
      </Button>
      <NewCourseDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        course={props.course}
        getupdate={props.update}
      />
    </div>
  );
}
