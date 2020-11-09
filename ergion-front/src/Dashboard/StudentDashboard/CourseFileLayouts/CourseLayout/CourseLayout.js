import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddButtonAndPopUp from './PopUp/PopUp';
import "./CourseLayout.scss";
import myimg from '../../../../Pics/math.jpg';
import myimg2 from '../../../../Pics/physics.jpg';
import myimg3 from '../../../../Pics/lit.jpg';
import myimg4 from '../../../../Pics/cl.jpg';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

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
        paddingBottom: theme.spacing(3),
        marginLeft: theme.spacing(18),
        marginRight: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        // paddingTop: '56.25%', // 16:9
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

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function CourseLayout() {
    const [list, setList] = React.useState([
        { id: '123', name:'ریاضی 1', image:myimg, link:'/riazi1', teacher:'استاد علیپور'},
        { id: '125', name:'ادبیات 1', image:myimg3, link:'/adabiat1', teacher:'استاد رضایی'},
        { id: '126', name:'فیزیک 2', image:myimg2, link:'/phisic2', teacher:'استاد غلامی'},
        { id: '127', name:'ریاضی 3', image:myimg4, link:'/riazi3', teacher:'استاد علیپور'},
        { id: '129', name:'ریاضی 1', image:myimg, link:'/riazi1', teacher:'استاد جعفری'},
    ]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
    const handleCourse = (val) => {
        const newList = list.concat({val});

        setList(newList);
    };

    return (
        <React.Fragment>
            <CssBaseline/>
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
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {list.map((list) => (
                            <Grid item key={list.id} xs={12} sm={6} md={4}>
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
                                    <Divider/>
                                    <CardActions className={classes.cardActions}>
                                        <Grid
                                        container
                                        direction="row"
                                        justify="space-evenly"
                                        alignItems="center">
                                        <Button size="small" color="primary" onClick={handleClickOpen}>
                                            <p className="toSee">حذف</p>
                                        </Button>
                                        <Link to={list.link} style={{textDecoration: 'none'}}>
                                        <Button size="small" color="primary">
                                            <p className="toSee">مشاهده</p>
                                        </Button>
                                        </Link>
                                        </Grid>
                                    </CardActions>
                                </Card>                                    
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}