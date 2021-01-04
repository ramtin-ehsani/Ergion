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
}));

export default function Information(props) {
  const [Add, setAdd] = React.useState(1);

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

  React.useEffect(() => {
    const c_id = window.location.href.split("/")[5];
    let timer;
    // setTimeout(() => {
    // timer = setInterval(() => {
    // const promise1 = Axios.get(`https://api.classinium.ir/api/course/${c_id}`);
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

        const promise = Axios.get(
          "https://api.classinium.ir/api/student/courses/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        promise.then((result) => {
          result.data.map((course) => {
            if (course.id === props.course.id) {
              sethasCourse(true);

              setAdd(2);
            }
          });
          setLoaded(true);
        });
      }
    }
    // }, 1000);
    // }, 1000);

    // return () => clearInterval(timer);
  }, [props.course]);

  const edithandler = () => {
    seteditmode(2);

    setedit(true);
  };
  const okhandler = () => {
    Axios.put(
      `https://api.classinium.ir/api/course/${props.course.id}`,
      { about_course: tempbio },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    ).then((response) => {
      console.log(tempbio);
      setbio(tempbio);
    });

    seteditmode(1);
    setedit(false);
  };

  const handleAdd = () => {
    if (localStorage.getItem("api_key") === "null") {
      window.location = "/login";
    } else {
      Axios.put(
        "https://api.classinium.ir/api/student/courses/",
        { course_id: props.course.id },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      setsnackbar({ ...snackbar, open: true });
      sethasCourse(true);
      if (Add === 1) {
        setAdd(2);
      }
      if (Add === 2) {
        setAdd(1);
      }
    }
  };

  function handleChangebio(event) {
    settempbio(event.target.value);
  }
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
                        {hascourse ? (
                          <Button
                            size="medium"
                            // onClick={handleAdd}
                            variant="contained"
                            color="secondary"
                          >
                            <Typography inline variant="button">
                              <Box>حذف</Box>
                            </Typography>
                          </Button>
                        ) : (
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
                      </div>
                    </Zoom>
                  )}
                </div>
              )}

              <IconButton
                aria-label="add an alarm"
                style={{ marginTop: "-8px", marginLeft: "10px" }}
              >
                <ShareIcon />
              </IconButton>
              <Grid item alignItems="flex-start" justify="flex-start"></Grid>
              <Grid
                item
                alignItems="flex-end"
                justify="flex-end"
                direction="row-reverse"
                xs
                zeroMinWidth
              >
                <Typography
                  className={"nameeeee"}
                  variant="h4"
                  inline
                  color="primary"
                >
                  <Zoom
                    in={loaded}
                    style={{ transitionDelay: loaded ? "300ms" : "0ms" }}
                  >
                    <Box> {name} </Box>
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
                    /{subject}
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
