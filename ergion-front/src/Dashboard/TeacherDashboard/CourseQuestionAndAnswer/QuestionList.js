import React, { Component } from "react";
import "./QuestionMain.scss";
import {
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
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
});

class QuestionList extends Component {
  _isMounted = false;
  state = {
    list: [],
    selectedIndex: 0,
  };
  handleListItemClick = (event, index) => {
    this.setState({
      selectedIndex: index,
    });
    this.props.history.push("/teacher_dashboard/questions/course/:id/answer");
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
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        const { list } = this.state;
        resp.data.map((question) => {
          const questionItem = {
            id: question.id,
            question: question.question,
            time: question.created_at,
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
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
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

            if (this._isMounted) {
              this.setState({ list: list });
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
          <div>
            {this.state.list.length > 0 ? (
              <List
                dir="rtl"
                style={{ backgroundColor: "white", width: "100%" }}
                component="nav"
              >
                {this.state.list.map((questionItem, index) => (
                  <div key={questionItem.id}>
                    <ListItem
                      button
                      // selected={this.state.selectedIndex === 0}
                      onClick={(event) => this.handleListItemClick(event, 0)}
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
                              <Box fontSize={16} fontWeight="fontWeightBold">
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
              ""
            )}
          </div>
        </StylesProvider>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(withRouter(QuestionList));
