import React, { useEffect, useState } from "react";
import "./suggestcourse.scss";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {
  createMuiTheme,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { create } from "jss";
import rtl from "jss-rtl";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import ShareIcon from "@material-ui/icons/Share";
import Snackbar from "@material-ui/core/Snackbar";
import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "@material-ui/lab/Alert";
import { ButtonGroup } from "@material-ui/core";
// import copy from "copy-to-clipboard";

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
    // backgroundColor: "red"
    // paddingBottom: theme.spacing(3),
    // marginLeft: theme.spacing(18),
    // marginRight: theme.spacing(30),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9filteredList
    // minHeight: "100%",
    // minWidth: "100%",
    // maxWidth: "100%",
    // maxHeight: "100%",

    height: 100,
    width: "100%",
    objectFit: "cover",
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  cardActions: {
    // height: 50,
    padding: theme.spacing(0),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  alertText: {
    display: "flex",
    fontSize: 20,
  },
  snackBAr: {
    // paddingBottom: window.innerHeight - 150,    /*Change the position of Snackbar*/
  },
  avatar: {
    // backgroundColor: "red",
  },
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "IRANSans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": ["IRANSans"],
      },
    },
  },
  direction: "rtl",
});

const Suggestedcourse = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [isEmpty, setEmpty] = React.useState(false);

  const [courses, setCourses] = useState([]);
  const [T, setT] = React.useState(false);

  const [open, setOpen] = useState(false);

  const config = {
    headers: { Authorization: `Token ${localStorage.getItem("api_key")}` },
  };

  function copyToClipboard(id) {
    let textField = document.createElement("textarea");
    textField.innerText = "http://app.classinium.ir/course/" + id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function courseLinkHandler(id) {
    return "http://app.classinium.ir/course/" + id;
  }

  const toFarsiNumber = (n) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  };

  useEffect(() => {
    const showAllAPI = "https://api.classinium.ir/api/student/suggested-courses/";
    const showAllAPI1 = "https://api.classinium.ir/api/teacher/courses/";
    if (JSON.parse(localStorage.getItem("user"))["role"] === "S") {
      axios
        .get(showAllAPI, config)
        .then((response) => {
          if (response.data.length > 0) {
            setEmpty(false);
            setCourses(response.data);
          } else {
            setEmpty(true);
          }
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }

    if (JSON.parse(localStorage.getItem("user"))["role"] === "T") {
      setT(true);
      axios
        .get(showAllAPI1, config)
        .then((response) => {
          if (response.data.length > 0) {
            response.data.slice(0, 3).map((course) => {
              if (course.id !== window.location.href.split("/")[5]) {
                setCourses((oldarray) => [...oldarray, course]);
              }
            });
          } else {
            setEmpty(true);
          }
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <React.Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main className="main">
            {/* {isEmpty && (<Grid item >
                                    <Typography className='typo' component="div">
                                        <Box fontSize={20} m={1}>
                                            کلاسی یافت نشد
                                            </Box>
                                    </Typography>
                                </Grid>
                                )} */}
            <div>
              {!loading ? (
                <div>
                  {courses &&
                    courses.map((course) => (
                      <Grid
                        className="cardSpacing"
                        item
                        key={course.id}
                        xs={12}
                        sm={false}
                        md={false}
                        style={{
                          marginBottom: "10px",
                          // paddingRight:'24px',paddingLeft:'24px',
                          marginTop: "2px",
                        }}
                      >
                        {/*// <Grid className="cardSpacing" item key={course.id}>*/}
                        <Card className="layout1">
                          {/* <CardHeader
                        title={
                            <div >
                          <Typography
                            className="courseOwnerPlace"
                            component="h4"
                          >
                            مدرس:{" "}
                            {course.instructor_firstname +
                              " " +
                              course.instructor_lastname}
                          </Typography>
                          <Typography
                          className="courseCapacityPlace"
                          component="h6"
                        >
                            <Box 
                            // style={{textAlign:'right'}}
                            >
                          ظرفیت کلاس:{" " + toFarsiNumber(course.capacity)}
                          </Box>
                        </Typography>

                          </div>
                        }
                        avatar={
                          <Avatar
                            src={course.instructor_profile_picture}
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            {course.instructor_firstname.split("")[0]}
                          </Avatar>
                        }
                      /> */}
                          <div
                            style={{
                              display: "flex",
                              margin: "10px",
                              wordBreak: "all-break",
                            }}
                          >
                            <Avatar
                              src={course.instructor_profile_picture}
                              aria-label="recipe"
                              className={classes.avatar}
                              style={{
                                marginRight: "10px",
                                alignSelf: "center",
                              }}
                            >
                              {course.instructor_firstname.split("")[0]}
                            </Avatar>
                            <div
                              style={{
                                marginRight: "6px",
                                alignSelf: "center",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <Typography
                                  //   className="courseOwnerPlace"
                                  component="h4"
                                >
                                  <Box>
                                    مدرس :
                                    {course.instructor_firstname +
                                      " " +
                                      course.instructor_lastname}
                                  </Box>
                                </Typography>
                              </div>
                              <div
                                style={{ display: "flex", marginTop: "4px" }}
                              >
                                <Typography
                                  //   className="courseCapacityPlace"
                                  component="h4"
                                >
                                  <Box
                                  // style={{textAlign:'right'}}
                                  >
                                    ظرفیت کلاس :{toFarsiNumber(course.capacity)}
                                  </Box>
                                </Typography>
                              </div>
                            </div>
                          </div>
                          <CardMedia
                            className={classes.cardMedia}
                            component="img"
                            image={course.course_cover}
                            title={course.sunject}
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              className="courseNamePlace"
                            >
                              <Box style={{ textAlign: "right" }}>
                                {course.name}
                              </Box>
                            </Typography>
                            {/*<Typography className="courseOwnerPlace" component="h4">*/}
                            {/*    مدرس: {course.owner_firstname + " " + course.owner_lastname}*/}
                            {/*</Typography>*/}

                            {/*<Typography className="courseCapacityPlace" component="h6">*/}
                            {/*     دوره:{" " + course.grade}*/}
                            {/*</Typography>*/}
                          </CardContent>
                          <Divider />
                          <Divider />
                          {/* <Divider />
                                            <Divider /> */}
                          <CardActions className={classes.cardActions}>
                            <ButtonGroup fullWidth>
                              {T ? (
                                <Button
                                  href={`/teacher_dashboard/added_courses/${course.id}`}
                                  className="toSeeButton"
                                  size="small"
                                  color="primary"
                                  variant="contained"
                                >
                                  <Typography variant="button">
                                    {" "}
                                    مشاهده
                                  </Typography>{" "}
                                </Button>
                              ) : (
                                <Button
                                  href={`/student_dashboard/added_courses/${course.id}`}
                                  className="toSeeButton"
                                  size="small"
                                  color="primary"
                                  variant="contained"
                                >
                                  <Typography variant="button">
                                    {" "}
                                    مشاهده
                                  </Typography>{" "}
                                </Button>
                              )}
                              <Divider
                                style={{ minWidth: "3px", maxWidth: "3px" }}
                              />
                              {/* <Button size="small" color="primary"
                                                        onClick={() => copyToClipboard(course.id)}
                                                        action={localStorage.setItem('id', course.id)}
                                                        endIcon={<ShareIcon />}
                                                        variant='contained'
                                                        className="toSeeButton"
                                                    >
                                                        <Typography variant='button'> 
                                                        اشتراک
                                                        </Typography>  </Button> */}
                            </ButtonGroup>
                            <Snackbar
                              className={classes.snackBAr}
                              dir="rtl"
                              open={open}
                              autoHideDuration={1500}
                              onClose={handleClose}
                            >
                              <Alert
                                className={classes.alertText}
                                onClose={handleClose}
                                severity="success"
                                variant="filled"
                              >
                                لینک کلاس کپی شد
                              </Alert>
                            </Snackbar>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                </div>
              ) : (
                <div>
                  <Grid
                    className="cardSpacing"
                    item
                    key="1"
                    xs={12}
                    sm={false}
                    md={false}
                    style={{
                      marginBottom: "10px",
                      marginTop: "2px",
                    }}
                  >
                    <Card className="layout1">
                      <div
                        style={{
                          display: "flex",
                          margin: "10px",
                          wordBreak: "all-break",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={40}
                          height={40}
                          style={{ marginRight: "10px", marginTop: "4px" }}
                        />
                        <div
                          style={{
                            marginRight: "8px",
                            alignSelf: "center",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={80}
                              style={{
                                alignSelf: "flex-start",
                              }}
                            />
                          </div>
                          <div style={{ display: "flex", marginTop: "4px" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={80}
                              style={{
                                alignSelf: "flex-start",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Skeleton animation="wave" variant="rect" height={100} />
                      <CardContent>
                        <Skeleton
                          animation="wave"
                          height={40}
                          width="100%"
                          style={{
                            // marginRight: "8px",
                            // marginLeft: "8px",
                            alignSelf: "center",
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    className="cardSpacing"
                    item
                    key="2"
                    xs={12}
                    sm={false}
                    md={false}
                    style={{
                      marginBottom: "10px",
                      marginTop: "2px",
                    }}
                  >
                    <Card className="layout1">
                      <div
                        style={{
                          display: "flex",
                          margin: "10px",
                          wordBreak: "all-break",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={40}
                          height={40}
                          style={{ marginRight: "10px", marginTop: "4px" }}
                        />
                        <div
                          style={{
                            marginRight: "8px",
                            alignSelf: "center",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={80}
                              style={{
                                alignSelf: "flex-start",
                              }}
                            />
                          </div>
                          <div style={{ display: "flex", marginTop: "4px" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={80}
                              style={{
                                alignSelf: "flex-start",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Skeleton animation="wave" variant="rect" height={100} />
                      <CardContent>
                        <Skeleton
                          animation="wave"
                          height={40}
                          width="100%"
                          style={{
                            // marginRight: "8px",
                            // marginLeft: "8px",
                            alignSelf: "center",
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid
                    className="cardSpacing"
                    item
                    key="3"
                    xs={12}
                    sm={false}
                    md={false}
                    style={{
                      marginBottom: "10px",
                      marginTop: "2px",
                    }}
                  >
                    <Card className="layout1">
                      <div
                        style={{
                          display: "flex",
                          margin: "10px",
                          wordBreak: "all-break",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={40}
                          height={40}
                          style={{ marginRight: "10px", marginTop: "4px" }}
                        />
                        <div
                          style={{
                            marginRight: "8px",
                            alignSelf: "center",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={80}
                              style={{
                                alignSelf: "flex-start",
                              }}
                            />
                          </div>
                          <div style={{ display: "flex", marginTop: "4px" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={80}
                              style={{
                                alignSelf: "flex-start",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Skeleton animation="wave" variant="rect" height={100} />
                      <CardContent>
                        <Skeleton
                          animation="wave"
                          height={40}
                          width="100%"
                          style={{
                            // marginRight: "8px",
                            // marginLeft: "8px",
                            alignSelf: "center",
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </div>
              )}
            </div>
          </main>
        </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
};
export default Suggestedcourse;
