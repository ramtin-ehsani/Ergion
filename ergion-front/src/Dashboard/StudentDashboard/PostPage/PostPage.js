import React, { useEffect, useRef, useState } from "react";
import "./PostPage.scss";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import {
  makeStyles,
  createStyles,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import human from "@jacobmarshall/human-time";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CssBaseline from "@material-ui/core/CssBaseline";
import { create } from "jss";
import rtl from "jss-rtl";
import Divider from "@material-ui/core/Divider";
import Comments from "./Comment/Comments";
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Carousel from "../../../Carousel/Carousel";
import { SentimentDissatisfied } from "@material-ui/icons";
import { Button, List } from "@material-ui/core";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      fontFamily: "IRANSans",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      width: "75% !important",
    },
    root1: {
      fontFamily: "IRANSans",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      width: "75% !important",
    },
    media: {},
    title: {
      fontFamily: "IRANSans",
    },
    tab: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    spacing: {
      marginTop: "30px",
    },
    test: {},
    process: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(25),
      },
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      width: "75% !important",
      marginTop: 100,
    },
    alertText: {
      display: "flex",
      fontSize: 20,
      fontFamily: "IRANSans",
      margin: 25,
    },
    snackBAr: {},
  })
);

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const PostPage = () => {
  let [width, setWidth] = useState(getWidth());
  const classes = useStyles();
  const [isRed, setIsRed] = useState();
  const [isImg, setIsImg] = useState(false);
  const [isMultiImg, setisMultiImg] = useState(true);
  const [isVideo, setIsVideo] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const [postPage, setPostPage] = useState(null);
  const [imgNumber, setImgNumber] = useState(4);
  const [open, setOpen] = useState(false);
  const [imglist, setImgList] = useState([]);

  const toFarsiNumber = (n) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  };

  const handleDownload = (file) => {
    axios({
      url: file,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileNameExtractorName(file));
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fileNameExtractorName = (src) => {
    const lastIndexOfSlash = String(src).lastIndexOf("/");
    const lastIndexOfDot = String(src).lastIndexOf(".");
    let name = String(src).substring(lastIndexOfSlash + 1);
    const type = String(src).substring(lastIndexOfDot);

    if (name.length > 15) {
      name = name.substring(0, 15) + type;
    }
    return name;
  };

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

  function copyToClipboard(id) {
    let textField = document.createElement("textarea");
    textField.innerText = "http://app.classinium.ir/student_dashboard/post/" + id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setOpen(true);
  }

  function imgDetecter(src) {
    if (
      fileNameExtractor(src) === ".jpg" ||
      fileNameExtractor(src) === ".jpeg" ||
      fileNameExtractor(src) === ".png"
    ) {
      return true;
    }
    return false;
  }

  function CheckFileHandler(props) {
    const src = props.src;
    console.log(src);
    // console.log(list)
    // console.log(listItems.file)
    if (fileNameExtractor(src) === ".mp4") {
      console.log(src);

      return (
        <video width="100%" height="400" controls>
          <source src={src} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      );
    }
    // else if(fileNameExtractor(src)=== '.pdf') {
    // 	console.log(src)
    // 	return (
    // 		<Button color="primary" variant="contained" onClick={() => handleDownload(src)}> PDF </Button>
    // 	)
    // }
    return null;

    // if (imglist.length > 0 ){
    // 	return(
    // <Slider
    // 	ref={(c) => (slider = c)}
    // 	{...(imgNumber > 3 ? { ...settings } : { ...settingsLessThan3Mode })}
    // 	dir="rtl"
    // >
    // 	{imglist.map((item) => (
    // 		<div
    // 			style={{
    // 				width: '100%'
    // 			}}
    // 		>
    // 			<img
    // 				className={classes.test}
    // 				src={item}
    // 				alt="test"
    // 				width="100%"
    // 				height="325"
    // 				style={{ backgroundColor: 'red' }}
    // 			/>
    // 		</div>
    // 	))}
    // </Slider>
    // 	);
    // } else
    // 	return null;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let slider = useRef();

  const handleLikeClick = (id) => {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem("api_key")}` },
    };

    axios
      .put(
        "https://api.classinium.ir/api/course/post-likes/",
        {
          post_id: id,
        },
        config
      )
      .then((response) => {
        const stateItems = {
          id: id,
          isLiked: response.data.liked,
        };

        console.log(response.data);
        setIsRed(stateItems);
      });

    // const stateItems = {
    //   id: id,
    //   isLiked: !postPage.isLiked,
    // };
    // setIsRed(stateItems);
  };

  const settings = {
    dots: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    initialSlide: 3,

    // autoplay: true,
    // autoplaySpeed: 2500,
    rtl: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const settingsLessThan3Mode = {
    dots: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    // autoplay: true,
    autoplaySpeed: 2500,
    rtl: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  function sli_der(file) {
    return (
      <Slider
        ref={(c) => (slider = c)}
        {...(imgNumber > 3 ? { ...settings } : { ...settingsLessThan3Mode })}
        dir="rtl"
      >
        {file.map((item) => (
          <div
            style={{
              width: "100%",
            }}
          >
            <img
              className={classes.test}
              src={item}
              alt="test"
              width="100%"
              height="325"
              style={{ backgroundColor: "red" }}
            />
          </div>
        ))}
      </Slider>
    );
  }

  const config = {
    headers: { Authorization: `Token ${localStorage.getItem("api_key")}` },
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(getWidth());
    });
    const update_id = window.location.href.split("/")[5];
    console.log(update_id);
    axios
      .get(
        `https://api.classinium.ir/api/course/news-details/?news_id=${update_id}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        setPostPage(response.data);
        const initialValue = {
          id: update_id,
          isLiked: response.data.liked,
        };
        setIsRed(initialValue);
      });
    console.log(update_id);
  }, []);

  if (postPage !== null) {
    return (
      <React.Fragment>
        <StylesProvider jss={jss}>
          <CssBaseline />

          <div
            style={
              width > 1279
                ? {
                    minWidth: width - 247,
                    maxWidth: width - 247,
                    backgroundColor: "none",
                  }
                : { backgroundColor: "none", width: "100%" }
            }
            className="post-page-main"
          >
            <Grid container item className={classes.spacing}>
              <Grid
                container
                item={true}
                className={classes.spacing}
                style={{
                  dir: "rtl",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  backgroundColor: "none",
                }}
              >
                <Card className={classes.root} dir="rtl">
                  <CardHeader
                    className={classes.title}
                    avatar={
                      <Avatar
                        src={postPage.instructor_profile_picture}
                        aria-label="instructor"
                        // imgName={classes.avatar}
                      >
                        {postPage.instructor_firstname.split("")[0]}
                      </Avatar>
                    }
                    // action={
                    // 	<IconButton aria-label="settings">
                    // 		<MoreVertIcon />
                    // 	</IconButton>
                    // }
                    title={
                      <Typography className="instructor" component="h4">
                        {postPage.instructor_firstname +
                          " " +
                          postPage.instructor_lastname}
                      </Typography>
                    }
                    subheader={
                      <Typography className="date" component="h6">
                        {toFarsiNumber(
                          human(new Date(postPage.creation_time))
                            .replace("years", "سال")
                            .replace("year", "سال")
                            .replace("months", "ماه")
                            .replace("month", "ماه")
                            .replace("weeks", "هفته")
                            .replace("week", "هفته")
                            .replace("hours", "ساعت")
                            .replace("hour", "ساعت")
                            .replace("minutes", "دقیقه")
                            .replace("minute", "دقیقه")
                            .replace("days", "روز")
                            .replace("day", "روز")
                            .replace("seconds", "ثانیه")
                            .replace("second", "ثانیه")
                            .replace("ago", "پیش")
                        )}
                      </Typography>
                    }
                  />
                  <Divider />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className="aboutPost"
                      style={{ wordBreak: "normal" }}
                    >
                      {postPage.description}
                    </Typography>
                    {/* <button onClick={() => console.log(postPage.files)}>fff</button> */}
                  </CardContent>
                  <CardMedia
                    className={classes.media}
                    title="news-media"
                    dir="rtl"
                  >
                    {/* {
                      <Slider
                        ref={(c) => (slider = c)}
                        {...(imgNumber > 3
                          ? { ...settings }
                          : { ...settingsLessThan3Mode })}
                        dir="rtl"
                      >
                        {postPage.files.map((test) => (
                          <div dir="rtl">
                            {imgDetecter(test.file) && (
                              <div
                                style={{
                                  width: "100%",
                                }}
                                dir="rtl"
                              >
                                <img
                                  className={classes.test}
                                  src={test.file}
                                  alt="test"
                                  width="100%"
                                  height="325"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </Slider>
                    } */}
                    {postPage.files.length > 0 && (
                      <Carousel files={postPage.files} />
                    )}

                    {/* {postPage.files.map((item) => (
                      <CheckFileHandler src={item.file} />
                    ))} */}
                  </CardMedia>
                  <CardActions className="post-footer" dir="ltr">
                    <div className="icon-footer">
                      <IconButton
                        className="comment-icon"
                        onClick={() => copyToClipboard(postPage.id)}
                        action={localStorage.setItem("id", postPage.id)}
                      >
                        <ShareIcon />
                      </IconButton>
                      <Snackbar
                        className={classes.snackBAr}
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
                          لینک خبر کپی شد{" "}
                        </Alert>
                      </Snackbar>
                      <span className="span-footer" />
                      <div className="share-like-icon">
                        <IconButton>
                          <CommentIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleLikeClick(postPage.post_id)}
                        >
                          {isRed && isRed.isLiked ? (
                            <FavoriteIcon style={{ color: "red" }} />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                      </div>
                    </div>
                  </CardActions>
                </Card>
                <div className={classes.root1} dir="rtl">
                  <Comments postId={postPage.post_id} />
                </div>
              </Grid>
            </Grid>
          </div>
        </StylesProvider>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <StylesProvider jss={jss}>
          <CssBaseline />

          <div
            style={
              width > 1279
                ? {
                    minWidth: width - 247,
                    maxWidth: width - 247,
                    backgroundColor: "none",
                  }
                : { backgroundColor: "none", width: "100%" }
            }
            className="post-page-main"
          >
            <Grid container item className={classes.spacing}>
              <Grid
                container
                item={true}
                className={classes.spacing}
                style={{
                  dir: "rtl",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  backgroundColor: "none",
                }}
              >
                <div className={classes.process}>
                  <CircularProgress />
                </div>
              </Grid>
            </Grid>
          </div>
        </StylesProvider>
      </React.Fragment>
    );
  }
};

export default PostPage;
