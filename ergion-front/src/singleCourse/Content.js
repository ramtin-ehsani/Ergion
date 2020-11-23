import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import CardMedia from '@material-ui/core/CardMedia';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import { DropzoneArea } from 'material-ui-dropzone'
import { withStyles } from '@material-ui/core/styles';
import PDFViewer from 'mgr-pdf-viewer-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import DialogContentText from '@material-ui/core/DialogContentText';
import Fade from '@material-ui/core/Fade';
import {
    TextField,
} from '@material-ui/core';

const styles = (theme) => ({
    root: {
        width: '100%',
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
    newChapterButtonStyle: {
        color: purple[900],
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
        objectFit: 'cover',
        borderRadius: 10

    },
    newEpisodeRoot: {
        height: 'auto',
    },
    mediaCardPaperStyle: {
        borderRadius: 10,
        boxShadow: 20
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
    },
    pdfStyle: {
        // height: 250,
        // width: '100%',
    },

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
            positionOfEpisode: 0,
            isOwner: false,
            list: [],
            newChapterValue: '',
            isButtonShown: false,
            courseId: '',
            loading: true,
            removeDialog: false,
            editDialog: false,
            chapterEditName: '',



        };
    }


    addEpisodeButton = () => {
        const { files } = this.state
        const listItem = {
            ...this.state.list[this.state.positionOfEpisode]
        }
        // const data=new FormData()
        // data.append('chapter_id', listItem.id)
        // data.append('name', this.newEpisodeName.current.value)
        // data.append('episode_description', this.newEpisodeDescription.current.value)
        // data.append('episode_file', files)

        const data = {
            chapter_id: listItem.id,
            name: this.newEpisodeName.current.value,
            episode_description: this.newEpisodeDescription.current.value,
            episode_file: files[0]
        }
        axios.post('http://127.0.0.1:8000/api/chapter-episodes/', data, this.config)
            .then((response) => {
                // handle success
                console.log(response.data)
                // listItem.episodes.push({
                //     name: response.data.name,
                //     episode_description:response.data.episode_description,
                //     files: response.data.files,
                //     id:response.data.id

                // })

                // const list = [...this.state.list]
                // list[this.state.positionOfEpisode] = listItem
                // this.setState({ dialogOpen: false,list:list })



            })
            .catch((error) => {
                // handle error
                console.log(error);
            })




    }



    fileChange = (files) => {
        this.setState({
            files: files
        });

    }



    episodeButtonFunction = (position) => {
        this.setState({ positionOfEpisode: position, dialogOpen: true })
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
                            this.setState({ isOwner: true, courseId: this.props.course.id })
                        }
                    }
                }

            }
            this.getValues()


        }, 2000)


    }

    getValues = () => {
        axios.get(('http://127.0.0.1:8000/api/course-chapters/?course_id=' + this.state.courseId), this.config)
            .then((response) => {
                // handle success
                const l = []
                response.data.map((chapters) => {
                    const chapter = {
                        id: chapters.id,
                        name: chapters.name,
                        isOpened: false,
                        buttonShown: false,
                        episodes: chapters.episodes,


                    }
                    l.push(chapter)
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

    chapterRemove = () => {
        axios.delete(('http://127.0.0.1:8000/api/course-chapters/?chapter_id=') + (this.state.list)[this.state.positionOfEpisode].id, this.config)
            .then((response) => {
                // handle success
                const { list } = this.state
                list.splice(this.state.positionOfEpisode, 1)
                this.setState({ list: list, removeDialog: false })



            })
            .catch((error) => {
                // handle error
                console.log(error);
            })

    }



    font = 20;

    toggle = (index) => {
        const results = this.state.list.map((item, idx) => {
            if (index === idx) {
                return {
                    ...item,
                    isOpened: !item.isOpened
                };
            }
            return item;
        });
        this.setState({ list: results })

    }

    showButtons = (index) => {
        const results = this.state.list.map((item, idx) => {
            if (index === idx) {
                return {
                    ...item,
                    buttonShown: true
                };
            }
            return item;
        });
        this.setState({ list: results })

    }
    hideButtons = (index) => {
        const results = this.state.list.map((item, idx) => {
            if (index === idx) {
                return {
                    ...item,
                    buttonShown: false
                };
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


    handleClick = () => {
        const data = new FormData()
        data.append('course_id', this.state.courseId)
        data.append('name', this.state.newChapterValue)
        axios.post('http://127.0.0.1:8000/api/course-chapters/', data, this.config)
            .then((response) => {
                // handle success
                const l = [
                    ...this.state.list,
                    { name: response.data.name, isOpened: false, buttonShown: false, id: response.data.id, episodes: [] }
                ]
                this.setState({ newChapterValue: "", isButtonShown: false, list: l })



            })
            .catch((error) => {
                // handle error
                console.log(error);
            })


    };

    dialogOnclose = () => {
        this.setState({ dialogOpen: false, removeDialog: false, editDialog: false })

    }

    chapterRemoveButton = (index) => {
        this.setState({ positionOfEpisode: index, removeDialog: true })

    }

    chapterEditButton = (index) => {
        this.setState({ chapterEditName: (this.state.list)[index].name, positionOfEpisode: index, editDialog: true })


    }

    chapterEditButtonSaveChanges = () => {
        axios.patch(('http://127.0.0.1:8000/api/course-chapters/?chapter_id=') + (this.state.list)[this.state.positionOfEpisode].id, { name: this.newEpisodeName.current.value }, this.config)
            .then((response) => {
                // handle success
                console.log(response.data)
                // const l = [
                //     ...this.state.list,
                //     { name: response.data.name, isOpened: false, buttonShown: false, id: response.data.id, episodes: [] }
                // ]
                // this.setState({ newChapterValue: "", isButtonShown: false, list: l })



            })
            .catch((error) => {
                // handle error
                console.log(error);
            })

    }

    EditDialog = () => {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.state.editDialog}
                onClose={this.dialogOnclose}
                aria-labelledby="error-dialog"
                className={classes.newEpisodeRoot}

            >
                <ValidatorForm form="form" onSubmit={this.chapterEditButtonSaveChanges} >

                    <DialogTitle id="error-dialog" dir='rtl' className={classes.newEpisodeTitle}>
                        ویرایش
                    </DialogTitle>

                    <Divider />
                    <Divider />


                    <DialogContent style={{ padding: '10px' }}>


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
                                        defaultValue={this.state.chapterEditName}
                                        inputRef={this.newEpisodeName}
                                        required
                                        variant="outlined"
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
                            ذخیره
                            </Button>
                    </DialogActions>
                </ValidatorForm>



            </Dialog>

        )
    }

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

        if (String(src).includes('.jpg') || String(src).includes('.JPG') || String(src).includes('.png')) {
            return (
                <div>
                    <Paper className={classes.mediaCardPaperStyle} elevation={5}>
                        <CardMedia
                            className={classes.mediaCardStyle}
                            component='img'
                            image={src}
                        />

                    </Paper>
                    <Typography >
                        <Box fontSize={16} fontWeight="fontWeightBold" textAlign='center' style={{ marginTop: '10px', marginBottom: '10px' }}>
                            {name}
                        </Box>

                    </Typography></div>

            )
        } else if (String(src).includes('.mp4')) {
            return (
                <div>
                    <Paper className={classes.mediaCardPaperStyle} elevation={5}>
                        <CardMedia
                            className={classes.mediaCardStyle}
                            component='iframe'
                            image={src}
                        />
                    </Paper>
                    <Typography >
                        <Box fontSize={16} fontWeight="fontWeightBold" textAlign='center' style={{ marginTop: '10px', marginBottom: '10px' }}>
                            {name}
                        </Box>

                    </Typography></div>
            )
        } else if (String(src).includes('.pdf')) {
            return (
                <div>
                    <Paper className={classes.mediaCardPaperStyle} elevation={5}>
                        <PDFViewer document={{
                            url: src
                        }} scale={0.38} loader='در حال آماده سازی لطفا صبر کنید' />
                    </Paper>
                    <Typography >
                        <Box fontSize={16} fontWeight="fontWeightBold" textAlign='center' style={{ marginTop: '10px', marginBottom: '10px' }}>
                            {name}
                        </Box>

                    </Typography></div>
            )
        }

        return (
            <div>
                <Paper className={classes.mediaCardPaperStyle} elevation={5}>
                    <CardMedia
                        className={classes.mediaCardStyle}
                        component='img'
                        title='این فرمت ساپورت نمیشود'
                    />
                </Paper>
                <Typography >
                    <Box fontSize={16} fontWeight="fontWeightBold" textAlign='center' style={{ marginTop: '10px', marginBottom: '10px' }}>
                        {name}
                    </Box>

                </Typography></div>)


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
                            ایجاد یک اپیزود جدید
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
                                        <DropzoneArea
                                            filesLimit={6}
                                            maxFileSize={5000000}
                                            dropzoneParagraphClass={classes.dropZoneTextStyle}
                                            dropzoneText="برای اضافه کردن فایل، می‌توانید فایل‌های خود را بکشید و در این اینجا رها کنید. "
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
                            آیا میخواهید این سرفصل را حذف کنید؟
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className={classes.newEpisodeButtonContent}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={this.dialogOnclose}
                            style={{ margin: '8px' }}
                        >
                            لغو
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.chapterRemove}
                            style={{ margin: '8px' }}
                        >
                            حذف
                            </Button>
                    </DialogActions>
                </Dialog>

                <this.EditDialog />




                {this.state.loading && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress style={{ marginTop: '10px' }} />
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
                            <Paper onMouseEnter={() => this.showButtons(index)} onMouseLeave={() => this.hideButtons(index)}>
                                <ListItem button onClick={() => this.toggle(index)} >
                                    <ListItemIcon>
                                        <LibraryBooksIcon />
                                    </ListItemIcon>
                                    <ListItemText  >
                                        <Typography >
                                            <Box fontSize={this.font} fontWeight="fontWeightBold" >
                                                {item.name}
                                            </Box>
                                        </Typography>
                                    </ListItemText>
                                    {item.isOpened ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                {this.state.isOwner && item.buttonShown && (
                                    <Fade in={item.buttonShown} timeout={750}>
                                        <div>
                                            <Button variant="outlined"
                                                dir="rtl"
                                                color="secondary"
                                                style={{ margin: '10px' }}
                                                onClick={() => this.chapterRemoveButton(index)}>
                                                حذف کردن

                                    </Button>
                                            <Button variant="outlined"
                                                dir="rtl"
                                                color="primary"
                                                style={{ margin: '10px' }}
                                                onClick={() => this.chapterEditButton(index)}>
                                                ویرایش

                                    </Button></div></Fade>)}
                            </Paper>
                            <Collapse in={item.isOpened} timeout="auto" unmountOnExit
                                style={{ marginLeft: '14px', marginRight: '14px' }}
                            >

                                {item.episodes.map((file, indx) =>
                                    (
                                        <Paper className={classes.mediaCardPaperStyle} elevation={5}
                                            style={{ padding: '12px', marginBottom: '12px', marginTop: '12px' }} key={file.id}
                                        >
                                            <Grid container spacing={2} dir="rtl"

                                            >

                                                <Grid item md={12}
                                                    xs={12}>
                                                    <Typography >
                                                        <Box fontSize={26} fontWeight="fontWeightBold" textAlign='center'
                                                            style={{ marginTop: '12px' }}
                                                        >
                                                            {file.name}
                                                        </Box>

                                                    </Typography>

                                                </Grid>
                                                <Grid item md={12}
                                                    xs={12}>

                                                    <Typography style={{ marginTop: '12px' }}>
                                                        <Box fontSize={18}  >
                                                            توضیحات: {file.episode_description}
                                                        </Box>

                                                    </Typography>

                                                </Grid>

                                                <Grid item md={12} lg={12}
                                                    xs={12}>

                                                    <Grid container spacing={2} dir="rtl"
                                                        justify="center"
                                                        alignItems="center"
                                                        style={{ marginTop: '12px', padding: '20px' }}
                                                    >
                                                        {file.files.map((filess, indx) =>
                                                            (
                                                                <Grid item md={4} dir="ltr" lg={4} sm={12} zeroMinWidth key={filess.id}
                                                                    xs={12}>
                                                                    <this.TypeOfFile src={filess.file} />


                                                                </Grid>))}

                                                    </Grid>


                                                </Grid>



                                            </Grid>
                                        </Paper>)
                                )}

                                {this.state.isOwner && (
                                    <Button variant="outlined"
                                        dir="rtl"
                                        color="primary"
                                        // className={classes.newEpisodeButton}
                                        style={{ marginTop: '12px' }}
                                        onClick={() => this.episodeButtonFunction(index)}>
                                        + ایجاد اپیزود

                                    </Button>)}
                            </Collapse>
                        </div>)


                    )}


                </List>) : ""}

                {this.state.isOwner && (
                    <FormControl fullWidth className={classes.textFieldStyle}>
                        <InputLabel htmlFor="standard-adornment">+ ایجاد سرفصل جدید</InputLabel>
                        <Input
                            id="standard-basic"
                            onChange={this.onChange}
                            value={this.state.newChapterValue}
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                        aria-label="creating new chapter"
                                        onClick={this.handleClick}
                                    >
                                        {this.state.isButtonShown && (<AddBoxIcon className={classes.newChapterButtonStyle} />)}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>)}


            </div>
        )
    }
}
export default withStyles(styles)(NestedList);