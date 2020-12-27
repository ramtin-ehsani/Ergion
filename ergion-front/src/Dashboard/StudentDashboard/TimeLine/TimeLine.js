import React from "react";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ReplyIcon from "@material-ui/icons/Reply";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SendIcon from "@material-ui/icons/Send";
import TableHead from "@material-ui/core/TableHead";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Carousel from "../../../Carousel/Carousel";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import rtl from "jss-rtl";
import { Virtuoso } from "react-virtuoso";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import CommentIcon from "@material-ui/icons/Comment";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Link from "@material-ui/core/Link";
import DialogTitle from "@material-ui/core/DialogTitle";
import ShareIcon from "@material-ui/icons/Share";
import axios from "axios";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Avatar } from "@material-ui/core";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import ImageIcon from "@material-ui/icons/Image";
import {
  AttachFile,
  Description,
  PictureAsPdf,
  MovieCreationOutlined,
} from "@material-ui/icons";
import human from "@jacobmarshall/human-time";
import "./TimeLine.scss";
import {
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  InputBase,
  Collapse,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";

const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(10,10,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 0, 0,.2)",
      display: "none",
    },
  },
  root: {
    height: "100vh",
    width: "100%",
    // flexGrow: 1,
  },
  veticalDots: {
    color: "#000",
    width: 35,
    height: 35,
  },
  paperStyle: {
    marginBottom: theme.spacing(2),
  },
  alertStyle: {
    display: "flex",
    font: "20",
  },
  mediaCardPaperStyle: {
    borderRadius: 8,
    boxShadow: 20,
  },
  tabFont: {
    fontSize: 16,
  },
});

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
      backgroundColor: "#fff",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "#000",
      },
    },
  },
}))(MenuItem);

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif',
  },
  direction: "rtl",
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover,
    // },
  },
}))(TableRow);
function Alert(props) {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <MuiAlert elevation={6} variant="filled" {...props} />
      </ThemeProvider>
    </StylesProvider>
  );
}

