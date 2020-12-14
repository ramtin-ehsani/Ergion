import React, { Component } from "react";
import "./QuestionMain.scss";
import Zoom from "@material-ui/core/Zoom";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Paper,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ThemeProvider,
  Typography,
  withStyles,
  Button,
  CircularProgress,
  ListSubheader,
} from "@material-ui/core";
import { create } from "jss";
import rtl from "jss-rtl";
import human from "@jacobmarshall/human-time";
import {
  createMuiTheme,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { ValidatorForm } from "react-material-ui-form-validator";

const useStyles = (theme) => ({
  root: {
    position: "relative",
    width: "100%",
    minHeight: "50vh",
  },
  answerStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  divStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

class QuestionList extends Component {
  _isMounted = false;
  editAnswerRef = React.createRef("");
  state = {
    list: [],
    selectedIndex: 0,
    answerMode: false,
    loading: true,
    questionAnswer: "",
    editButtonShown: false,
    isTextMode: false,
  };
  handleListItemClick = (event, index) => {
    this.setState({
      selectedIndex: index,
      answerMode: true,
    });
  };

  showEditButton = (show) => {
    this.setState({ editButtonShown: show });
  };

  textModeSwitcher = () => {
    this.setState({ isTextMode: !this.state.isTextMode });
  };

  answerOnChange = (e) => {
    this.setState({ questionAnswer: e.target.value });
  };

  textOnBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      this.setState({ isTextMode: false, editButtonShown: false });
    }
  };

  backArrowClick = () => {
    this.setState({
      answerMode: false,
      questionAnswer: "",
    });
  };

  config = {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };

  editAnswer = () => {
    axios
      .put(
        "http://127.0.0.1:8000/api/forum/episode-answer/?answer_id=" +
          this.state.list[this.state.selectedIndex].answer[0].id,
        {
          answer: this.editAnswerRef.current.value,
        },
        this.config
      )
      .then((response) => {
        const result = this.state.list.map((item, indx) => {
          if (indx === this.state.selectedIndex) {
            const ans = [];
            ans.push(response.data);
            return {
              ...item,
              answer: ans,
            };
          }
          return item;
        });
        this.setState({
          list: result,
          isTextMode: false,
          editButtonShown: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  submitAnswer = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/forum/episode-answer/",
        {
          question: this.state.list[this.state.selectedIndex].id,
          answer: this.state.questionAnswer,
        },
        this.config
      )
      .then((response) => {
        const result = this.state.list.map((item, indx) => {
          if (indx === this.state.selectedIndex) {
            const ans = item.answer;
            ans.push(response.data);
            return {
              ...item,
              answer: ans,
              isAnswered: true,
            };
          }
          return item;
        });
        this.setState({ list: result });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    const courseId = this.props.courseId;
    axios
      .get(
        "http://127.0.0.1:8000/api/forum/episode-answer/?course_id=" + courseId,
        this.config
      )
      .then((resp) => {
        const { list } = this.state;
        resp.data.map((question) => {
          const questionItem = {
            id: question.id,
            question: question.question,
            time: question.created_at,
            answer: question.answer,
            episode_name: question.related_episode_name,
            sender_firstname: question.sender_firstname,
            sender_lastname: question.sender_lastname,
            isAnswered: false,
            sender_profile_picture:
              "http://127.0.0.1:8000" + question.sender_profile_picture,
          };
          list.push(questionItem);
        });

        axios
          .get(
            "http://127.0.0.1:8000/api/forum/episode-answer/?course_id_wa=" +
              courseId,
            this.config
          )
          .then((response) => {
            console.log(response);
            response.data.map((question_wa) => {
              const questionItem = {
                id: question_wa.id,
                question: question_wa.question,
                time: question_wa.created_at,
                episode_name: question_wa.related_episode_name,
                sender_firstname: question_wa.sender_firstname,
                sender_lastname: question_wa.sender_lastname,
                answer: question_wa.answer,
                isAnswered: true,
                sender_profile_picture:
                  "http://127.0.0.1:8000" + question_wa.sender_profile_picture,
              };
              list.push(questionItem);
            });
            list.sort((a, b) =>
              a.time > b.time ? -1 : a.time < b.time ? 1 : 0
            );

            if (this._isMounted) {
              this.setState({ list: list, loading: false });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    const theme = createMuiTheme({
      direction: "rtl",
    });

    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

    return (
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          {this.state.loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <div className={classes.root}>
              <Zoom
                in={!this.state.answerMode}
                timeout={700}
                className={classes.divStyle}
              >
                <div>
                  {this.state.list.length > 0 ? (
                    <List
                      dir="rtl"
                      style={{ backgroundColor: "white", width: "100%" }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={
                        <ListSubheader
                          component="div"
                          className="text"
                          id="nested-list-subheader"
                        >
                          سوالات
                        </ListSubheader>
                      }
                    >
                      {this.state.list.map((questionItem, index) => (
                        <div key={questionItem.id}>
                          <ListItem
                            button
                            onClick={(event) =>
                              this.handleListItemClick(event, index)
                            }
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt="avatar"
                                src={questionItem.sender_profile_picture}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  className="text"
                                  style={{ display: "flex" }}
                                >
                                  {questionItem.isAnswered ? (
                                    <Box fontSize={16}>
                                      {questionItem.sender_firstname +
                                        " " +
                                        questionItem.sender_lastname}
                                    </Box>
                                  ) : (
                                    <Box
                                      fontSize={16}
                                      fontWeight="fontWeightBold"
                                    >
                                      {questionItem.sender_firstname +
                                        " " +
                                        questionItem.sender_lastname}
                                    </Box>
                                  )}

                                  <Box
                                    fontSize={14}
                                    style={{
                                      color: "grey",
                                      marginRight: "6px",
                                      marginTop: "2px",
                                    }}
                                  >
                                    {" . " +
                                      human(new Date(questionItem.time))
                                        .replace("years", "سال")
                                        .replace("year", "سال")
                                        .replace("hours", "ساعت")
                                        .replace("hour", "ساعت")
                                        .replace("minutes", "دقیقه")
                                        .replace("minute", "دقیقه")
                                        .replace("days", "روز")
                                        .replace("day", "روز")
                                        .replace("seconds", "ثانیه")
                                        .replace("second", "ثانیه")
                                        .replace("ago", "پیش")}
                                  </Box>
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  className="text"
                                  style={{ marginTop: "15px" }}
                                >
                                  {questionItem.isAnswered ? (
                                    <Box>{questionItem.question}</Box>
                                  ) : (
                                    <Box fontWeight="fontWeightBold">
                                      {questionItem.question}
                                    </Box>
                                  )}
                                </Typography>
                              }
                            />
                            <div>
                              {questionItem.isAnswered ? (
                                <Typography className="text">
                                  <Box
                                    fontSize={16}
                                    fontWeight="fontWeightBold"
                                    style={{ color: "green" }}
                                  >
                                    پاسخ داده شده
                                  </Box>
                                </Typography>
                              ) : (
                                <Typography className="text">
                                  <Box
                                    fontSize={16}
                                    fontWeight="fontWeightBold"
                                    style={{ color: "red" }}
                                  >
                                    پاسخی داده نشده
                                  </Box>
                                </Typography>
                              )}
                            </div>
                          </ListItem>
                          <Divider />
                        </div>
                      ))}
                    </List>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "30px",
                        marginTop: "80px",
                      }}
                    >
                      <Typography gutterBottom className="text">
                        <Box fontSize={26} fontWeight="fontWeightBold">
                          سوالی وجود ندارد
                        </Box>
                      </Typography>
                    </div>
                  )}
                </div>
              </Zoom>

              <Zoom
                in={this.state.answerMode}
                timeout={700}
                className={classes.answerStyle}
              >
                <div>
                  {this.state.list.length > 0 && (
                    <Grid container spacing={0}>
                      <Grid item xs>
                        <Paper
                          dir="rtl"
                          style={{ width: "100%", borderRadius: 12 }}
                          elevation={3}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              // marginTop: "10px",
                            }}
                          >
                            <CardHeader
                              style={{ alignSelf: "center" }}
                              className="text"
                              avatar={
                                <Avatar
                                  src={
                                    this.state.list[this.state.selectedIndex]
                                      .sender_profile_picture
                                  }
                                />
                              }
                              title={
                                <Typography className="text">
                                  <Box
                                    className="text"
                                    fontSize={16}
                                    fontWeight="fontWeightBold"
                                  >
                                    {this.state.list[this.state.selectedIndex]
                                      .sender_firstname +
                                      " " +
                                      this.state.list[this.state.selectedIndex]
                                        .sender_lastname}
                                  </Box>
                                </Typography>
                              }
                              subheader={
                                <Box
                                  className="text"
                                  fontSize={14}
                                  style={{
                                    color: "grey",
                                  }}
                                >
                                  {human(
                                    new Date(
                                      this.state.list[
                                        this.state.selectedIndex
                                      ].time
                                    )
                                  )
                                    .replace("years", "سال")
                                    .replace("year", "سال")
                                    .replace("hours", "ساعت")
                                    .replace("hour", "ساعت")
                                    .replace("minutes", "دقیقه")
                                    .replace("minute", "دقیقه")
                                    .replace("days", "روز")
                                    .replace("day", "روز")
                                    .replace("seconds", "ثانیه")
                                    .replace("second", "ثانیه")
                                    .replace("ago", "پیش")}
                                </Box>
                              }
                            />

                            <IconButton
                              onClick={this.backArrowClick}
                              style={{
                                marginLeft: "20px",
                                alignSelf: "center",
                              }}
                            >
                              <ArrowBackIcon color="primary" />
                            </IconButton>
                          </div>

                          <CardContent
                            style={{ textAlign: "right", marginRight: "5px" }}
                          >
                            <Typography
                              className="text"
                              variant="body2"
                              color="textPrimary"
                              component="p"
                            >
                              <Box fontSize={16}>
                                {
                                  this.state.list[this.state.selectedIndex]
                                    .question
                                }
                              </Box>
                            </Typography>
                          </CardContent>
                          {this.state.list[this.state.selectedIndex]
                            .isAnswered && (
                            <div>
                              <div
                                style={{ display: "flex", marginRight: "20px" }}
                              >
                                <Typography className="text">
                                  <Box
                                    fontSize={16}
                                    fontWeight="fontWeightBold"
                                    style={{ color: "green" }}
                                  >
                                    پاسخ :
                                  </Box>
                                </Typography>
                              </div>

                              <CardHeader
                                className="text"
                                style={{ marginRight: "40px" }}
                                avatar={
                                  <Avatar
                                    src={
                                      "http://127.0.0.1:8000" +
                                      this.state.list[this.state.selectedIndex]
                                        .answer[0].sender_profile_picture
                                    }
                                  />
                                }
                                title={
                                  <Typography className="text">
                                    <Box
                                      className="text"
                                      fontSize={16}
                                      fontWeight="fontWeightBold"
                                    >
                                      {this.state.list[this.state.selectedIndex]
                                        .answer[0].sender_firstname +
                                        " " +
                                        this.state.list[
                                          this.state.selectedIndex
                                        ].answer[0].sender_lastname}
                                    </Box>
                                  </Typography>
                                }
                                subheader={
                                  <Box
                                    className="text"
                                    fontSize={14}
                                    style={{
                                      color: "grey",
                                    }}
                                  >
                                    {human(
                                      new Date(
                                        this.state.list[
                                          this.state.selectedIndex
                                        ].answer[0].created_at
                                      )
                                    )
                                      .replace("years", "سال")
                                      .replace("year", "سال")
                                      .replace("hours", "ساعت")
                                      .replace("hour", "ساعت")
                                      .replace("minutes", "دقیقه")
                                      .replace("minute", "دقیقه")
                                      .replace("days", "روز")
                                      .replace("day", "روز")
                                      .replace("seconds", "ثانیه")
                                      .replace("second", "ثانیه")
                                      .replace("ago", "پیش")}
                                  </Box>
                                }
                              />
                              <CardContent
                                style={{
                                  textAlign: "right",
                                  marginRight: "45px",
                                }}
                                onMouseEnter={() => this.showEditButton(true)}
                                onMouseLeave={() => this.showEditButton(false)}
                              >
                                {!this.state.isTextMode ? (
                                  <Typography
                                    className="text"
                                    variant="body2"
                                    color="textPrimary"
                                    component="p"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                      }}
                                    >
                                      <Box
                                        fontSize={16}
                                        style={{
                                          alignSelf: "center",
                                          padding: "4px",
                                        }}
                                      >
                                        {
                                          this.state.list[
                                            this.state.selectedIndex
                                          ].answer[0].answer
                                        }
                                      </Box>
                                      <div
                                        style={{
                                          alignSelf: "center",
                                          marginBottom: "-8px",
                                        }}
                                      >
                                        {this.state.editButtonShown &&
                                          !this.state.isTextMode && (
                                            <Button
                                              onClick={this.textModeSwitcher}
                                            >
                                              <EditIcon />
                                            </Button>
                                          )}
                                      </div>
                                    </div>
                                  </Typography>
                                ) : (
                                  <ValidatorForm onSubmit={this.editAnswer}>
                                    <InputBase
                                      fullWidth
                                      autoFocus
                                      dir="rtl"
                                      className="text"
                                      autoComplete="off"
                                      name="name"
                                      style={{
                                        fontSize: 16,
                                      }}
                                      inputProps={{ "aria-label": "naked" }}
                                      required
                                      onBlur={(event) => this.textOnBlur(event)}
                                      defaultValue={
                                        this.state.list[
                                          this.state.selectedIndex
                                        ].answer[0].answer
                                      }
                                      inputRef={this.editAnswerRef}
                                    />
                                  </ValidatorForm>
                                )}
                              </CardContent>
                            </div>
                          )}
                        </Paper>
                        {!this.state.list[this.state.selectedIndex]
                          .isAnswered && (
                          <Grid
                            dir="rtl"
                            container
                            wrap="nowrap"
                            alignItems="center"
                            style={{ minHeight: "8rem" }}
                          >
                            <Grid item xs>
                              <ValidatorForm
                                onSubmit={this.submitAnswer}
                                style={{ display: "flex" }}
                              >
                                <InputBase
                                  style={{ padding: "8px", borderRadius: 10 }}
                                  value={this.state.questionAnswer}
                                  onChange={this.answerOnChange}
                                  rowsMax={2}
                                  multiline
                                  fullWidth
                                  required
                                  className="input2"
                                  placeholder="متن جواب"
                                />
                                <IconButton color="primary" type="submit">
                                  <SendIcon className="icon" />
                                </IconButton>
                              </ValidatorForm>
                            </Grid>
                            <Grid item></Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </div>
              </Zoom>
            </div>
          )}
        </StylesProvider>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(withRouter(QuestionList));
