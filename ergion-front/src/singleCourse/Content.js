import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SwipeableViews from "react-swipeable-views";
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ReactPlayer from 'react-player'
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grow from '@material-ui/core/Grow';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import { DropzoneArea } from 'material-ui-dropzone'
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import DialogContentText from '@material-ui/core/DialogContentText';
import Fade from '@material-ui/core/Fade';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions'
import MovieCreationTwoToneIcon from '@material-ui/icons/MovieCreationTwoTone';
import { Tab, Tabs } from "@material-ui/core";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import ImageIcon from '@material-ui/icons/Image';
import { AttachFile, Description, PictureAsPdf, MovieCreationOutlined } from '@material-ui/icons';
import {
    TextField,
} from '@material-ui/core';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));



const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: "#fff",
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: "#000",
            },
        },
    },
}))(MenuItem);

const styles = (theme) => ({
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
        // height: 'auto',
        width: '100%',
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    font: {
        fontSize: 18,
    },
    textFieldStyle: {
        marginLeft: theme.spacing(2),
        paddingRight: theme.spacing(4),
    },
    previewChip: {
        minWidth: 160,
        maxWidth: 210
    },
    newChapterButtonStyle: {
        color: '#000',
    },
    paperStyle: {
        marginBottom: theme.spacing(2),
    },
    innerPaperStyle: {
        margin: theme.spacing(1),
    },
    newEpisodeTitle: {
        backgroundColor: '#3f50b5',
        color: '#fff',
        textAlign: "center",

    },
    mediaCardStyle: {
        height: 350,
        width: '100%',
        borderRadius: 10

    },
    newEpisodeRoot: {
        height: 'auto',
    },
    mediaCardPaperStyle: {
        borderRadius: 10,
        boxShadow: 20
    },
    tabFont: {
        fontSize: 16,
    },
    newEpisodeButtonContent: {
        // justifyContent:'space-between',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 8,
        paddingTop: 8,
    },
    newEpisodeButton: {
        marginLeft: theme.spacing(4),
    },
    dropZoneTextStyle: {
        fontSize: '1rem',
        padding: theme.spacing(1),
        textAlign: "center",
    },
    pdfStyle: {
        // height: 250,
        // width: '100%',
    },
    veticalDots: {
        color: "#000",
        width: 35,
        height: 35,
    },
    alertStyle: {
        display: 'flex',
        font: '20'
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

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUser: (snackBarOpenOrClose) =>
            dispatch({ type: actionTypes.SNACKBAR, snackBarOpenOrClose: snackBarOpenOrClose })

    };
};

const mapStateToProps = state => ({
    snackBar: state.snackBar,

});




class NestedList extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.newEpisodeName = React.createRef('');
        this.newEpisodeDescription = React.createRef('');
        this.state = {
            files: [],
            dialogOpen: false,
            positionOfEpisodeChapter: 0,
            positionOfEpisode: 0,
            isOwner: false,
            list: [],
            newChapterValue: '',
            isButtonShown: false,
            courseId: '',
            loading: true,
            removeDialog: false,
            newEpisodeLoading: false,
            isChapterToDelete: false,



        };
    }


    addEpisodeButton = () => {
        this.setState({ newEpisodeLoading: true })
        const { files } = this.state
        const listItem = {
            ...this.state.list[this.state.positionOfEpisodeChapter]
        }

        const data = new FormData()
        data.append('chapter_id', listItem.id)
        data.append('name', this.newEpisodeName.current.value)
        data.append('episode_description', this.newEpisodeDescription.current.value)
        data.append('files', files[0])

        axios.post('http://127.0.0.1:8000/api/chapter-episodes/', data, this.config)
            .then((response) => {
                // handle success

                const responseFile = []
                if (files.length > 0) {
                    let promises = []
                    files.map((file) => {
                        const fileData = new FormData()
                        fileData.append('episode_id', response.data.id)
                        fileData.append("file", file)
                        promises.push(axios.post('http://127.0.0.1:8000/api/episode/', fileData, this.config)
                            .then((res) => {
                                responseFile.push(res.data)
                            })
                            .catch((error) => {
                                // handle error
                                console.log(error);
                            }))

                    })
                    Promise.all(promises).then(() => {
                        listItem.episodes.push({
                            name: response.data.name,
                            episode_description: response.data.episode_description,
                            files: responseFile,
                            id: response.data.id,
                            tabValue: 0

                        })

                        const list = [...this.state.list]
                        list[this.state.positionOfEpisodeChapter] = listItem
                        this.props.dispatchUser(true)
                        this.setState({ dialogOpen: false, list: list, newEpisodeLoading: false })
                    })

                } else {
                    listItem.episodes.push({
                        name: response.data.name,
                        episode_description: response.data.episode_description,
                        files: responseFile,
                        id: response.data.id,
                        tabValue: 0,
                        isNameButtonShown: false,
                        isNameTextModeON: false,
                        isDescButtonShown: false,
                        isDescTextModeON: false,

                    })

                    const list = [...this.state.list]
                    list[this.state.positionOfEpisodeChapter] = listItem
                    this.props.dispatchUser(true)
                    this.setState({
                        dialogOpen: false, list: list, newEpisodeLoading: false
                    })
                }




            })
            .catch((error) => {
                // handle error
                console.log(error);
            })




    }



    fileChange = (files) => {
        const f = this.state.files
        if (f.length > 0) {
            if (f[0].type.includes('video')) {
                f.length = 1;
                f.splice(1, 0, ...files);
                this.setState({
                    files: f
                });
            } else {
                this.setState({
                    files: files
                });
            }
        } else {
            this.setState({
                files: files
            });
        }



    }

    videoFileChange = (files) => {
        const f = this.state.files
        if (files.length > 0) {
            f.splice(0, 0, files[0]);

        } else {
            f.splice(0, 1);
        }
        this.setState({
            files: f
        });

    }




    episodeButtonFunction = (position) => {
        this.setState({ positionOfEpisodeChapter: position, dialogOpen: true })
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
        this.ownerChecker()

    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    config = {
        headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
    }

    ownerChecker = () => {

        setTimeout(() => {
            if (JSON.parse(localStorage.getItem('user')) !== null) {
                if ((JSON.parse(localStorage.getItem('user'))['role']) === "T") {
                    if ((JSON.parse(localStorage.getItem('user'))['id']) === this.props.course.instructor_id) {
                        if (this._isMounted) {
                            this.setState({ isOwner: true })
                        }
                    }
                }

            }
            this.setState({ courseId: this.props.course.id })
            this.getValues()


        }, 2000)


    }

    getValues = () => {
        axios.get(('http://127.0.0.1:8000/api/course-chapters/?course_id=' + this.state.courseId), this.config)
            .then((response) => {
                // handle success
                const l = []
                response.data.map((chapters) => {
                    const episodes = chapters.episodes
                    episodes.map((episode) => {
                        episode.tabValue = 0
                        episode.isNameButtonShown = false
                        episode.isNameTextModeON = false
                        episode.isDescButtonShown = false
                        episode.isDescTextModeON = false

                    })
                    const chapter = {
                        id: chapters.id,
                        name: chapters.name,
                        isOpened: false,
                        buttonShown: false,
                        isTextMode: false,
                        anchorEl: false,
                        episodes: episodes,


                    }
                    l.push(chapter)
                    console.log(l)
                })
                if (this._isMounted) {
                    this.setState({ list: l, loading: false })
                }



            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }

    chapterOrEpisodeRemove = () => {
        if (this.state.isChapterToDelete) {
            axios.delete(('http://127.0.0.1:8000/api/course-chapters/?chapter_id=') + (this.state.list)[this.state.positionOfEpisodeChapter].id, this.config)
                .then((response) => {
                    // handle success
                    const { list } = this.state
                    list.splice(this.state.positionOfEpisodeChapter, 1)
                    this.props.dispatchUser(true)
                    this.setState({ list: list, removeDialog: false })



                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        } else {
            axios.delete(('http://127.0.0.1:8000/api/chapter-episodes/?episode_id=') + (((this.state.list)[this.state.positionOfEpisodeChapter]).episodes[this.state.positionOfEpisode]).id, this.config)
                .then((response) => {
                    // handle success


                    const listItem = {
                        ...this.state.list[this.state.positionOfEpisodeChapter]
                    }
                    const episodeItem = listItem.episodes

                    episodeItem.splice(this.state.positionOfEpisode, 1)

                    listItem.episodes = episodeItem
                    const list = [...this.state.list]
                    list[this.state.positionOfEpisodeChapter] = listItem
                    this.props.dispatchUser(true)
                    this.setState({ list: list, removeDialog: false })



                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        }

    }



    font = 20;

    toggle = (index, type) => {
        const results = this.state.list.map((item, idx) => {
            if (index === idx) {
                if (type === 'is open toggle') {
                    return {
                        ...item,
                        isOpened: !item.isOpened
                    };
                } else if (type === 'button on') {
                    return {
                        ...item,
                        buttonShown: true
                    };

                } else if (type === 'button off') {
                    return {
                        ...item,
                        buttonShown: false,
                        anchorEl: null
                    };
                } else {
                    return {
                        ...item,
                        isTextMode: !item.isTextMode
                    };
                }
            }
            return item;
        });
        this.setState({ list: results })

    }


    onChange = (event) => {
        this.setState({ newChapterValue: event.target.value })
        if (event.target.value.length > 0) {
            this.setState({ isButtonShown: true })
        } else {
            this.setState({ isButtonShown: false })
        }

    }


    handleClick = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('course_id', this.state.courseId)
        data.append('name', this.state.newChapterValue)
        axios.post('http://127.0.0.1:8000/api/course-chapters/', data, this.config)
            .then((response) => {
                // handle success
                const l = [
                    ...this.state.list,
                    {
                        name: response.data.name,
                        isOpened: false,
                        buttonShown: false,
                        isTextMode: false,
                        id: response.data.id,
                        anchorEl: false,
                        episodes: []
                    }
                ]
                this.props.dispatchUser(true)
                this.setState({ newChapterValue: "", isButtonShown: false, list: l })



            })
            .catch((error) => {
                // handle error
                console.log(error);
            })


    };

    dialogOnclose = () => {
        this.setState({ dialogOpen: false, removeDialog: false })

    }

    chapterOrEpisodeRemoveButton = (e, chapterIndex, episodeIndex, isChapter) => {
        if (isChapter) {
            e.stopPropagation()
            this.setState({ positionOfEpisodeChapter: chapterIndex, isChapterToDelete: true, removeDialog: true })
        } else {

            this.setState({ positionOfEpisodeChapter: chapterIndex, isChapterToDelete: false, positionOfEpisode: episodeIndex, removeDialog: true })
        }


    }

    handleEpisodeEditButton = (chapterIndex, episodeIndex, type) => {
        const results = this.state.list.map((item, idx) => {
            if (chapterIndex === idx) {
                const episodes = item.episodes
                episodes.map((episode, epIndex) => {
                    if (episodeIndex === epIndex) {
                        if (type === 'desc button off') {
                            episode.isDescButtonShown = false
                        } else if (type === 'desc button on') {
                            episode.isDescButtonShown = true
                        } else if (type === 'desc text') {
                            episode.isDescTextModeON = !episode.isDescTextModeON
                        } else if (type === 'name button off') {
                            episode.isNameButtonShown = false
                        } else if (type === 'name button on') {
                            episode.isNameButtonShown = true
                        } else if (type === 'name text') {
                            episode.isNameTextModeON = !episode.isNameTextModeON
                        }


                    }
                })
                return {
                    ...item,
                    episodes: episodes
                }
            }
            return item;
        });
        this.setState({ list: results })
    };

    handleTabChange = (newValue, chapterIndex, episodeIndex) => {
        const results = this.state.list.map((item, idx) => {
            if (chapterIndex === idx) {
                const episodes = item.episodes
                episodes.map((episode, epIndex) => {
                    if (episodeIndex === epIndex) {
                        episode.tabValue = newValue
                    }
                })
                return {
                    ...item,
                    episodes: episodes
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

    chapterEditButton = (e, index) => {
        e.stopPropagation()
        this.toggle(index, 'time')


    }



    episodeEditButtonSaveChanges(index, indx, isName) {
        const data = new FormData()
        if (isName) {
            data.append('name', this.newEpisodeName.current.value)
        } else {
            data.append('episode_description', this.newEpisodeDescription.current.value)
        }
        data.append('episode_id', (((this.state.list)[index]).episodes[indx]).id)

        axios.patch('http://127.0.0.1:8000/api/chapter-episodes/', data, this.config)
            .then((response) => {
                const listItem = {
                    ...this.state.list[index]
                }
                const episodeItem = {
                    ...listItem.episodes[indx]
                }
                if (isName) {
                    episodeItem.name = response.data.name
                    episodeItem.isNameButtonShown = false
                    episodeItem.isNameTextModeON = false
                } else {
                    episodeItem.episode_description = response.data.episode_description
                    episodeItem.isDescButtonShown = false
                    episodeItem.isDescTextModeON = false
                }


                listItem.episodes[indx] = episodeItem
                const list = [...this.state.list]
                list[index] = listItem
                this.props.dispatchUser(true)
                this.setState({ list: list })



            })
            .catch((error) => {
                // handle error
                console.log(error);
            })

    }

    episodePropagationEditButton = (e, index, indx, isName) => {
        e.stopPropagation()
        if (isName) {
            this.handleEpisodeEditButton(index, indx, 'name text')
        } else {
            this.handleEpisodeEditButton(index, indx, 'desc text')
        }



    }


    chapterEditButtonSaveChanges = (index) => {
        axios.patch('http://127.0.0.1:8000/api/course-chapters/', {
            name: this.newEpisodeName.current.value,
            chapter_id: (this.state.list)[index].id
        }, this.config)
            .then((response) => {
                const listItem = {
                    ...this.state.list[index]
                }
                listItem.name = response.data.name
                listItem.isTextMode = !listItem.isTextMode
                const list = [...this.state.list]
                list[index] = listItem
                this.props.dispatchUser(true)
                this.setState({ list: list })



            })
            .catch((error) => {
                // handle error
                console.log(error);
            })

    }

    listOnClick = (index) => {
        if (!this.state.list[index].isTextMode) {
            this.toggle(index, 'is open toggle')
        }

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

    textOnBlur = (event, index) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.toggle(index, 'time')
        }
    }

    episodeTextOnBlur = (event, index, indx, isName) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            if (isName) {
                this.handleEpisodeEditButton(index, indx, 'name button off')
                this.handleEpisodeEditButton(index, indx, 'name text')
            } else {
                this.handleEpisodeEditButton(index, indx, 'desc button off')
                this.handleEpisodeEditButton(index, indx, 'desc text')
            }
        }
    }


    menuHandleClick = (event, index, open) => {
        event.stopPropagation()
        const results = this.state.list.map((item, idx) => {
            if (index === idx) {
                if (open) {
                    return {
                        ...item,
                        anchorEl: event.currentTarget
                    };
                } else {
                    return {
                        ...item,
                        anchorEl: null
                    };
                }
            }
            return item;
        });
        this.setState({ list: results })
    };




    TypeOfFile = (props) => {

        const { src } = props
        const { classes } = this.props;

        const lastIndexOfSlash = String(src).lastIndexOf('/')
        const lastIndexOfDot = String(src).lastIndexOf('.')
        let name = String(src).substring(lastIndexOfSlash + 1)
        const type = String(src).substring(lastIndexOfDot)

        if (name.length > 15) {
            name = name.substring(0, 15) + type
        }

        if (type === '.mp4') {
            return (
                <div style={{ margin: '10px' }}>
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

            <div className={classes.root}>


                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.dialogOnclose}
                    aria-labelledby="error-dialog"
                    className={classes.newEpisodeRoot}
                >
                    <ValidatorForm form="form" onSubmit={this.addEpisodeButton} >

                        <DialogTitle id="error-dialog" dir='rtl' className={classes.newEpisodeTitle}>
                            ایجاد یک جلسه جدید
                    </DialogTitle>

                        <Divider />
                        <Divider />


                        <DialogContent>



                            <CardContent>
                                <Grid
                                    container
                                    spacing={2}
                                    dir='rtl'
                                >


                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                    >
                                        <TextValidator
                                            fullWidth
                                            label="نام"
                                            name="name"
                                            inputRef={this.newEpisodeName}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid
                                        item
                                        md={12}
                                        xs={12}

                                    >
                                        <TextField
                                            fullWidth
                                            dir='rtl'
                                            label="توضیحات"
                                            name="description"
                                            inputRef={this.newEpisodeDescription}
                                            variant="outlined"
                                            multiline={true}
                                            rows={5}
                                        />

                                    </Grid>
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}

                                    >
                                        <Typography style={{ marginRight: '4px', marginBottom: '8px' }}>
                                            <Box >
                                                فایل ویدیو
                                            </Box>

                                        </Typography>
                                        <DropzoneArea
                                            filesLimit={1}
                                            showPreviews={true}
                                            showPreviewsInDropzone={false}
                                            previewText='فایل :'
                                            maxFileSize={20000000}
                                            useChipsForPreview
                                            previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                                            previewChipProps={{ classes: { root: classes.previewChip } }}
                                            Icon={MovieCreationTwoToneIcon}
                                            acceptedFiles={['video/*']}
                                            dropzoneParagraphClass={classes.dropZoneTextStyle}
                                            dropzoneText="محل قرار دادن ویدیوی آموزشی"
                                            onChange={this.videoFileChange.bind(this)}
                                        />

                                    </Grid>
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}

                                    >
                                        <Typography style={{ marginRight: '4px', marginBottom: '8px' }}>
                                            <Box >
                                                فایل های ضمیمه
                                            </Box>

                                        </Typography>
                                        <DropzoneArea
                                            filesLimit={6}
                                            showPreviews={true}
                                            showPreviewsInDropzone={false}
                                            previewText='فایل ها :'
                                            maxFileSize={5000000}
                                            useChipsForPreview
                                            previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                                            previewChipProps={{ classes: { root: classes.previewChip } }}
                                            dropzoneParagraphClass={classes.dropZoneTextStyle}
                                            dropzoneText="محل قرار دادن فایل های ضمیمه"
                                            onChange={this.fileChange.bind(this)}
                                        />

                                    </Grid>

                                </Grid>
                            </CardContent>


                        </DialogContent>

                        <Divider />
                        <Divider />

                        <DialogActions className={classes.newEpisodeButtonContent}>


                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.dialogOnclose}
                                style={{ margin: '8px' }}
                            >
                                لغو
                        </Button>

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ margin: '8px' }}
                            >
                                ایجاد
                                {this.state.newEpisodeLoading && (
                                    <CircularProgress thickness={5} size={25} className={classes.progressBar} />

                                )}
                            </Button>
                        </DialogActions>
                    </ValidatorForm>



                </Dialog>



                <Dialog
                    open={this.state.removeDialog}
                    onClose={this.dialogOnclose}
                    aria-labelledby="error-dialog"
                    className={classes.newEpisodeRoot}
                >

                    <DialogTitle id="error-dialog" dir='rtl' >
                        حذف
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText dir="rtl" style={{ padding: '10px' }}>
                            آیا میخواهید این {this.state.isChapterToDelete ? "سرفصل" : "جلسه"} را حذف کنید؟
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className={classes.newEpisodeButtonContent}>
                        <Button
                            color="primary"
                            onClick={this.dialogOnclose}
                            style={{ margin: '8px' }}
                        >
                            لغو
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.chapterOrEpisodeRemove}
                            style={{ margin: '8px' }}
                        >
                            حذف
                            </Button>
                    </DialogActions>
                </Dialog>





                {this.state.loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                        <CircularProgress />
                    </div>

                )}


                {this.state.list.length > 0 ? (<List
                    component="div"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            سرفصل های درسی
                        </ListSubheader>
                    }

                >
                    {this.state.list.map((item, index) =>
                        (<div className={classes.paperStyle} key={item.id} >
                            <Grow in={!this.state.loading} timeout={1000}>
                            <Paper
                                onMouseEnter={() => this.toggle(index, 'button on')}
                                onMouseLeave={() => this.toggle(index, 'button off')}
                            >
                                <ListItem button={!item.isTextMode} onClick={() => this.listOnClick(index)}  >
                                    <ListItemIcon>
                                        <LibraryBooksIcon />
                                    </ListItemIcon>
                                    <ListItemText  >

                                        {!item.isTextMode ?
                                            (<div
                                                style={{
                                                    display: 'flex',
                                                }}
                                            >
                                                <Typography >

                                                    <Box fontSize={this.font} fontWeight="fontWeightBold" >
                                                        {item.name}
                                                    </Box>


                                                </Typography>
                                                {this.state.isOwner && item.buttonShown && !item.isTextMode && (
                                                    <Fade in={item.buttonShown} timeout={400} >
                                                        <Button
                                                            onClick={(e) => this.chapterEditButton(e, index)}
                                                            className={classes.veticalDots}
                                                            style={{ marginRight: '15px', marginBottom: '-5px' }}
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                    </Fade>
                                                )}
                                            </div>
                                            ) :

                                            (<ValidatorForm onSubmit={() => this.chapterEditButtonSaveChanges(index)} >
                                                <InputBase
                                                    fullWidth
                                                    autoFocus
                                                    dir='rtl'
                                                    autoComplete='off'
                                                    name="name"
                                                    style={{ fontSize: this.font, fontWeight: 900, marginBottom: '-3px', marginTop: '-3px' }}
                                                    InputProps={{ 'aria-label': 'naked' }}
                                                    required
                                                    onBlur={(event) => this.textOnBlur(event, index)}
                                                    defaultValue={item.name}
                                                    inputRef={this.newEpisodeName}
                                                />
                                            </ValidatorForm>)}



                                    </ListItemText>
                                    {this.state.isOwner && item.buttonShown && !item.isTextMode && (
                                        <Fade in={item.buttonShown} timeout={400} >
                                            <div>
                                                <Button
                                                    component="span"
                                                    aria-controls="customized-menu"
                                                    aria-haspopup="true"
                                                    onClick={(e) => this.menuHandleClick(e, index, true)}
                                                    className={classes.veticalDots}
                                                    style={{ marginLeft: '10px' }} >
                                                    <MoreHorizIcon
                                                    />
                                                </Button>
                                                <StyledMenu
                                                    id="customized-menu"
                                                    anchorEl={item.anchorEl}
                                                    keepMounted
                                                    open={Boolean(item.anchorEl)}
                                                    onClose={(e) => this.menuHandleClick(e, index, false)}
                                                >

                                                    <StyledMenuItem onClick={(e) => this.chapterOrEpisodeRemoveButton(e, index, 0, true)} >
                                                        <ListItemIcon>
                                                            <DeleteIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="حذف کردن" />
                                                    </StyledMenuItem>
                                                </StyledMenu>
                                            </div>

                                        </Fade>
                                    )}
                                    {item.isOpened ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>

                            </Paper>
                            </Grow>
                            <Collapse in={item.isOpened} timeout="auto" unmountOnExit
                                style={{ marginLeft: '14px', marginRight: '14px' }}
                            >

                                {item.episodes.map((episode, indx) =>
                                    (
                                        <Paper className={classes.mediaCardPaperStyle} elevation={5}
                                            style={{ padding: '12px', marginBottom: '12px', marginTop: '12px' }} key={episode.id}
                                        >
                                            <Grid container spacing={2} dir="rtl"

                                            >
                                                <Grid item lg={12} md={12} sm={12} xs={12}  >


                                                    <div
                                                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                                                    >
                                                        <div style={{ alignSelf: 'center', height: 50, width: 50, marginTop: '10px' }}
                                                        >
                                                            {this.state.isOwner && (

                                                                <Button
                                                                    onClick={(e) => this.chapterOrEpisodeRemoveButton(e, index, indx, false)}
                                                                    className={classes.veticalDots}
                                                                    style={{ alignSelf: 'center' }}

                                                                >
                                                                    <DeleteIcon />
                                                                </Button>
                                                            )}
                                                        </div>
                                                        {!episode.isNameTextModeON ?
                                                            (<div
                                                                style={{
                                                                    alignSelf: 'center',
                                                                    display: 'flex'
                                                                }}
                                                                onMouseEnter={() => this.handleEpisodeEditButton(index, indx, 'name button on')}
                                                                onMouseLeave={() => this.handleEpisodeEditButton(index, indx, 'name button off')}
                                                            >
                                                                <div style={{ width: 50, height: 50, alignSelf: 'center' }} />

                                                                <Typography
                                                                    style={{
                                                                        alignSelf: 'center'
                                                                    }}

                                                                >
                                                                    <Box fontSize={30} fontWeight="fontWeightBold"

                                                                    >
                                                                        {episode.name}

                                                                    </Box>
                                                                </Typography>
                                                                <div style={{ width: 50, height: 50, alignSelf: 'center', marginTop: '10px' }} >
                                                                    {this.state.isOwner && episode.isNameButtonShown && !episode.isNameTextModeON && (
                                                                        <Fade in={episode.isNameButtonShown} timeout={400}
                                                                            style={{ alignSelf: 'center' }}
                                                                        >
                                                                            <Button
                                                                                onClick={(e) => this.episodePropagationEditButton(e, index, indx, true)}
                                                                                className={classes.veticalDots}
                                                                            >
                                                                                <EditIcon />
                                                                            </Button>
                                                                        </Fade>
                                                                    )}
                                                                </div>



                                                            </div>
                                                            ) :

                                                            (
                                                                <ValidatorForm
                                                                    onSubmit={() => this.episodeEditButtonSaveChanges(index, indx, true)} >
                                                                    <InputBase
                                                                        autoFocus
                                                                        dir='rtl'
                                                                        autoComplete='off'
                                                                        name="name"
                                                                        style={{ fontSize: 30, fontWeight: 900 }}
                                                                        InputProps={{ 'aria-label': 'naked' }}
                                                                        inputProps={{ style: { textAlign: 'center', marginTop: '6px' } }}
                                                                        required
                                                                        onBlur={(event) => this.episodeTextOnBlur(event, index, indx, true)}
                                                                        defaultValue={episode.name}
                                                                        inputRef={this.newEpisodeName}
                                                                    />
                                                                </ValidatorForm>)
                                                        }



                                                        <div style={{ alignSelf: 'center', height: 50, width: 50 }}>
                                                        </div>


                                                    </div>
                                                    <Grid></Grid>
                                                </Grid>

                                                <Grid item md={12} lg={12}
                                                    style={{ marginTop: '12px', padding: '20px' }}
                                                    xs={12}>

                                                    {episode.files.map((file, indxx) =>

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
                                                        onChange={(e,v) => this.handleTabChange(v, index, indx)}>
                                                        <Tab label="توضیحات" {...a11yProps(0)} className={classes.tabFont} />
                                                        <Tab label="فایل ها" {...a11yProps(1)} className={classes.tabFont} />
                                                    </Tabs>

                                                    <div style={{ width: '100%', overflow: 'auto', wordBreak: 'break-all' }}>
                                                        <SwipeableViews
                                                            axis={'x-reverse'}
                                                            index={episode.tabValue}
                                                            onChangeIndex={(e,v) => this.handleTabChange(v, index, indx)}
                                                        >
                                                            <TabPanel value={episode.tabValue} index={0} >
                                                                {!episode.isDescTextModeON ?
                                                                    (<div
                                                                        style={{
                                                                            alignSelf: 'center',
                                                                            padding: '6px'
                                                                        }}
                                                                        onMouseEnter={() => this.handleEpisodeEditButton(index, indx, 'desc button on')}
                                                                        onMouseLeave={() => this.handleEpisodeEditButton(index, indx, 'desc button off')}
                                                                    >

                                                                        <Typography component='div'
                                                                        >
                                                                            <Box fontSize={18} textAlign='center' >
                                                                                {episode.episode_description !== '' ? episode.episode_description : '(توضیحی وجود ندارد)'}
                                                                            </Box>

                                                                        </Typography>
                                                                        {this.state.isOwner && episode.isDescButtonShown && !episode.isDescTextModeON && (
                                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                                <Fade in={episode.isDescButtonShown} timeout={400}
                                                                                    style={{ alignSelf: 'center' }}
                                                                                >
                                                                                    <Button
                                                                                        onClick={(e) => this.episodePropagationEditButton(e, index, indx, false)}
                                                                                        className={classes.veticalDots}
                                                                                    >
                                                                                        <EditIcon />
                                                                                    </Button>
                                                                                </Fade>
                                                                            </div>
                                                                        )}



                                                                    </div>
                                                                    ) :

                                                                    (

                                                                        <div style={{ justifyContent: 'center' }}

                                                                            onBlur={(event) => this.episodeTextOnBlur(event, index, indx, false)}>
                                                                            <ValidatorForm
                                                                                onSubmit={() => this.episodeEditButtonSaveChanges(index, indx, false)} >
                                                                                <InputBase
                                                                                    fullWidth
                                                                                    autoFocus
                                                                                    dir="rtl"
                                                                                    // multiline
                                                                                    autoComplete='off'
                                                                                    name="desc"
                                                                                    style={{ fontSize: 18 }}
                                                                                    inputProps={{ 'aria-label': 'naked', style: { textAlign: 'center' } }}
                                                                                    defaultValue={episode.episode_description}
                                                                                    inputRef={this.newEpisodeDescription}
                                                                                />
                                                                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                                                                    <Button variant="outlined" color="primary"
                                                                                    type='submit'>
                                                                                        ذخیره
                                                                                    </Button>
                                                                                </div>
                                                                            </ValidatorForm>


                                                                        </div>)
                                                                }
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



                                            </Grid>
                                        </Paper>
                                        )
                                )}

                                {this.state.isOwner && (
                                    <Button variant="outlined"
                                        dir="rtl"
                                        color="primary"
                                        style={{ marginTop: '12px' }}
                                        onClick={() => this.episodeButtonFunction(index)}>
                                        + ایجاد جلسه

                                    </Button>)}
                            </Collapse>
                        </div>))}






                </List>) : (
                        <div>
                            {!this.state.loading && !this.state.isOwner && (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                                    <Typography >
                                        <Box fontSize={18}  >
                                            سرفصلی وجود ندارد
                                        </Box>

                                    </Typography>
                                </div>

                            )}
                        </div>
                    )
                }

                {
                    this.state.isOwner && !this.state.loading && (
                        <ValidatorForm onSubmit={this.handleClick}>
                            <FormControl fullWidth className={classes.textFieldStyle} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment">+ ایجاد سرفصل جدید</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment"
                                    required
                                    label="+ ایجاد سرفصل جدید"
                                    autoComplete='off'
                                    onChange={this.onChange}
                                    value={this.state.newChapterValue}
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <IconButton
                                                aria-label="creating new chapter"
                                                type='submit'
                                            >
                                                {this.state.isButtonShown && (<AddBoxIcon className={classes.newChapterButtonStyle} />)}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </ValidatorForm>
                    )
                }





            </div >

        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(NestedList));