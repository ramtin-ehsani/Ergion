import React from 'react';
import Button from '@material-ui/core/Button';
import SwipeableViews from "react-swipeable-views";
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ReactPlayer from 'react-player'
import AssignmentIcon from '@material-ui/icons/Assignment';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import BallotIcon from '@material-ui/icons/Ballot';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { Tab, Tabs } from "@material-ui/core";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import ImageIcon from '@material-ui/icons/Image';
import { AttachFile, Description, PictureAsPdf, MovieCreationOutlined } from '@material-ui/icons';

const styles = (theme) => ({
    root: {
        // height: 'auto',
        width: '100%',
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paperStyle: {
        marginBottom: theme.spacing(2),
    },
    mediaCardPaperStyle: {
        borderRadius: 10,
        boxShadow: 20
    },
    tabFont: {
        fontSize: 18,
    },
    progressBar: {
        margin: theme.spacing(0, 1, 0),
        color: 'orange',
    },

});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ height: "10rem" }}
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



class NestedList extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: true,
            page: 1,
            numberOfEpisodes: 0,

        };
    }


    HandlePreviewIcon = (props) => {
        const { src } = props
        const { classes } = this.props

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


    componentDidMount() {
        this._isMounted = true;
        this.getValues(this.state.page)

    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    config = {
        headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
    }

    pageOnChange = (value) => {
        this.setState({ page: value, loading: true })
        this.getValues(value)

    }


    getValues = (page) => {
        axios.get(('http://127.0.0.1:8000/api/student-episodes/?page=' + page), this.config)
            .then((response) => {
                // handle success
                if (this._isMounted) {
                    this.setState({ numberOfEpisodes: response.data.page_count })
                }

                const l = []
                response.data.data.map((episode) => {
                    const episodeObject = {
                        id: episode.id,
                        name: episode.name,
                        episode_description: episode.episode_description,
                        tabValue: 0,
                        episode_url: episode.episode_url,
                        course_url: episode.course_url,
                        files: episode.files,


                    }
                    l.push(episodeObject)
                })
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

    TypeOfFile = (props) => {

        const { src } = props

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
                style={{ margin: '10px' }}
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

    numberOfItemsForPage = 2;

    render() {
        const { classes } = this.props;
        return (

            <div className={classes.root}>
                {this.state.loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                        <CircularProgress />
                    </div>

                ) : (
                        <div>

                            {this.state.list.length > 0 ? (
                                <div>
                                    {this.state.list.map((episode, index) =>
                                        (<div className={classes.paperStyle} key={episode.id}>

                                            <Paper className={classes.mediaCardPaperStyle} elevation={5}
                                                style={{ padding: '12px', marginBottom: '12px', marginTop: '12px' }}
                                            >
                                                <Grid container spacing={2} dir="rtl"

                                                >
                                                    <Grid item lg={12} md={12} sm={12} xs={12}  >


                                                        <div
                                                            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                                                        >
                                                            <div style={{ alignSelf: 'center', height: 50, width: 50 }} />


                                                            <Typography
                                                                style={{
                                                                    alignSelf: 'center'
                                                                }}

                                                            >
                                                                <Box fontSize={this.font} fontWeight="fontWeightBold"

                                                                >
                                                                    {episode.name}

                                                                </Box>
                                                            </Typography>

                                                            <div style={{ alignSelf: 'center', height: 50, width: 50 }}>

                                                            </div>


                                                        </div>
                                                        <Grid></Grid>
                                                    </Grid>

                                                    <Grid item md={12} lg={12}
                                                        style={{ marginTop: '12px', padding: '20px' }}
                                                        xs={12}>

                                                        {episode.files.map((file) =>

                                                            <this.TypeOfFile src={file.file} key={file.id} />

                                                        )}


                                                    </Grid>
                                                    <Grid item
                                                        md={12} lg={12} sm={12}
                                                        style={{ marginTop: '12px', padding: '20px' }}
                                                        xs={12}>
                                                        <Tabs
                                                            indicatorColor="primary"
                                                            textColor="primary"
                                                            value={episode.tabValue}
                                                            onChange={() => this.handleTabChange(1 - episode.tabValue, index)}>
                                                            <Tab label="توضیحات" {...a11yProps(0)} className={classes.tabFont} />
                                                            <Tab label="فایل ها" {...a11yProps(1)} className={classes.tabFont} />
                                                        </Tabs>

                                                        <div style={{ width: '100%', overflow: 'auto', wordBreak: 'break-all' }}>
                                                            <SwipeableViews
                                                                axis={'x-reverse'}
                                                                index={episode.tabValue}
                                                                onChangeIndex={() => this.handleTabChange(1 - episode.tabValue, index)}
                                                            >
                                                                <TabPanel value={episode.tabValue} index={0} >

                                                                    <div
                                                                        style={{
                                                                            alignSelf: 'center',
                                                                            padding: '6px'
                                                                        }}
                                                                    >

                                                                        <Typography component='div'
                                                                        >
                                                                            <Box fontSize={18} textAlign='center' >
                                                                                {episode.episode_description !== '' ? episode.episode_description : '(توضیحی وجود ندارد)'}
                                                                            </Box>

                                                                        </Typography>



                                                                    </div>

                                                                </TabPanel>
                                                                <TabPanel value={episode.tabValue} index={1}>
                                                                    {episode.files.length > 0 ? (
                                                                        <div>
                                                                            {episode.files.map((tabFile, tabIndx) => (
                                                                                <Grid container spacing={2} dir="rtl" key={tabFile.id}>
                                                                                    <Grid item lg={12} md={12} sm={12} xs={12} >
                                                                                        <div style={{ display: 'flex', padding: '10px', flexDirection: 'row', justifyContent: 'space-between' }}>

                                                                                            <Typography style={{ alignSelf: 'center' }} >
                                                                                                <div style={{ display: 'flex' }}>
                                                                                                    <this.HandlePreviewIcon src={this.fileNameExtractor(tabFile.file)} />
                                                                                                    <Box style={{ marginRight: '10px' }}>
                                                                                                        {this.fileNameExtractor(tabFile.file)}
                                                                                                    </Box>
                                                                                                </div>
                                                                                            </Typography>
                                                                                            <div style={{ alignSelf: 'center' }} />
                                                                                            <div style={{ alignSelf: 'center' }}>
                                                                                                <Button variant="contained" color='primary' onClick={() => this.handleDownload(tabFile.file)}>
                                                                                                    دانلود
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
                                                        style={{ marginTop: '8px', marginRight: '10px', marginBottom: '12px' }}
                                                        xs={12}>
                                                        <div
                                                            style={{
                                                                justifyContent: 'flex-start', alignItems: 'center',
                                                                display: 'flex'
                                                            }}
                                                        >
                                                            <Button variant='outlined' href={"/student_dashboard" + episode.episode_url}
                                                                style={{ marginLeft: '5px', alignSelf: 'center' }}
                                                            >
                                                                مشاهده ی جلسه
                                                    <AssignmentIcon style={{ marginRight: '4px' }} />
                                                            </Button>
                                                            <Button variant='outlined' href={"/student_dashboard" + episode.course_url.replace('course','added_courses')}
                                                                style={{ marginRight: '5px', alignSelf: 'center' }}
                                                            >
                                                                مشاهده ی کورس
                                                    <BallotIcon style={{ marginRight: '4px' }} />
                                                            </Button>
                                                        </div>

                                                    </Grid>



                                                </Grid>
                                            </Paper>


                                        </div>))}

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
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Pagination count={this.state.numberOfEpisodes} page={this.state.page} 
                                variant='outlined' color='primary'
                                dir='rtl' 
                                onChange={(e, v) => this.pageOnChange(v)} />

                            </div>
                        </div>)}

            </div >)

    }

}
export default withStyles(styles)(NestedList);