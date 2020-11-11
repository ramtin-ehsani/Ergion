import React, {useEffect, useState} from "react";
import "./AddCourse.scss";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

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
        padding: theme.spacing(0.5),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));


const AddCourse = () => {

    const classes = useStyles();

    const [courses, setCourses] = useState(null);


    const config = {
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
        const showAllAPI = "http://127.0.0.1:8000/api/all_courses/?substring=";
        axios.get(showAllAPI, config)
            .then((response) => {
                setCourses(response.data);
            })
    }, [])


    return (
        <React.Fragment>
            <CssBaseline/>
            <main className="main">
                <Container className={classes.cardGrid} maxWidth="md">
                    <TextField placeholder="Search..." onChange={changeSearchBarHandler}/>
                    <Box mt={6}/>
                    <Grid container spacing={4}>
                        {courses && courses.map((course) =>
                            <Grid item key={course.id} xs={12} sm={6} md={3}>
                                <Card className="layout">
                                    <CardMedia
                                        className={classes.cardMedia}
                                        component='img'
                                        image={course.poster}
                                        title={course.name}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2"
                                                    className="courseNamePlace">
                                            {course.name}
                                        </Typography>
                                        <Typography className="courseAboutPlace">
                                            {course.owner_firstname + " " + course.owner_lastname}
                                        </Typography>
                                    </CardContent>
                                    <Divider/>
                                    <CardActions className={classes.cardActions}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="center">
                                            <Typography className="courseAboutPlace">
                                                {course.capacity} ظرفیت
                                            </Typography>
                                            <Button size="small" color="primary">
                                                <p className="toSee">مشاهده</p>
                                            </Button>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>

    );
}
export default AddCourse;