import React, { Component } from "react";
import axios from "axios";
import { Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { IconButton } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

const styles = (theme) => ({
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
      "استاد فلان جواب شما رو داد",
      "فلانی فلان کرد",
      "اره فلان فلان شد",
      "استاد فلان جواب شما رو داد",
      "فلانی فلان کرد",
      "فلانی فلان کرد",
      "اره فلان فلان شد",
    ],
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
              <Badge color="secondary" badgeContent={5} >
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
              style={{direction:'rtl',marginTop:'30px'}}
            >
              {this.state.list.map((option) => (
                <MenuItem key={option} onClick={this.handleMenuClose}>
                  {option}
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
