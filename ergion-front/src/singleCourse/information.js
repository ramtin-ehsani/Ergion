import React from "react";
import { useTheme } from "@material-ui/core/styles";
import AddButtonAndPopUp from "./PopUp";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";
import {
  createMuiTheme,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import theme from "./theme.js";

import { sizing } from "@material-ui/system";
import { positions } from "@material-ui/system";
import Typography from "@material-ui/core/Typography";
import "./information.scss";
import Box from "@material-ui/core/Box";
import { Redirect, useHistoey } from "react-router-dom";
import Axios from "axios";
import Mytypography from "./mytypography";
import Mytypography1 from "./mytypography1";
import Avatar from "@material-ui/core/Avatar";
import { Grade, Router } from "@material-ui/icons";
import { browserHistory } from "react-router";
import Snackbar from "@material-ui/core/Snackbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import PropTypes from "prop-types";
import Record from "./records";
import { Divider, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import Chip from "@material-ui/core/Chip";
import "./information.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import { create } from "jss";
import rtl from "jss-rtl";
import TextField from "@material-ui/core/TextField";
import CourseLayout from "./CourseLayout";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import PersonIcon from "@material-ui/icons/Person";
const useStyles = makeStyles((theme) => ({
  chipo: {
    display: "flex",

    justifyContent: "right",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },

  Button: {
    fontFamily: "IRANSans",
  },
  Buttonpos: {
    fontFamily: "IRANSans",
    marginRight: theme.spacing(1),
    width: "25%",
  },
  title: {
    fontFamily: "IRANSans",
  },
  inf: {
    fontWeight: "600",
    display: "inline",
    padding: theme.spacing(1),
  },
  cover: {
    width: "100%",
    height: "180",
    objectFit: "cover",

    padding: 0,
  },
  informationtext: {
    margin: theme.spacing(2),
  },
  newEpisodeButtonContent: {
    // justifyContent:'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 8,
    paddingTop: 8,
  },
  personicon: {
    verticalAlign: "middle",
  },
}));

export default function Information(props) {
  const [Add, setAdd] = React.useState(0);

  const classes = useStyles();
  const [name, setname] = React.useState(props.course.name);
  const [cover, setcover] = React.useState(props.course.course_cover);
  const [capacity, setcapacity] = React.useState(0);
  const [bio, setbio] = React.useState(props.course.about_course);
  const [tempbio, settempbio] = React.useState(props.course.about_course);
  const [subject, setsubject] = React.useState(props.course.subject);
  const [episode_count, setEpCount] = React.useState(0);
  const [std_count, setStdCount] = React.useState(0);
  const [grade, setgrade] = React.useState(props.course.grade);
  const [T, setT] = React.useState(false);
  const [S, setS] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [hascourse, sethasCourse] = React.useState(false);
  const [isowner, setisowner] = React.useState(false);
  const [id, setid] = React.useState("");
  const [edit, setedit] = React.useState(false);
  const [editmode, seteditmode] = React.useState(0);
  const [hasrequested, sethasrequested] = React.useState(false);
  const [removeDialog, setremoveDialog] = React.useState(false);
  const [shareDialogOpen, setshareDialogOpen] = React.useState(false);
  const [snackbar, setsnackbar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = snackbar;

  const handleClose = () => {
    setsnackbar({ ...snackbar, open: false });
  };

  const getcourse = () => {
    props.getupdate();
  };

  const toFarsiNumber = (n) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  };
  const Grade = (n) => {
    const farsiDigits = [
      "اول دبستان",
      "دوم دبستان",
      "سوم دبستان",
      "چهارم دبستان",
      "پنجم دبستان",
      "ششم دبستان",
      "هفتم",
      "هشتم",
      "نهم",
      "دهم",
      "یازدهم",
      "دوازدهم",
    ];

    return farsiDigits[n - 1];
  };

  React.useEffect(() => {
    const c_id = window.location.href.split("/")[5];
    let timer;
    // setTimeout(() => {
    // timer = setInterval(() => {
    // const promise1 = Axios.get(`http://127.0.0.1:8000/api/course/${c_id}`);
    // promise1
    //   .then((response) => {
    //     setname(response.data.name);
    //     setgrade(response.data.grade);
    //     setcapacity(response.data.capacity);
    //     setsubject(response.data.subject);
    //     setbio(response.data.about_course);
    //     setid(response.data.id);
    //   })
    //   .catch((error) => console.log(error));
    setcover(props.course.course_cover);
    setname(props.course.name);
    setgrade(props.course.grade);
    setsubject(props.course.subject);
    setbio(props.course.about_course);
    if (props.course.capacity !== undefined) {
      setcapacity(props.course.capacity);
    }
    if (props.course.episodes_count !== undefined) {
      setEpCount(props.course.episodes_count);
    }
    if (props.course.students_count !== undefined) {
      setStdCount(props.course.students_count);
    }

    if (JSON.parse(localStorage.getItem("user")) !== null) {
      if (JSON.parse(localStorage.getItem("user"))["role"] === "T") {
        setT(true);
        console.log(JSON.parse(localStorage.getItem("user")));
        if (
          JSON.parse(localStorage.getItem("user"))["id"] ===
          props.course.instructor_id
        ) {
          setLoaded(true);
          setisowner(true);
          setAdd(0);
          if (editmode != 2) {
            seteditmode(1);
          }
        }
      } else {
        setS(true);
        if (props.course.joined) {
          setAdd(2);
        } else {
          if (props.course.requested) {
            setAdd(3);
          } else {
            if (props.course.capacity === props.course.students_count) {
              setAdd(4);
            } else {
              setAdd(1);
            }
          }
        }
        setLoaded(true);
      }
    }
    // }, 1000);
    // }, 1000);

    // return () => clearInterval(timer);
  }, [props.course]);

  const shareLink = (id) => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      if (JSON.parse(localStorage.getItem("user"))["role"] === "T") {
        return "http://localhost:3000/teacher_dashboard/added_courses/" + id;
      } else {
        return "http://localhost:3000/student_dashboard/added_courses/" + id;
      }
    }
  };

  const handleDelete = () => {
    dialogOnclose();
    Axios.delete("http://127.0.0.1:8000/api/student/courses/", {
      params: { course_id: props.course.id },
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setAdd(1);
      })
      .catch((error) => console.log(error));
  };

  const handlesharedialog = () => {
    setshareDialogOpen(true);
  };
  const sharedialogOnclose = () => {
    setshareDialogOpen(false);
  };
  const handledialogopen = () => {
    setremoveDialog(true);
  };
  const dialogOnclose = () => {
    setremoveDialog(false);
  };
  const handleAdd = () => {
    if (localStorage.getItem("api_key") === "null") {
      window.location = "/login";
    } else {
      Axios.put(
        "http://127.0.0.1:8000/api/student/courses/",
        { course_id: props.course.id },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      ).then((response) => {
        if (props.course.is_public) {
          setAdd(2);
        } else {
          setAdd(3);
        }
        setsnackbar({ ...snackbar, open: true });
      });
    }
  };

  const copytoclipboard = (link) => {
    navigator.clipboard.writeText(link);
    // setOpen(true);
  };
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Zoom in={loaded} timeout={700}>
          <CardMedia
            className={classes.cover}
            height="180"
            component="img"
            image={cover}
            title={name}
          />
        </Zoom>
        <div className={classes.informationtext}>
          <Grid container>
            <Grid container item>
              {loaded && (
                <div>
                  {isowner ? (
                    <CourseLayout course={props.course} getupdate={getcourse} />
                  ) : (
                    <Zoom
                      in={loaded}
                      timeout={700}
                      style={{ transitionDelay: loaded ? "1000ms" : "0ms" }}
                    >
                      <div>
                        {Add === 2 && (
                          <Button
                            size="medium"
                            onClick={handledialogopen}
                            variant="contained"
                            color="secondary"
                          >
                            <Typography inline variant="button">
                              <Box>خروج</Box>
                            </Typography>
                          </Button>
                        )}
                        {Add === 1 && (
                          <Button
                            size="medium"
                            onClick={handleAdd}
                            variant="contained"
                            color="primary"
                          >
                            <Typography inline variant="button">
                              <Box>اضافه شدن</Box>
                            </Typography>
                          </Button>
                        )}
                        {Add === 3 && (
                          <Button
                            size="medium"
                            onClick={handleDelete}
                            variant="contained"
                            color="gray"
                          >
                            <Typography inline variant="button">
                              درخواست
                            </Typography>
                          </Button>
                        )}
                        {Add === 4 && (
                          <Button size="medium" variant="outlined" disabled>
                            <Typography inline variant="button">
                              تکمیل
                            </Typography>
                          </Button>
                        )}
                      </div>
                    </Zoom>
                  )}
                </div>
              )}
              <Dialog
                open={removeDialog}
                onClose={dialogOnclose}
                aria-labelledby="error-dialog"
                className={classes.newEpisodeRoot}
              >
                <DialogTitle id="error-dialog" dir="rtl">
                  حذف
                </DialogTitle>
                <DialogContent>
                  <DialogContentText dir="rtl" style={{ padding: "10px" }}>
                    آیا میخواهید این درس را حذف کنید؟
                  </DialogContentText>
                </DialogContent>

                <DialogActions className={classes.newEpisodeButtonContent}>
                  <Button
                    color="primary"
                    onClick={dialogOnclose}
                    style={{ margin: "8px" }}
                  >
                    <Typography inline variant="button">
                      <Box>لغو</Box>
                    </Typography>
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                    style={{ margin: "8px" }}
                  >
                    <Typography inline variant="button">
                      <Box>حذف</Box>
                    </Typography>
                  </Button>
                </DialogActions>
              </Dialog>
              <Zoom
                in={loaded}
                timeout={700}
                style={{ transitionDelay: loaded ? "1000ms" : "0ms" }}
              >
                <IconButton
                  aria-label="add an alarm"
                  style={{ marginTop: "-8px", marginLeft: "10px" }}
                  onClick={handlesharedialog}
                >
                  <FileCopyIcon />
                </IconButton>
              </Zoom>
              <Dialog
                open={shareDialogOpen}
                onClose={sharedialogOnclose}
                aria-labelledby="share-dialog"
                fullWidth={true}
                maxWidth={"sm"}
              >
                <DialogTitle id="share-dialog" dir="rtl">
                  اشتراک گذاری
                </DialogTitle>
                <DialogContent>
                  <FormControl variant="outlined" fullWidth={true}>
                    <InputLabel htmlFor="outlined-adornment-link">
                      لینک
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-link"
                      label="لینک"
                      defaultValue={shareLink(props.course.id)}
                      disabled={true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={()=>copytoclipboard(shareLink(props.course.id))} edge="end">
                            <FileCopyIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </DialogContent>

                <DialogActions>
                  <Button
                    color="primary"
                    onClick={sharedialogOnclose}
                    style={{ margin: "8px" }}
                  >
                    لغو
                  </Button>
                </DialogActions>
              </Dialog>

              <Grid
                item
                alignItems="flex-end"
                justify="flex-end"
                direction="row-reverse"
                xs
                zeroMinWidth
              >
                <Typography className={"nameeeee"} inline color="primary">
                  <Zoom
                    in={loaded}
                    style={{ transitionDelay: loaded ? "300ms" : "0ms" }}
                  >
                    <Box
                      style={{ textAlign: "right" }}
                      fontWeight="fontWeightBold"
                    >
                      {" "}
                      {name}{" "}
                    </Box>
                  </Zoom>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: "8px" }}>
            <Grid container justify="flex-end">
              <Zoom
                in={loaded}
                style={{ transitionDelay: loaded ? "600ms" : "0ms" }}
              >
                <div style={{ display: "flex" }}>
                  <Typography inline variant="body2">
                    /{Grade(grade)}
                  </Typography>{" "}
                  <Typography variant="body1">
                    {" "}
                    <Box fontWeight="fontWeightBold">{subject}</Box>
                  </Typography>
                </div>
              </Zoom>
            </Grid>

            <Grid
              style={{ marginTop: "8px" }}
              container
              justify="right"
              direction="row-reverse"
              justifyContent="right"
            >
              <Zoom
                in={loaded}
                style={{ transitionDelay: loaded ? "900ms" : "0ms" }}
              >
                <Typography inline variant="body2">
                  <Box>{bio}</Box>
                </Typography>
              </Zoom>
            </Grid>

            <Grid
              container
              style={{ marginTop: "8px" }}
              justify="center"
              alignItems="center"
              spacing={2}
              direction="row-reverse"
            >
              <Grid item xs zeroMinWidth justify="center" alignItems="center">
                <Zoom
                  in={loaded}
                  style={{ transitionDelay: loaded ? "1200ms" : "0ms" }}
                >
                  <div>
                    <Typography
                      inline
                      className={classes.inf}
                      variant="body1"
                      color="textSecondary"
                    >
                      {toFarsiNumber(std_count)}{" "}
                    </Typography>

                    <Typography
                      inline
                      className={classes.inf}
                      variant="body1"
                      color="primary"
                    >
                      دانش آموز
                    </Typography>
                  </div>
                </Zoom>
              </Grid>

              <Grid item xs zeroMinWidth justify="center" alignItems="center">
                <Zoom
                  in={loaded}
                  style={{ transitionDelay: loaded ? "1500ms" : "0ms" }}
                >
                  <div>
                    <Typography
                      inline
                      className={classes.inf}
                      variant="body1"
                      color="textSecondary"
                    >
                      {toFarsiNumber(capacity)}{" "}
                    </Typography>
                    <Typography
                      className={classes.inf}
                      variant="body1"
                      color="primary"
                      inline
                    >
                      {" "}
                      ظرفیت
                    </Typography>
                  </div>
                </Zoom>
              </Grid>
              <Grid item xs zeroMinWidth justify="center" alignItems="center">
                <Zoom
                  in={loaded}
                  style={{ transitionDelay: loaded ? "1800ms" : "0ms" }}
                >
                  <div>
                    <Typography
                      inline
                      className={classes.inf}
                      variant="body1"
                      color="textSecondary"
                    >
                      {toFarsiNumber(episode_count)}{" "}
                    </Typography>
                    <Typography
                      className={classes.inf}
                      variant="body1"
                      color="primary"
                      inline
                    >
                      قسمت
                    </Typography>
                  </div>
                </Zoom>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
