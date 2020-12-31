import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import AutoGridNoWrap from "./TabItem/news/oldnewscomponent";
// import Writenewnews from "./TabItem/news/writenews";
// import theme from "./theme";
// import Title from "./Title";
// import Mytypography from "./mytypography1";
import clsx from "clsx";
import Content from "./Content";
// import News from "./TabItem/news/newscomponent";
import Questions from "./Questions/Questions";
import { Grid, Paper } from "@material-ui/core";
// import Write from "./TabItem/news/Writeanews";
// import axios from "axios";
import LockIcon from "@material-ui/icons/Lock";
import TimeLine from "./TabItem/news/TimeLine";
// import { withStyles } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
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
// Generate Order Data

function createData(id, date, name) {
  return { date, name, id };
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // display:'flex',
    backgroundColor: theme.palette.background.paper,
  },
  tabFont: {
    fontSize: 18,
  },
  labelContainer: {
    width: "auto",
    padding: 0,
  },
  iconLabelWrapper: {
    flexDirection: "row",
  },
  paper: {
    padding: theme.spacing(0),
    paddingBottom: theme.spacing(2),

    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    alignItems: "center",
  },
  lockb: {
    margin: theme.spacing(6),
    alignItems: "center",
  },
  fixedHeight1: {
    height: 300,
  },
  locktext: {
    color: "gray",
    fontSize: 24,
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = createMuiTheme({
    typography: {
      fontFamily: '"Vazir", sans-serif',
    },
    direction: "rtl",
  });
  const [value, setValue] = React.useState(0);
  const [newslist, setnewslist] = React.useState([]);
  const [T, setT] = React.useState(false);
  const [S, setS] = React.useState(false);
  const [isowner, setisowner] = React.useState(false);
  const [lock, setlock] = React.useState(false);

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      if (JSON.parse(localStorage.getItem("user"))["role"] === "T") {
        setT(true);

        if (
          JSON.parse(localStorage.getItem("user"))["id"] ===
          props.course.instructor_id
        ) {
          setisowner(true);
        }
      } else {
        setS(true);

        if (props.course.is_public !== undefined) {
          if (!props.course.is_public) {
            if (!props.course.joined) {
              setlock(true);
            } 
          } 
        }
      }
    }
    // setTimeout(() => {
    //   const promise = axios.get("http://127.0.0.1:8000/api/course/news/", {
    //     params: { course_id: props.course.id },
    //     headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    //   });
    //   promise.then((response) => {
    //     setnewslist(response.data);
    //   });
    // }, 2000);
  },[props.course]);
  const fixedHeightPaper1 = clsx(classes.paper, classes.fixedHeight1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [upflag, setupflag] = React.useState(false);
  const getup = () => {
    setupflag(true);
  };
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        {lock ? (
          <div>
            <Paper className={fixedHeightPaper1} elevation={3}>
              <div className={classes.lockb}>
                <LockIcon style={{ fontSize: 80 }} color="disabled" />
                <Typography className={classes.locktext}>
                  این درس پس از اجازه مدرس قابل استفاده است
                </Typography>
              </div>
            </Paper>
          </div>
        ) : (
          <div>
            <AppBar position="static" color="default" dir="rtl">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab
                  icon={<AssessmentIcon style={{ marginLeft: "8px" }} />}
                  label="مطالب"
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    labelContainer: classes.labelContainer,
                  }}
                  className={classes.tabFont}
                  {...a11yProps(0)}
                />
                <Tab
                  icon={<AssignmentLateIcon style={{ marginLeft: "8px" }} />}
                  label="اخبار"
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    labelContainer: classes.labelContainer,
                  }}
                  className={classes.tabFont}
                  {...a11yProps(1)}
                />
                <Tab
                  icon={<LiveHelpIcon style={{ marginLeft: "8px" }} />}
                  label="پرسش و پاسخ"
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    labelContainer: classes.labelContainer,
                  }}
                  className={classes.tabFont}
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Content course={props.course} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <TimeLine
                  courseid={props.course.id}
                  coursem={props.course}
                  isowner={isowner}
                />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Questions />
              </TabPanel>
            </SwipeableViews>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}
