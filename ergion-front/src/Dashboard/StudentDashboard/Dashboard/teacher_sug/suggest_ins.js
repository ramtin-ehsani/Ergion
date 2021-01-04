import React, { useEffect, useState } from "react";
import "./suggestedteacher.scss";
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
import Alert from "@material-ui/lab/Alert";
import { ButtonGroup, CardActionArea } from "@material-ui/core";
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

const Suggestedins = () => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [isEmpty, setEmpty] = React.useState(false);

  const [courses, setCourses] = useState(null);
  const [S, setS] = React.useState(false);
  const [open, setOpen] = useState(false);

  const config = {
    headers: { Authorization: `Token ${localStorage.getItem("api_key")}` },
  };

  function copyToClipboard(id) {
    let textField = document.createElement("textarea");
    textField.innerText = "http://localhost:3000/course/" + id;
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
    return "http://localhost:3000/course/" + id;
  }

  useEffect(() => {
    const showAllAPI =
      "http://130.185.78.113:8000/api/student/suggested-instructors/";

    if (JSON.parse(localStorage.getItem("user"))["role"] === "S") {
      setS(true);
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
  }, []);

  if (S) {
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
              <Card className="layout0">
                <CardHeader
                  title={
                    <Typography className="namePlace" component="h4">
                      اساتید پیشنهادی
                    </Typography>
                  }
                />
                <CardContent className="cc">
                  <Grid className="cardSpacing" item xs={12} sm={false} md={false}>
                    {/*// <Grid className="cardSpacing" item key={course.id}>*/}
                    <Card className="layout1">
                      {courses &&
                        courses.map((course) => (
                          <div>
                            <CardActionArea
                              onClick={() =>
                                (window.location = `/student_dashboard/public-profile/${course.id}`)
                              }
                            >
                              {/* <Button href={`/student_dashboard/public-profile/${course.id}`}> */}
                              <CardHeader
                                className="layout2"
                                title={
                                  <div>
                                    <Typography
                                      className="namePlace"
                                      component="h4"
                                    >
                                      {course.firstname + " " + course.lastname}
                                    </Typography>
                                    <Typography
                                      className="idPlace"
                                      component="h4"
                                    >
                                      {course.email}
                                    </Typography>{" "}
                                  </div>
                                }
                                avatar={
                                  <Avatar
                                    src={course.profile_picture}
                                    aria-label="recipe"
                                    className={classes.avatar}
                                  >
                                    {course.firstname.split("")[0]}
                                  </Avatar>
                                }
                              />
                              {/* </Button> */}
                            </CardActionArea>

                            <Divider />
                            {/* <Divider />
                                            <Divider />
                                            <Divider /> */}
                          </div>
                        ))}
                    </Card>
                  </Grid>
                </CardContent>
              </Card>
            </main>
          </ThemeProvider>
        </StylesProvider>
      </React.Fragment>
    );
  } else return null;
};
export default Suggestedins;
