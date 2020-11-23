import React, {useEffect, useRef, useState} from 'react';
import './PostPage.scss'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import {makeStyles, Theme, createStyles, StylesProvider, ThemeProvider, jssPreset} from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from "@material-ui/icons/MoreVert"
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import img from "../../../Pics/b59d9ae6fbaa82f17894fd7ed5f8ede0.jpg"
import vid from "../../../Pics/test.mp4"
import pddf from "../../../Pics/HW.pdf"
import CssBaseline from "@material-ui/core/CssBaseline";
import {create} from "jss";
import rtl from "jss-rtl";

const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontFamily: "IRANSans",
            maxWidth: "75%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
        },
        media: {
            // paddingTop: "30%",
            // height: 400,
        },
        title: {
            fontFamily: "IRANSans"
        }
    }),
);

const jss = create({plugins: [...jssPreset().plugins, rtl()]});


const PostPage = () => {
    let [width, setWidth] = useState(getWidth());
    const classes = useStyles();

    // const testList = [
    //     {
    //         name: "هوش مصنوعی",
    //         instructor: "صادق جعفری",
    //         img: img,
    //         src: img,
    //         text: "nfkjsjbfhsdbhdbchsdbhsdchsc" +
    //             "buccdccssgfydsgfsgfgfygfygfy" +
    //             "ufsygfgfygfygfgfgfgfgfygfyy",
    //     },
    //     {
    //         name: "ریاضی ۱",
    //         instructor: "رضا رضایی",
    //         img: img,
    //         src: vid,
    //         text: "nfkjsjbfhsdbhdbchsdbhsdchsc" +
    //             "buccdcتستزتسزستزستزستgfygfygfy" +
    //             "ufsygfgfygfygfgfgfgfgfygfyy",
    //     },
    //     {
    //         name: "فیزیک ۲",
    //         instructor: "عطار رضاییان",
    //         img: img,
    //         src: pddf,
    //         text: "nfkjsjbfhsdbhdbchsdbhsdchsc" +
    //             "buccdccسلام     خوبی؟    gfygfy" +
    //             "ufsygfgfygfygfgfgfgfgfygfyy",
    //     },
    // ]

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(getWidth())
        })
    }, []);


    return (
        <React.Fragment>
            <StylesProvider jss={jss}>
                <CssBaseline/>
                <div style={width > 1279 ? {minWidth: width - 247, maxWidth: width - 247, backgroundColor: "none"}
                    : {backgroundColor: "none", width: "100%"}} className="post-page-main">
                    <Container style={{backgroundColor: "none", paddingTop: 20}}>
                        <Grid style={{
                            dir: "rtl",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            backgroundColor: "none"
                        }}>
                            <Card className={classes.root} dir="rtl">

                                <CardHeader
                                    className={classes.title}
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar} src={img}>
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon/>
                                        </IconButton>
                                    }
                                    title={
                                        <Typography className="instructor" component="h4">
                                            صادق جعفری
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography className="date" component="h6">
                                            شنبه
                                            ۱۳۹۹/۱۱/۱۱
                                        </Typography>
                                    }
                                />

                                <CardMedia
                                    className={classes.media}
                                    // image={img}
                                    title="Paella dish"
                                >
                                    {/*<video width="100%" height="400" controls >*/}
                                    {/*    <source src={vid} type="video/mp4"/>*/}
                                    {/*</video>*/}
                                </CardMedia>


                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p"
                                                className="aboutPost">
                                        هوش مصنوعی را باید گستره پهناور تلاقی و ملاقات بسیاری از دانش‌ها، علوم، و
                                        فنون
                                        قدیم و جدید دانست. ریشه‌ها و ایده‌های اصلی آن را باید در فلسفه، زبان‌شناسی،
                                        ریاضیات، روان‌شناسی، عصب‌شناسی، فیزیولوژی، تئوری کنترل، احتمالات و
                                        بهینه‌سازی
                                        جستجو کرد و کاربردهای گوناگون و فراوانی در علوم رایانه، علوم مهندسی، علوم
                                        .زیست‌شناسی و پزشکی، علوم اجتماعی و بسیاری از علوم دیگر دارد
                                    </Typography>
                                </CardContent>


                                <CardActions className="post-footer">
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon/>
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon/>
                                    </IconButton>
                                    <IconButton>
                                        <CommentIcon/>
                                    </IconButton>
                                </CardActions>


                            </Card>
                            {/*<Box mt={6}/>*/}
                            {/*<Card className={classes.root} dir="rtl">*/}

                            {/*    <CardHeader*/}
                            {/*        className={classes.title}*/}
                            {/*        avatar={*/}
                            {/*            <Avatar aria-label="recipe" className={classes.avatar} src={img}>*/}
                            {/*                R*/}
                            {/*            </Avatar>*/}
                            {/*        }*/}
                            {/*        action={*/}
                            {/*            <IconButton aria-label="settings">*/}
                            {/*                <MoreVertIcon/>*/}
                            {/*            </IconButton>*/}
                            {/*        }*/}
                            {/*        title={*/}
                            {/*            <Typography className="instructor" component="h4">*/}
                            {/*                سلام خوبی؟*/}
                            {/*            </Typography>*/}
                            {/*        }*/}
                            {/*        subheader={*/}
                            {/*            <Typography className="date" component="h6">*/}
                            {/*                ۱۳۹۹/۱۱/۱۱*/}
                            {/*                شنبه*/}
                            {/*            </Typography>*/}
                            {/*        }*/}
                            {/*    />*/}

                            {/*    <CardMedia*/}
                            {/*        className={classes.media}*/}
                            {/*        title="Paella dish"*/}
                            {/*    >*/}
                            {/*        <video width="400" height="400" controls >*/}
                            {/*            <source src={vid} type="video/mp4"/>*/}
                            {/*        </video>*/}
                            {/*    </CardMedia>*/}


                            {/*    <CardContent>*/}
                            {/*        <Typography variant="body2" color="textSecondary" component="p"*/}
                            {/*                    className="aboutPost">*/}
                            {/*            salam*/}
                            {/*        </Typography>*/}
                            {/*    </CardContent>*/}


                            {/*    <CardActions className="post-footer">*/}
                            {/*        <IconButton aria-label="add to favorites">*/}
                            {/*            <FavoriteIcon/>*/}
                            {/*        </IconButton>*/}
                            {/*        <IconButton aria-label="share">*/}
                            {/*            <ShareIcon/>*/}
                            {/*        </IconButton>*/}
                            {/*        <IconButton>*/}
                            {/*            <CommentIcon/>*/}
                            {/*        </IconButton>*/}
                            {/*    </CardActions>*/}


                            {/*</Card>*/}
                        </Grid>
                    </Container>
                </div>
            </StylesProvider>
        </React.Fragment>
    );
}

export default PostPage;