class TimeLine extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      shareDialogOpen: false,
      link: "",
      snackBarOpen: false,
      snackBarMessage: "",
      page: 1,
      loadingMore: false,
      hasNext: false,
    };
  }

  HandlePreviewIcon = (props) => {
    const { src } = props;

    const type = this.fileNameExtractor(src);

    if (type.includes("mp4")) return <MovieCreationOutlined color="primary" />;
    if (type.includes("jpg") || type.includes("jpeg") || type.includes("png")) {
      return <ImageIcon color="primary" />;
    }
    if (type.includes("zip")) return <Description color="primary" />;

    if (type.includes("pdf")) return <PictureAsPdf color="primary" />;

    return <AttachFile color="primary" />;
  };

  openShareDialog = (e, index, isOpen, shareLink) => {
    this.handleAnchorEl(e, index, isOpen);
    this.setState({ link: shareLink, shareDialogOpen: true });
  };

  loadMore = () => {
    if (this.state.hasNext) {
      this.setState({ loadingMore: true });
      this.getValues(this.state.page);
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.getValues(this.state.page);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

  config = {
    headers: { Authorization: `Token ${localStorage.getItem("api_key")}` },
  };

  getValues = (page) => {
    axios
      .get("http://127.0.0.1:8000/api/student/posts/?page=" + page, this.config)
      .then((response) => {
        // handle success
        const { list } = this.state;
        // console.log(response.data);

        response.data.data.map((post) => {
          const comments = [];
          post.comments.map((comment) => {
            comment.isReplyOpen = false;
            comment.replyRef = "";
            comments.push(comment);
          });
          const postObject = {
            id: post.id,
            name: post.name,
            description: post.description,
            instructor_firstName: post.instructor_firstname,
            instructor_lastName: post.instructor_lastname,
            instructor_profilePic: post.instructor_profile_picture,
            postUrl: post.post_url,
            course_url: post.course_url,
            course_name: post.course_name,
            files: post.files,
            liked: post.liked,
            commentRef: "",
            likes_count: post.likes_count,
            time: post.creation_time,
            comments_count: post.comments_count,
            comments: comments,
            type: post.post_type,
            anchorEl: false,
          };
          list.push(postObject);
        });

        if (this._isMounted) {
          this.setState({
            list,
            loading: false,
            loadingMore: false,
            hasNext: response.data.has_next,
            page: this.state.page + 1,
          });
        }
      })
      .catch((error) => {
        // handle error
        this.setState({ loading: false });
        console.log(error);
      });
  };

  toFarsiNumber = (n) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  };

  font = 28;

  handleTimelineLike = (index, id) => {
    const listItem = {
      ...this.state.list[index],
    };
    if (listItem.liked) {
      listItem.likes_count = listItem.likes_count - 1;
    } else {
      listItem.likes_count = listItem.likes_count + 1;
    }
    listItem.liked = !listItem.liked;

    const list = [...this.state.list];
    list[index] = listItem;
    this.setState({ list: list });

    axios
      .put(
        "http://127.0.0.1:8000/api/course/post-likes/",
        {
          post_id: id,
        },
        this.config
      )
      .catch((error) => {
        console.log(error);
        const listItem = {
          ...this.state.list[index],
        };
        if (listItem.liked) {
          listItem.likes_count = listItem.likes_count - 1;
        } else {
          listItem.likes_count = listItem.likes_count + 1;
        }
        listItem.liked = !listItem.liked;
        const list = [...this.state.list];
        list[index] = listItem;
        this.setState({ list: list });
      });
  };

  handleAnchorEl = (event, index, isOpen) => {
    const results = this.state.list.map((item, idx) => {
      if (index === idx) {
        if (isOpen) {
          return {
            ...item,
            anchorEl: event.currentTarget,
          };
        } else {
          return {
            ...item,
            anchorEl: null,
          };
        }
      }
      return item;
    });
    this.setState({ list: results });
  };

  handlePostReply = (index, commentIndex, commentID, text) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/course/comments/",
        {
          parent_comment_id: commentID,
          comment_text: text,
        },
        this.config
      )
      .then((res) => {
        const listItem = {
          ...this.state.list[index],
        };
        const comm = listItem.comments;
        comm.map((c, pos) => {
          if (commentIndex === pos) {
            // if (c.replies.length < 3) {
            c.replies.push(res.data);
            // }
          }
        });
        const list = [...this.state.list];
        list[index] = listItem;
        this.setState({
          list: list,
          snackBarOpen: true,
          snackBarMessage: "پیام شما فرستاده شد",
        });
        this.replyTextHandler(index, commentIndex, "");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handlePostComment = (index, timelineID, text) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/course/comments/",
        {
          post_id: timelineID,
          comment_text: text,
        },
        this.config
      )
      .then((res) => {
        const listItem = {
          ...this.state.list[index],
        };
        const commentObject=res.data
        commentObject.isReplyOpen = false;
        commentObject.replyRef = "";
        if (listItem.comments.length < 3) {
          listItem.comments.push(commentObject);
        }
        listItem.comments_count = listItem.comments_count + 1;
        const list = [...this.state.list];
        list[index] = listItem;
        this.setState({
          list: list,
          snackBarOpen: true,
          snackBarMessage: "نظر شما فرستاده شد",
        });
        this.commentTextHandler(index, "");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleCommentTextOnChange = (e, ind) => {
    this.commentTextHandler(ind, e.target.value);
  };

  handleReplyTextOnChange = (e, ind, commIndex) => {
    this.replyTextHandler(ind, commIndex, e.target.value);
  };

  commentTextHandler = (index, value) => {
    const results = this.state.list.map((item, idx) => {
      if (index === idx) {
        return {
          ...item,
          commentRef: value,
        };
      }
      return item;
    });
    this.setState({ list: results });
  };

  replyOpener = (index, commentIndex) => {
    const results = this.state.list.map((item, idx) => {
      if (index === idx) {
        const comments = item.comments;
        comments.map((comment, indx) => {
          if (commentIndex === indx) {
            comment.isReplyOpen = !comment.isReplyOpen;
          }
        });
        return {
          ...item,
          comments: comments,
        };
      }
      return item;
    });
    this.setState({ list: results });
  };

  replyTextHandler = (index, commentIndex, value) => {
    const results = this.state.list.map((item, idx) => {
      if (index === idx) {
        const comments = item.comments;
        comments.map((comment, indx) => {
          if (commentIndex === indx) {
            comment.replyRef = value;
          }
        });
        return {
          ...item,
          comments: comments,
        };
      }
      return item;
    });
    this.setState({ list: results });
  };

  handleClickLike = (Index, commentIndex) => {
    this.handleLikeResponse(Index, commentIndex);
    axios
      .put(
        "http://127.0.0.1:8000/api/course/comment-likes/",
        {
          comment_id: this.state.list[Index].comments[commentIndex].id,
        },
        this.config
      )
      .catch(() => {
        this.handleLikeResponse(Index, commentIndex);
      });
  };

  handleLikeResponse = (Index, commentIndex) => {
    const results = this.state.list.map((item, idx) => {
      if (Index === idx) {
        const comments = item.comments;
        comments.map((comment, idxx) => {
          if (commentIndex === idxx) {
            comment.liked = !comment.liked;
          }
        });
        return {
          ...item,
          comments: comments,
        };
      }
      return item;
    });
    this.setState({ list: results });
  };

  handleDownload = (file) => {
    axios({
      url: file,
      method: "GET",
      responseType: "blob", // important
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", this.fileNameExtractor(file));
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fileNameExtractor = (src) => {
    const lastIndexOfSlash = String(src).lastIndexOf("/");
    const lastIndexOfDot = String(src).lastIndexOf(".");
    let name = String(src).substring(lastIndexOfSlash + 1);
    const type = String(src).substring(lastIndexOfDot);

    if (name.length > 15) {
      name = name.substring(0, 15) + type;
    }
    return name;
  };

  copyLink = () => {
    navigator.clipboard.writeText(this.state.link);
    this.setState({ snackBarOpen: true, snackBarMessage: "کپی شد" });
  };

  onSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

  dialogOnclose = () => {
    this.setState({ shareDialogOpen: false });
  };

  

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Snackbar
          open={this.state.snackBarOpen}
          autoHideDuration={2000}
          onClose={this.onSnackBarClose}
          dir="rtl"
        >
          <Alert
            onClose={this.onSnackBarClose}
            severity="success"
            className={classes.alertStyle}
          >
            {this.state.snackBarMessage}
          </Alert>
        </Snackbar>

        <Dialog
          open={this.state.shareDialogOpen}
          onClose={this.dialogOnclose}
          aria-labelledby="share-dialog"
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle id="share-dialog" dir="rtl">
            اشتراک گذاری
          </DialogTitle>
          <DialogContent>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel htmlFor="outlined-adornment-link">لینک</InputLabel>
              <OutlinedInput
                id="outlined-adornment-link"
                label="لینک"
                defaultValue={this.state.link}
                disabled={true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={this.copyLink} edge="end">
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
              onClick={this.dialogOnclose}
              style={{ margin: "8px" }}
            >
              لغو
            </Button>
          </DialogActions>
        </Dialog>

        <div>
          {this.state.loading ? (
            <div>
              <div className={classes.paperStyle} style={{ padding: "8px" }}>
                <Paper
                  className={classes.mediaCardPaperStyle}
                  elevation={3}
                  style={{
                    marginBottom: "5px",
                    padding: "8px",
                    // marginTop: "5px",
                    borderRadius: 8,
                  }}
                >
                  <Grid container dir="rtl" spacing={2}>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      style={{
                        padding: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={60}
                          height={60}
                          style={{ marginRight: "10px" }}
                        />
                        <div>
                          <div style={{ display: "flex" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={220}
                              style={{ marginBottom: 6 }}
                              style={{
                                marginRight: "12px",
                                alignSelf: "flex-start",
                              }}
                            />
                          </div>
                          <div style={{ display: "flex" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={200}
                              style={{
                                alignSelf: "flex-start",
                                marginTop: "20px",
                                marginRight: "12px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid md={12} lg={12} sm={12} item xs={12}>
                      <Divider
                        style={{
                          marginLeft: "-8px",
                          marginRight: "-8px",
                        }}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={180}
                        style={{ margin: "10px" }}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={12}
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ padding: "20px" }}
                    >
                      <Skeleton
                        animation="wave"
                        height={20}
                        width="100%"
                        style={{ marginBottom: "10px" }}
                      />
                      <Skeleton animation="wave" height={20} width="100%" />
                    </Grid>
                  </Grid>
                </Paper>
              </div>
              <div className={classes.paperStyle} style={{ padding: "8px" }}>
                <Paper
                  className={classes.mediaCardPaperStyle}
                  elevation={3}
                  style={{
                    marginBottom: "5px",
                    padding: "8px",
                    // marginTop: "5px",
                    borderRadius: 8,
                  }}
                >
                  <Grid container dir="rtl" spacing={2}>
                    <Grid
                      item
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                      style={{
                        padding: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <Skeleton
                          animation="wave"
                          variant="circle"
                          width={60}
                          height={60}
                          style={{ marginRight: "10px" }}
                        />
                        <div>
                          <div style={{ display: "flex" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={220}
                              style={{ marginBottom: 6 }}
                              style={{
                                marginRight: "12px",
                                alignSelf: "flex-start",
                              }}
                            />
                          </div>
                          <div style={{ display: "flex" }}>
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={200}
                              style={{
                                alignSelf: "flex-start",
                                marginTop: "20px",
                                marginRight: "12px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid md={12} lg={12} sm={12} item xs={12}>
                      <Divider
                        style={{
                          marginLeft: "-8px",
                          marginRight: "-8px",
                        }}
                      />
                    </Grid>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={180}
                        style={{ margin: "10px" }}
                      />
                    </Grid>

                    <Grid
                      item
                      lg={12}
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ padding: "20px" }}
                    >
                      <Skeleton
                        animation="wave"
                        height={20}
                        width="100%"
                        style={{ marginBottom: "10px" }}
                      />
                      <Skeleton animation="wave" height={20} width="100%" />
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </div>
          ) : (
            <div style={{ direction: "ltr" }}>
              {this.state.list.length > 0 ? (
                <Virtuoso
                  data={this.state.list}
                  // style={{ height: "calc(100vh - " + "40px" + ")" }}
                  style={{ height: "100vh" }}
                  // className='virtualWrapperHeight'
                  endReached={this.loadMore}
                  overscan={2000}
                  itemContent={
                    (index, timeline) => {
                      return (
                        <div
                          className={classes.paperStyle}
                          key={timeline.id}
                          style={{ padding: "8px" }}
                        >
                          <Paper
                            className={classes.mediaCardPaperStyle}
                            elevation={5}
                            style={{
                              marginBottom: "5px",
                              padding: "8px",
                              // marginTop: "5px",
                              borderRadius: 8,
                            }}
                          >
                            <Grid container dir="rtl">
                              <Grid
                                item
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                style={{
                                  padding: "16px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div style={{ display: "flex" }}>
                                  <Avatar
                                    src={timeline.instructor_profilePic}
                                    style={{ width: 60, height: 60 }}
                                  />
                                  <div>
                                    <div style={{ display: "flex" }}>
                                      <Typography
                                        style={{
                                          marginRight: "12px",
                                          alignSelf: "flex-start",
                                        }}
                                      >
                                        <Box
                                          fontSize={20}
                                          fontWeight="fontWeightBold"
                                        >
                                          {timeline.instructor_firstName +
                                            " " +
                                            timeline.instructor_lastName}
                                        </Box>
                                      </Typography>

                                      <Typography
                                        style={{
                                          marginRight: "8px",
                                          alignSelf: "flex-start",
                                          marginTop: "6px",
                                        }}
                                      >
                                        <Box
                                          fontSize={14}
                                          style={{ color: "grey" }}
                                        >
                                          {" . " +
                                            this.toFarsiNumber(
                                              human(new Date(timeline.time))
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
                                        </Box>
                                      </Typography>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                      <Typography
                                        style={{
                                          alignSelf: "flex-start",
                                          marginTop: "8px",
                                          marginRight: "12px",
                                        }}
                                      >
                                        <Box fontSize={18}>
                                          {timeline.type === 0 ? (
                                            <span>
                                              <OndemandVideoIcon
                                                color="primary"
                                                style={{
                                                  marginLeft: "4px",
                                                  marginBottom: "-8px",
                                                }}
                                              />
                                              جلسه ی{" "}
                                              <strong>
                                                <Link
                                                  href={
                                                    "/student_dashboard" +
                                                    timeline.postUrl
                                                  }
                                                >
                                                  {timeline.name}
                                                </Link>
                                              </strong>{" "}
                                              از دوره ی{" "}
                                              <strong>
                                                <Link
                                                  href={
                                                    "/student_dashboard" +
                                                    timeline.course_url.replace(
                                                      "course",
                                                      "added_courses"
                                                    )
                                                  }
                                                >
                                                  {timeline.course_name}
                                                </Link>
                                              </strong>{" "}
                                              منتشر شد.
                                            </span>
                                          ) : (
                                            <div style={{ display: "flex" }}>
                                              <AnnouncementIcon
                                                color="primary"
                                                style={{ marginLeft: "4px" }}
                                              />
                                              خبر
                                            </div>
                                          )}
                                        </Box>
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ alignSelf: "flex-start" }}>
                                  <IconButton
                                    component="span"
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    onClick={(e) =>
                                      this.handleAnchorEl(e, index, true)
                                    }
                                    className={classes.veticalDots}
                                  >
                                    <MoreHorizIcon />
                                  </IconButton>
                                  <StyledMenu
                                    id="customized-menu"
                                    anchorEl={timeline.anchorEl}
                                    keepMounted
                                    open={Boolean(timeline.anchorEl)}
                                    onClose={(e) =>
                                      this.handleAnchorEl(e, index, false)
                                    }
                                  >
                                    <StyledMenuItem
                                      onClick={() =>
                                        this.openShareDialog(
                                          1,
                                          index,
                                          false,
                                          "http://localhost:3000/student_dashboard" +
                                            timeline.postUrl
                                        )
                                      }
                                    >
                                      <ListItemIcon>
                                        <ShareIcon />
                                      </ListItemIcon>
                                      <ListItemText primary="اشتراک گذاری" />
                                    </StyledMenuItem>
                                  </StyledMenu>
                                </div>
                              </Grid>
                              <Grid md={12} lg={12} sm={12} item xs={12}>
                                <Divider
                                  style={{
                                    marginLeft: "-8px",
                                    marginRight: "-8px",
                                  }}
                                />
                              </Grid>
                              <Grid item md={12} lg={12} sm={12} xs={12}>
                                <div
                                  style={{
                                    padding: "16px",
                                    display: "flex",
                                    wordBreak: "break-all",
                                  }}
                                >
                                  <Typography>
                                    <Box fontSize={18}>
                                      {timeline.description !== ""
                                        ? timeline.description
                                        : "(توضیحی وجود ندارد)"}
                                    </Box>
                                  </Typography>
                                </div>
                              </Grid>

                              <Grid item md={12} lg={12} sm={12} xs={12}>
                                <Carousel files={timeline.files} />
                              </Grid>

                              <Grid item md={12} lg={12} sm={12} xs={12}>
                                {timeline.files.length > 0 ? (
                                  <div style={{ padding: "16px" }}>
                                    <Typography
                                      style={{
                                        display: "flex",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      <Box fontSize={18}>فایل ها :</Box>
                                    </Typography>

                                    <TableContainer dir="rtl" component={Paper}>
                                      <Table
                                        aria-label="customized table"
                                        dir="rtl"
                                      >
                                        <TableHead dir="rtl">
                                          <TableRow dir="rtl">
                                            <StyledTableCell align="center">
                                              آیکون
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                              اسم فایل
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                              حجم
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                              دانلود
                                            </StyledTableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {timeline.files.map(
                                            (tabFile, tabIndx) => (
                                              <StyledTableRow
                                                dir="rtl"
                                                key={tabFile.id}
                                              >
                                                <StyledTableCell align="center">
                                                  <this.HandlePreviewIcon
                                                    src={this.fileNameExtractor(
                                                      tabFile.file
                                                    )}
                                                  />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                  <Box>
                                                    {this.fileNameExtractor(
                                                      tabFile.file
                                                    )}
                                                  </Box>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                  <div dir="ltr">
                                                    <Box
                                                      style={{ color: "grey" }}
                                                      fontSize={14}
                                                    >
                                                      {this.bytesToSize(
                                                        tabFile.size
                                                      )}
                                                    </Box>
                                                  </div>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                  <IconButton
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() =>
                                                      this.handleDownload(
                                                        tabFile.file
                                                      )
                                                    }
                                                  >
                                                    <GetAppRoundedIcon />
                                                  </IconButton>
                                                </StyledTableCell>
                                              </StyledTableRow>
                                            )
                                          )}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Grid>

                              <Grid md={12} lg={12} sm={12} item xs={12}>
                                <Divider
                                  style={{
                                    marginLeft: "-8px",
                                    marginRight: "-8px",
                                  }}
                                />
                              </Grid>

                              <Grid
                                item
                                md={12}
                                lg={12}
                                sm={12}
                                style={{
                                  paddingRight: "16px",
                                  paddingLeft: "16px",
                                  paddingBottom: "4px",
                                  paddingTop: "4px",
                                }}
                                xs={12}
                              >
                                <div
                                  style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  <div style={{ display: "flex" }}>
                                    <div style={{ alignSelf: "center" }}>
                                      {timeline.liked ? (
                                        <Box
                                          style={{ color: "red" }}
                                          fontSize={14}
                                        >
                                          {this.toFarsiNumber(
                                            timeline.likes_count
                                          )}
                                        </Box>
                                      ) : (
                                        <Box
                                          style={{ color: "grey" }}
                                          fontSize={14}
                                        >
                                          {this.toFarsiNumber(
                                            timeline.likes_count
                                          )}
                                        </Box>
                                      )}
                                    </div>
                                    <IconButton
                                      onClick={() =>
                                        this.handleTimelineLike(
                                          index,
                                          timeline.id
                                        )
                                      }
                                    >
                                      {timeline.liked ? (
                                        <FavoriteIcon color="secondary" />
                                      ) : (
                                        <FavoriteBorderOutlinedIcon />
                                      )}
                                    </IconButton>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div style={{ alignSelf: "center" }}>
                                      <Box
                                        style={{
                                          color: "grey",
                                        }}
                                        fontSize={14}
                                      >
                                        {this.toFarsiNumber(
                                          timeline.comments_count
                                        )}
                                      </Box>
                                    </div>

                                    <IconButton
                                      href={
                                        "/student_dashboard" + timeline.postUrl
                                      }
                                    >
                                      <CommentIcon />
                                    </IconButton>
                                  </div>
                                  {/* <IconButton href={"/student_dashboard" + timeline.postUrl.replace('update', 'post')}
                                                          style={{ marginLeft: '5px', alignSelf: 'center' }}
                                                      >
                                                          <AssignmentIcon style={{ marginRight: '4px' }} />
                                                      </IconButton>
                                                      <IconButton href={"/student_dashboard" + timeline.course_url.replace('course', 'added_courses')}
                                                          style={{ marginRight: '5px', alignSelf: 'center' }}
                                                      >
                                                          <BallotIcon style={{ marginRight: '4px' }} />
                                                      </IconButton> */}
                                </div>
                              </Grid>
                              <Grid md={12} lg={12} sm={12} item xs={12}>
                                <Divider
                                  style={{
                                    marginLeft: "-8px",
                                    marginRight: "-8px",
                                  }}
                                />
                              </Grid>

                              <Grid item md={12} lg={12} sm={12} xs={12}>
                                <div
                                  style={{
                                    paddingRight: "16px",
                                    paddingLeft: "16px",
                                    paddingBottom: "16px",
                                    paddingTop: "4px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginRight: "-16px",
                                      marginLeft: "-16px",
                                    }}
                                  >
                                    {timeline.comments.length > 0 && (
                                      <div>
                                        <List component="div">
                                          {timeline.comments.map(
                                            (comment, commentIndex) => (
                                              <div key={comment.id}>
                                                <ListItem>
                                                  <ListItemAvatar>
                                                    <Avatar
                                                      alt="avatar"
                                                      src={
                                                        comment.profile_picture
                                                      }
                                                    />
                                                  </ListItemAvatar>
                                                  <ListItemText
                                                    style={{
                                                      textAlign: "right",
                                                    }}
                                                    primary={
                                                      <Typography>
                                                        {comment.user_firstname +
                                                          " " +
                                                          comment.user_lastname}
                                                      </Typography>
                                                    }
                                                    secondary={
                                                      <>
                                                        <Typography
                                                          dir="rtl"
                                                          component="span"
                                                          variant="body2"
                                                          color="textPrimary"
                                                          style={{
                                                            wordBreak:
                                                              "break-all",
                                                          }}
                                                        >
                                                          {comment.comment_text}
                                                        </Typography>
                                                      </>
                                                    }
                                                  ></ListItemText>
                                                  <ListItemIcon>
                                                    <IconButton
                                                      onClick={() =>
                                                        this.replyOpener(
                                                          index,
                                                          commentIndex
                                                        )
                                                      }
                                                    >
                                                      <ReplyIcon />
                                                    </IconButton>
                                                    <IconButton
                                                      onClick={() =>
                                                        this.handleClickLike(
                                                          index,
                                                          commentIndex
                                                        )
                                                      }
                                                    >
                                                      {comment.liked ? (
                                                        <FavoriteIcon color="secondary" />
                                                      ) : (
                                                        <FavoriteBorderOutlinedIcon />
                                                      )}
                                                    </IconButton>
                                                  </ListItemIcon>
                                                </ListItem>
                                                <Collapse
                                                  in={comment.isReplyOpen}
                                                  timeout="auto"
                                                  unmountOnExit
                                                >
                                                  {comment.replies.length >
                                                  3 ? (
                                                    <div>
                                                      <List
                                                        component="div"
                                                        aria-labelledby="nested-reply-list-subheader"
                                                        style={{
                                                          marginRight: "25px",
                                                        }}
                                                      >
                                                        {comment.replies
                                                          .slice(0, 3)
                                                          .map(
                                                            (
                                                              reply,
                                                              replyIndex
                                                            ) => (
                                                              <div
                                                                key={reply.id}
                                                              >
                                                                <ListItem>
                                                                  <ListItemAvatar>
                                                                    <Avatar
                                                                      alt="avatar"
                                                                      src={
                                                                        reply.profile_picture
                                                                      }
                                                                    />
                                                                  </ListItemAvatar>
                                                                  <ListItemText
                                                                    style={{
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                    primary={
                                                                      <Typography>
                                                                        {reply.user_firstname +
                                                                          " " +
                                                                          reply.user_lastname}
                                                                      </Typography>
                                                                    }
                                                                    secondary={
                                                                      <>
                                                                        <Typography
                                                                          dir="rtl"
                                                                          component="span"
                                                                          variant="body2"
                                                                          color="textPrimary"
                                                                          style={{
                                                                            wordBreak:
                                                                              "break-all",
                                                                          }}
                                                                        >
                                                                          {
                                                                            reply.comment_text
                                                                          }
                                                                        </Typography>
                                                                      </>
                                                                    }
                                                                  ></ListItemText>
                                                                </ListItem>
                                                              </div>
                                                            )
                                                          )}
                                                      </List>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          marginBottom: "30px",
                                                          justifyContent:
                                                            "center",
                                                        }}
                                                      >
                                                        <IconButton
                                                          // color="primary"
                                                          style={{
                                                            padding: "8px",
                                                          }}
                                                          href={
                                                            "/student_dashboard" +
                                                            timeline.postUrl
                                                          }
                                                        >
                                                          <ExpandMoreIcon />
                                                        </IconButton>
                                                      </div>
                                                    </div>
                                                  ) : (
                                                    <div>
                                                      {comment.replies.length >
                                                        0 && (
                                                        <List
                                                          style={{
                                                            marginRight: "25px",
                                                          }}
                                                          component="div"
                                                          aria-labelledby="nested-reply-list-subheader"
                                                        >
                                                          {comment.replies.map(
                                                            (
                                                              reply,
                                                              replyIndex
                                                            ) => (
                                                              <div
                                                                key={reply.id}
                                                              >
                                                                <ListItem>
                                                                  <ListItemAvatar>
                                                                    <Avatar
                                                                      alt="avatar"
                                                                      src={
                                                                        reply.profile_picture
                                                                      }
                                                                    />
                                                                  </ListItemAvatar>
                                                                  <ListItemText
                                                                    style={{
                                                                      textAlign:
                                                                        "right",
                                                                    }}
                                                                    primary={
                                                                      <Typography>
                                                                        {reply.user_firstname +
                                                                          " " +
                                                                          reply.user_lastname}
                                                                      </Typography>
                                                                    }
                                                                    secondary={
                                                                      <>
                                                                        <Typography
                                                                          dir="rtl"
                                                                          component="span"
                                                                          variant="body2"
                                                                          color="textPrimary"
                                                                          style={{
                                                                            wordBreak:
                                                                              "break-all",
                                                                          }}
                                                                        >
                                                                          {
                                                                            reply.comment_text
                                                                          }
                                                                        </Typography>
                                                                      </>
                                                                    }
                                                                  ></ListItemText>
                                                                </ListItem>
                                                              </div>
                                                            )
                                                          )}
                                                        </List>
                                                      )}
                                                    </div>
                                                  )}

                                                  <ValidatorForm
                                                    onSubmit={() =>
                                                      this.handlePostReply(
                                                        index,
                                                        commentIndex,
                                                        comment.id,
                                                        comment.replyRef
                                                      )
                                                    }
                                                    style={{
                                                      padding: "10px",
                                                      marginRight: "30px",
                                                      marginLeft: "20px",
                                                      marginBottom: "4px",
                                                    }}
                                                  >
                                                    <InputBase
                                                      style={{
                                                        padding: "8px",
                                                        borderRadius: 10,
                                                      }}
                                                      value={comment.replyRef}
                                                      onChange={(e) =>
                                                        this.handleReplyTextOnChange(
                                                          e,
                                                          index,
                                                          commentIndex
                                                        )
                                                      }
                                                      fullWidth
                                                      required
                                                      className="input2"
                                                      placeholder="متن پیام"
                                                      endAdornment={
                                                        <InputAdornment position="end">
                                                          {comment.replyRef !==
                                                            "" && (
                                                            <IconButton
                                                              color="primary"
                                                              className={
                                                                classes.iconButton
                                                              }
                                                              onClick={() =>
                                                                this.handlePostReply(
                                                                  index,
                                                                  commentIndex,
                                                                  comment.id,
                                                                  comment.replyRef
                                                                )
                                                              }
                                                            >
                                                              <SendIcon className="icon" />
                                                            </IconButton>
                                                          )}
                                                        </InputAdornment>
                                                      }
                                                    />
                                                  </ValidatorForm>
                                                </Collapse>
                                                <Divider />
                                              </div>
                                            )
                                          )}
                                        </List>
                                        {timeline.comments_count > 3 && (
                                          <div
                                            style={{
                                              display: "flex",
                                              marginBottom: "30px",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <IconButton
                                              // color="primary"
                                              style={{
                                                padding: "8px",
                                              }}
                                              href={
                                                "/student_dashboard" +
                                                timeline.postUrl
                                              }
                                            >
                                              <ExpandMoreIcon />
                                            </IconButton>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <ValidatorForm
                                    onSubmit={() =>
                                      this.handlePostComment(
                                        index,
                                        timeline.id,
                                        timeline.commentRef
                                      )
                                    }
                                  >
                                    <InputBase
                                      style={{
                                        padding: "8px",
                                        marginTop: "6px",
                                        borderRadius: 10,
                                      }}
                                      value={timeline.commentRef}
                                      onChange={(e) =>
                                        this.handleCommentTextOnChange(e, index)
                                      }
                                      fullWidth
                                      required
                                      className="input2"
                                      placeholder="کامنت بگذارید"
                                      endAdornment={
                                        <InputAdornment position="end">
                                          {timeline.commentRef !== "" && (
                                            <IconButton
                                              color="primary"
                                              className={classes.iconButton}
                                              onClick={() =>
                                                this.handlePostComment(
                                                  index,
                                                  timeline.id,
                                                  timeline.commentRef
                                                )
                                              }
                                            >
                                              <SendIcon className="icon" />
                                            </IconButton>
                                          )}
                                        </InputAdornment>
                                      }
                                    />
                                  </ValidatorForm>
                                </div>
                              </Grid>
                            </Grid>
                          </Paper>
                        </div>
                      );
                    }
                    // ))
                  }
                  components={{
                    Footer: () => {
                      return (
                        <div>
                          {this.state.hasNext && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                padding: "8px",
                              }}
                            >
                              <CircularProgress />
                            </div>
                          )}
                        </div>
                      );
                    },
                  }}
                />
              ) : (
                /* {this.state.list.length > 0 ? (
                <div>
                  <div>
                    {this.state.list.map(}
                  </div> */

                /* {this.state.hasNext && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "16px",
                      }}
                    >
                      <Button
                        color="primary"
                        disabled={this.state.loadingMore}
                        variant="outlined"
                        style={{ borderRadius: 30, padding: "16px" }}
                        onClick={this.loadMore}
                      >
                        {this.state.loadingMore ? (
                          <CircularProgress />
                        ) : (
                          "مشاهده ی موارد بیشتر"
                        )}
                      </Button>
                    </div>
                  )} */
                // </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px",
                  }}
                >
                  <Typography>
                    <Box fontSize={18} p={20}>
                      مطلبی وجود ندارد
                    </Box>
                  </Typography>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(TimeLine);
