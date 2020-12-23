import { Grid, List, StylesProvider, Typography, jssPreset,
    ListItem, ListItemAvatar, ListItemText, ListItemIcon,
    IconButton, Avatar, Divider, Box, withStyles,
    FormControl, InputLabel, OutlinedInput,
    createMuiTheme, ThemeProvider,
    Select, MenuItem, Button, Collapse } from "@material-ui/core";
import React, { Component } from "react";
import rtl from "jss-rtl";
import { create } from 'jss';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import './Questions.scss';
import SendIcon from '@material-ui/icons/Send';
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions'
import axios from "axios";
import time from "@jacobmarshall/human-time";
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

const styles = (theme) => ({
    "@global": {
        "*::-webkit-scrollbar": {
          width: "0.4em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(10,10,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0, 0, 0,.2)",
        },
    },
    textFieldStyle: {
        marginRight: theme.spacing(2),
        paddingLeft: theme.spacing(4),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    inline: {
        display: "inline"
    },
    nested: {
        paddingRight: theme.spacing(8),
    },
    
})

class Questions extends Component {
    state = {
        questions: [],
        text_field: '',
        isButtonShownText: false,
        isButtonShownEpisode: false,
        episode: '',
        openReply: {},
        episodes:[],
        isStudent: false,
    };

    componentDidMount(){
        const course_id = window.location.href.split('/')[5];
        const config = {
        headers: { Authorization: `Token ${localStorage.getItem('api_key')}`, }
        }
        axios.get(`http://127.0.0.1:8000/api/course/chapters/?course_id=${course_id}`,config)
        .then((res)=>{
            const eps = [];
            res.data.map((chapter)=>{
                const episodes = chapter.episodes;
                episodes.map((episode)=>{
                    const newE = {
                        id: episode.id,
                        name: episode.name,
                        url: episode.episode_url,
                    }
                    eps.push(newE)
                })
            })
            this.setState({episodes:eps})
        })
        axios.get(`http://127.0.0.1:8000/api/forum/episode-question/?course_id=${course_id}`,config)
        .then((res)=>{
            const qs = [];
            let reps = {

            };
            res.data.map((question)=>{
                qs.push(question)
                reps = {
                    ...reps,
                    [question.id]:false
                }
            })
            this.setState({questions:qs, openReply: reps})
        })
        if (JSON.parse(localStorage.getItem('user')).role == 'S'){
            this.setState({isStudent: true})
        }else{
            this.setState({isStudent: false})
        }
    }
    onChange = (event) => {
        this.setState({ text_field: event.target.value })
        if (event.target.value.length > 0) {
            this.setState({ isButtonShownText: true })
        } else {
            this.setState({ isButtonShownText: false })
        }
    }

    onChangeSelect = (event)=>{
        this.setState({episode:event.target.value});
        this.setState({ isButtonShownEpisode: true })
    }

    handleOpenReply = (id)=>{
        const opens = this.state.openReply
        opens[id] = !opens[id]
        this.setState({openReply: opens})
    }

    handleSubmitQuestion = ()=>{
        const config = {
        headers: { Authorization: `Token ${localStorage.getItem('api_key')}`, }
        }
        axios.post('http://127.0.0.1:8000/api/forum/episode-question/',{
            question: this.state.text_field,
            related_episode: this.state.episode

        },config).then((res)=>{
            console.log(res.data)
        })
    
        this.setState({
            text_field: '',
            isButtonShownText: false,
            episode: '',
            isButtonShownEpisode: false,
        })
        this.props.onSnackQ(true)

    }

    toFarsiNumber=(n)=> {
        const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    
        return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
    }

    render() {
        const { classes } = this.props
        const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
        const theme = createMuiTheme({
            direction: 'rtl',
        });

        return (
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    <Grid dir='rtl' container style={{ margin: '4px', padding: "16px", maxHeight: '450px', overflow: 'auto' }}>
                        <Grid item xs={12}>
                            <List  style={{boxShadow:'2px'}}>
                                {this.state.questions.length === 0 ?
                                (<Typography className='text'>
                                    سوالی یافت نشد
                                </Typography>)
                                :(
                                    this.state.questions.map((question) => {
                                        return (
                                            <React.Fragment key={question.id}>
                                                {this.state.isStudent?(<Box marginTop={1} style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}}>    
                                                <ContactSupportIcon color='primary'/>
                                                <Box marginRight={1} />
                                                <Typography style={{paddingBottom:'6px',paddingTop:'6px'}} className='text'>
                                                    سوال مطرح شده از جلسه
                                                </Typography>
                                                <Button
                                                variant='text'
                                                style={{textTransform: 'none'}}
                                                endIcon={<ReplyOutlinedIcon className='icon' color='primary'/>}
                                                href={`/student_dashboard/chapter/${question.related_chapter}/episode/${question.related_episode}`}
                                                >
                                                    <Typography color='primary' className='text'>
                                                    {question.related_episode_name}
                                                    </Typography>
                                                </Button>
                                                </Box>):(<Box marginTop={1} style={{display: 'flex',alignItems: 'center',flexWrap: 'wrap',}}>    
                                                <ContactSupportIcon color='primary'/>
                                                <Box marginRight={1} />
                                                <Typography style={{paddingBottom:'6px',paddingTop:'6px'}} className='text'>
                                                    سوال مطرح شده از جلسه {question.related_episode_name}
                                                </Typography>
                                                </Box>)}
                                                
                                                <ListItem key={question.id} alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt="avatar" src={question.sender_profile_picture} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        style={{ textAlign: 'right' }}
                                                        primary={
                                                            <Typography className='text1'>
                                                                {`${question.sender_firstname} ${question.sender_lastname}`}
                                                            </Typography>
    
                                                        }
                                                        secondary={
                                                            <>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className='text4'
                                                                    color="textPrimary"
                                                                >
                                                                    {
                                                                        this.toFarsiNumber(time(new Date(question.creation_time))
                                                                        .replace("years", "سال")
                                                                        .replace("year", "سال")
                                                                        .replace("months", "ماه")
                                                                        .replace("month", "ماه")
                                                                        .replace("weeks", "هفته")
                                                                        .replace("week", "هفته")
                                                                        .replace("hours", "ساعت")
                                                                        .replace("hour", "ساعت")
                                                                        .replace("minutes", "دقیقه")
                                                                        .replace("minute", "دقیقه")
                                                                        .replace("days", "روز")
                                                                        .replace("day", "روز")
                                                                        .replace("seconds", "ثانیه")
                                                                        .replace("second", "ثانیه")
                                                                        .replace("ago", "پیش"))
                                                                        +
                                                                        " . "
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className='text'
                                                                    color="textPrimary"
                                                                >
                                                                    {question.question}
                                                                </Typography>
                                                            </>
    
                                                        }
                                                    />
                                                    <ListItemIcon >
                                                        <IconButton onClick={()=>this.handleOpenReply(question.id)}>
                                                            <QuestionAnswerIcon />
                                                        </IconButton>
                                                    </ListItemIcon>
                                                </ListItem>
                                                <Collapse in={this.state.openReply[question.id]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding dir='rtl'>
                                                    {
                                                    question.answer.map(reply => {
                                                        return (
                                                            <ListItem key={reply.id} alignItems="flex-start" className={classes.nested}>
                                                                <ListItemAvatar>
                                                                    <Avatar alt="avatar" src={reply.sender_profile_picture} />
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    style={{ textAlign: 'right' }}
                                                                    primary={
                                                                        <Typography className='text1'>
                                                                            {`${reply.sender_firstname} ${reply.sender_lastname}`}
                                                                        </Typography>
                                                                    }
                                                                    secondary={
                                                                        <>
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            className='text4'
                                                                            color="textPrimary"
                                                                        >
                                                                        {
                                                                        this.toFarsiNumber(time(new Date(reply.creation_time))
                                                                        .replace("years", "سال")
                                                                        .replace("year", "سال")
                                                                        .replace("months", "ماه")
                                                                        .replace("month", "ماه")
                                                                        .replace("weeks", "هفته")
                                                                        .replace("week", "هفته")
                                                                        .replace("hours", "ساعت")
                                                                        .replace("hour", "ساعت")
                                                                        .replace("minutes", "دقیقه")
                                                                        .replace("minute", "دقیقه")
                                                                        .replace("days", "روز")
                                                                        .replace("day", "روز")
                                                                        .replace("seconds", "ثانیه")
                                                                        .replace("second", "ثانیه")
                                                                        .replace("ago", "پیش"))
                                                                        +
                                                                        " . "
                                                                        }
                                                                        </Typography>
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            className='text'
                                                                            color="textPrimary"
                                                                        >
                                                                            {reply.answer}
                                                                        </Typography>
                                                                    </>
                                                                    }
                                                                />
                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                                </List>
                                                <Box marginBottom={1}/>
                                                </Collapse>
                                                <Divider />
                                            </React.Fragment>
                                        )
                                    })
                                    )
                                }
                            </List>
                        </Grid>

                    </Grid>
                    {this.state.isStudent ? (
                        <Typography className='text' style={{margin:'16px', display: 'inherit'}}>
                                سوال خود را مطرح کنید
                        </Typography>
                    ): null}
                    {this.state.isStudent ? (
                    <Grid dir='rtl' container direction="row" justify='center' alignItems="center" spacing={2}>
                        <Grid container item xs={12} sm={12} lg={7}>
                            <FormControl required fullWidth className={classes.formControl} fullWidth variant="outlined">
                                <InputLabel className='text' htmlFor="outlined-adornment">سوال جدید</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment"
                                    className='text'
                                    required
                                    label="سوال جدید"
                                    autoComplete='off'
                                    onChange={this.onChange}
                                    value={this.state.text_field}
                                />
                            </FormControl>
                        </Grid>

                        <Grid container item xs={6} sm lg>
                            <FormControl required fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel className='text' id="demo-simple-select-label">جلسه</InputLabel>
                                <Select
                                    className='text'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.episode}
                                    onChange={this.onChangeSelect}
                                    label='جلسه'
                                >
                                    {this.state.episodes.map((ep)=>{
                                        return(
                                        <MenuItem key={ep.id} dir='rtl' className='text' value={ep.id}>{ep.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container item xs={6} sm lg justify='center'>
                            <Button
                            fullWidth
                            disabled={this.state.isButtonShownEpisode && this.state.isButtonShownText ? false : true}
                            className='text'
                            style={{margin:'8px',
                            height: '50px'}}
                            color='primary'
                            variant='contained'
                            type='submit'
                            onClick={this.handleSubmitQuestion}
                            endIcon={
                                <SendIcon className='icon' />
                            }
                            >
                                ارسال
                            </Button>
                        </Grid>
                    </Grid>
                    ): (null)}         
                </ThemeProvider>
            </StylesProvider>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSnackQ: (snackBarOpenOrClose) => dispatch({ type: actionTypes.SNACKBAR_NEW_Q, snackBarOpenOrClose:snackBarOpenOrClose }),
    }
  }

export default connect(null,mapDispatchToProps)(withStyles(styles)(Questions));