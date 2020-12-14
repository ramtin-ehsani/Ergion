import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import { useDispatch, useSelector } from "react-redux";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import Tabs from "./Tabs";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import * as actionTypes from "../../../store/actions";

const useStyles = makeStyles((theme) => ({
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
  root: {
    // backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
    width: "100%",
  },
  alertStyle: {
    display: "flex",
    font: "20",
  },
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif',
  },
  direction: "rtl",
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Index = () => {
  const classes = useStyles();
  const usedispatch = useDispatch();

  const onSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    usedispatch({ type: actionTypes.QSNACKBAR, qSnackBarOpenOrClose: false });
  };
  const snackBar = useSelector((state) => state.qSnackBar);
  return (
    <div className={classes.root}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Snackbar
            open={snackBar}
            autoHideDuration={1500}
            onClose={onSnackBarClose}
            dir="rtl"
          >
            <Alert
              onClose={onSnackBarClose}
              severity="success"
              className={classes.alertStyle}
            >
              انجام شد
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </StylesProvider>
      <Container maxWidth="lg">
        <Grid container lg={10} item={true}>
          <Grid item lg={12} md={12} xs={12}>
            <Tabs />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
