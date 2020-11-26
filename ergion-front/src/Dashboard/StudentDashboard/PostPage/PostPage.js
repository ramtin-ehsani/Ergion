import React, { useEffect, useRef, useState } from "react";
import "./PostPage.scss";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import {
    makeStyles,
    Theme,
    createStyles,
    StylesProvider,
    ThemeProvider,
    jssPreset,
} from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import img from "../../../Pics/b59d9ae6fbaa82f17894fd7ed5f8ede0.jpg";
import vid from "../../../Pics/test.mp4";
import pddf from "../../../Pics/HW.pdf";
import CssBaseline from "@material-ui/core/CssBaseline";
import { create } from "jss";
import rtl from "jss-rtl";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import { func } from "prop-types";
import { Divider } from "@material-ui/core";

const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontFamily: "IRANSans",
            // maxWidth: "75%",
            justifyContent: "center",
            // backgroundColor: "pink",
            alignItems: "center",
            textAlign: "center",
        },
        media: {
            // paddingTop: "30%",
            // height: 400,
        },
        title: {
            fontFamily: "IRANSans",
        },
        tab: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
    })
);

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
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

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function a11yProps(index: any) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
}

const PostPage = () => {
    let [width, setWidth] = useState(getWidth());
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [isRed, setIsRed] = useState(false);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    function toggleRedColor() {}

    const test = [
        {
            name: "pdf.جزوه_امروز_فیزیک۱",
            value: pddf,
        },
        {
            name: "png.تست",
            value: img,
        },
        {
            name: "mp4.فیلم_اموزشی",
            value: vid,
        },
    ];

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(getWidth());
        });
    }, []);

    return (
        <React.Fragment>
            <StylesProvider jss={jss}>
                <CssBaseline />
                <div
                    style={
                        width > 1279
                            ? {
                                  minWidth: width - 247,
                                  maxWidth: width - 247,
                                  backgroundColor: "none",
                              }
                            : { backgroundColor: "none", width: "100%" }
                    }
                    className="post-page-main"
                >
                    <Container
                        style={{ backgroundColor: "none", paddingTop: 20 }}
                    >
                        <Grid
                            style={{
                                dir: "rtl",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                backgroundColor: "none",
                            }}
                        >
                            <div className={classes.tab} dir="rtl">
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        aria-label="scrollable auto tabs example"
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                        }}
                                    >
                                        <Tab
                                            label="فایل اصلی"
                                            className="post-tabs"
                                            {...a11yProps[0]}
                                        />
                                        <Tab
                                            label="فایل های ضمیمه"
                                            className="post-tabs"
                                            {...a11yProps[1]}
                                        />
                                    </Tabs>
                                </AppBar>

                                <TabPanel value={value} index={0}>
                                    <Card className={classes.root} dir="rtl">
                                        <CardHeader
                                            className={classes.title}
                                            avatar={
                                                <Avatar
                                                    aria-label="recipe"
                                                    className={classes.avatar}
                                                    src={img}
                                                >
                                                    R
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                            title={
                                                <Typography
                                                    className="instructor"
                                                    component="h4"
                                                >
                                                    صادق جعفری
                                                </Typography>
                                            }
                                            subheader={
                                                <Typography
                                                    className="date"
                                                    component="h6"
                                                >
                                                    شنبه ۱۳۹۹/۱۱/۱۱
                                                </Typography>
                                            }
                                        />

                                        <CardMedia
                                            className={classes.media}
                                            // image={img}
                                            title="Paella dish"
                                        >
                                            <video
                                                width="100%"
                                                height="400"
                                                controls
                                            >
                                                <source
                                                    src={vid}
                                                    type="video/mp4"
                                                />
                                                Sorry, your browser doesn't
                                                support embedded videos.
                                            </video>
                                        </CardMedia>

                                        <CardContent>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                component="p"
                                                className="aboutPost"
                                            >
                                                هوش مصنوعی را باید گستره پهناور
                                                تلاقی و ملاقات بسیاری از
                                                دانش‌ها، علوم، و فنون قدیم و
                                                جدید دانست. ریشه‌ها و ایده‌های
                                                اصلی آن را باید در فلسفه،
                                                زبان‌شناسی، ریاضیات، روان‌شناسی،
                                                عصب‌شناسی، فیزیولوژی، تئوری
                                                کنترل، احتمالات و بهینه‌سازی
                                                جستجو کرد و کاربردهای گوناگون و
                                                فراوانی در علوم رایانه، علوم
                                                مهندسی، علوم .زیست‌شناسی و
                                                پزشکی، علوم اجتماعی و بسیاری از
                                                علوم دیگر دارد
                                            </Typography>
                                        </CardContent>

                                        <CardActions
                                            className="post-footer"
                                            dir="ltr"
                                        >
                                            <div className="icon-footer">
                                                <IconButton className="comment-icon">
                                                    <CommentIcon />
                                                </IconButton>
                                                <span className="span-footer"></span>
                                                <div className="share-like-icon">
                                                    <IconButton>
                                                        <ShareIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() =>
                                                            setIsRed(!isRed)
                                                        }
                                                    >
                                                        {/* <FavoriteIcon {...isRed ? style={color: "none"} : style={color: "red"}}/> */}
                                                        <FavoriteIcon
                                                            style={{
                                                                color: isRed
                                                                    ? "red"
                                                                    : "gray",
                                                            }}
                                                        />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </CardActions>
                                    </Card>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    {test.map((item) => (
                                        <Card className="attachment" dir="rtl">
                                            <div className="files-attachment">
                                                {item.name}
                                            </div>
                                            <Button
                                                href={item.value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className="download-files"
                                            >
                                                دریافت فایل
                                                <Box ml={1} />
                                                <DownloadIcon />
                                            </Button>
                                        </Card>
                                    ))}
                                </TabPanel>
                            </div>
                        </Grid>
                    </Container>
                </div>
            </StylesProvider>
        </React.Fragment>
    );
};

export default PostPage;
