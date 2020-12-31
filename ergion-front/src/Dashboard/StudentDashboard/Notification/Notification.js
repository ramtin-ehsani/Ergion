import React, { Component } from "react";
import axios from "axios";
import {
  Avatar,
  Badge,
  Box,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import human from "@jacobmarshall/human-time";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

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
    },
  },
  customWidth: {},
});

const ITEM_HEIGHT = 60;

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif',
  },
  //   direction: "rtl",
});

class Notification extends Component {
  state = {
    anchorEl: false,
    loading: true,
    page: 1,
    has_next: false,
    number_of_unseen: 0,
    list: [],
  };

  toFarsiNumber = (n) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  };

  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    if (this.state.number_of_unseen > 0) {
      this.handleSeen();
    }
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  loadMore = () => {
    // setTimeout(() => {
    if (this.state.has_next) {
      this.getValues(this.state.page);
    }
    // }, 1200);
  };
  getValues = (page) => {
    axios
      .get(
        "http://127.0.0.1:8000/api/student/notifications/?page=" + page,
        this.config
      )
      .then((res) => {
        const { list } = this.state;
        console.log(res.data);
        res.data.data.map((notifItem) => {
          let role = "";
          if (notifItem.user_role === "S") {
            role = "دانش آموز";
          } else {
            role = "استاد";
          }
          const name = notifItem.user_firstname + " " + notifItem.user_lastname;
          const type = notifItem.type;
          let first = "";
          let second = "";
          let third = "";
          if (type === 0) {
            first = " کامنت ";
            second = String(notifItem.comments);
            third = " را لایک کرد";
          } else if (type === 1) {
            first = " به کامنت ";
            second = String(notifItem.comments);
            third = " پاسخ داد";
          } else if (type === 2) {
            first = " به سوال ";
            second = String(notifItem.question);
            third = " پاسخ داد";
          } else if (type === 3) {
            first = " درخواست عضویت شما را به درس ";
            second = String(notifItem.course);
            third = " قبول کرد";
          } else {
            first = " درخواست عضویت شما را به درس ";
            second = String(notifItem.course);
            third = " رد کرد";
          }
          const item = {
            id: notifItem.id,
            time: notifItem.created_at,
            has_seen: notifItem.has_seen,
            profile_picture: notifItem.user_profile_picture,
            text: {
              role: role + " ",
              name: name,
              first: first,
              second: second,
              third: third,
            },
          };
          list.push(item);
        });
        this.setState({
          list,
          loading: false,
          has_next: res.data.has_next,
          page: this.state.page + 1,
          number_of_unseen: res.data.count_of_unseen,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getValues(this.state.page);
  }

  listHasSeenHandler = () => {
    const results = this.state.list.map((item, idx) => {
      return {
        ...item,
        has_seen: true,
      };
    });
    this.setState({ list: results, number_of_unseen: 0 });
  };

  handleSeen = () => {
    setTimeout(() => {
      axios
        .put(
          "http://127.0.0.1:8000/api/student/notifications/",
          {},
          this.config
        )
        .then(() => {
          this.listHasSeenHandler();
        })
        .catch((error) => {
          console.log(error);
        });
    }, 4000);
  };

  config = {
    headers: { Authorization: `Token ${localStorage.getItem("api_key")}` },
  };

  render() {
    const { classes } = this.props;

    return (
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <div>
            <IconButton
              color="inherit"
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={this.handleMenuClick}
            >
              <Badge
                color="secondary"
                badgeContent={this.state.number_of_unseen}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Menu
              id="long-menu"
              anchorEl={this.state.anchorEl}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleMenuClose}
              className={classes.customWidth}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "70ch",
                },
              }}
              style={{ direction: "rtl", marginTop: "30px" }}
              ref={(ref) => (this.scrollParentRef = ref)}
            >
              {this.state.loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <CircularProgress style={{ width: 30, height: 30 }} />
                </div>
              ) : (
                <div>
                  {this.state.list.length > 0 ? (
                    <InfiniteScroll
                      pageStart={0}
                      hasMore={this.state.has_next}
                      loadMore={this.loadMore.bind(this)}
                      loader={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "10px",
                          }}
                        >
                          <CircularProgress style={{ width: 30, height: 30 }} />
                        </div>
                      }
                      useWindow={false}
                      getScrollParent={() => this.scrollParentRef}
                    >
                      {this.state.list.map((item) => (
                        <MenuItem
                          key={item.id}
                          onClick={this.handleMenuClose}
                          style={
                            !item.has_seen
                              ? { backgroundColor: "#e6f8ff" }
                              : {
                                  backgroundColor: "white",
                                  borderBottom: "ridge",
                                }
                          }
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              wordBreak: "break-all",
                              whiteSpace: "pre-line",
                              width: "100%",
                            }}
                          >
                            <Avatar
                              src={item.profile_picture}
                              style={{
                                width: 30,
                                height: 30,
                                alignSelf: "center",
                                margin: "4px",
                              }}
                            />
                            <Typography
                              style={{
                                alignSelf: "center",
                                margin: "4px",
                                width: 380,
                                textAlign: "right",
                              }}
                            >
                              <Box>
                                <span>
                                  {item.text.role}
                                  <strong>{item.text.name}</strong>
                                  {item.text.first}
                                  <strong>{item.text.second}</strong>
                                  {item.text.third}
                                </span>
                              </Box>
                            </Typography>
                            <Typography
                              style={{
                                alignSelf: "center",
                                margin: "4px",
                                width: 70,
                                textAlign: "center",
                              }}
                            >
                              <Box style={{ color: "grey" }} fontSize={10}>
                                {this.toFarsiNumber(
                                  human(new Date(item.time))
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
                        </MenuItem>
                      ))}
                    </InfiniteScroll>
                  ) : (
                    <MenuItem onClick={this.handleMenuClose}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "10px",
                          width: "100%",
                        }}
                      >
                        <Typography>
                          <Box>نوتیفیکیشنی وجود ندارد</Box>
                        </Typography>
                      </div>
                    </MenuItem>
                  )}
                </div>
              )}
            </Menu>
          </div>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

export default withStyles(styles)(Notification);
