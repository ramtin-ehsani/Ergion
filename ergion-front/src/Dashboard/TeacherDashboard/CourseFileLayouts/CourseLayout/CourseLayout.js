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
import { Box } from '@material-ui/core';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import InputAdornment from '@material-ui/core/InputAdornment';
import purple from '@material-ui/core/colors/purple';
import Fab from "@material-ui/core/Fab";
import rtl from 'jss-rtl';
import { create } from 'jss';
import {
    TextField,
} from '@material-ui/core';

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
    gridTitle: {
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },





    newCourseRoot: {
        root: {
            height: 'auto',
        },

    },
    newCourseCardMedia: {
        height: 200,
        width: '100%',
        objectFit: 'cover',
        paddingLeft: 17,
        paddingRight: 17,
    },
    newCourseAddImageContainer: {
        position: 'relative',
        marginBottom: 10,
        marginTop: 10,

    },
    newCourseTitle: {
        backgroundColor: '#3f50b5',
        color: '#fff',
        textAlign: "center",

    },
    newCourseAddImage: {
        position: 'absolute',
        right: 25,
        bottom: 10,
        margin: 4,
        color: purple[900],
        width: 40,
        height: 40,
    },
    input: {
        display: "none"
    },
    newCourseButtonWidth: {
        width: 120,
        height: 40,
        fontSize: '1rem',
    },
    newCourseButtonContent: {
        // justifyContent:'space-between',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop: 10,
    },
    typoStyle: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 300,
        margin: 10,
    },




}));

