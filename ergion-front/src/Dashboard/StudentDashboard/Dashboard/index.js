import React from "react";
import {
  Container,
  Grid,
  // makeStyles
} from "@material-ui/core";
import Timeline from "../TimeLine/TimeLine";
import Suggestedcourse from "./suggest";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.dark,
//         maxHeight: '100%',
//         paddingBottom: theme.spacing(5),
//         paddingTop: theme.spacing(5),
//     }
// }));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif',
  },
  direction: "rtl",
});

const Dashboard = () => {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" style={{ marginTop: "30px" }}>
          <Grid container spacing={4} lg={10} item={true} dir="rtl">
            <Grid item lg={9} md={9} xs={12} sm={12}>
              <Timeline />
            </Grid>

            <Grid item lg={3} md={3} xs={false} sm={false}>
              <Hidden only={["sm", "xs"]}>
                <div
                  style={{
                    height: "100vh",
                    overflow: "auto",
                    direction: "ltr",
                  }}
                >
                  <Suggestedcourse />
                </div>
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Dashboard;
