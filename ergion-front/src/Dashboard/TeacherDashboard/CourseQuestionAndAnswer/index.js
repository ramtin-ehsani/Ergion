import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import Tabs from "./Tabs";

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
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif',
  },
  direction: "rtl",
});

const Index = () => {
  const classes = useStyles();
  return (
    // <StylesProvider jss={jss}>
    //   <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container lg={10} item={true}>
          <Grid item lg={12} md={12} xs={12}>
            <Tabs />
          </Grid>
        </Grid>
      </Container>
    </div>
    //    {/* </ThemeProvider>
    //  </StylesProvider> */}
  );
};

export default Index;
