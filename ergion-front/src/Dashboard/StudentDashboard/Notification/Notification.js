import React, { Component } from "react";
import axios from "axios";
import { Avatar, Badge, Box, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
});

const ITEM_HEIGHT = 48;

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
    list: [
      {
        time: 34124221,
        profile_picture: "",
        text: "فلان فلانی کرد که فلان شد.",
        has_seen: false,
      },
      {
        time: 34124321,
        profile_picture: "",
        text: "فلان بیسار کرد که  شد.",
        has_seen: false,
      },
      {
        time: 34824221,
        profile_picture: "",
        text: " فلان فلانی کرد  سلام شد",
        has_seen: false,
      },
      {
        time: 34924221,
        profile_picture: "",
        text: ".فلان  که فلان شد.",
        has_seen: true,
      },
      {
        time: 39924221,
        profile_picture: "",
        text: ".فلان  که فلان شد.",
        has_seen: true,
      },
      {
        time: 31924221,
        profile_picture: "",
        text: ".فلان  که فلان شد.",
        has_seen: true,
      },
    ],
  };

  toFarsiNumber = (n) => {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  };

  handleMenuClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  componentDidMount() {}
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
              <Badge color="secondary" badgeContent={3}>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Menu
              id="long-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleMenuClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                },
              }}
              style={{ direction: "rtl", marginTop: "30px" }}
            >
              {this.state.list.map((item) => (
                <MenuItem key={item.time} onClick={this.handleMenuClose}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      wordBreak: "break-all",
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
                    <Typography style={{ alignSelf: "center", margin: "4px" }}>
                    <Box fontWeight={!item.has_seen&&("fontWeightBold")}>{item.text}</Box>
                    </Typography>
                    <Typography style={{ alignSelf: "center", margin: "4px" }}>
                      <Box style={{ color: "grey" }} fontWeight={!item.has_seen&&("fontWeightBold")} fontSize={10}>
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
            </Menu>
          </div>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

export default withStyles(styles)(Notification);
