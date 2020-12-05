import React from 'react';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import ReplyIcon from '@material-ui/icons/Reply';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SendIcon from '@material-ui/icons/Send';
import ReactPlayer from 'react-player';
import TableHead from '@material-ui/core/TableHead';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import BallotIcon from '@material-ui/icons/Ballot';
import CircularProgress from '@material-ui/core/CircularProgress';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ListSubheader from '@material-ui/core/ListSubheader';
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
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import { Avatar } from "@material-ui/core";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import ImageIcon from '@material-ui/icons/Image';
import { AttachFile, Description, PictureAsPdf, MovieCreationOutlined } from '@material-ui/icons';
import human from '@jacobmarshall/human-time';
import {
    Typography, IconButton, List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemIcon,
    InputBase,
} from '@material-ui/core';

const styles = (theme) => ({
    root: {
        // height: 'auto',
        width: '100%',
        // flexGrow: 1,
    },
    veticalDots: {
        color: "#000",
        width: 35,
        height: 35,
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

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
    typography: {
        fontFamily: '"Vazir", sans-serif'
    },
    direction: 'rtl'
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#fff',
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        // '&:nth-of-type(odd)': {
        //     backgroundColor: theme.palette.action.hover,
        // },
    },
}))(TableRow);
function Alert(props) {

    return (
        <StylesProvider jss={jss} >
            <ThemeProvider theme={theme} >
                <MuiAlert elevation={6} variant="filled" {...props} />
            </ThemeProvider>
        </StylesProvider>);
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
            snackBarOpen: false,

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

    openShareDialog = (e, index, isOpen, shareLink) => {
        this.handleAnchorEl(e, index, isOpen)
        this.setState({ link: shareLink, shareDialogOpen: true })

    }

    componentDidMount() {
        this._isMounted = true;
        this.getValues()

    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    config = {
        headers: { Authorization: `Token ${localStorage.getItem('api_key')}` }
    }




    getValues = () => {
        axios.get('http://127.0.0.1:8000/api/student-episodes/', this.config)
            .then((response) => {
                // handle success
                console.log(response.data)
                const episodeList = []

                response.data.map((episode) => {
                    let episodeComments = episode.comments
                    if (episodeComments.length > 2) {
                        episodeComments = episodeComments.slice(0, 2)
                    }
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
                        liked: episode.liked,
                        commentRef: '',
                        likes_count: episode.likes_count,
                        time: episode.creation_time,
                        comments_count: episode.comments.length,
                        comments: episodeComments,
                        isEpisode: true,
                        anchorEl: false,



                    }
                    episodeList.push(episodeObject)
                })

                axios.get('http://127.0.0.1:8000/api/student-updates/', this.config)
                    .then((resp) => {
                        // handle success
                        console.log(resp.data)
                        const updateList = []

                        resp.data.map((update) => {
                            let updateComments = update.comments
                            if (updateComments.length >2 ) {
                                updateComments = updateComments.slice(0, 2)
                            }
                            const episodeObject = {
                                id: update.id,
                                name: 'خبر',
                                description: update.text,
                                tabValue: 0,
                                instructor_firstName: update.instructor_firstname,
                                instructor_lastName: update.instructor_lastname,
                                instructor_profilePic: update.instructor_profile_picture,
                                episode_or_news_url: update.update_url,
                                course_url: update.course_url,
                                files: update.files,
                                time: update.created_at,
                                commentRef: '',
                                comments_count: update.comments.length,
                                comments: updateComments,
                                liked: update.liked,
                                likes_count: update.likes,
                                isEpisode: false,
                                anchorEl: false,



                            }
                            updateList.push(episodeObject)
                        })

                        const concactedList = episodeList.concat(updateList)


                        concactedList.sort((a, b) => (a.time < b.time) ? 1 : -1)
                        if (this._isMounted) {
                            this.setState({ list: concactedList, loading: false })
                        }



                    })
                    .catch((error) => {
                        // handle error
                        this.setState({ loading: false })
                        console.log(error);
                    })



            })
            .catch((error) => {
                // handle error
                this.setState({ loading: false })
                console.log(error);
            })
    }


    font = 28;

    handleTimelineLike = (index, id, isEpisode) => {
        const listItem = {
            ...this.state.list[index]
        }
        if (listItem.liked) {
            listItem.likes_count = listItem.likes_count - 1
        } else {
            listItem.likes_count = listItem.likes_count + 1

        }
        listItem.liked = !listItem.liked

        const list = [...this.state.list]
        list[index] = listItem
        this.setState({ list: list })
        if (isEpisode) {
            axios.put('http://127.0.0.1:8000/api/episode-likes/', {
                episode_id: id,
            }, this.config).then((res) => {


            }).catch((error) => {
                console.log(error)
                const listItem = {
                    ...this.state.list[index]
                }
                if (listItem.liked) {
                    listItem.likes_count = listItem.likes_count - 1
                } else {
                    listItem.likes_count = listItem.likes_count + 1

                }
                listItem.liked = !listItem.liked
                const list = [...this.state.list]
                list[index] = listItem
                this.setState({ list: list })
            })
        } else {
            axios.put('http://127.0.0.1:8000/api/update-likes/', {
                update_id: id,
            }, this.config).then((res) => {


            }).catch((error) => {
                console.log(error)
                const listItem = {
                    ...this.state.list[index]
                }
                if (listItem.liked) {
                    listItem.likes_count = listItem.likes_count - 1
                } else {
                    listItem.likes_count = listItem.likes_count + 1

                }
                listItem.liked = !listItem.liked
                const list = [...this.state.list]
                list[index] = listItem
                this.setState({ list: list })
            })
        }

    }

    handleAnchorEl = (event, index, isOpen) => {
        const results = this.state.list.map((item, idx) => {
            if (index === idx) {
                if (isOpen) {
                    return {
                        ...item,
                        anchorEl: event.currentTarget
                    }
                } else {
                    return {
                        ...item,
                        anchorEl: null
                    }
                }
            }
            return item;
        });
        this.setState({ list: results })

    }

    handlePostComment = (index, timelineID, isEpisode, text) => {
        if (isEpisode) {
            axios.post('http://127.0.0.1:8000/api/episode-comments/', {
                episode_id: timelineID,
                comment_text: text
            }, this.config).then((res) => {
                const listItem = {
                    ...this.state.list[index]
                }
                if (listItem.comments.length < 2) {
                    listItem.comments.push(res.data)
                }
                const list = [...this.state.list]
                list[index] = listItem
                this.setState({ list: list })
                this.commentTextHandler(index, '')



            }).catch((error) => {
                console.log(error)
            })
        } else {
            axios.post('http://127.0.0.1:8000/api/update-comments/', {
                update_id: timelineID,
                comment_text: text
            }, this.config).then((res) => {
                const listItem = {
                    ...this.state.list[index]
                }
                if (listItem.comments.length <2) {
                    listItem.comments.push(res.data)
                }
                const list = [...this.state.list]
                list[index] = listItem
                this.setState({ list: list })
                this.commentTextHandler(index, '')


            }).catch((error) => {
                console.log(error)
            })
        }

    }

    handleCommentTextOnChange = (e, ind) => {
        this.commentTextHandler(ind, e.target.value)


    }

    commentTextHandler = (index, value) => {
        const results = this.state.list.map((item, idx) => {
            if (index === idx) {
                return {
                    ...item,
                    commentRef: value
                }
            }
            return item;
        });
        this.setState({ list: results })

    }

    handleClickLike = (Index, commentIndex) => {
        this.handleLikeResponse(Index, commentIndex)
        axios.put('http://127.0.0.1:8000/api/comment-likes/', {
            comment_id: this.state.list[Index].comments[commentIndex].id
        }, this.config).then((res) => {


        }).catch(() => {
            this.handleLikeResponse(Index, commentIndex)
        })


    }

    handleLikeResponse = (Index, commentIndex) => {
        const results = this.state.list.map((item, idx) => {
            if (Index === idx) {
                const comments = item.comments
                comments.map((comment, idxx) => {
                    if (commentIndex == idxx) {
                        comment.liked = !comment.liked
                    }
                })
                return {
                    ...item,
                    comments: comments
                }
            }
            return item;
        });
        this.setState({ list: results })

    }

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

    onSnackBarClose = (event, reason) => {
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
                    style={{ padding: '16px' }}
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
                                                    <Zoom in={true} timeout={700} >

                                                        <Paper className={classes.mediaCardPaperStyle}
                                                            elevation={3}
                                                            style={{ marginBottom: '30px', marginTop: '30px' }}
                                                        >
                                                            <Grid container dir="rtl"

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
                                                                    <div style={{ alignSelf: 'flex-start' }}>
                                                                        <IconButton
                                                                            component="span"
                                                                            aria-controls="customized-menu"
                                                                            aria-haspopup="true"
                                                                            onClick={(e) => this.handleAnchorEl(e, index, true)}
                                                                            className={classes.veticalDots}>
                                                                            <MoreHorizIcon
                                                                            />
                                                                        </IconButton>
                                                                        <StyledMenu
                                                                            id="customized-menu"
                                                                            anchorEl={timeline.anchorEl}
                                                                            keepMounted
                                                                            open={Boolean(timeline.anchorEl)}
                                                                            onClose={(e) => this.handleAnchorEl(e, index, false)}
                                                                        >

                                                                            <StyledMenuItem onClick={() => this.openShareDialog(1, index, false, "http://localhost:3000/student_dashboard" + timeline.episode_or_news_url.replace('update', 'post'))} >
                                                                                <ListItemIcon>
                                                                                    <ShareIcon />
                                                                                </ListItemIcon>
                                                                                <ListItemText primary="اشتراک گذاری" />
                                                                            </StyledMenuItem>
                                                                        </StyledMenu>
                                                                    </div>


                                                                </Grid>
                                                                <Grid md={12} lg={12} sm={12}
                                                                    item
                                                                    xs={12}>
                                                                    <Divider />
                                                                </Grid>
                                                                <Grid item
                                                                    md={12} lg={12} sm={12}
                                                                    xs={12}>
                                                                    <div style={{ padding: '16px', display: 'flex', wordBreak: 'break-all' }}>
                                                                        <Typography

                                                                        >
                                                                            <Box fontSize={18}  >
                                                                                {timeline.description !== '' ? timeline.description : '(توضیحی وجود ندارد)'}
                                                                            </Box>

                                                                        </Typography>
                                                                    </div>

                                                                </Grid>


                                                                <Grid item md={12} lg={12} sm={12}
                                                                    xs={12}>

                                                                    {timeline.files.map((file) =>

                                                                        <this.TypeOfFile src={file.file} key={file.id} />

                                                                    )}


                                                                </Grid>

                                                                <Grid item
                                                                    md={12} lg={12} sm={12}
                                                                    xs={12}>
                                                                    {timeline.files.length > 0 ? (
                                                                        <div style={{ padding: '16px' }}>
                                                                            <Typography
                                                                                style={{ display: 'flex', marginBottom: '8px' }}

                                                                            >
                                                                                <Box fontSize={18}  >
                                                                                    فایل ها :
                                                                            </Box>

                                                                            </Typography>

                                                                            <TableContainer dir="rtl" component={Paper}>
                                                                                <Table aria-label="customized table" dir="rtl">
                                                                                    <TableHead dir="rtl">
                                                                                        <TableRow dir="rtl">
                                                                                            <StyledTableCell align="center">آیکون</StyledTableCell>
                                                                                            <StyledTableCell align="center">اسم فایل</StyledTableCell>
                                                                                            <StyledTableCell align="center">حجم</StyledTableCell>
                                                                                            <StyledTableCell align="center">دانلود</StyledTableCell>
                                                                                        </TableRow>
                                                                                    </TableHead>
                                                                                    <TableBody>
                                                                                        {timeline.files.map((tabFile, tabIndx) => (


                                                                                            <StyledTableRow dir="rtl" key={tabFile.id}>
                                                                                                <StyledTableCell align="center">
                                                                                                    <this.HandlePreviewIcon src={this.fileNameExtractor(tabFile.file)} />
                                                                                                </StyledTableCell>
                                                                                                <StyledTableCell align="center">
                                                                                                    <Box >
                                                                                                        {this.fileNameExtractor(tabFile.file)}
                                                                                                    </Box>
                                                                                                </StyledTableCell>
                                                                                                <StyledTableCell align="center">
                                                                                                    <div dir='ltr'>
                                                                                                        <Box style={{ color: 'grey' }} fontSize={14}>
                                                                                                            {this.bytesToSize(tabFile.size)}
                                                                                                        </Box>
                                                                                                    </div>
                                                                                                </StyledTableCell>
                                                                                                <StyledTableCell align="center">
                                                                                                    <IconButton variant="outlined" color='primary' onClick={() => this.handleDownload(tabFile.file)}>

                                                                                                        <GetAppRoundedIcon />
                                                                                                    </IconButton>
                                                                                                </StyledTableCell>
                                                                                            </StyledTableRow>

                                                                                        ))}
                                                                                    </TableBody>
                                                                                </Table>
                                                                            </TableContainer>
                                                                        </div>
                                                                    ) : ''}

                                                                </Grid>
                                                                
                                                                <Grid item
                                                                    md={12} lg={12} sm={12}
                                                                    style={{ padding: '16px' }}
                                                                    xs={12}>
                                                                    <div
                                                                        style={{
                                                                            justifyContent: 'space-between', alignItems: 'center',
                                                                            display: 'flex'
                                                                        }}
                                                                    >
                                                                        <div style={{ display: 'flex' }}>

                                                                            <div style={{ alignSelf: 'center' }}>
                                                                                <Box style={{ color: 'grey' }} fontSize={14}>
                                                                                    {timeline.likes_count}
                                                                                </Box>
                                                                            </div>
                                                                            <IconButton onClick={() => this.handleTimelineLike(index, timeline.id, timeline.isEpisode)}>
                                                                                {timeline.liked ? <FavoriteIcon color='secondary' /> : <FavoriteBorderOutlinedIcon />}
                                                                            </IconButton>

                                                                        </div>
                                                                        <div style={{ display: 'flex' }}>

                                                                            <div style={{ alignSelf: 'center' }}>
                                                                                <Box style={{
                                                                                    color: 'grey'
                                                                                }} fontSize={14}>
                                                                                    {timeline.comments_count}
                                                                                </Box>
                                                                            </div>
                                                                            <IconButton href={"/student_dashboard" + timeline.episode_or_news_url.replace('update', 'post')}>
                                                                                <CommentIcon />
                                                                            </IconButton>

                                                                        </div>
                                                                        <IconButton href={"/student_dashboard" + timeline.episode_or_news_url.replace('update', 'post')}
                                                                            style={{ marginLeft: '5px', alignSelf: 'center' }}
                                                                        >
                                                                            <AssignmentIcon style={{ marginRight: '4px' }} />
                                                                        </IconButton>
                                                                        <IconButton href={"/student_dashboard" + timeline.course_url.replace('course', 'added_courses')}
                                                                            style={{ marginRight: '5px', alignSelf: 'center' }}
                                                                        >
                                                                            <BallotIcon style={{ marginRight: '4px' }} />
                                                                        </IconButton>
                                                                    </div>

                                                                </Grid>

                                                                <Grid md={12} lg={12} sm={12}
                                                                    item
                                                                    xs={12}>
                                                                    <Divider />
                                                                </Grid>


                                                                <Grid item
                                                                    md={12} lg={12} sm={12}

                                                                    xs={12}>

                                                                    <div style={{ padding:'16px' }}>


                                                                        <div style={{ marginRight: '-16px', marginLeft: '-16px' }}>
                                                                            {timeline.comments.length > 0 &&
                                                                                (<List
                                                                                    component="div"
                                                                                    aria-labelledby="nested-comment-list-subheader"
                                                                                    subheader={
                                                                                        <ListSubheader component="div" id="nested-comment-list-subheader">
                                                                                            کامنت ها
                                                                            </ListSubheader>
                                                                                    }
                                                                                >
                                                                                    {timeline.comments.map((comment, commentIndex) => (
                                                                                        <div key={comment.id}>
                                                                                            <ListItem  >
                                                                                                <ListItemAvatar>
                                                                                                    <Avatar alt="avatar" src={comment.profile_picture} />
                                                                                                </ListItemAvatar>
                                                                                                <ListItemText
                                                                                                    style={{ textAlign: 'right' }}
                                                                                                    primary={
                                                                                                        <Typography >
                                                                                                            {comment.user_firstname + " " + comment.user_lastname}
                                                                                                        </Typography>
                                                                                                    }
                                                                                                    secondary={
                                                                                                        <>
                                                                                                            <Typography
                                                                                                                dir='rtl'
                                                                                                                component="span"
                                                                                                                variant="body2"
                                                                                                                color="textPrimary"
                                                                                                                style={{ wordBreak: 'break-all' }}
                                                                                                            >
                                                                                                                {comment.comment_text}
                                                                                                            </Typography>
                                                                                                        </>
                                                                                                    }
                                                                                                ></ListItemText>
                                                                                                <ListItemIcon >
                                                                                                    <IconButton
                                                                                                        onClick={() => window.location = "http://localhost:3000/student_dashboard" + timeline.episode_or_news_url.replace('update', 'post')}
                                                                                                    >
                                                                                                        <ReplyIcon />
                                                                                                    </IconButton>
                                                                                                    <IconButton
                                                                                                        onClick={() => this.handleClickLike(index, commentIndex)}
                                                                                                    >

                                                                                                        {comment.liked ? <FavoriteIcon color='secondary' /> : <FavoriteBorderOutlinedIcon />}
                                                                                                    </IconButton>
                                                                                                </ListItemIcon>

                                                                                            </ListItem>
                                                                                            <Divider />
                                                                                        </div>

                                                                                    ))}
                                                                                </List>)}
                                                                        </div>
                                                                        <InputBase
                                                                            style={{ padding: '8px',marginTop:'6px' }}
                                                                            value={timeline.commentRef}
                                                                            onChange={(e) => this.handleCommentTextOnChange(e, index)}
                                                                            rowsMax={2}
                                                                            multiline
                                                                            fullWidth
                                                                            className='input2'
                                                                            placeholder="متن پیام"
                                                                            endAdornment={
                                                                                <InputAdornment position="end" >
                                                                                    {timeline.commentRef !== '' && (
                                                                                        <IconButton color="primary" className={classes.iconButton}
                                                                                            onClick={() => this.handlePostComment(index, timeline.id, timeline.isEpisode, timeline.commentRef)}
                                                                                        >
                                                                                            <SendIcon className='icon' />
                                                                                        </IconButton>)}
                                                                                </InputAdornment>
                                                                            }
                                                                        />
                                                                    </div>
                                                                </Grid>



                                                            </Grid>
                                                        </Paper>
                                                    </Zoom>


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