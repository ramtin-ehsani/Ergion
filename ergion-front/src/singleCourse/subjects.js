import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AutoGridNoWrap from "./TabItem/news/oldnewscomponent";
import Writenewnews from "./TabItem/news/writenews";
import theme from "./theme";
import Title from "./Title";
import Mytypography from "./mytypography1";
import Content from "./Content";
import News from "./TabItem/news/newscomponent";
import Questions from "./Questions/Questions";
import { Grid } from "@material-ui/core";
import Write from "./TabItem/news/Writeanews";
import axios from "axios";
import TimeLine from "./TabItem/news/TimeLine";
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
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [newslist, setnewslist] = React.useState([]);
  const [T, setT] = React.useState(false);
  const [S, setS] = React.useState(false);
  const [isowner, setisowner] = React.useState(false);

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      if (JSON.parse(localStorage.getItem("user"))["role"] === "T") {
        setT(true);
        // console.log(props.course)
        // console.log(JSON.parse(localStorage.getItem('user')))
        if (
          JSON.parse(localStorage.getItem("user"))["id"] ===
          props.course.instructor_id
        ) {
          setisowner(true);
        }
      } else setS(true);
    }
    setTimeout(() => {
      const promise = axios.get("http://127.0.0.1:8000/api/course/news/", {
        params: { course_id: props.course.id },
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      promise.then((response) => {
        setnewslist(response.data);
      });
    }, 2000);
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const [upflag,setupflag]=React.useState(false);
const getup=()=>
{
setupflag(true);
}
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="default" dir="rtl">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label={<Mytypography>مطالب</Mytypography>} {...a11yProps(0)} />
            <Tab label={<Mytypography>اخبار</Mytypography>} {...a11yProps(1)} />
            <Tab
              label={<Mytypography>پرسش و پاسخ</Mytypography>}
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
          

            <TimeLine courseid={props.course.id} coursem={props.course}  isowner={isowner} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Questions />
          </TabPanel>
        </SwipeableViews>
      </ThemeProvider>
    </div>
  );
}
