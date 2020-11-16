import React, {useEffect, useState} from 'react';
import axios from "axios";
import {createMuiTheme, jssPreset, makeStyles, StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import myimg from '../../../Pics/math.jpg';
import "./Seggestions.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import {Box} from "@material-ui/core";
// import Button from "@material-ui/core/Button";
import {create} from "jss";
import rtl from "jss-rtl";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
// import myimg2 from '../../../Pics/physics.jpg';
// import myimg3 from '../../../Pics/lit.jpg';

const theme = createMuiTheme({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    }
})

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em',
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(10,10,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0,.2)',
        }
    },
    root: {
        height: "100vh",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // backgroundColor: "aqua",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    img: {
        height: "100%",
        width: "100%",
        // minWidth: 250,
        // minHeight: 300,
        // maxHeight: 300,
        // maxWidth: 250,
        // backgroundColor: "aqua",
        // width: "100%",
        // display: "flex",
        // position: "absolute",
        // objectFit: 'cover'
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    gridTitle: {
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    cardGrid: {
        // paddingTop: theme.spacing(3),
        boxShadow: "0 3px 40px 0 rgba(0,0,0,.06)",
        height: "fit-content",
        marginTop: 20,

        // backgroundColor: "aqua",

        // paddingBottom: theme.spacing(3),
        // marginLeft: theme.spacing(18),
        // marginRight: theme.spacing(30),
    },
    layout: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "IRANSans",
        fontSize: 80,
    },
    header: {
        fontWeight: "bolder",
        textAlign: "center"
    },
    spanName: {
        fontSize: 17,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    typo: {
        // backgroundColor: "pink",
        justify: "flex-start",
        fontFamily: "IRANSans",
        alignItems: "baseline",
        paddingLeft: 20,
        textAlign: "right",
        fontWeight: "bolder",
    },
    test: {
        // backgroundColor: "gray",
        // height: 400,
        // border: '2px solid lightgray',
        // boxShadow: ,
        minWidth: 295,
        maxWidth: 295,
        maxHeight: 300,
        minHeight: 300,

        // height: 100,
    }
}));

// const tileData = [
//     {
//         img: myimg,
//         title: 'ریاضی 1',
//         author: 'استاد امیری'
//     },
//     {
//         img: myimg2,
//         title: 'فیزیک 2',
//         author: 'استاد اکبری'
//     },
//     {
//         img: myimg3,
//         title: 'ادبیات',
//         author: 'استاد جعفری'
//     }
// ]

const settings = {
    dots: true,
    // infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    // centerMode: true,
    // className: "center",
    pauseOnHover: true,
    // centerPadding: "100px",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                // dots: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                dots: true

            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true

            }
        }
    ]

}

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const Suggestions = () => {
    const classes = useStyles();
    const [suggested, setSuggested] = useState(null);
    const [hovered, setHovered] = useState([]);
    const config = {
        headers: {
            "Authorization": `Token ${localStorage.getItem('api_key')}`,
        },
    }
    useEffect(() => {
        const api = "http://127.0.0.1:8000/api/suggested-courses/";
        axios.get(api, config)
            .then((response) => {
                setSuggested(response.data);
                console.log(response.data)
                console.log("test")
            })
    }, []);

    // return (
    // <div style={{width: "70%", dir: "rtl", marginLeft: 30}}>
    //     <Slider {...settings}>
    //         {
    //             suggested && suggested.map((course) =>
    //                 <div >
    //                     <img
    //                         style={{maxWidth: "250px", maxHeight: "250px", minWidth: "250px", minHeight: "250px"}}
    //                         src={course.course_cover} alt={course.name}/>
    //                     <p>salam</p>
    //                 </div>
    //             )
    //         }
    //     </Slider>
    // </div>
    // );

    return (
        <React.Fragment>
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div className={classes.root}>
                        <Container maxWidth="md" className={classes.cardGrid}>
                            <Grid item>
                                <Typography className={classes.typo} component="div">
                                    <Box alignItems="baseline" justify="flex-start" fontSize={20}
                                         fontWeight="fontWeightBold" m={4}>
                                        دروس پیشنهادی
                                    </Box>
                                </Typography>
                            </Grid>
                            <Box mt={6}/>
                            {/*<Grid container dir="rtl" lg={11} item={true} justify="flex-start" alignItems="baseline">*/}
                            {/*    <GridList cols={2.5} className={classes.gridList}>*/}
                            <Grid>
                                {/*<GridList style={{width: "70%", dir: "rtl", marginLeft: 30}} cellHeight={350} spacing={12} lg={10} cols={3.5} dir="rtl" className={classes.gridList}>*/}
                                <div style={{height: "400px", width: "100%", dir: "rtl"}}>
                                    <Slider {...settings}>
                                        {suggested && suggested.map((course, index) => (
                                            // <Slider></Slider>
                                            <div
                                                key={course.id}
                                                className="sssss"
                                                // style={{marginLeft: "50px", justifyContent: "center", display: "flex"}}
                                                // className={classes.img}
                                                          onMouseOver={() => {
                                                              let test = [...hovered];
                                                              test[index] = true;
                                                              setHovered(test)
                                                          }}
                                                          onMouseLeave={() => {
                                                              let test = [...hovered];
                                                              test[index] = false;
                                                              setHovered(test)
                                                          }}
                                            >
                                                <img
                                                    className={classes.test}
                                                    src={course.course_cover}
                                                    alt={course.name}
                                                />
                                                {/*{*/}
                                                {/*    // hovered[index] && (*/}
                                                {/*hovered[index] && (*/}
                                                {/*<GridListTileBar*/}
                                                {/*    dir="rtl"*/}
                                                {/*    className={classes.layout}*/}
                                                {/*    title={*/}
                                                {/*        <div>*/}
                                                {/*            <span className={classes.spanName}>{course.name}</span>*/}
                                                {/*        </div>*/}
                                                {/*    }*/}
                                                {/*    // subtitle={<span className={classes.spanName}>استاد {course.instructor_lastname}</span>}*/}
                                                {/*    actionIcon={*/}
                                                {/*        <IconButton onClick={() => console.log(course.name)}*/}
                                                {/*                    aria-label={`info about ${course.name}`}*/}
                                                {/*                    className={classes.icon}>*/}
                                                {/*            <InfoIcon style={{fill: 'whitesmoke'}}/>*/}
                                                {/*        </IconButton>*/}
                                                {/*    }*/}
                                                {/*/>*/}
                                                {/*)*/}
                                                {/*}*/}
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                                {/*</GridList>*/}
                            </Grid>
                        </Container>
                    </div>
                </ThemeProvider>
            </StylesProvider>
        </React.Fragment>
    );
}

export default Suggestions;