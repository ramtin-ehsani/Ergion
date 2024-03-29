import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from './page';
// import Profile from './TeacherProfile';
import ProfileDetails from './TeacherProfileDetails';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxHeight: '100%',
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
  }
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Vazir", sans-serif'
  },
  direction: 'rtl'
});

const Account = () => {
  const classes = useStyles();

  return (
    // <div className="profile">
    <StylesProvider jss={jss} >

      <ThemeProvider theme={theme} >
        <Page
          className={classes.root}
          title="پروفایل"


        >
          <Container maxWidth="lg" >

            <Grid
              container
              spacing={4}
              lg={10}
              item={true}
              direction="column"
              alignItems="center"

            >
              {/* <Grid
                item
                lg={6}
                md={12}
                xs={12}
                style={{width:'100%'}}
              >
                <Box boxShadow={6} >
                  <Profile />
                </Box>
              </Grid> */}
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
              >
                <Box boxShadow={6} >
                  <ProfileDetails />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Page>
        {/* </div> */}
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Account;