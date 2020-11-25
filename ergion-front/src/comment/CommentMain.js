import React, { useState } from "react";

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Player } from 'video-react';
import "./Player.scss";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SchoolIcon from '@material-ui/icons/School';
import ClassIcon from '@material-ui/icons/Class';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import Comments from "./Comments";
import './Comments.scss'
import { Button, CssBaseline, Grid, Paper, Tab, Tabs, withStyles } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: "50px",
    marginBottom: "30px",
  },
  header: {
    marginTop: "40px",
    fontWeight: 600
  },
  button: {
    color: "orange"
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    width: '100%',
  },
  nested: {
    paddingRight: theme.spacing(4),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ minHeight: "6rem" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CommentMain() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline>
        <Container>
          <Grid container item className={classes.spacing} lg={10} direction='row' justify="space-evenly">
            <Grid container item={true} justify="space-between" className={classes.spacing} lg={9} spacing={4}>
              <Grid item container>
                <Player>
                  <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
                </Player>
              </Grid>
              <Grid item xs={12}>
                <AppBar position="static" dir='rtl' color='transparent'>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab className='title' label="توضیحات" {...a11yProps(0)} />
                    <Tab className='title' label="فایل ها" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <Paper className={classes.paper}>
                  <SwipeableViews
                    axis={'x-reverse'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    <TabPanel value={value} index={0}>
                      <Typography className='title' component="div">
                        <Box fontSize={20}>
                          در این جلسه مبحث فلان درس داده میشود
                      </Box>
                      </Typography>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Button href='./favicon.ico' className='text' variant='contained' color='primary' download>
                        دانلود
                    </Button>
                    </TabPanel>
                  </SwipeableViews>
                </Paper>
              </Grid>
              <Grid item>
                <Comments />
              </Grid>
            </Grid>
            <Grid alignContent='flex-start' alignItems='stretch' item container className={classes.spacing} lg={3} spacing={4}>
              {/* <Paper style={{ padding: '32px' }}>
                <Typography className={classes.header} variant="h4" gutterBottom>
                  Episodes
                </Typography>
              </Paper> */}
              <Grid item xs={12} className='stick'>
                <Paper>
                  <ListItem button onClick={handleClick} dir='rtl'>
                    <ListItemIcon>
                      <ClassIcon />
                    </ListItemIcon>
                    <ListItemText dir='rtl'>
                      <Typography className='title' style={{ textAlign: 'right' }}>
                        سایر جلسات
                  </Typography>
                    </ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography className='title' style={{ textAlign: 'right' }}>
                            جلسه اول
                      </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon>
                          <SchoolIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography className='title' style={{ textAlign: 'right' }}>
                            جلسه دوم
                      </Typography>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Collapse>
                </Paper>
              </Grid>


            </Grid>
          </Grid>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default withStyles(useStyles)(CommentMain);