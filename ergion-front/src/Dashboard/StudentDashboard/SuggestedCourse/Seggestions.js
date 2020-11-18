import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {createMuiTheme, jssPreset, makeStyles, StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import "./Seggestions.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {create} from "jss";
import rtl from "jss-rtl";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

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
        paddingTop: theme.spacing(3),
        //boxShadow: "0 3px 40px 0 rgba(0,0,0,.6)",
        height: "fit-content",
        // marginTop: 20,

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
        // fontSize: 80,
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
        // paddingLeft: 20,
        textAlign: "right",
        fontWeight: "bolder",
    },
    test: {
        // backgroundColor: "gray",
        // height: 400,
        // border: '2px solid lightgray',
        // boxShadow: ,
        minWidth: 235,
        maxWidth: 235,
        maxHeight: 200,
        minHeight: 200,

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
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    rtl: true,
    pauseOnHover: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true
            }
        },
        {
            breakpoint: 760,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                dots: true
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                autoplaySpeed: 4000,
                autoplay: true,
            }
        }
    ]

}

const settingsLessThan3Mode = {
    dots: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 2500,
    rtl: true,
    pauseOnHover: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true
            }
        },
        {
            breakpoint: 760,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                dots: true

            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                autoplaySpeed: 4000,
                autoplay: true,

            }
        }
    ]

}

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const Suggestions = () => {
    const classes = useStyles();
    const history = useHistory();

    let slider = useRef();

    const [suggested, setSuggested] = useState(null);
    const [arrSize, setArrSize] = useState(0);

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
                // (suggested && suggested.map(() => (
                //     test = suggested.toString().length
                // )))
                const suggestedCourseSize = response.data.length
                setArrSize(suggestedCourseSize)
                console.log(response.data)
                console.log(response.data.length)
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
                            <Grid container dir="rtl" lg={10} item={true} className={classes.gridTitle} spacing={3}
                                  justify="flex-start" alignItems="baseline">
                                <Grid style={{width: "100%", display: "flex", flex: 1}} item>
                                    <Typography className='typography' component="div">
                                        <Box fontSize={20} fontWeight="fontWeightBold" m={1}>
                                            دروس پیشنهادی
                                        </Box>
                                    </Typography>
                                    <Grid dir="rtl" className="preAndNextButton" item>
                                        <SkipNextIcon className="nextButton"
                                                      onClick={() => slider.slickNext()}>{"<"}</SkipNextIcon>
                                        <SkipPreviousIcon className="nextButton"
                                                          onClick={() => slider.slickPrev()}>{">"}</SkipPreviousIcon>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container dir="rtl" lg={10} item={true} spacing={2}>
                                <div className="slider-items-parent"
                                     style={{width: "100%", dir: "rtl", marginTop: "5px"}}>
                                    {
                                        arrSize === 0 ? (
                                            <Typography className='typo' component="div">
                                                <Box fontSize={20} m={4}>
                                                    <p className="notFound">کلاسی یافت نشد!</p>
                                                </Box>
                                            </Typography>
                                        ) : (
                                            <Slider
                                                ref={c => (slider = c)} {...arrSize > 3 ? {...settings} : {...settingsLessThan3Mode}}>
                                                {suggested && suggested.map((course) => (
                                                    <div
                                                        key={course.id}
                                                        className="slider-items"
                                                        onClick={() => {
                                                            history.push(`/student_dashboard/added_courses/${course.id}`)
                                                        }}
                                                    >
                                                        <img
                                                            className={classes.test}
                                                            src={course.course_cover}
                                                            alt={course.name}
                                                        />
                                                        <div className='info'>
                                                            <p id='name'>{course.name}</p>
                                                            <p id='teacher'>استاد {course.instructor_lastname}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Slider>
                                        )
                                    }
                                </div>
                            </Grid>
                        </Container>
                    </div>
                </ThemeProvider>
            </StylesProvider>
        </React.Fragment>
    );
}

export default Suggestions;