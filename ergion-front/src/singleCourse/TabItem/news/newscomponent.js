import React, { useEffect, useRef, useState } from "react";
import "./news.scss";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import {
  makeStyles,
  Theme,
  createStyles,
  StylesProvider,
  ThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Carousel from "../../../Carousel/Carousel";
import axios from "axios";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CssBaseline from "@material-ui/core/CssBaseline";
import { create } from "jss";
import rtl from "jss-rtl";
import Divider from "@material-ui/core/Divider";
import Axios from "axios";
import InputBase from "@material-ui/core/InputBase";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import Paper from "@material-ui/core/Paper";

import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import Title from "../../Title";
import { Update } from "@material-ui/icons";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "IRANSans",
      // minWidth: '30%',
      justifyContent: "center",

      alignItems: "center",
      textAlign: "center",
      width: "100% ",
      margin: theme.spacing(2),
    },
    root1: {
      fontFamily: "IRANSans",
      // minWidth: '30%',
      justifyContent: "center",
      // backgroundColor: "skyblue",
      alignItems: "center",
      textAlign: "center",
      width: "65% !important",
    },
    media: {
      // paddingTop: "30%",
      // backgroundColor: 'red'
      // height: 400,
    },
    title: {
      fontFamily: "IRANSans",
      // height: 50
    },
    tab: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    spacing: {
      marginTop: "30px",
      // marginBottom: "30px",
    },
    test: {
      minWidth: 327,
      maxWidth: 327,
      maxHeight: 300,
      minHeight: 300,
    },
    reply: {
      fontFamily: "IRANSans",
      display: "flex",
      flexWrap: "wrap",
    },
  })
);

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const PostPage = (props) => {
  let [width, setWidth] = useState(getWidth());
  const classes = useStyles();
  const [isRed, setIsRed] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [isMultiImg, setisMultiImg] = useState(true);
  const [isVideo, setIsVideo] = useState(false);
  const [isPdf, setIsPdf] = useState(false);

  const [openreply, setopenreply] = React.useState(false);
  const [T, setT] = React.useState(false);
  const [S, setS] = React.useState(false);
  const [update, setupdate] = React.useState([]);
  const [updatefiles, setupdatefiles] = React.useState([
	  
  ]);
  const [liked, setliked] = React.useState([false]);
  const [likes, setlikes] = React.useState(0);
  const [ownerid, setownerid] = React.useState(0);

  const [isowner, setisowner] = React.useState(false);
  const likehandler = () => {
    axios
      .put(
        "http://127.0.0.1:8000/api/course/post-likes/",
        {
          post_id: props.update.id,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setIsRed(!isRed);
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    setownerid(props.update.instructor);
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      if (JSON.parse(localStorage.getItem("user"))["role"] === "T") {
        setT(true);

        if (JSON.parse(localStorage.getItem("user"))["id"] === ownerid) {
          setisowner(true);
        }
      } else setS(true);

      // setTimeout(() => {
      const promise = Axios.get(
        "http://127.0.0.1:8000/api/course/post-files/",
        {
          params: { post_id: props.update.post_id },
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      );
      promise
        .then((resp) => {
			console.log(resp.data)
          setupdate(resp.data);

          // update.files.map((file)=>{
          // 	setupdatefiles([file.file]);
          // })
        })
        .catch((error) => console.log(error));
      const promise1 = axios.get(
        "http://127.0.0.1:8000/api/course/news-details/",
        {
          params: { news_id: props.update.id },
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      );
      promise1.then((response) => {
        setliked(response.data.liked);
        setlikes(response.data.likes);
      });
      // }, 1000)
    }
  }, []);

  const handleopenreply = () => {
    setopenreply(!openreply);
  };

  let slider = useRef();

  const fileNameExtractor = (src) => {
    const lastIndexOfSlash = String(src).lastIndexOf("/");
    const lastIndexOfDot = String(src).lastIndexOf(".");
    let name = String(src).substring(lastIndexOfSlash + 1);
    const type = String(src).substring(lastIndexOfDot);

    if (name.length > 15) {
      name = name.substring(0, 15) + type;
    }
    return type;
  };

  const imgDetecter = (src) => {
    if (
      fileNameExtractor(src) === ".jpg" ||
      fileNameExtractor(src) === ".jpeg" ||
      fileNameExtractor(src) === ".png"
    ) {
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      <StylesProvider jss={jss}>
        <CssBaseline />

        <div className="post-page-main">
          <Card className={classes.root} dir="rtl">
            <CardHeader
              className={classes.title}
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <img
                    src={props.update.instructor_profile_picture}
                    alt="tessacehr"
                    minWidth="50"
                    height="50"
                    poster="R"
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Typography className="instructor" variant="h6" color="primary">
                  {props.update.instructor_firstname}{" "}
                  {props.update.instructor_lastname}/{props.course.name}
                </Typography>
              }
              subheader={
                <Typography className="date" component="h6">
                  {props.update.created_at}{" "}
                </Typography>
              }
            />

            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="aboutPost"
              >
                {props.update.description}
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.media}
              // image={img}
              title="news-media"
            >
              {/* {
										isMultiImg ? (slier) : ''
									} */}
              {update.length>0&&(<Carousel files={update} />)}
              {/* {isPdf ? <iframe src={test[2].media} height="400" width="100%" /> : ''} */}
              {/* {isImg ? <img src={} alt="test" width="35%" height="280" /> : ''}
									{isVideo ? (
										<video width="100%" height="400" controls>
											<source src={vid} type="video/mp4" />
											Sorry, your browser doesn't support embedded videos.
										</video>
									) : (
										''
									)} */}
            </CardMedia>
            <CardActions className="post-footer" dir="ltr">
              <div className="icon-footer">
                <IconButton className="comment-icon">
                  <ShareIcon />
                </IconButton>
                <span className="span-footer" />
                <div className="share-like-icon">
                  <IconButton onClick={handleopenreply}>
                    <CommentIcon />
                  </IconButton>
                  {S && (
                    <IconButton onClick={likehandler}>
                      {isRed ? (
                        <FavoriteIcon style={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  )}
                  {T && <FavoriteIcon style={{ color: "red" }} />}
                  <Typography>{likes}</Typography>
                </div>
              </div>
            </CardActions>
            {openreply && (
              <Paper component="form" className={classes.root}>
                <Grid container>
                  <Grid container item>
                    <InputBase
                      className={classes.reply}
                      multiline={true}
                      fullWidth={true}
                      placeholder="نظر خود را وارد کنید."
                      inputProps={{ "aria-label": "search google maps" }}
                    />
                  </Grid>
                  <Grid item justify="flex-end">
                    <IconButton
                      className={classes.iconButton}
                      aria-label="menu"
                    >
                      <SendOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Card>
        </div>
      </StylesProvider>
    </React.Fragment>
  );
};

export default PostPage;
