import React from 'react';
import Button from '@material-ui/core/Button';
import SwipeableViews from "react-swipeable-views";
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Typography, IconButton } from '@material-ui/core';
import ReactPlayer from 'react-player'
import Slide from '@material-ui/core/Slide';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import BallotIcon from '@material-ui/icons/Ballot';
import CircularProgress from '@material-ui/core/CircularProgress';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CommentIcon from '@material-ui/icons/Comment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ShareIcon from '@material-ui/icons/Share';
import axios from 'axios';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Tab, Tabs, Avatar } from "@material-ui/core";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import ImageIcon from '@material-ui/icons/Image';
import { AttachFile, Description, PictureAsPdf, MovieCreationOutlined } from '@material-ui/icons';
import human from '@jacobmarshall/human-time';

const styles = (theme) => ({
    root: {
        // height: 'auto',
        width: '100%',
        // flexGrow: 1,
    },
    paperStyle: {
        marginBottom: theme.spacing(2),
    },
    alertStyle: {
        display: 'flex',
        font: '20'
    },
    mediaCardPaperStyle: {
        borderRadius: 4,
        boxShadow: 20
    },
    tabFont: {
        fontSize: 16,
    },

});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
    typography: {
        fontFamily: '"Vazir", sans-serif'
    },
    direction: 'rtl'
});
function Alert(props) {

    return (
        <StylesProvider jss={jss} >
            <ThemeProvider theme={theme} >
                <MuiAlert elevation={6} variant="filled" {...props} />
            </ThemeProvider>
        </StylesProvider>);
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ height: "8rem" }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



class TimeLine extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: true,
            shareDialogOpen: false,
            link: '',
            snackBarOpen:false,

        };
    }


    HandlePreviewIcon = (props) => {
        const { src } = props

        const type = this.fileNameExtractor(src)

        if (type.includes("mp4")) return <MovieCreationOutlined color='primary' />
        if (type.includes("jpg")
            || type.includes("jpeg")
            || type.includes("png")) {
            return <ImageIcon color='primary' />
        }
        if (type.includes("zip")) return <Description color='primary' />

        if (type.includes("pdf")) return <PictureAsPdf color='primary' />

        return <AttachFile color='primary' />

    }

    openShareDialog = (shareLink) => {
        this.setState({ link: shareLink, shareDialogOpen: true })

    }

    componentDidMount() {
        this._isMounted = true;
        this.getValues()

    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    config = {
        headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
    }




    getValues = () => {
        axios.get('http://127.0.0.1:8000/api/student-episodes/', this.config)
            .then((response) => {
                // handle success
                console.log(response.data)
                const l = []

                response.data.map((episode) => {
                    const episodeObject = {
                        id: episode.id,
                        name: episode.name,
                        description: episode.episode_description,
                        tabValue: 0,
                        instructor_firstName: episode.instructor_firstname,
                        instructor_lastName: episode.instructor_lastname,
                        instructor_profilePic: episode.instructor_profile_picture,
                        episode_or_news_url: episode.episode_url,
                        course_url: episode.course_url,
                        files: episode.files,
                        time: episode.creation_time,



                    }
                    l.push(episodeObject)
                })
                l.sort((a, b) => (a.time < b.time) ? 1 : -1)
                if (this._isMounted) {
                    this.setState({ list: l, loading: false })
                }



            })
            .catch((error) => {
                // handle error
                this.setState({ loading: false })
                console.log(error);
            })
    }


    font = 28;


    handleTabChange = (newValue, episodeIndex) => {
        const results = this.state.list.map((item, idx) => {
            if (episodeIndex === idx) {
                return {
                    ...item,
                    tabValue: newValue
                }
            }
            return item;
        });
        this.setState({ list: results })
    };

    handleDownload = (file) => {
        axios({
            url: file,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.fileNameExtractor(file));
            document.body.appendChild(link);
            link.click();
        }).catch((error) => {
            console.log(error)
        })

    }


    fileNameExtractor = (src) => {
        const lastIndexOfSlash = String(src).lastIndexOf('/')
        const lastIndexOfDot = String(src).lastIndexOf('.')
        let name = String(src).substring(lastIndexOfSlash + 1)
        const type = String(src).substring(lastIndexOfDot)

        if (name.length > 15) {
            name = name.substring(0, 15) + type
        }
        return name

    }

    copyLink = () => {
        navigator.clipboard.writeText(this.state.link)
        this.setState({ snackBarOpen: true })
    }

    onSnackBarClose = (event,reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackBarOpen: false })
    }

    dialogOnclose = () => {
        this.setState({ shareDialogOpen: false })
    }

    TypeOfFile = (props) => {

        const { src } = props
        const { classes } = this.props

        const lastIndexOfSlash = String(src).lastIndexOf('/')
        const lastIndexOfDot = String(src).lastIndexOf('.')
        let name = String(src).substring(lastIndexOfSlash + 1)
        const type = String(src).substring(lastIndexOfDot)

        if (name.length > 15) {
            name = name.substring(0, 15) + type
        }

        if (type === '.mp4') {
            return (
                <div
                >
                    <ReactPlayer
                        width='100%'
                        height='100%'
                        url={src}
                        controls />


                    <Typography >
                        <Box fontSize={16} dir="ltr" fontWeight="fontWeightBold" textAlign='center' style={{ marginTop: '10px', marginBottom: '10px' }}>
                            {name}
                        </Box>

                    </Typography></div>
            )
        }

        return null


    }


    render() {
        const { classes } = this.props;
        return (
            <StylesProvider jss={jss} >

                <ThemeProvider theme={theme} >

                    <Snackbar
                        open={this.state.snackBarOpen}
                        autoHideDuration={1000}
                        onClose={this.onSnackBarClose}
                        dir='rtl'
                    >

                        <Alert onClose={this.onSnackBarClose} severity="success" className={classes.alertStyle} >
                            کپی شد

                        </Alert>
                    </Snackbar>

                    <Dialog
                        open={this.state.shareDialogOpen}
                        onClose={this.dialogOnclose}
                        aria-labelledby="share-dialog"
                        fullWidth={true}
                        maxWidth={'sm'}
                    >

                        <DialogTitle id="share-dialog" dir='rtl' >
                            اشتراک گذاری
                    </DialogTitle>
                        <DialogContent>
                            <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel htmlFor="outlined-adornment-link">لینک</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-link"
                                    label='لینک'
                                    defaultValue={this.state.link}
                                    disabled={true}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={this.copyLink}
                                                edge="end"
                                            >
                                                <FileCopyIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>

                        </DialogContent>

                        <DialogActions >
                            <Button
                                color="primary"
                                onClick={this.dialogOnclose}
                                style={{ margin: '8px' }}
                            >
                                لغو
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <div className={classes.root}>
                        {this.state.loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                                <CircularProgress />
                            </div>

                        ) : (
                                <div>

                                    {this.state.list.length > 0 ? (
                                        <div>
                                            {this.state.list.map((timeline, index) => (

                                                <div className={classes.paperStyle} key={timeline.id}>
                                                    <Slide direction="left" mountOnEnter unmountOnExit in={true} timeout={700} >

                                                        <Paper className={classes.mediaCardPaperStyle}
                                                            style={{ padding: '16px', marginBottom: '12px', marginTop: '12px' }}
                                                        >
                                                            <Grid container spacing={2} dir="rtl"

                                                            >
                                                                <Grid item lg={12} md={12} sm={12} xs={12}
                                                                    style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
                                                                    <div style={{ display: 'flex' }}>

                                                                        <Avatar src={timeline.instructor_profilePic} style={{ width: 70, height: 70 }} />
                                                                        <div>
                                                                            <div style={{ display: 'flex' }}>
                                                                                <Typography
                                                                                    style={{
                                                                                        marginRight: '12px', alignSelf: 'flex-start'
                                                                                    }}

                                                                                >
                                                                                    <Box fontSize={20} fontWeight="fontWeightBold"

                                                                                    >
                                                                                        {timeline.instructor_firstName + ' ' + timeline.instructor_lastName}

                                                                                    </Box>


                                                                                </Typography>

                                                                                <Typography
                                                                                    // dir="ltr"
                                                                                    style={{
                                                                                        marginRight: '8px', alignSelf: 'flex-start', marginTop: '6px'
                                                                                    }}

                                                                                >
                                                                                    <Box fontSize={14} style={{ color: 'grey' }}

                                                                                    >
                                                                                        {' . ' + human(new Date(timeline.time))
                                                                                            .replace('hours', 'ساعت')
                                                                                            .replace('hour', 'ساعت')
                                                                                            .replace('minutes', 'دقیقه')
                                                                                            .replace('minute', 'دقیقه')
                                                                                            .replace('days', 'روز')
                                                                                            .replace('day', 'روز')
                                                                                            .replace('seconds', 'ثانیه')
                                                                                            .replace('second', 'ثانیه')
                                                                                            .replace('ago', 'پیش')}

                                                                                    </Box>


                                                                                </Typography>

                                                                            </div>
                                                                            <div style={{ display: 'flex' }}>
                                                                                <Typography
                                                                                    style={{
                                                                                        alignSelf: 'flex-start', marginTop: '6px', marginRight: '12px'
                                                                                    }}

                                                                                >
                                                                                    <Box fontSize={20}

                                                                                    >
                                                                                        {timeline.name}

                                                                                    </Box>
                                                                                </Typography>
                                                                            </div>
                                                                        </div>



                                                                    </div>

                                                                </Grid>


                                                                <Grid item md={12} lg={12}
                                                                    style={{ padding: '16px', marginRight: 85 }}
                                                                    xs={12}>

                                                                    {timeline.files.map((file) =>

                                                                        <this.TypeOfFile src={file.file} key={file.id} />

                                                                    )}


                                                                </Grid>
                                                                <Grid item
                                                                    md={12} lg={12} sm={12}
                                                                    style={{ padding: '16px', marginRight: 85 }}
                                                                    xs={12}>
                                                                    <Tabs
                                                                        indicatorColor="primary"
                                                                        textColor="primary"
                                                                        value={timeline.tabValue}
                                                                        onChange={(e, v) => this.handleTabChange(v, index)}>
                                                                        <Tab label="توضیحات" {...a11yProps(0)} className={classes.tabFont} />
                                                                        <Tab label="فایل ها" {...a11yProps(1)} className={classes.tabFont} />
                                                                    </Tabs>

                                                                    <div style={{ width: '100%', overflow: 'auto', wordBreak: 'break-all' }}>
                                                                        <SwipeableViews
                                                                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                                                            index={timeline.tabValue}
                                                                            onChangeIndex={(e, v) => this.handleTabChange(v, index)}
                                                                        >
                                                                            <TabPanel value={timeline.tabValue} index={0} >

                                                                                <div
                                                                                    style={{
                                                                                        alignSelf: 'center',
                                                                                        padding: '6px'
                                                                                    }}
                                                                                >

                                                                                    <Typography component='div'
                                                                                    >
                                                                                        <Box fontSize={18} textAlign='center' >
                                                                                            {timeline.description !== '' ? timeline.description : '(توضیحی وجود ندارد)'}
                                                                                        </Box>

                                                                                    </Typography>



                                                                                </div>

                                                                            </TabPanel>
                                                                            <TabPanel value={timeline.tabValue} index={1}>
                                                                                {timeline.files.length > 0 ? (
                                                                                    <div>
                                                                                        {timeline.files.map((tabFile, tabIndx) => (
                                                                                            <Grid container spacing={2} dir="rtl" key={tabFile.id}>
                                                                                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                                                                                    <div style={{ display: 'flex', padding: '4px', flexDirection: 'row', justifyContent: 'space-between' }}>

                                                                                                        <Typography style={{ alignSelf: 'center' }} >
                                                                                                            <div style={{ display: 'flex' }}>
                                                                                                                <this.HandlePreviewIcon src={this.fileNameExtractor(tabFile.file)} />
                                                                                                                <Box style={{ marginRight: '10px' }}>
                                                                                                                    {this.fileNameExtractor(tabFile.file)}
                                                                                                                </Box>
                                                                                                                <div>
                                                                                                                    {tabFile.size}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </Typography>
                                                                                                        <div style={{ alignSelf: 'center' }} />
                                                                                                        <div style={{ alignSelf: 'center' }}>
                                                                                                            <Button variant="outlined" color='primary' onClick={() => this.handleDownload(tabFile.file)}>

                                                                                                                <GetAppRoundedIcon />
                                                                                                            </Button>
                                                                                                        </div>

                                                                                                    </div>
                                                                                                    <Divider />
                                                                                                </Grid>



                                                                                            </Grid>

                                                                                        ))}</div>) : (
                                                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                                            <Typography
                                                                                                style={{ marginTop: '12px' }} >
                                                                                                <Box fontSize={18}  >
                                                                                                    (فایلی وجود ندارد)
                                                                                                    </Box>

                                                                                            </Typography>
                                                                                        </div>
                                                                                    )}


                                                                            </TabPanel>
                                                                        </SwipeableViews>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item
                                                                    md={12} lg={12} sm={12}
                                                                    style={{ padding: '16px', marginRight: 85 }}
                                                                    xs={12}>
                                                                    <div
                                                                        style={{
                                                                            justifyContent: 'space-between', alignItems: 'center',
                                                                            display: 'flex'
                                                                        }}
                                                                    >
                                                                        <IconButton>
                                                                            <FavoriteBorderIcon />
                                                                        </IconButton>
                                                                        <IconButton>
                                                                            <CommentIcon />
                                                                        </IconButton>
                                                                        <IconButton onClick={() => this.openShareDialog("http://localhost:3000/student_dashboard" + timeline.episode_or_news_url)}>
                                                                            <ShareIcon />
                                                                        </IconButton>
                                                                        <Button  href={"/student_dashboard" + timeline.episode_or_news_url}
                                                                            style={{ marginLeft: '5px', alignSelf: 'center' }}
                                                                        >
                                                                        <AssignmentIcon style={{ marginRight: '4px' }} />
                                                                        </Button>
                                                                        <Button  href={"/student_dashboard" + timeline.course_url.replace('course', 'added_courses')}
                                                                            style={{ marginRight: '5px', alignSelf: 'center' }}
                                                                        >
                                                                        <BallotIcon style={{ marginRight: '4px' }} />
                                                                        </Button>
                                                                    </div>

                                                                </Grid>



                                                            </Grid>
                                                        </Paper>
                                                    </Slide>


                                                </div>
                                            ))}

                                        </div>
                                    ) : (

                                            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                                                <Typography >
                                                    <Box fontSize={18}  >
                                                        مطلبی وجود ندارد
                                        </Box>

                                                </Typography>
                                            </div>

                                        )}
                                </div>)}

                    </div >
                </ThemeProvider>
            </StylesProvider>
        )


    }


}
export default withStyles(styles)(TimeLine);