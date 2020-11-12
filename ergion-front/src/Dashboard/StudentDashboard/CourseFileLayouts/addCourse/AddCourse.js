import React, {useEffect, useState} from "react";
import "./AddCourse.scss";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {createMuiTheme, jssPreset, makeStyles, StylesProvider, ThemeProvider} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import {create} from "jss";
import rtl from "jss-rtl";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(3),
        // paddingBottom: theme.spacing(3),
        // marginLeft: theme.spacing(18),
        // marginRight: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        // paddingTop: '56.25%', // 16:9filteredList
        height: 270,
        width: '100%'
    },
    cardContent: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    cardActions: {
        height: 50,
        padding: theme.spacing(0.5),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'IRANSans',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': ["IRANSans"]
            },
        },
    },
    direction: 'rtl'
});


const AddCourse = () => {

    const classes = useStyles();

    const [courses, setCourses] = useState(null);


    const config = {
        // headers: {Authorization: `Token ${localStorage.getItem('api_key')}`},
        headers: {Authorization: `Token 40f12d53477df5c984be7cb411887bcdfdd9316a`},
    };
    const changeSearchBarHandler = (event) => {
        const API = "http://127.0.0.1:8000/api/all_courses/?substring=" + event.target.value;
        axios.get(API, config)
            .then((response) => {
                setCourses(response.data);
            })
    }

    useEffect(() => {
        const showAllAPI = "http://127.0.0.1:8000/api/all_courses/";
        axios.get(showAllAPI, config)
            .then((response) => {
                setCourses(response.data);
            })
    }, []);


    return (
        <React.Fragment>
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <main className="main">
                        <Container className={classes.cardGrid} maxWidth="lg">
                            <Grid lg={10} item={true}>
                                <TextField
                                    className="textFieldSearchbar"
                                    variant="outlined"
                                    margin="normal"
                                    dir="rtl"
                                    label={
                                        <div className="labelOFSearchbar">
                                            <SearchIcon className="search_Icon"/>
                                            دوره خودتو پیدا کن
                                        </div>
                                    }
                                    autoFocus
                                    onChange={changeSearchBarHandler}
                                    color="primary"
                                />
                            </Grid>
                            <Box mt={6}/>
                            <Grid container lg={10} item={true}>
                                {/*<Grid container spacing={3} lg={10} item={true}>*/}
                                {courses && courses.map((course) =>
                                    <Grid className="cardSpacing" item key={course.id} xs={12} sm={6} md={3}>
                                        <Card className="layout">
                                            <CardMedia
                                                className={classes.cardMedia}
                                                component='img'
                                                image={course.poster}
                                                title={course.name}
                                            />
                                            <CardContent className={classes.cardContent} spacing={3}>
                                                <Typography gutterBottom variant="h5" component="h2"
                                                            className="courseNamePlace">
                                                    {course.name}
                                                </Typography>
                                                <Typography className="courseOwnerPlace" component="h4">
                                                    مدرس: {course.owner_firstname + " " + course.owner_lastname}
                                                </Typography>
                                                <Typography className="courseCapacityPlace" component="h6">
                                                    {course.capacity + " "}:ظرفیت کلاس
                                                </Typography>
                                            </CardContent>
                                            <Divider/>
                                            <Divider/>
                                            <Divider/>
                                            <Divider/>
                                            <CardActions className={classes.cardActions}>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="space-evenly"
                                                    alignItems="center">
                                                    <Button className="sss" size="small" color="primary">
                                                        <p className="toSee">مشاهده</p>
                                                    </Button>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                        {/*<Box mb={3}/>*/}
                                    </Grid>
                                )}
                            </Grid>
                        </Container>
                    </main>
                </ThemeProvider>
            </StylesProvider>
        </React.Fragment>

    );
}
export default AddCourse;