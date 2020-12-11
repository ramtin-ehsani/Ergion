import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddButtonAndPopUp from './PopUp/PopUp';
import "./CourseLayout.scss";
import { Link, useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';
import { Box, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
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
        // marginLeft: 10,
        // marginRight: theme.spacing(50),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        // paddingTop: '56.25%', // 16:9
        height: 180,
        width: '100%',
        objectFit: 'cover'
        // minHeight: "100%",
        // minWidth: "100%",
        // maxWidth: "100%",
        // maxHeight: "100%",
    },
    cardContent: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    cardActions: {
        padding: theme.spacing(0),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    gridTitle: {
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    
}));


function CourseLayout(props) {
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [isEmpty, setEmpty] = React.useState(false);
    const [list, setList] = React.useState([
    ]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    const handleCourse = (val) => {
        const newList = list.concat({ val });
        setList(newList);
    };

    React.useEffect(() => {
        // setTimeout(() => {
        const promise1 = axios.get('http://127.0.0.1:8000/api/student/courses/', {
            headers: {
                "Authorization": `Token ${localStorage.getItem('token')}`,
            },
        })
        promise1.then(
            result => {
                console.log(result)
                if (result.data.length > 0) {
                    setEmpty(false)
                    result.data.map((course) => {
                        const c = { id: course.id, name: course.name, image: course.course_cover, link: course.course_url, teacher: `${course.instructor_firstname} ${course.instructor_lastname}` }
                        console.log(c)
                        let flag = true;
                        props.courses.map(course => {
                            if (course.id === c.id) {
                                flag = false;
                            }
                        })

                        if (flag) {
                            props.onAddCourse(c);
                        }
                    })
                } else {
                    setEmpty(true)
                }
                setLoading(false)
            }
        )
        // }, 500)
    }, [])

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                {/* <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <AddButtonAndPopUp handleNewCourse={handleCourse}/>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div> */}
                <Dialog
                    className="dialog"
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                >
                    <DialogTitle className="dialog" id="alert-dialog-slide-title" dir='rtl'>{"آیا مطمئن هستید؟"}</DialogTitle>
                    <DialogContent className="dialog">
                        <DialogContentText id="alert-dialog-slide-description" dir='rtl'>
                            آیا درس مورد نطر را میخواهید حذف کنید؟
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions dir='rtl' className="dialog">
                        <Button onClick={handleClose} color="secondary">
                            بله
                    </Button>
                        <Button onClick={handleClose} color="primary">
                            نه
                    </Button>
                    </DialogActions>
                </Dialog>
                <Container className={classes.cardGrid} maxWidth="md" >
                    <Grid container dir="rtl" lg={10} item={true} className={classes.gridTitle} spacing={3} justify="flex-start" alignItems="baseline">
                        <Grid item >
                            <Typography className='typo' component="div">
                                <Box fontSize={20} fontWeight="fontWeightBold" m={1}>
                                    کلاس های من
                            </Box>
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Button className="addButton" variant="outlined" color="primary" onClick={() => { history.push('/student_dashboard/find-your-course') }}>
                                اضافه کردن کلاس جدید
                            </Button>
                        </Grid>
                    </Grid>
                    {/* End hero unit */}
                    <Grid container spacing={2} dir="rtl" lg={10} item={true} >
                        {loading && (
                            <CircularProgress />
                        )}

                        {isEmpty && (<Grid item >
                            <Typography className='typo' component="div">
                                <Box fontSize={20}  m={1}>
                                کلاسی یافت نشد
                            </Box>
                            </Typography>
                        </Grid>
                        )}

                        {props.courses.map((list) =>
                            <Grid item key={list.id} xs={12} sm={6} md={4} >
                                <Card className="layout">
                                    <CardMedia
                                        className={classes.cardMedia}
                                        component='img'
                                        image={list.image}
                                        title={list.name}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2" className="courseNamePlace">
                                            {list.name}
                                        </Typography>
                                        <Typography className="courseAboutPlace">
                                            {list.teacher}
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                    <Divider />
                                    <Divider />
                                    <Divider />
                                    <CardActions className={classes.cardActions}>
                                        <ButtonGroup dir="ltr" fullWidth>
                                            <Button
                                                startIcon={<DeleteIcon />}
                                                size="small" variant='contained' color="primary" onClick={handleClickOpen} className='toSee'>
                                                حذف
                                            </Button>
                                            <Divider style={{minWidth:'3px'}}/>
                                            <Button size="small" variant='contained' color="primary" className='toSee' href={`/student_dashboard/added_courses/${list.id}`}>
                                                مشاهده
                                                </Button>
                                        </ButtonGroup>
                                        {/* <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="center">
                                            <Button size="small" color="primary" onClick={handleClickOpen}>
                                                <p className="toSee">حذف</p>
                                            </Button>
                                            <Link to={`/student_dashboard/added_courses/${list.id}`} style={{ textDecoration: 'none' }}>
                                                <Button size="small" color="primary">
                                                    <p className="toSee">مشاهده</p>
                                                </Button>
                                            </Link>
                                        </Grid> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                        }
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        courses: state.addedCourses
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAddCourse: (course) => dispatch({ type: actionTypes.ADD_COURSE, payload: course })

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseLayout);