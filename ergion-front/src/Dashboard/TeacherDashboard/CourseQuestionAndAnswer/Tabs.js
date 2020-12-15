import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import React, { Component } from "react";
import {
  Box,
  Divider,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import "./QuestionMain.scss";
import QuestionList from "./QuestionList";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  grid: {
    marginTop: "16px",
  },
  active: {
    backgroundColor: "red",
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    height: 140,
    width: "100%",
    // objectFit: 'cover'
  },
});

class TabsClass extends Component {
  state = {
    list: [],
    value: 0,
    loading: true,
  };

  handleChange = (newValue) => {
    this.setState({ value: newValue });
  };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/teacher/courses/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const l = [];
        response.data.map((course) => {
          const courseItem = {
            id: course.id,
            name: course.name,
            subject: course.subject,
            cover: course.course_cover,
          };
          l.push(courseItem);
        });
        this.setState({ list: l, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.state.loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "80px",
            }}
          >
            <div>
              <Typography gutterBottom className="text">
                <Box fontSize={25} fontWeight="fontWeightBold">
                  لطفا صبر کنید
                </Box>
              </Typography>
              <CircularProgress style={{ margin: "20px" }} />
            </div>
          </div>
        )}
        {this.state.list.length > 0 ? (
          <div>
            <Typography
              gutterBottom
              className="text"
              style={{ margin: "14px" }}
            >
              <Box fontSize={25} fontWeight="fontWeightBold">
                کلاس های من
              </Box>
            </Typography>
            <Paper
              elevation={3}
              style={{ marginRight: "18px", marginLeft: "18px" }}
            >
              <Tabs
                value={this.state.value}
                onChange={(e, v) => this.handleChange(v)}
                indicatorColor="primary"
                TabIndicatorProps={{
                  style: {
                    height: "6px",
                    borderRadius: 10,
                  },
                }}
                variant="scrollable"
                style={{ paddingBottom: "6px" }}
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {this.state.list.map((course, index) => (
                  <Tab
                    key={course.id}
                    {...a11yProps(index)}
                    component={React.forwardRef((props, ref) => (
                      <div>
                        <Button
                          style={{ marginBottom: "6px", textTransform: "none" }}
                          onClick={() => this.handleChange(index)}
                        >
                          <Card className="courselayout">
                            <CardMedia
                              className={classes.cardMedia}
                              component="img"
                              image={course.cover}
                              alt={"بدون عکس"}
                            />
                            <Divider />
                            <CardContent className={classes.cardContent}>
                              <div
                                style={{
                                  display: "flex",
                                  wordBreak: "break-all",
                                  direction: "rtl",
                                }}
                              >
                                <Typography gutterBottom className="text">
                                  <Box>نام کلاس :</Box>
                                </Typography>
                                <Typography
                                  gutterBottom
                                  className="text"
                                  style={{ marginRight: "4px" }}
                                >
                                  <Box fontWeight="fontWeightBold">
                                    {course.name}
                                  </Box>
                                </Typography>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  wordBreak: "break-all",
                                  direction: "rtl",
                                }}
                              >
                                <Typography gutterBottom className="text">
                                  <Box>موضوع کلاس :</Box>
                                </Typography>
                                <Typography
                                  gutterBottom
                                  className="text"
                                  style={{ marginRight: "4px" }}
                                >
                                  <Box fontWeight="fontWeightBold">
                                    {course.subject}
                                  </Box>
                                </Typography>
                              </div>
                            </CardContent>
                          </Card>
                        </Button>
                      </div>
                    ))}
                  />
                ))}
              </Tabs>
            </Paper>

            <Paper
              elevation={3}
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                height: "100%",
                marginRight: "18px",
                marginLeft: "18px",
              }}
            >
              <SwipeableViews
                axis={"x-reverse"}
                index={this.state.value}
                onChangeIndex={(e, v) => this.handleChange(v)}
              >
                {this.state.list.map((tabPanelCourse, tabPanelIndex) => (
                  <TabPanel
                    value={this.state.value}
                    index={tabPanelIndex}
                    key={tabPanelCourse.id}
                  >
                    <QuestionList courseId={tabPanelCourse.id} />
                  </TabPanel>
                ))}
              </SwipeableViews>
            </Paper>
          </div>
        ) : (
          <div>
            {!this.state.loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "30px",
                }}
              >
                <Typography gutterBottom className="text">
                  <Box fontSize={30} fontWeight="fontWeightBold">
                    هنوز کلاسی ساخته نشده است
                  </Box>
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(TabsClass);