const useFormInput = initialValue => {
    const [value, setValue] = React.useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

function CourseLayout(props) {

    // Add Course Dialog


    var numberOfId = 1;
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [coverImage, setCoverImage] = React.useState("");
    const newCourseName = useFormInput('');
    const newCourseSubject = useFormInput('');
    const newCourseGrade = useFormInput('1');
    const newCourseCapacity = useFormInput(10);
    const newCourseDescription = useFormInput('');
    const [id, setID] = React.useState(1)

    const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

    const onFileChange = event => {

        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0])
            setCoverImage(URL.createObjectURL(event.target.files[0]))
        }

    };

    function copyLink(id) {
        navigator.clipboard.writeText('http://localhost:3000/course/' + id)
    }

    const theme = createMuiTheme({
        typography: {
            fontFamily: '"Vazir", sans-serif'
        },
        direction: 'rtl'
    });
    const grades = [
        {
            value: '1',
            label: ' اول دبستان'
        },
        {
            value: '2',
            label: 'دوم دبستان'
        },
        {
            value: '3',
            label: 'سوم دبستان'
        },
        {
            value: '4',
            label: 'چهارم دبستان'
        },
        {
            value: '5',
            label: 'پنجم دبستان'
        },
        {
            value: '6',
            label: 'ششم دبستان'
        },
        {
            value: '7',
            label: 'هفتم'
        },
        {
            value: '8',
            label: 'هشتم'
        },
        {
            value: '9',
            label: 'نهم'
        },
        {
            value: '10',
            label: 'دهم'
        },
        {
            value: '11',
            label: 'یازدهم'
        },
        {
            value: '12',
            label: 'دوازدهم'
        },
    ];

    const addCourseButton = () => {
        alert('hi')

    }

    const newCourseButton = () => {
        setSelectedFile(null)
        setCoverImage("")
        setDialogOpen(true)

    }
    // const handleChange = (event) => {
    //     formData[event.target.name] = event.target.value
    //     this.setState({
    //       formData: formData
    //     })
    //   };
    const NewCourseDialog = (props) => {
        const { open, setOpen } = props;
        return (
            <StylesProvider jss={jss} >

                <ThemeProvider theme={theme} >

                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="error-dialog"
                        // TransitionComponent={Transition}
                        className={classes.newCourseRoot}
                    >

                        <DialogTitle id="error-dialog" dir='rtl' className={classes.newCourseTitle}>
                            ایجاد یک کلاس جدید
                        </DialogTitle>

                        <Divider />
                        <Divider />


                        <DialogContent>

                            <ValidatorForm form="form" onSubmit={addCourseButton} >

                                <div className={classes.newCourseAddImageContainer}>
                                    <Typography className={classes.typoStyle}>
                                        کاور
                                    </Typography>
                                    <CardMedia
                                        className={classes.newCourseCardMedia}
                                        component='img'
                                        image={coverImage}
                                    />
                                    <input
                                        accept="image/*"
                                        className={classes.input}
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={onFileChange}
                                    />
                                    <label htmlFor='contained-button-file'>

                                        <Fab
                                            component="span"
                                            className={classes.newCourseAddImage}>

                                            <AddPhotoAlternateIcon />

                                        </Fab>
                                    </label>
                                </div>

                                <CardContent>
                                    <Grid
                                        container
                                        spacing={3}
                                    >

                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextValidator
                                                fullWidth
                                                dir='rtl'
                                                label="موضوع"
                                                name="subject"
                                                {...newCourseSubject}
                                                required
                                                variant="outlined"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextValidator
                                                fullWidth
                                                dir='rtl'
                                                label="نام"
                                                name="name"
                                                {...newCourseName}
                                                required
                                                variant="outlined"
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            md={6}
                                            xs={12}


                                        >
                                            <TextField
                                                fullWidth
                                                label="مقطع"
                                                name="grade"
                                                dir='rtl'
                                                required
                                                {...newCourseGrade}
                                                select
                                                SelectProps={{ native: true }}
                                                variant="outlined"

                                            >
                                                {grades.map((option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >

                                            <TextValidator
                                                fullWidth
                                                InputProps={{ inputProps: { min: 0, max: 70 } }}
                                                label="ظرفیت"
                                                name="capacity"
                                                {...newCourseCapacity}
                                                dir='rtl'
                                                required
                                                contentEditable={false}
                                                type='number'
                                                variant="outlined"
                                                validators={['required', 'matchRegexp:^(?:[0-9]|[1-6][0-9]|70)$']}
                                                errorMessages={['this field is required', 'فقط اعداد بین 0 تا 70 مجاز است']}

                                            />

                                        </Grid>
                                        <Grid
                                            item
                                            md={12}
                                            xs={12}

                                        >
                                            <FormControl variant="outlined" fullWidth >
                                                <InputLabel htmlFor="outlined-copy">لینک</InputLabel>
                                                <OutlinedInput
                                                    id='outlined-copy'
                                                    label="لینک"
                                                    name="link"
                                                    disabled={true}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="copy"
                                                                onClick={() => copyLink(id)}
                                                                edge="end"
                                                            >
                                                                <FileCopyIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    // onChange={this.handleChange}
                                                    value={"http://localhost:3000/course/" + id}
                                                    variant="outlined"
                                                />
                                            </FormControl>

                                        </Grid>

                                        <Grid
                                            item
                                            md={12}
                                            xs={12}

                                        >
                                            <TextValidator
                                                fullWidth
                                                dir='rtl'
                                                label="توضیحات"
                                                name="description"
                                                {...newCourseDescription}
                                                variant="outlined"
                                                multiline={true}
                                                rows={5}
                                            />

                                        </Grid>

                                    </Grid>
                                </CardContent>



                            </ValidatorForm>
                        </DialogContent>

                        <Divider />
                        <Divider />

                        <DialogActions className={classes.newCourseButtonContent}>


                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => { setDialogOpen(false) }}
                                className={classes.newCourseButtonWidth}
                            >
                                لغو
                            </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                type='submit'
                                className={classes.newCourseButtonWidth}
                            >
                                ایجاد
                                </Button>
                        </DialogActions>



                    </Dialog>

                </ThemeProvider>
            </StylesProvider>
        );
    };





    // Add Course Dialog
















    const history = useHistory();
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
        setTimeout(() => {
            const promise1 = axios.get('http://127.0.0.1:8000/api/teacher-courses/', {
                headers: {
                    "Authorization": `Token ${localStorage.getItem('token')}`,
                },
            })
            promise1.then(
                result => {
                    console.log(result)
                    result.data.map((course) => {
                        numberOfId=course.id+1
                        const c = { id: course.id, name: course.name, image: course.course_cover, link: course.course_url, capacity: course.capacity }
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
                    setID(numberOfId)
                }
            )
        }, 500)
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




                <NewCourseDialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                />













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
                    <Grid container dir="rtl" lg={11} item={true} className={classes.gridTitle} spacing={3} justify="flex-start" alignItems="baseline">
                        <Grid item >
                            <Typography className='typo' component="div">
                                <Box fontSize={20} fontWeight="fontWeightBold" m={1}>
                                    کلاس های من
                            </Box>
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Button className="addButton" variant="outlined" color="primary" onClick={newCourseButton}>
                                ساختن کلاس جدید
                            </Button>
                        </Grid>
                    </Grid>
                    {/* End hero unit */}
                    <Grid container spacing={2} dir="rtl" lg={11} item={true} >
                        {props.courses.map((list) => (
                            <Grid item key={list.id} xs={12} sm={6} md={3} >
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
                                            {`ظرفیت : ${list.capacity}`}
                                        </Typography>
                                    </CardContent>
                                    <Divider />
                                    <Divider />
                                    <Divider />
                                    <Divider />
                                    <CardActions className={classes.cardActions}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="center">
                                            <Button size="small" color="primary" onClick={handleClickOpen}>
                                                <p className="toSee">حذف</p>
                                            </Button>
                                            <Link to={list.link} style={{ textDecoration: 'none' }}>
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